import { Consultation } from "@/components/consultation";
import { Services } from "@/components/services";
import { pageMetadata } from "@/lib/seo";

const slug = "services";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <><Services /><Consultation /></>;
}
