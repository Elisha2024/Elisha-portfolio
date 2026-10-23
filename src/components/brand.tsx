import brand from '@/content/brand.json';

// One path-based geometry source drives the component and every exported asset.
// Callers provide stable IDs so header, menu, and footer gradients never collide.
export function BrandMark({ id, reveal = false }: { id: string; reveal?: boolean }) {
  const gradientId = `${id}-gradient`;
  return <svg className="brand-mark" width="80" height="64" viewBox={brand.viewBox} fill="none" aria-hidden="true" focusable="false" data-reveal={reveal ? 'true' : undefined}>
    <defs><linearGradient id={gradientId} x1="8" y1="12" x2="72" y2="48" gradientUnits="userSpaceOnUse"><stop className="brand-gradient-start" stopColor={brand.colors.cyan}/><stop className="brand-gradient-end" offset="1" stopColor={brand.colors.blue}/></linearGradient></defs>
    <g stroke={`url(#${gradientId})`} strokeWidth={brand.strokeWidth} strokeLinecap="round" strokeLinejoin="round">{brand.paths.map((d, index) => <path className="brand-stroke" pathLength="1" d={d} key={index}/>)}</g>
    {reveal && <>
      <defs>
        <mask id={`${id}-light-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="64">
          <g stroke="white" strokeWidth={brand.strokeWidth} strokeLinecap="round" strokeLinejoin="round">{brand.paths.map((d, index) => <path d={d} key={index}/>)}</g>
        </mask>
        <linearGradient id={`${id}-light`}>
          <stop stopColor="#ffffff" stopOpacity="0"/>
          <stop offset=".5" stopColor="#e5fbff" stopOpacity=".9"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g mask={`url(#${id}-light-mask)`}>
        <rect className="brand-light" x="-32" y="0" width="32" height="64" fill={`url(#${id}-light)`}/>
      </g>
    </>}
  </svg>;
}
