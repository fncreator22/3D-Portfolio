import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#0b0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1633b",
          fontWeight: 700,
          borderRadius: 36,
          border: "6px solid #c1633b",
          fontFamily: "monospace, sans-serif",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}