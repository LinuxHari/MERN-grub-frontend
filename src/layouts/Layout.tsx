import Hero from "../components/Hero"
import Header from "../components/Header"
import Footer from "@/components/Footer"

type LayoutProps = {
  children: React.ReactNode
  showHero?: boolean
}

const Layout = ({ children, showHero = false }: LayoutProps) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer/>
    </main>
  )
}

export default Layout
