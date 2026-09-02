export default function PortraitBand({ portraitUrl }: { portraitUrl: string | null }) {
  return (
    <div
      className="mt-10 aspect-[3/2] w-full bg-view-surface-2 sm:aspect-[3/1]"
      style={
        portraitUrl
          ? { backgroundImage: `url(${portraitUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {!portraitUrl && (
        <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-view-fg-subtle">
          Portrait / Workspace Photo
        </div>
      )}
    </div>
  );
}
