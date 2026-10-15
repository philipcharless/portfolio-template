/**
 * Project card icons, in the Its Hover idiom (see RailIcons.tsx for the
 * provenance: Tabler stroke paths split into named parts, each part given its
 * own hover move, driven here by CSS off `.pcard:hover` instead of a runtime).
 */
type IconProps = { size?: number }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

/** AI: the big spark breathes, the small spark orbits in. */
export function SparkIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <path
        className="picon__spark"
        d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zM16 6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z"
      />
      <path className="picon__spark-big" d="M9 18a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
    </svg>
  )
}
