import Hero from './components/Hero'
import Portfolio from './components/Portfolio'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <main>
        <Hero />
        <Portfolio />
      </main>
    </>
  )
}
