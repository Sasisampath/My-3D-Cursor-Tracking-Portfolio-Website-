import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, MoveHorizontal, Scan, X } from 'lucide-react'
import CursorTrackedAvatar from './CursorTrackedAvatar'

const links = [
  ['#work', 'Work'],
  ['#experiments', 'Experiments'],
  ['#about', 'About'],
  ['#contact', 'Contact'],
]

function Header() {
  const [open, setOpen] = useState(false)

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape' || !open) return
    setOpen(false)
    document.getElementById('menu-toggle')?.focus()
  }

  return (
    <header className="site-header frame" onKeyDown={onKeyDown}>
      <a href="#top" className="brand" aria-label="Sasi, home">
        <img src="/mark.svg" width="36" height="36" alt="" />
        <span>Sasi<span className="brand-dot">.</span></span>
      </a>
      <button
        type="button"
        id="menu-toggle"
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <span className="header-index mono"><span /> Independent portfolio</span>
    </header>
  )
}

function ReelPreview() {
  const [active, setActive] = useState(() => new URLSearchParams(location.search).get('reel') === '1')

  useEffect(() => {
    function toggle(event: KeyboardEvent) {
      if (event.altKey && event.code === 'KeyR' && !event.repeat) {
        event.preventDefault()
        setActive((value) => !value)
      }
    }

    window.addEventListener('keydown', toggle)
    return () => window.removeEventListener('keydown', toggle)
  }, [])

  return (
    <>
      {active && <div className="reel-shade" aria-hidden="true"><div className="reel-frame"><span>9:16 · CENTER CROP</span></div></div>}
      <button
        className="reel-toggle mono"
        type="button"
        aria-pressed={active}
        aria-keyshortcuts="Alt+R"
        title="Toggle 9:16 center crop (Alt+R)"
        onClick={() => setActive(!active)}
      >
        <Scan size={15} /> 9:16 guide
      </button>
    </>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <CursorTrackedAvatar />
      <Header />
      <div className="hero-intro">
        <p className="hero-label mono"><span /> HI, I’M</p>
        <h1 id="hero-title">Sasi<span>.</span></h1>
        <p className="hero-role">Product Designer &amp; Builder</p>
        <p className="hero-description">I turn everyday observations into thoughtful product experiences.</p>
        <div className="hero-actions flex flex-wrap items-center">
          <a className="button button-primary" href="#work">Explore My Work <ArrowDown size={15} /></a>
          <a className="button button-text" href="#contact">Let’s Talk <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <aside className="portrait-note" aria-label="Portrait interaction">
        <div className="portrait-marker"><MoveHorizontal size={19} strokeWidth={1.4} /></div>
        <div>
          <p className="mono portrait-id">01 / The portrait</p>
          <p className="portrait-instruction">Move your cursor.<br />I’ll follow along.</p>
        </div>
      </aside>
      <div className="hero-bottom frame mono">
        <a href="#work"><span className="scroll-circle"><ArrowDown size={14} /></span> Scroll to explore</a>
        <span className="hero-edition">DESIGN <i /> INTERACTION <i /> BUILD</span>
      </div>
      {import.meta.env.DEV && <ReelPreview />}
    </section>
  )
}
