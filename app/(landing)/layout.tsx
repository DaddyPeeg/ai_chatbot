import { Header } from '@/components/newheader'

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="relative flex flex-col bg-background">
      <Header />
      {children}
    </div>
  )
}
