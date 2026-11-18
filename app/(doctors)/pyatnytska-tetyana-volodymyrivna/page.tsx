import { DoctorProfilePage } from "@/components/doctor-profile";
import { doctorProfiles } from "@/content/doctor-profiles";
import { pageMetadata } from "@/lib/seo";

const slug = "pyatnytska-tetyana-volodymyrivna";

export const metadata = pageMetadata(slug);

export default function Page() {
  return <DoctorProfilePage profile={doctorProfiles[slug]} slug={slug} />;
}
