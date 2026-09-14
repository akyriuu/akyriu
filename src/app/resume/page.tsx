import type { Metadata } from "next";
import { ResumeView } from "@/components/resume-view";
import { dictionaries, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${dictionaries.pt.ui.resumeTitle} — ${profile.name}`,
  description: dictionaries.pt.meta.description,
};

export default function ResumePage() {
  return <ResumeView />;
}
