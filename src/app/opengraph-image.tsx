import { ImageResponse } from "next/og";

export const alt = "Ayush Yadav — I build the whole stack, and the agents on top.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card for LinkedIn, Slack, X, etc.
export default function OpengraphImage() {
  const layers = [
    { label: "04 agents", color: "#A58BFF" },
    { label: "03 interface", color: "#C8FF3E" },
    { label: "02 api", color: "#EEEEEA" },
    { label: "01 data", color: "#EEEEEA" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: 64,
          background: "#09090A",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          color: "#EEEEEA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
            <span style={{ background: "#C8FF3E", color: "#09090A", padding: "4px 10px", borderRadius: 8, fontWeight: 800 }}>AY/</span>
            <span style={{ color: "#9A9AA2" }}>ayush yadav · full-stack software engineer</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
            <span>I build the</span>
            <span>whole stack —</span>
            <span style={{ display: "flex", gap: 22 }}>
              and the <span style={{ background: "#C8FF3E", color: "#09090A", padding: "0 10px" }}>agents</span>
            </span>
            <span>on top.</span>
          </div>
          <span style={{ fontSize: 22, color: "#9A9AA2" }}>React · Next.js · FastAPI · PostgreSQL · LangGraph · MCP</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          {layers.map((l, i) => (
            <div
              key={l.label}
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: 250,
                height: 90,
                marginLeft: i * 24,
                border: `2px solid ${l.color}`,
                borderRadius: 16,
                padding: 12,
                fontSize: 20,
                color: l.color,
                background: "rgba(255,255,255,0.03)",
                transform: "skewX(-24deg)",
              }}
            >
              {l.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
