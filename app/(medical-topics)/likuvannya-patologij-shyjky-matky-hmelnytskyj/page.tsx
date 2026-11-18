import { ContentPage } from "@/components/content-page";
import { details } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const slug = "likuvannya-patologij-shyjky-matky-hmelnytskyj";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <ContentPage page={details[slug]} />;
}
