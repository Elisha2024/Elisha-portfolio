import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = process.cwd();
const brand = JSON.parse(await readFile(path.join(root, 'src/content/brand.json'), 'utf8'));
const output = path.join(root, 'public/brand');
const studies = path.join(root, 'design/brand/concept-2');
await Promise.all([mkdir(output, { recursive: true }), mkdir(studies, { recursive: true })]);
function symbol(paths = brand.paths, { color, dark = false, viewBox = brand.viewBox, size = 80, id = 'em-palette' } = {}) {
  const palette = dark ? [brand.colors.darkCyan, brand.colors.darkBlue] : [brand.colors.cyan, brand.colors.blue];
  const defs = color ? '' : `<defs><linearGradient id="${id}" x1="8" y1="12" x2="72" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="${palette[1]}"/></linearGradient></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none">${defs}<g stroke="${color ?? `url(#${id})`}" stroke-width="${brand.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${paths.map(d => `<path d="${d}"/>`).join('')}</g></svg>`;
}
const assets = {
  'em-primary.svg': symbol(),
  'em-on-dark.svg': symbol(brand.paths, { dark: true }),
  'em-solid-blue.svg': symbol(brand.paths, { color: brand.colors.blue }),
  'em-white.svg': symbol(brand.paths, { color: brand.colors.white }),
  'em-dark-monochrome.svg': symbol(brand.paths, { color: brand.colors.ink }),
};
await Promise.all(Object.entries(assets).map(([name, svg]) => writeFile(path.join(output, name), `${svg}\n`)));
const favicon = symbol(brand.paths, { color: brand.colors.blue, viewBox: '4 7 72 50', size: 32 });
await writeFile(path.join(root, 'public/icon.svg'), `${favicon}\n`);
for (const size of [16, 32]) {
  const svg = symbol(brand.paths, { color: brand.colors.blue, viewBox: '4 7 72 50', size });
  await writeFile(path.join(output, `em-favicon-${size}.svg`), `${svg}\n`);
  await sharp(Buffer.from(svg)).png().toFile(path.join(root, `public/favicon-${size}x${size}.png`));
}
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="#f8faff"/><svg x="18" y="18" width="144" height="144" viewBox="0 0 80 64" fill="none"><g stroke="${brand.colors.blue}" stroke-width="${brand.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${brand.paths.map(d => `<path d="${d}"/>`).join('')}</g></svg></svg>`;
await sharp(Buffer.from(apple)).png().toFile(path.join(root, 'public/apple-touch-icon.png'));
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${brand.colors.navy}"/><svg x="340" y="107" width="520" height="416" viewBox="0 0 80 64" fill="none"><defs><linearGradient id="social-em" x1="8" y1="12" x2="72" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="${brand.colors.darkCyan}"/><stop offset="1" stop-color="${brand.colors.darkBlue}"/></linearGradient></defs><g stroke="url(#social-em)" stroke-width="${brand.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${brand.paths.map(d => `<path d="${d}"/>`).join('')}</g></svg></svg>`;
await writeFile(path.join(root, 'public/opengraph.svg'), `${social}\n`);
await sharp(Buffer.from(social)).png().toFile(path.join(root, 'public/opengraph.png'));
const variants = [
  { id: 'a', name: 'Continuous ribbon', paths: brand.paths, note: 'Shared left spine keeps the E correctly oriented; open middle clearance and a controlled M valley.' },
  { id: 'b', name: 'Open strokes', paths: ['M8 12H26C30 12 33 14.2 35.4 17.24L48 33.2C49.5 35.1 52.5 35.1 54 33.2L64.42 20C67.42 16.2 72 8 72 18V52', 'M8 52H27', 'M8 32H23'], note: 'Three floating E strokes; more negative space, less immediate letter recognition in monochrome.' },
  { id: 'c', name: 'Shared bridge', paths: ['M27 52H8V12H26C30 12 33 14 35 17L47.8 36C49.5 38.4 52.5 38.4 54.2 36L64.4 20C67.4 15.3 72 8 72 18V52', 'M34 15.6V52H27', 'M8 32H23'], note: 'Added M support and deeper valley; stronger bridge but a denser left counter at small sizes.' },
];
for (const variant of variants) {
  await writeFile(path.join(studies, `${variant.id}.svg`), symbol(variant.paths));
  await writeFile(path.join(studies, `${variant.id}-dark.svg`), symbol(variant.paths, { dark: true }));
  await writeFile(path.join(studies, `${variant.id}-mono.svg`), symbol(variant.paths, { color: brand.colors.ink }));
}
const samples = (id, suffix = '') => [16, 24, 32, 64].map(size => `<div class="sample"><img src="${id}${suffix}.svg" width="${size}" height="${size}" alt="${size} pixel monogram"/><span>${size}px</span></div>`).join('');
const review = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Concept 2 — geometry review</title><style>*{box-sizing:border-box}body{margin:0;background:#f6f8fc;color:#17283f;font:14px/1.6 Arial,sans-serif;padding:40px}main{max-width:1200px;margin:auto}h1{font-size:28px}p{color:#56657b}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:white;padding:24px;border:1px solid #dce4ef;border-radius:16px}.large{display:block;margin:24px auto}.row{display:flex;align-items:end;justify-content:space-between;gap:12px;min-height:110px;padding:20px 12px;border-radius:10px}.sample{display:flex;align-items:center;flex-direction:column;justify-content:end;gap:12px}.sample span{font-size:11px}.dark{background:#0d1828;color:#dceaff}.mono{border:1px solid #dce4ef;margin-top:12px}.note{font-size:12px;min-height:60px}.assets{margin-top:32px;padding:24px;background:white;border:1px solid #dce4ef;border-radius:16px}.asset-row{display:flex;gap:30px;align-items:center;flex-wrap:wrap}.png{display:flex;gap:24px;align-items:center;padding:20px;background:white}.png.dark{background:#0d1828}.png img{image-rendering:auto}h2{font-size:18px}@media(max-width:800px){body{padding:20px}.grid{grid-template-columns:1fr}}</style></head><body><main><h1>Concept 2 / Minimal &amp; Modern</h1><p>Three geometric refinements of the supplied written brief. Each symbol uses paths only; no letters are rendered using a font. Comparison image pending a supplied reference file.</p><div class="grid">${variants.map(v => `<section class="card"><h2>${v.id.toUpperCase()} / ${v.name}</h2><img class="large" src="${v.id}.svg" width="180" height="144" alt="${v.name} large construction"/><p class="note">${v.note}</p><div class="row">${samples(v.id)}</div><div class="row dark">${samples(v.id, '-dark')}</div><div class="row mono">${samples(v.id, '-mono')}</div></section>`).join('')}</div><section class="assets"><h2>Native PNG favicon exports</h2><div class="png"><img src="../../../public/favicon-16x16.png" width="16" height="16" alt="16 pixel PNG"/><img src="../../../public/favicon-32x32.png" width="32" height="32" alt="32 pixel PNG"/><img src="../../../public/apple-touch-icon.png" width="64" height="64" alt="Apple icon preview"/></div><div class="png dark"><img src="../../../public/favicon-16x16.png" width="16" height="16" alt="16 pixel PNG on navy"/><img src="../../../public/favicon-32x32.png" width="32" height="32" alt="32 pixel PNG on navy"/></div><h2>Final solid and reverse versions</h2><div class="asset-row"><img src="../../../public/brand/em-solid-blue.svg" width="120" height="96" alt="Solid blue"/><img src="../../../public/brand/em-dark-monochrome.svg" width="120" height="96" alt="Monochrome"/><span style="background:#0d1828;padding:16px;border-radius:12px"><img src="../../../public/brand/em-white.svg" width="120" height="96" alt="White"/></span></div></section></main></body></html>`;
await writeFile(path.join(studies, 'review.html'), review);
console.log('Generated five SVG logo variants, favicon SVG/PNG pairs, Apple icon, social image, and native-size review board.');
