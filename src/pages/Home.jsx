import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Portfolio from '../components/sections/Portfolio'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <Services/>
        <Portfolio/>
        <Contact/>
      </main>
      <Footer/>
    </>
  )
}
