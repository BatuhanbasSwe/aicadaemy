"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { useGameStore } from "@/lib/store/useGameStore";
import type { TreeNode } from "@/lib/types";
import { Network, Maximize2, Minimize2 } from "lucide-react";

/* ── Color map per node type */
const NODE_COLOR: Record<string, string> = {
  root:        "#E8B83A",
  opened:      "#5E8BC3",
  suggested:   "#E8B83A",
  starred:     "#EC4899",
  lgs_correct: "#3FAE82",
};

type NodeWithChildren = TreeNode & { children: NodeWithChildren[] };

/* ── Build d3 hierarchy from flat nodes */
function buildHierarchy(nodes: TreeNode[]): d3.HierarchyNode<NodeWithChildren> | null {
  if (nodes.length === 0) return null;
  const root = nodes.find((n) => n.parentId === null);
  if (!root) return null;

  const nodeMap = new Map<string, NodeWithChildren>();
  nodes.forEach((n) => nodeMap.set(n.id, { ...n, children: [] }));
  nodes.forEach((n) => {
    if (n.parentId && nodeMap.has(n.parentId)) {
      nodeMap.get(n.parentId)!.children.push(nodeMap.get(n.id)!);
    }
  });
  return d3.hierarchy(nodeMap.get(root.id)!);
}

