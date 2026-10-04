import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sagar Mahajan | AI Engineer & Full-Stack Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          border: "2px solid #2a2822",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "550px",
            height: "550px",
            borderRadius: "550px",
            background: "radial-gradient(circle, rgba(193,99,59,0.3) 0%, rgba(11,10,9,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#141311",
              border: "1.5px solid #c1633b",
              color: "#c1633b",
              fontSize: "20px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c1633b",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            AI ENGINEER · MCP & AGENTIC SYSTEMS · FULL-STACK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#f6f4ee",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Sagar Mahajan
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#c1633b",
              lineHeight: 1.25,
              fontWeight: 500,
            }}
          >
            Engineering Autonomous Systems & Production AI
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#a8a29e",
              lineHeight: 1.5,
              maxWidth: "880px",
            }}
          >
            Architecting Agentic AI pipelines, MCP safety guardrails, and full-stack platforms that verify themselves.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2a2822",
            paddingTop: "20px",
          }}
        >
          <div style={{ fontSize: "15px", color: "#f6f4ee", fontFamily: "monospace" }}>
            profile-cyan-eight-22.vercel.app
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#a8a29e",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            12 Production Systems · Hyderabad, India
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}