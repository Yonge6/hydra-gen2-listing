import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CaretLeft, CaretRight, DownloadSimple, Phone, Play, X } from '@phosphor-icons/react';

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const video = (id, title, channel, tag) => ({ id, title, channel, tag, cover: `hydra-video-${id}.jpg` });
export const hydraFilm = video('vf5KO_kGgmU', 'How We Built The Fast & Furious Supra Interior (And How We Do It Now)', 'OneLaser', 'HYDRA 16 GEN2');
const pottery = video('Fqtlsk_NsKM', "Is the OneLaser Hydra 13 Worth It? A Pottery Owner’s Honest Review", 'OneLaser', 'HYDRA 13 · OWNER STORY');
const maps = video('HdP62cQVzs0', 'The Machine Behind His Best-Selling Maps', 'OneLaser', 'HYDRA 16 GEN1 · OWNER STORY');
const controls = video('dYYZXY_FHXc', 'OneLaser Hydra | Touchscreen Interface Tutorial', 'OneLaser', 'HYDRA SERIES · TUTORIAL');
const cutTest = video('ZQ_VhgOepXE', 'Which is Better For Cutting? RF vs Glass Tube', 'Wrico Goods', 'HYDRA 9 · CUT TEST');
const reviewers = [
  video('y0YUu-4rx7A', 'Should You Get an Industrial Size Laser?', 'Make or Break Shop', 'HYDRA SERIES · HANDS-ON'),
  video('xgY6aEGvvQQ', 'ALL NEW Hydra 9 CO₂ Laser — Unboxing & Features Walkthrough', 'Wrico Goods', 'HYDRA 9 · WALKTHROUGH'),
  cutTest,
  controls,
];

export function VideoCover({ item, onPlay, className = '' }) {
  return <button className={`youtube-cover ${className}`} onClick={() => onPlay(item)} aria-label={`Play ${item.title} by ${item.channel}`}>
    <img src={asset(item.cover)} alt="" width="1280" height="720" loading="lazy"/>
    <span className="youtube-cover__play" aria-hidden="true"><Play size={26} weight="fill"/></span>
    <i>{item.tag}</i>
  </button>;
}

export function HydraFilm({ onPlay }) {
  return <section className="official-film" id="official-film" aria-labelledby="hydra-film-title">
    <header className="official-film__header"><span className="eyebrow">OFFICIAL HYDRA GEN2 FILM</span><h2 id="hydra-film-title">Inside a Hydra Gen2 workshop.</h2><p>Meet Revo Reeves of Stitchcraft Interiors and see how the Hydra 16 Gen2 fits into his custom automotive interior work today.</p></header>
    <VideoCover item={hydraFilm} onPlay={onPlay}/>
  </section>;
}

export function HydraSpotlight({ onPlay }) {
  return <section className="tv-proof" aria-labelledby="hydra-spotlight-title">
    <div className="tv-proof__copy"><span className="eyebrow">A MAKER’S PERSPECTIVE</span><h2 id="hydra-spotlight-title">From a creative idea to a working business.</h2><p>Heather Dorian of The Stamp House shares how a Hydra 13 became part of her pottery-tool production. See the process through an owner’s eyes.</p><div className="tv-proof__signals"><span>OneLaser owner story</span><span>Hydra series</span></div><p className="h-footnote">The source does not specify the machine generation. This is a workflow reference, not a Gen2 performance test.</p></div>
    <VideoCover item={pottery} onPlay={onPlay} className="tv-proof__media"/>
  </section>;
}

