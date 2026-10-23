import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('out');
async function walk(dir) { const entries = await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat(); }
const files = await walk(root); let links=0;
for (const file of files.filter(f=>f.endsWith('.html'))) {
 const html=await readFile(file,'utf8');
 assert.match(html,/<html[^>]*lang="en"/,file);
 assert.match(html,/<title>.+<\/title>/,file);
 assert.match(html,/<meta name="description" content="[^"]+"/,file);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
  const url=decodeURIComponent(match[1]); if(url.startsWith('//'))continue;
  const target=path.join(root,url); const candidates=[target,path.join(target,'index.html')];
  let exists=false; for(const candidate of candidates)try{if((await stat(candidate)).isFile())exists=true;}catch{}
  assert.ok(exists,`Missing ${url} referenced by ${path.relative(root,file)}`); links++;
 }
}
assert.ok(files.includes(path.join(root,'resume/index.html')));
const resume=await readFile(path.join(root,'resume/index.html'),'utf8');
let pdfExists=false;try{const pdf=await readFile('public/documents/elisha-awiti-matanga-resume.pdf');assert.equal(pdf.subarray(0,5).toString(),'%PDF-');pdfExists=true;}catch(error){if(error.code!=='ENOENT')throw error;}
assert.ok(pdfExists?resume.includes('application/pdf'):resume.includes('Resume document awaiting upload.'));
console.log(`PASS: ${files.filter(f=>f.endsWith('.html')).length} HTML files, ${links} local references, SEO basics, and resume ${pdfExists?'PDF integration':'missing-file fallback'}.`);
