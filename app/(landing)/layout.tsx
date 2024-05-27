import { Header } from '@/components/newheader'

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  return (
    // h-[calc(100vh_-_theme(spacing.16))]
    <div className="relative flex flex-col bg-background">
      <Header />
      {children}
    </div>
  )
}
