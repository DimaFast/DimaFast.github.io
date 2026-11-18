import { Contacts } from "@/components/contacts";
import { pageMetadata } from "@/lib/seo";

const slug = "contacts";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <Contacts standalone />;
}
