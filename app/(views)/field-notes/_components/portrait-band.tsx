import Image from "next/image";

export default function PortraitBand({ portraitUrl, name }: { portraitUrl: string | null; name: string }) {
  return (
    <div className="relative mt-10 aspect-[3/2] w-full bg-view-surface-2 sm:aspect-[3/1]">
      {portraitUrl ? (
        <Image
          src={portraitUrl}
          alt={`${name} — workspace photo`}
          fill
          sizes="100vw"
          priority
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-view-fg-subtle">
          Portrait / Workspace Photo
        </div>
      )}
    </div>
  );
}
