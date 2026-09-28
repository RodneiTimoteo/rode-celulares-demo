import { ImageResponse } from "next/og";
export const alt = "RODE Celulares — Conectando você com o que importa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f4f5f7",
        color: "#17181c",
        padding: "76px 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 580,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 70, height: 70, borderRadius: 18, background: "#17181c", color: "#ff6b00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800 }}>R</div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 800 }}>RODE&nbsp;<span style={{ color: "#ff6b00" }}>Celulares</span></div>
        </div>
        <div
          style={{
            marginTop: 58,
            fontSize: 58,
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          Conectando você com o que importa.
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#66777d" }}>
          Smartphones, acessórios e tecnologia.
        </div>
      </div>
      <div
        style={{
          width: 360,
          height: 360,
          borderRadius: 180,
          background: "#fff0e6",
          border: "2px solid #ff6b00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 190,
            height: 250,
            borderRadius: 28,
            background: "#ffffff",
            boxShadow: "0 24px 60px rgba(23, 24, 28, 0.18)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(8deg)",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700 }}>RODE</div>
          <div
            style={{
              marginTop: 14,
              width: 110,
              height: 4,
              background: "#ff6b00",
            }}
          />
          <div style={{ marginTop: 18, fontSize: 17, color: "#ff6b00" }}>
            TECNOLOGIA
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 14,
          background: "#ff6b00",
        }}
      />
    </div>,
    size,
  );
}
