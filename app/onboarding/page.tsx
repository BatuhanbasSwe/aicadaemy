"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Onboarding kaldırıldı — yeni akış /register
export default function OnboardingRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/register");
  }, [router]);
  return null;
}
