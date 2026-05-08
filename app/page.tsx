import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import { PrismaHero } from '@/components/ui/prisma-hero'
import WorkSection from '@/components/WorkSection'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PrismaHero />
      <WorkSection />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
