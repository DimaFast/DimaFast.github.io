import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" id="top">
      <body>
        <a className="skip-link" href="#main">До основного вмісту</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