function shorten(text: string, max = 22) {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

interface Props {
  onNodeClick?: (node: TreeNode) => void;
}

export default function CuriosityTree({ onNodeClick }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = useGameStore((s) => s.tree.nodes);
  const promoteSuggested = useGameStore((s) => s.promoteSuggested);
  const [resizeTick, setResizeTick] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Progressive expand: hangi node id'leri "açılmış" (children görünür)
  // Default: root + tüm "opened" depth=1'e kadar görünür. Daha derin için tıkla.
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Yeni node'lar eklendiğinde otomatik en son opened'i expand et (yeni dallar görünsün)
  useEffect(() => {
    setExpanded((prev) => {
      const root = nodes.find((n) => n.parentId === null);
      if (!root) return prev;
      const next = new Set(prev);
      next.add(root.id);
      // En son eklenen opened'i de aç ki kullanıcı yeni dalları görsün
      const lastOpened = [...nodes].reverse().find((n) => n.type === "opened");
      if (lastOpened) next.add(lastOpened.id);
      return next;
    });
  }, [nodes]);

  // Resize tetik
  useEffect(() => {
    const handle = () => setResizeTick((t) => t + 1);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Fullscreen değişikliği takip
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
      setResizeTick((t) => t + 1);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W = svg.clientWidth || 560;
    const H = svg.clientHeight || 240;
    const pad = { top: 32, right: 24, bottom: 36, left: 24 };

    d3.select(svg).selectAll("*").remove();

    const root = buildHierarchy(nodes);
    if (!root) {
      d3.select(svg)
        .append("text")
        .attr("x", W / 2).attr("y", H / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(15,17,21,0.4)")
        .attr("font-size", "13")
        .attr("font-family", "system-ui, sans-serif")
        .text("Sohbet başlayınca ağaç büyür 🌱");
      return;
    }

    // Progressive expand: collapse children of nodes NOT in `expanded`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (root as any).each((d: any) => {
      const id = d.data.id;
      if (id !== root.data.id && !expanded.has(id) && d.children) {
        d._children = d.children;
        d.children = undefined;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treeLayout = d3.tree<any>().size([W - pad.left - pad.right, H - pad.top - pad.bottom]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    treeLayout(root as any);

    const g = d3
      .select(svg)
      .append("g")
      .attr("transform", `translate(${pad.left},${pad.top})`);

    // Links
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "rgba(15,17,21,0.18)")
      .attr("stroke-width", 1.6)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", (d: any) => {
        const s = d.source;
        const t = d.target;
        return `M${s.x},${s.y} C${s.x},${(s.y + t.y) / 2} ${t.x},${(s.y + t.y) / 2} ${t.x},${t.y}`;
      });

    // Node groups
    const nodeG = g
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("cursor", (d: any) => {
        const hasChildren =
          (d.children && d.children.length > 0) || (d._children?.length ?? 0) > 0;
        if (d.data.type === "suggested") return "pointer";
        if (hasChildren) return "pointer";
        return "default";
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("click", (_event: unknown, d: any) => {
        if (d.data.type === "suggested") {
          promoteSuggested(d.data.id);
          onNodeClick?.(d.data as TreeNode);
          return;
        }
        const id = d.data.id;
        const hasHiddenChildren =
          (d._children?.length ?? 0) > 0 || (d.children?.length ?? 0) > 0;
        if (!hasHiddenChildren) return;
        setExpanded((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      });

    // Circles
    nodeG
      .append("circle")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("r", (d: any) => (d.data.type === "root" ? 12 : 9))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("fill", (d: any) => NODE_COLOR[d.data.type] ?? "#9CA3AF")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("stroke", (d: any) => (d.data.type === "suggested" ? NODE_COLOR.suggested : "white"))
      .attr("stroke-width", 2.5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("stroke-dasharray", (d: any) => (d.data.type === "suggested" ? "3 2" : "none"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("opacity", (d: any) => (d.data.type === "suggested" ? 0.75 : 1))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .style("filter", (d: any) =>
        d.data.type === "root" ? `drop-shadow(0 0 6px ${NODE_COLOR.root}88)` : "none"
      );

    // Plus indicator if collapsed (has hidden children)
    nodeG
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((d: any) => Array.isArray(d._children) && d._children.length > 0)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.36em")
      .attr("font-size", "11")
      .attr("font-weight", "700")
      .attr("fill", "white")
      .attr("pointer-events", "none")
      .text("+");

    // Star / check symbol
    nodeG
      .filter((d) => d.data.type === "starred" || d.data.type === "lgs_correct")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.36em")
      .attr("font-size", "10")
      .attr("fill", "white")
      .attr("pointer-events", "none")
      .text((d) => (d.data.type === "starred" ? "★" : "✓"));

    // Label with background pill for readability
    const labelG = nodeG.append("g").attr("class", "label").attr("pointer-events", "none");
    labelG.each(function (d) {
      const sel = d3.select(this);
      const r = d.data.type === "root" ? 12 : 9;
      const yOffset = r + 14;
      const fontSize = d.data.type === "root" ? 12 : 11;
      const text = shorten(d.data.content, isFullscreen ? 38 : 22);

      const textEl = sel
        .append("text")
        .attr("y", yOffset)
        .attr("text-anchor", "middle")
        .attr("font-size", String(fontSize))
        .attr("font-family", "system-ui, -apple-system, sans-serif")
        .attr("font-weight", d.data.type === "root" ? "700" : "600")
        .attr("fill", "#16181F")
        .text(text);

      const bbox = (textEl.node() as SVGTextElement | null)?.getBBox();
      if (bbox) {
        sel
          .insert("rect", "text")
          .attr("x", bbox.x - 5)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 10)
          .attr("height", bbox.height + 4)
          .attr("rx", 5)
          .attr("fill", "rgba(255,255,255,0.92)")
          .attr("stroke", "rgba(15,17,21,0.08)")
          .attr("stroke-width", 1);
      }
    });
  }, [nodes, expanded, promoteSuggested, resizeTick, onNodeClick, isFullscreen]);

  const openedCount = nodes.filter((n) => n.type !== "suggested").length;
  const suggestCount = nodes.filter((n) => n.type === "suggested").length;

  return (
    <div
      ref={containerRef}
      className={`bg-white border border-ink-200 rounded-2xl shadow-card p-4 flex flex-col h-full min-h-0 ${
        isFullscreen ? "rounded-none border-0 p-6" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
            <Network className="w-3.5 h-3.5 text-brand-600" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display font-bold text-[13px] text-ink-900 tracking-tight">Merak Ağacı</h3>
            <div className="text-[10px] text-ink-500 font-medium">
              {openedCount} açık · {suggestCount} öneri · düğüme tıkla → aç/kapa
            </div>
          </div>
        </div>
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-900 transition"
          title={isFullscreen ? "Tam ekrandan çık" : "Tam ekran"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="relative flex-1 min-h-[160px] rounded-xl border border-ink-200 bg-paper dotgrid overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block" />

        <div className="absolute top-2 right-2 flex flex-col gap-0.5">
          {[
            { color: NODE_COLOR.root, label: "Başlangıç" },
            { color: NODE_COLOR.opened, label: "Keşfedilen" },
            { color: NODE_COLOR.suggested, label: "Öneri" },
            { color: NODE_COLOR.lgs_correct, label: "LGS ✓" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1 bg-white/85 rounded px-1.5 py-0.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="text-[10px] text-ink-700 font-semibold">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {suggestCount > 0 && (
        <p className="mt-1.5 text-[10.5px] text-ink-500 text-center shrink-0">
          💡 Sarı düğüm → sohbete at · <strong>+</strong> işaretli düğüme tıkla → alt dalları aç
        </p>
      )}
    </div>
  );
}