export function HydraVideoRail({ onPlay, owners = false }) {
  const rail = useRef(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const items = owners ? [hydraFilm, pottery, maps] : reviewers;
  const title = owners ? 'Real shops. Real Hydra stories.' : 'See the machine through a maker’s eyes.';
  function update() {
    const el = rail.current;
    if (el) setPosition({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }
  useEffect(() => { update(); const observer = new ResizeObserver(update); observer.observe(rail.current); return () => observer.disconnect(); }, []);
  function scroll(direction) {
    const el = rail.current;
    const distance = (el?.querySelector('button')?.getBoundingClientRect().width || 320) + 18;
    el?.scrollBy({ left: direction * distance, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  return <section className={`review-proof ${owners ? '' : 'authority-proof'}`} id={owners ? 'reviews' : 'creator-videos'} aria-labelledby={owners ? 'owner-video-title' : 'creator-video-title'}>
    <div className="review-proof__header"><div className="section-heading section-heading--stack"><span className="eyebrow">{owners ? 'CUSTOMER WORKSHOPS' : 'CREATOR WALKTHROUGHS & TESTS'}</span><h2 id={owners ? 'owner-video-title' : 'creator-video-title'}>{title}</h2><p>{owners ? 'Explore automotive interiors, pottery tools and engraved maps in stories published by OneLaser.' : 'Look closer at the Hydra platform, from workshop setup to the difference between RF and glass-tube cutting.'}</p></div><div className="review-proof__controls" aria-label={`Browse ${owners ? 'owner' : 'creator'} videos`}><button aria-label={`Previous ${owners ? 'owner' : 'creator'} video`} onClick={() => scroll(-1)} disabled={position.start}><CaretLeft size={22}/></button><button aria-label={`Next ${owners ? 'owner' : 'creator'} video`} onClick={() => scroll(1)} disabled={position.end}><CaretRight size={22}/></button></div></div>
    <div className="review-proof__rail" ref={rail} onScroll={update} role="region" aria-label={`${owners ? 'Owner' : 'Creator'} video gallery`} tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); scroll(e.key === 'ArrowRight' ? 1 : -1); } }}>
      {items.map((item, i) => <button key={item.id} className="review-video-card" onClick={() => onPlay(item)} aria-label={`Play ${item.title} by ${item.channel}`}><span className="review-video-card__media"><img src={asset(item.cover)} alt="" width="1280" height="720" loading="lazy"/><span aria-hidden="true"><Play size={22} weight="fill"/></span><i>{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</i></span><span className="review-video-card__copy"><small>{item.tag}</small><strong>{item.title}</strong><span>{item.channel}</span></span></button>)}
    </div><p className="h-video-disclaimer">{owners ? 'Model generations are labeled where confirmed. Individual owner experiences are not guaranteed production outcomes.' : 'Hydra series videos include earlier hardware and configurations. Refer to the Gen2 specifications below for current performance. Creator content may include sponsorships or affiliate links.'}</p>
  </section>;
}

export function HydraComparison({ onPlay }) {
  const rows = [['RF source', '70W RF', '38W RF'], ['Glass DC source', '—', '100W / 130W / 150W'], ['Available models', '7 · 9 · 13 · 16', '9 · 13 · 16'], ['Cooling', 'Air-cooled RF', 'Air-cooled RF + water-cooled DC'], ['Workflow fit', 'Dedicated RF engraving & production', 'RF detail + glass-tube cutting']];
  return <>
    <section className="generation-comparison" id="compare"><div className="generation-comparison__inner"><header className="generation-comparison__header"><span className="eyebrow">PRO & HYBRID, SIDE BY SIDE</span><h2>One platform. Two ways to produce.</h2><p>Match the laser source to the jobs you make most.</p></header><div className="generation-comparison__table-wrap"><table className="generation-comparison__table"><caption className="sr-only">Hydra Gen2 Pro and Hybrid laser configurations</caption><colgroup><col className="generation-comparison__feature-column"/><col className="generation-comparison__gen2-column"/><col className="generation-comparison__gen1-column"/></colgroup><thead><tr><th scope="col">Configuration</th><th scope="col" className="generation-comparison__gen2-heading">Hydra Pro Gen2</th><th scope="col" className="generation-comparison__gen1-heading">Hydra Hybrid Gen2</th></tr></thead><tbody>{rows.map(([label, pro, hybrid]) => <tr key={label}><th scope="row">{label}</th><td className="generation-comparison__gen2" data-label="Pro">{pro}</td><td className="generation-comparison__gen1" data-label="Hybrid">{hybrid}</td></tr>)}</tbody></table></div></div></section>
    <section className="sales-video sales-video--competitor"><VideoCover item={cutTest} onPlay={onPlay}/><div className="sales-video__copy"><span className="eyebrow">RF & GLASS-TUBE CUTTING</span><h2>See the process.<br/>Understand the choice.</h2><p>Wrico Goods compares RF and glass-tube cutting on a Hydra 9. Watch how each source behaves, then discuss your materials and workload with OneLaser.</p><div className="sales-video__metrics"><span><strong>RF source</strong>Fine engraving & versatile processing</span><span><strong>Glass DC source</strong>Dedicated CO₂ cutting power</span></div><p className="h-footnote">Hydra series reference. The tested configuration is not a Gen2 benchmark; cutting results depend on material, source power and settings.</p></div></section>
  </>;
}

export function HydraDecisionPaths() {
  return <>
    <section className="decision-paths" id="next-step"><div className="decision-paths__heading"><span className="eyebrow">YOUR NEXT STEP</span><h2>Choose the next step that helps you decide.</h2><p>See a machine live, speak with an engineer, or review the complete Hydra Gen2 specifications.</p></div><div className="decision-paths__grid">{[
      [Play, 'Find a live demo', 'Meet a demo host and ask about model availability and the work you want to make.', 'Find a demo host', 'https://www.1laser.com/pages/find-demo-host'],
      [Phone, 'Talk to an engineer', 'Match your materials, job sizes, workspace and optional accessories to the right configuration.', 'Book a free consultation', 'https://www.1laser.com/products/sales-consultation-call'],
      [DownloadSimple, 'Get the Hydra Gen2 brochure', 'Keep the model range, source options and technical specifications close at hand.', 'Download brochure', `${import.meta.env.BASE_URL}downloads/onelaser-hydra-gen2-brochure.pdf`],
    ].map(([Icon, title, copy, action, href]) => <a key={title} className="decision-path" href={href} target="_blank" rel="noreferrer"><span><Icon size={22}/></span><strong>{title}</strong><p>{copy}</p><i>{action}<ArrowUpRight size={15}/></i></a>)}</div></section>
    <section className="trade-up-banner"><div><span className="eyebrow">READY TO UPGRADE?</span><h2>Your next chapter starts with the right laser.</h2><p>Explore OneLaser’s Trade-Up Program. Confirm current eligibility and the offer available for your chosen Hydra configuration.</p></div><a href="https://www.1laser.com/pages/trade-up" target="_blank" rel="noreferrer">Explore trade-up options<ArrowUpRight size={16}/></a></section>
  </>;
}

export function HydraVideoModal({ item, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const prior = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector('button')?.focus();
    const keys = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const elements = dialog.current?.querySelectorAll('button, iframe, a');
        const first = elements?.[0]; const last = elements?.[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', keys);
    return () => { window.removeEventListener('keydown', keys); document.body.style.overflow = overflow; prior?.focus(); };
  }, [onClose]);
  return <div className="video-modal h-video-modal" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}><div className="video-modal__dialog" ref={dialog} onClick={e => e.stopPropagation()}><button className="video-modal__close" onClick={onClose} aria-label="Close video"><X size={22}/></button><div className="video-modal__media"><iframe src={`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div><div className="h-video-modal__copy"><div><small>{item.tag} · {item.channel}</small><h2>{item.title}</h2></div><a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noreferrer">Watch on YouTube<ArrowUpRight size={16}/></a></div></div></div>;
}
