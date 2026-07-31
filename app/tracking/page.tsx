import { permanentRedirect } from "next/navigation";

export default function LegacyTrackingPage() {
  permanentRedirect("/suivi");
}
