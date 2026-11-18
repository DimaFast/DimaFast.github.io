import { Consultation } from "@/components/consultation";
import { Doctors } from "@/components/doctors";
import { pageMetadata } from "@/lib/seo";

const slug = "doctors";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <><Doctors standalone /><Consultation /></>;
}
