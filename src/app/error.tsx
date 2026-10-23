'use client';
export default function Error({reset}:{reset:()=>void}){return <div className="wrap page-intro"><h1>Something went wrong.</h1><p>Please try loading this page again.</p><button className="button" onClick={reset}>Try again</button></div>}
