import { doctorProfiles } from "@/content/doctor-profiles";
import { services } from "@/lib/site";

const doctorsByService: Record<string, string[]> = {
  "gynecologist-consultation": ["shendera-anastasia-mikhailovna", "pyatnytska-tetyana-volodymyrivna"],
  "ultrasound-diagnostics": ["shendera-anastasia-mikhailovna"],
  "gynecological-oncology": ["pyatnytska-tetyana-volodymyrivna"],
};

export function doctorsForService(slug: string) {
  return (doctorsByService[slug] ?? []).map((doctorSlug) => ({ slug: doctorSlug, ...doctorProfiles[doctorSlug] }));
}

export function servicesForDoctor(slug: string) {
  return services.filter((service) => doctorsByService[service.slug]?.includes(slug));
}
