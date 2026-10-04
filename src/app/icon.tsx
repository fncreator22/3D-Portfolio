import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#0b0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1633b",
          fontWeight: 700,
          borderRadius: "8px",
          border: "1px solid #c1633b",
          fontFamily: "monospace",
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