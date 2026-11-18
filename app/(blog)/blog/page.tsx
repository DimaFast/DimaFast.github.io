import { Blog } from "@/components/blog";
import { pageMetadata } from "@/lib/seo";

const slug = "blog";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <Blog standalone />;
}
