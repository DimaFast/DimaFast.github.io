'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Brand } from '@/components/brand'
import { navigation, site, socials } from '@/lib/clinic'
import styles from './header.module.css'

export function Header() {
  const pathname = usePathname()
  const [menuPath, setMenuPath] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const menuOpen = pathname === menuPath
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function updateHeader() {
      setScrolled(window.scrollY > 120)
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  function closeMenu(restoreFocus: boolean) {
    setMenuPath('')
    if (restoreFocus) menuButton.current?.focus()
  }

  return (
    <>
      <header
        className={scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) closeMenu(true)
        }}
      >
        <div className={styles.topBar} inert={scrolled}>
          <div className={`wrap ${styles.topBarInner}`}>
            <a href={`tel:${site.telephone}`}>
              <Image src="/media/phone.webp" alt="" width={12} height={12} /> {site.phone}
            </a>
            <a href={socials[3].href} aria-label="Instagram">
              <Image src="/media/instagram.webp" alt="" width={16} height={16} />
            </a>
          </div>
        </div>
        <div className={`wrap ${styles.navigation}`}>
          <Brand className={styles.headerBrand} />
          <button
            ref={menuButton}
            className={styles.menuToggle}
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuPath(menuOpen ? '' : pathname)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="visually-hidden">{menuOpen ? 'Закрити меню' : 'Відкрити меню'}</span>
          </button>
          <nav
            id="primary-navigation"
            aria-label="Основне меню"
            className={menuOpen ? `${styles.navLinks} ${styles.navOpen}` : styles.navLinks}
          >
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => closeMenu(menuOpen && pathname === href)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {scrolled && (
        <a className={styles.backTop} href="#top" aria-label="Вгору">
          ⌃
        </a>
      )}
    </>
  )
}
