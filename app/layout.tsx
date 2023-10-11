import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { ModeToggle } from '@/components/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ezra Anglo | Personal Portfolio',
  description: 'Ezra is a full-stack developer with 8 years of experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-background text-foreground relative h-[5000px] pt-14 sm:pt-36"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <div className={cn(
            "bg-[#fbe2e3] dark:bg-[#946263]",
            "absolute -top-[6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] "
          )}></div>
          <div className={cn(
            "bg-[#dbd7fb] dark:bg-[#676394]",
            "absolute -top-[1rem] -z-10 -left-[35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:-left-[33rem] lg:-left-[28rem] xl:-left-[15rem] 2xl:-left-[5rem]"
          )}></div> */}
          <Header />
          {children}
          <div className="fixed bottom-0 right-0 p-5">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
