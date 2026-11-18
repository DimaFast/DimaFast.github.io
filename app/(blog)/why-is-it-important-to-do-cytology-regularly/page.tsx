import { ContentPage } from "@/components/content-page";
import { details } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const slug = "why-is-it-important-to-do-cytology-regularly";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <ContentPage page={details[slug]} />;
}
