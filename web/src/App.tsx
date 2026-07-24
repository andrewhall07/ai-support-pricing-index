import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Snapshot } from '@/components/sections/Snapshot'
import { Methodology } from '@/components/sections/Methodology'
import { Comparison } from '@/components/sections/Comparison'
import { Tiers } from '@/components/sections/Tiers'
import { Independence } from '@/components/sections/Independence'
import { Calculator } from '@/components/sections/Calculator'
import { LicenseSection } from '@/components/sections/License'

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Snapshot />
        <Methodology />
        <Comparison />
        <Tiers />
        <Independence />
        <Calculator />
        <LicenseSection />
      </main>
      <Footer />
    </div>
  )
}
