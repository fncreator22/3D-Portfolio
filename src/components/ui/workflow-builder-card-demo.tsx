"use client";

import React from "react";
import { Code, Share2, Zap } from "lucide-react";
import { WorkflowBuilderCard } from "@/components/ui/workflow-builder-card";

export default function WorkflowBuilderCardDemo() {
  const cardData = {
    imageUrl: "/images/projects/vaniflow-voice-ai.png",
    status: "Active" as const,
    lastUpdated: "Production Ready",
    title: "VaniFlow Multilingual Voice AI",
    description: "Ultra-low latency streaming voice agent pipeline with sub-85ms turn-taking.",
    tags: ["Voice AI", "WebSockets", "FastAPI", "Deepgram"],
    users: [
      { fallback: "SM", src: "" },
      { fallback: "AI", src: "" },
      { fallback: "+2", src: "" },
    ],
    actions: [
      { Icon: Zap, bgColor: "bg-accent text-bg" },
      { Icon: Code, bgColor: "bg-line text-stone-200" },
      { Icon: Share2, bgColor: "bg-cool text-paper" },
    ],
  };

  return (
    <div className="flex w-full items-center justify-center bg-bg p-4">
      <WorkflowBuilderCard {...cardData} />
    </div>
  );
}
