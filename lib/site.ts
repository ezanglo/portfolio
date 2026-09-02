export const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ezraanglo.com"

export const SITE_NAME = "Ezra Anglo | Portfolio"

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
