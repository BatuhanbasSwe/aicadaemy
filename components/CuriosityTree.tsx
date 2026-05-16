"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useGameStore } from "@/lib/store/useGameStore";
import type { TreeNode } from "@/lib/types";
import { Network, Maximize2 } from "lucide-react";

/* ── Color map per node type */
const NODE_COLOR: Record<string, string> = {
  root:        "#E8B83A", // golden
  opened:      "#5E8BC3", // blue
  suggested:   "#E8B83A", // yellow (dashed border in SVG)
  starred:     "#EC4899", // pink
  lgs_correct: "#3FAE82", // green
};

type NodeWithChildren = TreeNode & { children: NodeWithChildren[] };

/* ── Build d3 hierarchy from flat nodes */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildHierarchy(nodes: TreeNode[]): d3.HierarchyNode<any> | null {
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

/* ── Shorten long labels */
function shorten(text: string, max = 18) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

interface Props {
  onNodeClick?: (node: TreeNode) => void;
}

export default function CuriosityTree({ onNodeClick }: Props) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const nodes    = useGameStore((s) => s.tree.nodes);
  const { promoteSuggested } = useGameStore();
  const [resizeTick, setResizeTick] = useState(0);

  // Window resize → trigger D3 re-layout
  useEffect(() => {
    const handle = () => setResizeTick((t) => t + 1);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W = svg.clientWidth  || 560;
    const H = svg.clientHeight || 240;
    const pad = { top: 28, right: 16, bottom: 28, left: 16 };

    // Clear previous render
    d3.select(svg).selectAll("*").remove();

    const root = buildHierarchy(nodes);
    if (!root) {
      // Empty state
      d3.select(svg)
        .append("text")
        .attr("x", W / 2).attr("y", H / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(15,17,21,0.3)")
        .attr("font-size", "12")
        .attr("font-family", "system-ui, sans-serif")
        .text("Sohbet başlayınca ağaç büyür 🌱");
      return;
    }

    // Layout
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treeLayout = d3.tree<any>().size([W - pad.left - pad.right, H - pad.top - pad.bottom]);
    treeLayout(root);

    const g = d3.select(svg)
      .append("g")
      .attr("transform", `translate(${pad.left},${pad.top})`);

    // Links
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "rgba(15,17,21,0.15)")
      .attr("stroke-width", 1.5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", (d: any) => {
        return `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`;
      });

    // Node groups
    const nodeG = g.selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("cursor", (d: any) => d.data.type === "suggested" ? "pointer" : "default")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("click", (_event: any, d: any) => {
        if (d.data.type === "suggested") {
          promoteSuggested(d.data.id);
          onNodeClick?.(d.data as TreeNode);
        }
      });

    // Circles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodeG.append("circle")
      .attr("r", (d: any) => d.data.type === "root" ? 10 : 7)
      .attr("fill", (d: any) => NODE_COLOR[d.data.type] ?? "#9CA3AF")
      .attr("stroke", (d: any) => d.data.type === "suggested" ? NODE_COLOR.suggested : "white")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d: any) => d.data.type === "suggested" ? "3 2" : "none")
      .attr("opacity", (d: any) => d.data.type === "suggested" ? 0.7 : 1)
      .style("filter", (d: any) =>
        d.data.type === "root" ? `drop-shadow(0 0 4px ${NODE_COLOR.root}88)` : "none"
      );

    // Star / check symbol for starred / lgs_correct
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (nodeG.filter((d: any) => d.data.type === "starred" || d.data.type === "lgs_correct") as any)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "8")
      .attr("fill", "white")
      .text((d: any) => d.data.type === "starred" ? "★" : "✓");

    // Labels
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodeG.append("text")
      .attr("y", (d: any) => (d.data.type === "root" ? 18 : 14))
      .attr("text-anchor", "middle")
      .attr("font-size", "9.5")
      .attr("font-family", "system-ui, sans-serif")
      .attr("font-weight", "600")
      .attr("fill", "rgba(15,17,21,0.75)")
      .text((d: any) => shorten(d.data.content));
  }, [nodes, promoteSuggested, resizeTick, onNodeClick]);

  const openedCount  = nodes.filter((n) => n.type !== "suggested").length;
  const suggestCount = nodes.filter((n) => n.type === "suggested").length;

  return (
    <div className="bg-white border border-ink-200 rounded-2xl shadow-card p-4 flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
            <Network className="w-3.5 h-3.5 text-brand-600" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display font-bold text-[13px] text-ink-900 tracking-tight">Merak Ağacı</h3>
            <div className="text-[10px] text-ink-500 font-medium">
              {openedCount} açık · {suggestCount} öneri
            </div>
          </div>
        </div>
        <button className="text-[11px] text-ink-400 hover:text-ink-700 flex items-center gap-1">
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>

      {/* SVG canvas — fills remaining space */}
      <div className="relative flex-1 min-h-[140px] rounded-xl border border-ink-200 bg-paper dotgrid overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block" />

        {/* Legend */}
        <div className="absolute top-1.5 right-1.5 flex flex-col gap-0.5">
          {[
            { color: NODE_COLOR.root,        label: "Başlangıç" },
            { color: NODE_COLOR.opened,       label: "Keşfedilen" },
            { color: NODE_COLOR.suggested,    label: "Öneri" },
            { color: NODE_COLOR.lgs_correct,  label: "LGS ✓" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1 bg-white/80 rounded px-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: l.color }} />
              <span className="text-[8.5px] text-ink-500 font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {suggestCount > 0 && (
        <p className="mt-1.5 text-[9.5px] text-ink-400 text-center shrink-0">
          💡 Sarı düğüme tıkla → sohbete at
        </p>
      )}
    </div>
  );
}
