import { NewspaperLayout } from "@/components/newspaper-layout"
import { LinkChecker } from "@/components/link-checker"

export default function SystemStatusPage() {
  return (
    <NewspaperLayout title="SYSTEM STATUS GAZETTE" subtitle="Complete WyoVerse Platform Health Report">
      <div className="newspaper-paragraph">
        Welcome to the WyoVerse System Status Center. Here you can monitor the health and availability of all platform
        features, games, and services. Our team ensures 100% uptime and seamless user experience across the digital
        frontier.
      </div>
      <LinkChecker />
    </NewspaperLayout>
  )
}
