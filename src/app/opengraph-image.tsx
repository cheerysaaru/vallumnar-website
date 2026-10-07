import { ImageResponse } from "next/og";

export const alt = "Vallumnar — technology that moves business forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #eff6ff 0%, #fff 62%, #e0f2fe 100%)",
          color: "#0f172a",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", maxWidth: "760px", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#1d4ed8", fontSize: 30, fontWeight: 700 }}>
            <div style={{ display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", borderRadius: 17, background: "#1d4ed8", color: "#fff" }}>V</div>
            vallumnar
          </div>
          <div style={{ marginTop: 62, fontSize: 64, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-2px" }}>
            Technology that moves business forward.
          </div>
          <div style={{ marginTop: 28, color: "#475569", fontSize: 26 }}>
            Thoughtful software, products and digital experiences.
          </div>
        </div>
        <div style={{ display: "flex", width: 190, height: 190, alignItems: "center", justifyContent: "center", border: "2px solid #bfdbfe", borderRadius: 60, background: "#fff", color: "#1d4ed8", fontSize: 92, fontWeight: 600, boxShadow: "0 18px 60px rgba(29,78,216,.12)" }}>
          V
        </div>
      </div>
    ),
    { ...size },
  );
}
