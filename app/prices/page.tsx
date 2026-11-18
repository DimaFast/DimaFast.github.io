import { Prices } from "@/components/prices";
import { pageMetadata } from "@/lib/seo";

const slug = "prices";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <Prices />;
}
