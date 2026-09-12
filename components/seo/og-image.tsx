export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png" as const;

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

export function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
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
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          marginTop: 24,
          maxWidth: 1000,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      {description ? (
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 24,
            color: "#c7cdd6",
            maxWidth: 960,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
