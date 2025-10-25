import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/app/_provider/ReactQueryProvider";
import Script from "next/script";
import { SsgoiProvider, ThemeProvider } from "@/app/_provider";
import { GetSession } from "@/app/_components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YWMN7HVGNH"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YWMN7HVGNH');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <GetSession />
            <SsgoiProvider>{children}</SsgoiProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
