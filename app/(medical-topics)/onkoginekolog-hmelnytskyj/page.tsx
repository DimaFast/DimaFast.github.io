import { ContentPage } from "@/components/content-page";
import { details } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const slug = "onkoginekolog-hmelnytskyj";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <ContentPage page={details[slug]} />;
}
