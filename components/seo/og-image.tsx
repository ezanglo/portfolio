export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png" as const;

export function renderOgImage(identity: { name: string; role: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0a 0%, #14181f 100%)",
        padding: "80px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8b93a3",
        }}
      >
        Portfolio
      </div>
      <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 24 }}>{identity.name}</div>
      <div style={{ display: "flex", fontSize: 36, marginTop: 20, color: "#c7cdd6" }}>{identity.role}</div>
    </div>
  );
}
