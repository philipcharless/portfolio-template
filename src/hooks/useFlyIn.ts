import { useLayoutEffect, type RefObject } from 'react'
import { motionReduced } from '@/lib/a11y'

/**
 * Bento fly-in: each tile flies in from the side of the grid it sits on and
 * springs into its slot. Styles live in src/styles/fly-in.css.
 *
 * Play-once rule: a page animates the first time it is shown in this tab's
 * life. The record is this module-level Set, NOT sessionStorage, so a reload
 * (which re-evaluates the module) plays every page again, while navigating
 * back to a page already seen shows it at rest.
 *
 * No flash: the grid is marked `data-fly="pending"` in a layout effect, which
 * runs before the browser paints, so the tiles are hidden from their very
 * first frame until the grid scrolls into view.
 */

const seen = new Set<string>()

/** Distance each tile starts from its slot, at the grid's outer edge. */
const REACH_X = 140
const REACH_Y = 110
const STAGGER_MS = 80
const DURATION_MS = 700

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()

/** The first-load intro holds Home behind `html.is-intro`; wait it out so the
 *  tiles do not fly in under the overlay. */
const introRunning = () => document.documentElement.classList.contains('is-intro')

/** Shortest distance from a point to a rectangle (0 inside it). */
function distanceTo(r: DOMRect, x: number, y: number) {
  const dx = Math.max(r.left - x, 0, x - r.right)
  const dy = Math.max(r.top - y, 0, y - r.bottom)
  return Math.hypot(dx, dy)
}

/**
 * @param ref    the grid element
 * @param page   the play-once key, one per page
 * @param tiles  selector for the tiles, relative to the grid
 */
export function useFlyIn(ref: RefObject<HTMLElement | null>, page: string, tiles: string) {
  useLayoutEffect(() => {
    const grid = ref.current
    if (!grid || seen.has(page) || reduced()) return

    const mark = () => {
      const list = Array.from(grid.querySelectorAll<HTMLElement>(tiles))
      list.forEach((el) => (el.dataset.flyTile = ''))
      return list
    }
    mark()
    grid.dataset.fly = 'pending'

    let io: IntersectionObserver | undefined
    let mo: MutationObserver | undefined
    let timer = 0
    let started = false

    const clear = (list: HTMLElement[]) => {
      delete grid.dataset.fly
      for (const el of list) {
        delete el.dataset.flyTile
        el.style.removeProperty('--fly-x')
        el.style.removeProperty('--fly-y')
        el.style.removeProperty('--fly-delay')
      }
    }

    const run = () => {
      started = true
      seen.add(page)
      const list = mark()

      // Offsets point away from the grid's centre, so a tile on the left
      // edge comes in from the left, one at the top from the top, and a
      // tile in the middle only scales up. Works for any column count.
      const g = grid.getBoundingClientRect()
      const gx = g.left + g.width / 2
      const gy = g.top + g.height / 2
      const clamp = (v: number) => Math.max(-1, Math.min(1, v))

      // Order: nearest the page headline first (row by row from the top for
      // a headline that spans the page), left to right on a tie.
      const headline = grid.closest('section')?.querySelector('h1') ?? document.querySelector('h1')
      const h = headline?.getBoundingClientRect()
      const order = list
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .map((t) => {
          const cx = t.r.left + t.r.width / 2
          const cy = t.r.top + t.r.height / 2
          return { ...t, cx, cy, d: h ? distanceTo(h, cx, cy) : cy - g.top }
        })
        .sort((a, b) => (Math.abs(a.d - b.d) > 8 ? a.d - b.d : a.r.left - b.r.left))

      order.forEach((t, i) => {
        const nx = g.width ? clamp((t.cx - gx) / (g.width / 2)) : 0
        const ny = g.height ? clamp((t.cy - gy) / (g.height / 2)) : 0
        t.el.style.setProperty('--fly-x', `${Math.round(nx * REACH_X)}px`)
        t.el.style.setProperty('--fly-y', `${Math.round(ny * REACH_Y)}px`)
        t.el.style.setProperty('--fly-delay', `${i * STAGGER_MS}ms`)
      })
      grid.dataset.fly = 'run'

      // Once the last tile lands, drop the markers. The animation's fill mode
      // is `backwards`, so this changes nothing on screen; it just hands the
      // tiles back to their own hover transforms.
      timer = window.setTimeout(() => clear(list), DURATION_MS + STAGGER_MS * list.length + 100)
    }

    const watch = () => {
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return
          io?.disconnect()
          run()
        },
        { threshold: 0.15 },
      )
      io.observe(grid)
    }

    if (introRunning()) {
      mo = new MutationObserver(() => {
        if (introRunning()) return
        mo?.disconnect()
        watch()
      })
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    } else {
      watch()
    }

    return () => {
      io?.disconnect()
      mo?.disconnect()
      window.clearTimeout(timer)
      // Unmounted before it ever played (or StrictMode's dev remount): leave
      // nothing hidden, and the next mount starts clean.
      if (!started) clear(Array.from(grid.querySelectorAll<HTMLElement>('[data-fly-tile]')))
    }
  }, [ref, page, tiles])
}
