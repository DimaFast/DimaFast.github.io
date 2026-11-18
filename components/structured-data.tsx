import { site } from "@/lib/clinic";

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function BreadcrumbData({ section, page }: { section: { label: string; path: string }; page: { label: string; path: string } }) {
  const breadcrumbs = [{ label: "Головна", path: "/" }, section, page];

  return <StructuredData data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ label, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: new URL(path, site.url).href,
    })),
  }} />;
}
