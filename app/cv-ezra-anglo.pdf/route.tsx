import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/components/resume/resume-document";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="cv-ezra-anglo.pdf"',
    },
  });
}
