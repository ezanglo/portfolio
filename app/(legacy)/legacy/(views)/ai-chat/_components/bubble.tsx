export default function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[72%] whitespace-pre-wrap rounded-[14px] px-[17px] py-[13px] text-[15px] leading-[1.55] max-[768px]:max-w-[88%] ${
          isUser ? "bg-view-accent text-view-accent-fg" : "bg-view-surface-2 text-view-fg"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
