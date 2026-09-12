export default function BlockworkFooter({ copyrightText }: { copyrightText: string }) {
  return (
    <footer className="border-t-[3px] border-view-fg px-6 py-8 text-center text-[13px] font-bold uppercase text-view-fg-subtle sm:px-12">
      {copyrightText}
    </footer>
  );
}
