import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Sparkles, MapPin, Phone, Mail, Instagram, Calendar, Clock, ShieldCheck, ChefHat, Home, Heart, Star, ChevronDown, X, Menu, ArrowRight, Aperture, Film, Video, Plane, BookOpen, Plus, Check, MessageCircle } from 'lucide-react';
import img1 from 'container:///mnt/data/src/assets/4a3b3242d1741bf2-image_740A2039-38E6-4B06-9C5B-9069A0212275.jpeg';
import img2 from 'container:///mnt/data/src/assets/c58c2e5287a91f4c-image_BD682B11-43A0-4EBC-8EBA-7D2425A62163.jpeg';
import img3 from 'container:///mnt/data/src/assets/02a5075992b092c7-image_AD476ADE-0ADE-41BF-912D-1370CE53BF1F.jpeg';
import img4 from 'container:///mnt/data/src/assets/7975690d2a2d0d69-image_B171FB8A-C507-4746-8393-E069422351B7.jpeg';
import img5 from 'container:///mnt/data/src/assets/8b893bfcb946cd9c-image_04DE8AA8-3448-4AA8-B37B-D7F00273FB38.jpeg';
import img6 from 'container:///mnt/data/src/assets/c5ea84207b0777f8-image_A0CA1EDE-2CF7-4AC8-BB4D-0FF05C4CA763.jpeg';
import img7 from 'container:///mnt/data/src/assets/d231d3329beb2e56-image_83B90835-6703-4A36-A2B1-194CC3AB5F8B.jpeg';
import img8 from 'container:///mnt/data/src/assets/48f8dd0e24924e2e-image_ED086F84-54F8-42B7-AF8D-B558009D52E5.jpeg';
import img9 from 'container:///mnt/data/src/assets/efcad5ec2586cf4d-image_4F5AF4B7-8C11-4ED3-BF40-C68F6E6BCA8B.jpeg';

const WHATSAPP = '923149449079';
const fmt = (n:number)=> 'Rs. ' + n.toLocaleString('en-PK');
const waLink = (msg:string)=> `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

type Inquiry = {name:string; eventDate:string; city:string; pkg:string; message:string; createdAt:string};

async function api(action:string, args:any){
  const res = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args})});
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || 'Request failed');
  return json.data;
}

const gallery = [
  {src:img1, cat:'Bridal', cats:['Bridal'], title:'Bridal Grace', urdu:'دلہن کی شان', story:'A bride, held in soft light — calm, graceful and completely herself.'},
  {src:img2, cat:'Behind The Lens', cats:['Behind The Lens'], title:'Behind The Lens', urdu:'کیمرے کے پیچھے', story:'Sajal at work — watching for the quiet moment before it arrives.'},
  {src:img3, cat:'Couple', cats:['Couple'], title:'A Quiet Promise', urdu:'خاموش وعدہ', story:'Two people, one gentle promise — photographed without rushing it.'},
  {src:img4, cat:'Event', cats:['Event'], title:'Celebration in Focus', urdu:'خوشیوں کا لمحہ', story:'The room is alive, and the celebration is kept exactly as it felt.'},
  {src:img5, cat:'Outdoor', cats:['Outdoor'], title:'Golden Hour', urdu:'سنہری شام', story:'Warm evening light, open air and a story told in gold.'},
  {src:img6, cat:'Behind The Lens', cats:['Behind The Lens','Food'], title:'The Storyteller', urdu:'کہانی کار', story:'From lens to kitchen — the same care, hygiene and love for detail.'},
  {src:img7, cat:'Bridal', cats:['Bridal'], title:'Soft & Sacred', urdu:'نرم اور مقدس', story:'Soft, sacred and private — a bridal portrait made with dignity.'},
  {src:img8, cat:'Event', cats:['Event'], title:'Family, First', urdu:'خاندان سب سے پہلے', story:'Family first, always — the people who make the day feel like home.'},
  {src:img9, cat:'Outdoor', cats:['Outdoor'], title:'Light & Memory', urdu:'روشنی اور یاد', story:'Light becomes memory when it is noticed with patience and love.'},
];

const services = [
  {icon:Camera, t:'Professional Photographer', d:'Soft, respectful coverage that lets every family relax and be themselves.', u:'پروفیشنل فوٹوگرافر'},
  {icon:Film, t:'Photos / Videos / Cinematic', d:'Stills, films and cinematic highlights — one team, one beautiful story.', u:'تصاویر / ویڈیوز / سنیماٹک'},
  {icon:Heart, t:'All Event Coverage', d:'Mehndi, Barat, Walima, Nikkah, birthdays and intimate home events.', u:'تمام تقریبات کی کوریج'},
  {icon:Sparkles, t:'Bridal Shoot / Model Shoot', d:'Bridal portraits with privacy, dignity and gentle direction.', u:'برائیڈل / ماڈل شوٹ'},
  {icon:BookOpen, t:'Album Designing / Editing', d:'Fine-art albums, careful retouching and colour that stays timeless.', u:'البم ڈیزائننگ / ایڈیٹنگ'},
  {icon:Plane, t:'Drone Coverage', d:'A graceful aerial view for grand venues and outdoor celebrations.', u:'ڈرون کوریج'},
];

const shoots = [
  {name:'Bridal Indoor Shoot', price:20000, note:'Studio / home elegance'},
  {name:'Bridal Outdoor Shoot', price:22000, note:'Golden-hour locations'},
  {name:'Couple / Pre-Wedding Shoot', price:22000, note:'A story before the day'},
  {name:'Event Photo Only', price:15000, note:'Complete photo coverage'},
  {name:'Event Photo + Video', price:25000, note:'Photo & film together'},
  {name:'Drone Coverage Add-on', price:20000, note:'Aerial film & stills'},
];
const bundles = [
  {name:'Basic', price:70000, days:1, badge:'', features:['1 Day','Photo + Video','1 Photographer + 1 Videographer','Highlight 3–5 min','Album 20 pages']},
  {name:'Standard', price:130000, days:2, badge:'MOST POPULAR', features:['2 Days','Photo + Video','2 Photographers + 1 Videographer','Cinematic Highlight 5–7 min','Album 30 pages','Drone 1 Day']},
  {name:'Premium', price:200000, days:3, badge:'LUXURY', features:['3 Days','Photo + Video + Cinematic','2 Photographers + 2 Videographers','Cinematic Highlight + Full Film','Premium Album 40 pages','Drone All Days','Teaser + Reels']},
];
const albums = [
  {name:'Premium Album — 20 pages', price:15000},
  {name:'Premium Album — 30 pages', price:20000},
  {name:'Premium Album — 40 pages', price:25000},
];
const addons = [
  {name:'Additional Hour', price:3000, unit:'/hr'},
  {name:'Extra Photographer', price:5000, unit:'/day'},
  {name:'Extra Videographer', price:5000, unit:'/day'},
  {name:'Cinematic Teaser', price:8000, unit:''},
  {name:'Reels', price:2000, unit:'/reel'},
];

function Reveal({children, className=''}:{children:React.ReactNode; className?:string}){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const ob = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add('in'); ob.disconnect(); }},{threshold:.12});
    ob.observe(el); return ()=>ob.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function App(){
  const [open, setOpen] = useState(false);
  const [shutter, setShutter] = useState(false);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number|null>(null);
  const [albumView, setAlbumView] = useState(false);
  const [calcMode, setCalcMode] = useState<'bundle'|'shoot'>('bundle');
  const [bundleIdx, setBundleIdx] = useState(1);
  const [shootIdx, setShootIdx] = useState(4);
  const [days, setDays] = useState(2);
  const [drone, setDrone] = useState(false);
  const [albumIdx, setAlbumIdx] = useState(-1);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({ 'Cinematic Teaser':1 });
  const [form, setForm] = useState({name:'', eventDate:'', city:'Islamabad', pkg:'Standard — Wedding Bundle', message:''});
  const [saving, setSaving] = useState(false);
  const [savedNote, setSavedNote] = useState('');
  const [saveError, setSaveError] = useState('');
  const [faqOpen, setFaqOpen] = useState<number>(0);
  const [savedCount, setSavedCount] = useState<number|null>(null);
  const [lastSaved, setLastSaved] = useState<Inquiry|null>(null);

  // --- Gol Daaira: circular rotating gallery — gimbal-smooth, auto-rotate, drag/swipe ---
  const [galleryMode, setGalleryMode] = useState<'walk'|'grid'>('walk');
  const [walkTarget, setWalkTarget] = useState(0);
  const [walk, setWalk] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flash, setFlash] = useState(false);
  const [paused, setPaused] = useState(false);
  const [viewportW, setViewportW] = useState(1024);
  const walkTargetRef = useRef(0);
  const dragRef = useRef<{x:number; target:number; moved:boolean}|null>(null);
  const suppressClickRef = useRef(false);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number|undefined>(undefined);

  const triggerFlash = () => { setFlash(true); window.setTimeout(()=>setFlash(false), 260); };

  useEffect(()=>{ pausedRef.current = paused; },[paused]);
  useEffect(()=>{
    const onResize = ()=> setViewportW(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return ()=> window.removeEventListener('resize', onResize);
  },[]);

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const small = window.innerWidth < 640;
      const slow = typeof navigator !== 'undefined' && (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4;
      if (reduced || small || slow) setGalleryMode('grid');
    }
  },[]);

  // Gimbal smoothing: current walk eases toward target every frame.
  useEffect(()=>{
    let raf = 0;
    const tick = () => {
      setWalk(prev => {
        const diff = walkTargetRef.current - prev;
        if (Math.abs(diff) < 0.005) return walkTargetRef.current;
        return prev + diff * 0.09;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf);
  },[]);

  const setWalkUnbounded = (v:number) => { walkTargetRef.current = v; setWalkTarget(v); };
  const pauseBriefly = (ms=4000) => {
    setPaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(()=> setPaused(false), ms);
  };
  const spinBy = (step:number) => { pauseBriefly(5000); setWalkUnbounded(walkTargetRef.current + step); };
  const spinToIndex = (index:number, total:number) => {
    if (!total) return;
    pauseBriefly(5000);
    const current = walkTargetRef.current;
    let base = Math.round(current / total) * total + index;
    if (base - current > total / 2) base -= total;
    if (current - base > total / 2) base += total;
    setWalkUnbounded(base);
  };

  useEffect(()=>{ const t=setTimeout(()=>setShutter(true), 350); return ()=>clearTimeout(t); },[]);
  useEffect(()=>{
    let alive=true;
    (async()=>{
      try{
        const data = await api("records.list", {collection:'booking_inquiries'});
        if(alive) setSavedCount(Array.isArray(data?.records)? data.records.length : 0);
      }catch{ if(alive) setSavedCount(null); }
    })();
    return ()=>{alive=false};
  },[]);

  const bundle = bundles[bundleIdx];
  const shoot = shoots[shootIdx];
  const base = calcMode==='bundle' ? bundle.price : shoot.price * Math.max(1,days);
  const dronePrice = drone && !(calcMode==='bundle' && bundle.name!=='Basic') ? 20000 : 0;
  const albumPrice = albumIdx>=0 ? albums[albumIdx].price : 0;
  const addonTotal = Object.entries(selectedAddons).reduce((s,[name,qty])=>{ const a=addons.find(x=>x.name===name); return s + (a? a.price*qty:0); },0);
  const total = base + dronePrice + albumPrice + addonTotal;
  const calcSummary = `${calcMode==='bundle'? `Wedding Bundle: ${bundle.name}` : `Shoot: ${shoot.name}`} • ${calcMode==='bundle'? bundle.days+' day(s) included' : days+' day(s)'}${drone? ' • Drone':''}${albumIdx>=0? ` • ${albums[albumIdx].name}`:''}${Object.entries(selectedAddons).filter(([,q])=>q>0).map(([n,q])=>` • ${n} × ${q}`).join('')}`;

  const filtered = filter==='All' ? gallery : gallery.filter(g=>g.cats.includes(filter));
  const frontIndex = filtered.length ? ((Math.round(walk) % filtered.length) + filtered.length) % filtered.length : 0;
  const stepDeg = filtered.length ? 360 / filtered.length : 360;
  const radius = viewportW < 640 ? 208 : viewportW < 1024 ? 300 : 380;

  // Auto-rotate the Gol Daaira — pauses on hover / drag / lightbox / click.
  useEffect(()=>{
    if (galleryMode !== 'walk' || filtered.length <= 1) return;
    const id = window.setInterval(()=>{
      if (pausedRef.current || dragRef.current || lightbox !== null) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setWalkUnbounded(walkTargetRef.current + 1);
    }, 3400);
    return ()=> window.clearInterval(id);
  },[galleryMode, filtered.length, lightbox]);

  const submitBooking = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.name.trim() || !form.eventDate || !form.city.trim()){ setSaveError('Please add your name, event date and city.'); return; }
    setSaving(true); setSaveError(''); setSavedNote('');
    const value:Inquiry = {...form, name:form.name.trim(), createdAt:new Date().toISOString()};
    const key = `booking-${form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${form.eventDate}-${Date.now()}`;
    try{
      await api("records.create", {collection:'booking_inquiries', value, idempotency_key:key});
      setLastSaved(value);
      setSavedNote('Your inquiry is saved. Now send it on WhatsApp to confirm your date.');
      const data = await api("records.list", {collection:'booking_inquiries'});
      if(Array.isArray(data?.records)) setSavedCount(data.records.length);
    }catch(err){
      setSaveError(err instanceof Error ? err.message : 'Could not save your inquiry. You can still send it on WhatsApp.');
    } finally{ setSaving(false); }
  };
  const bookingMessage = `Assalam-o-Alaikum Nigar e Sajal! I would like to book.\nName: ${form.name || '—'}\nEvent Date: ${form.eventDate || '—'}\nCity: ${form.city}\nPackage: ${form.pkg}\nMessage: ${form.message || 'Please share availability and details.'}`;
  const calcMessage = `Assalam-o-Alaikum! I used the booking calculator.\n${calcSummary}\nEstimated Total: ${fmt(total)}\nPlease confirm availability for my date.`;

  const openFrame = (i:number) => {
    if (suppressClickRef.current) return;
    // In the circular gallery, tapping a side frame spins it to the front.
    // Only the front-centre frame opens the lightbox.
    if (galleryMode === 'walk' && filtered.length > 1 && i !== frontIndex) {
      spinToIndex(i, filtered.length);
      return;
    }
    triggerFlash(); setAlbumView(false); setLightbox(i);
  };
  const bookThisStyle = () => {
    if (lightbox===null) return;
    const g = filtered[lightbox];
    setForm(f=>({...f, message:`I loved the "${g.title}" (${g.cat}) style from Sajal's Gallery. Please book this style for my celebration. ${f.message ? '— ' + f.message : ''}`}));
    setLightbox(null);
    document.getElementById('booking')?.scrollIntoView({behavior:'smooth'});
  };
  const onGalleryPointerDown = (e:React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {x:e.clientX, target: walkTargetRef.current, moved:false};
    setDragging(true); setPaused(true);
  };
  const onGalleryPointerMove = (e:React.PointerEvent) => {
    if(!dragRef.current) return;
    const dx = dragRef.current.x - e.clientX;
    if (Math.abs(dx) > 8) dragRef.current.moved = true;
    setWalkUnbounded(dragRef.current.target + dx / 260);
  };
  const endDrag = () => {
    if (dragRef.current?.moved) { suppressClickRef.current = true; window.setTimeout(()=>{ suppressClickRef.current = false; }, 120); }
    dragRef.current=null; setDragging(false); pauseBriefly(4000);
  };

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'var(--ivory)'}}>
      {/* Camera flash — fast, sharp, warm */}
      {flash && <div aria-hidden className="camera-flash" />}
      {/* NAV */}
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-40 border-b border-[#E9DCC0] bg-[#FDF8F0]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0A0A0A] text-[#C5A572]"><Aperture size={22}/></span>
            <span className="leading-none"><span className="font-serif block text-[1.25rem] font-semibold tracking-wide">Nigar <span className="gold-text">e Sajal</span></span><span className="text-[10px] tracking-[.28em] text-[#8A6A33]">PHOTOGRAPHY • نگارِ سجل</span></span>
          </a>
          <nav className="hidden items-center gap-6 text-[13px] font-medium tracking-wide lg:flex">
            <a href="#sajal" className="hover:text-[#B9975B]">Meet Sajal</a><a href="#services" className="hover:text-[#B9975B]">Services</a><a href="#packages" className="hover:text-[#B9975B]">Packages</a><a href="#gallery" className="hover:text-[#B9975B]">Gallery</a><a href="#kitchen" className="hover:text-[#B9975B]">Kitchen</a><a href="#faq" className="hover:text-[#B9975B]">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={waLink('Assalam-o-Alaikum! I would like to book my date with Nigar e Sajal Photography.')} target="_blank" rel="noopener" className="btn-gold hidden rounded-full px-4 py-2 text-[13px] sm:block">Book Your Date</a>
            <button onClick={()=>setOpen(!open)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border border-[#E2D5B8] lg:hidden">{open?<X/>:<Menu/>}</button>
          </div>
        </div>
        {open && <div className="border-t border-[#E9DCC0] bg-[#FDF8F0] px-5 py-4 lg:hidden"><div className="grid gap-3 text-sm font-medium"><a href="#sajal" onClick={()=>setOpen(false)}>Meet Sajal</a><a href="#services" onClick={()=>setOpen(false)}>Services</a><a href="#packages" onClick={()=>setOpen(false)}>Packages</a><a href="#gallery" onClick={()=>setOpen(false)}>Gallery</a><a href="#booking" onClick={()=>setOpen(false)}>Booking</a><a className="text-[#8A6A33] font-semibold" href={waLink('Assalam-o-Alaikum! I would like to book my date.')} target="_blank" rel="noopener">Book on WhatsApp →</a></div></div>}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-[#0A0A0A] text-[#FDF8F0]">
        <div className="relative min-h-[92svh] lg:min-h-[94svh]">
          <img src={img1} alt="Sajal Ibtehaj holding her camera in her photography studio" className="kenburns absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-[#0A0A0A]/20" />
          {/* Studio lights + lens flare */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-[4]"><div className="hero-beam hero-beam-left"/><div className="hero-beam hero-beam-right"/><div className="lens-flare"/></div>
          <div className={`shutter ${shutter?'open':''}`}><div/><div/></div><div className="shutter-line" />
          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 lg:pb-14">
            <div className="mb-4 flex flex-wrap items-center gap-2"><span className="rounded-full border border-[#C5A572]/60 bg-black/40 px-3 py-1 text-[11px] tracking-[.22em]">SINCE 2023 • ISLAMABAD — RAWALPINDI</span><span className="rounded-full bg-[#C5A572] px-3 py-1 text-[11px] font-semibold text-black">COVERAGE IN OTHER CITIES</span></div>
            <p className="font-urdu text-right text-[1.15rem] text-[#E8D9B8] sm:text-2xl">نگارِ سجل</p>
            <h1 className="font-serif max-w-5xl text-[clamp(2.8rem,9vw,6.2rem)] leading-[.92] font-semibold">Nigar <span className="shimmer">e Sajal</span><br/><span className="text-[clamp(1.8rem,5vw,3.4rem)]">Photography</span></h1>
            <p className="mt-4 max-w-2xl text-[clamp(1rem,2.5vw,1.25rem)] text-[#F3E9D3]">We Capture Moments, You Cherish Forever.</p>
            <p className="font-urdu mt-1 text-[1rem] text-[#D9C89F] sm:text-lg">ہر لمحہ قیمتی ہے، ہم اسے ہمیشہ کے لیے یادگار بناتے ہیں۔</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">Soft, respectful and family-first photography — for brides, couples and celebrations that deserve to be remembered with grace.</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href={waLink('Assalam-o-Alaikum! I would like to Book My Date with Nigar e Sajal Photography.')} target="_blank" rel="noopener" className="btn-gold rounded-full px-6 py-3.5 text-sm">Book Your Date <span aria-hidden>↗</span></a><a href="#gallery" className="rounded-full border border-white/50 px-6 py-3.5 text-sm backdrop-blur hover:bg-white/10">View Portfolio</a><a href="#gallery" onClick={triggerFlash} className="rounded-full bg-[#C5A572] px-6 py-3.5 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(197,165,114,.45)] hover:brightness-105">Enter The Gallery <span aria-hidden>→</span></a></div>
            <div className="mt-10 grid max-w-3xl grid-cols-3 gap-3 border-t border-white/20 pt-5 text-center sm:text-left"><div><p className="font-serif text-2xl">2023</p><p className="text-[11px] tracking-widest text-white/65">SINCE</p></div><div><p className="font-serif text-2xl">100% Privacy</p><p className="text-[11px] tracking-widest text-white/65">YOUR CHOICE</p></div><div><p className="font-serif text-2xl">Family First</p><p className="text-[11px] tracking-widest text-white/65">ALWAYS</p></div></div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-[5]">{[12,32,55,74,88].map((l,i)=><span key={l} className="spark absolute bottom-8 h-1.5 w-1.5 rounded-full bg-[#F3E2B3]" style={{left:`${l}%`, animationDelay:`${i*.7}s`}} />)}</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-x-clip border-y border-[#DCCFAF] bg-[#0A0A0A] py-3 text-[#E8D9B8]"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-center"><span className="text-[12px] tracking-[.22em]">BRIDAL</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">COUPLE</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">EVENT</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">CINEMATIC</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">DRONE</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">ALBUM</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">PRIVACY FIRST</span><span className="text-[#C5A572]">✦</span><span className="text-[12px] tracking-[.22em]">FAMILY FIRST</span></div></div>

      {/* MEET SAJAL */}
      <section id="sajal" className="overflow-x-clip bg-[#FDF8F0] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">✦ The Aura</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-none">Meet Your Photographer<br/><span className="gold-text">Sajal Ibtehaj</span></h2><p className="font-urdu mt-3 text-xl text-[#8A6A33]">آپ کی فوٹوگرافر، آپ کی اپنی</p></Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5"><div className="relative"><div className="absolute -left-2 -top-2 h-full w-full rounded-[2rem] border border-[#C5A572]" /><img src={img2} alt="Portrait of Sajal Ibtehaj with her books" className="relative h-[420px] w-full rounded-[2rem] object-cover sm:h-[540px]" /><div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#0A0A0A]/82 p-4 text-white backdrop-blur"><p className="font-serif text-xl">Three identities. One beautiful story.</p><p className="mt-1 text-xs text-white/70">Photographer • Homemaker • Chef</p></div></div>
              <div className="mt-4 grid grid-cols-3 gap-3"><img src={img3} alt="Sajal with her camera" className="h-28 w-full rounded-xl object-cover sm:h-36"/><img src={img4} alt="Sajal working on her laptop" className="h-28 w-full rounded-xl object-cover sm:h-36"/><img src={img5} alt="Sajal at her accounting desk" className="h-28 w-full rounded-xl object-cover sm:h-36"/></div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal><p className="text-[1.05rem] leading-relaxed text-[#4C4336]">Sajal is not just a photographer. She is a daughter, a homemaker, a student, an entrepreneur — and the calm presence families invite into their most precious moments.</p></Reveal>
              <div className="mt-6 space-y-4">
                {[
                  {icon:Camera, n:'01', t:'Photographer & Visual Artist', d:'Freelance since 2023. Bridal, couple and event stories told in a soft, respectful, family-friendly style. She notices the tear, the dua, the quiet laugh — and keeps it safe.'},
                  {icon:Home, n:'02', t:'Ghar-dari ki Mahir', d:'Expert in homemaking. She understands ghar, family values, a bride’s comfort, privacy, mehman-nawazi and how a home event should feel. That is why families trust her inside their homes.'},
                  {icon:ChefHat, n:'03', t:'Professional Chef & Food Business Owner', d:'She runs her own food business on the side. Certified in Food Safety & Hygiene Management (SMEDA) and an Artisan Donuts Workshop. A chef’s eye for detail, colour and presentation shapes her food styling and event shoots.'},
                ].map((x)=><Reveal key={x.t}><article className="card rounded-3xl p-5 sm:p-6"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0A0A0A] text-[#C5A572]"><x.icon size={22}/></span><div><div className="flex flex-wrap items-baseline gap-2"><span className="text-xs font-bold tracking-widest text-[#B9975B]">{x.n}</span><h3 className="font-serif text-2xl leading-tight">{x.t}</h3></div><p className="mt-2 text-sm leading-relaxed text-[#5A5042]">{x.d}</p></div></div></article></Reveal>)}
              </div>
              <Reveal><div className="mt-6 rounded-3xl bg-[#0A0A0A] p-5 text-[#FDF8F0] sm:p-6"><h3 className="font-serif text-2xl">Education & Recognition</h3><ul className="mt-3 grid gap-2 text-sm text-white/80 sm:grid-cols-2"><li>• BS Accounting & Finance — Hamdard University Islamabad</li><li>• Aspire Program Selectee</li><li>• SMEDA: Taxation, Business Growth & Food Safety</li><li>• Volunteer Associate — community work</li><li>• Languages: Urdu & English, fluent</li><li>• Food Safety & Hygiene Management</li></ul><div className="mt-5 flex flex-wrap gap-2">{['Strategic Planning','Creative Thinking','Client Management','Time Management','Photography & Editing'].map(s=><span key={s} className="rounded-full border border-[#C5A572]/50 px-3 py-1 text-xs text-[#E8D9B8]">{s}</span>)}</div></div></Reveal>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[{icon:Clock, t:'On-time delivery', d:'Your memories return when promised — beautifully finished, never rushed.'},{icon:ShieldCheck, t:'Bridal privacy', d:'No photo is posted without permission. Your story stays yours.'},{icon:Check, t:'Transparent pricing', d:'Jo bataya wohi final. Clear packages, no hidden charges.'}].map((c)=><Reveal key={c.t}><div className="card h-full rounded-3xl p-5"><c.icon className="text-[#B9975B]"/><h3 className="font-serif mt-3 text-2xl">{c.t}</h3><p className="mt-1 text-sm text-[#5A5042]">{c.d}</p></div></Reveal>)}
          </div>
          <Reveal><p className="font-urdu mt-8 text-center text-xl text-[#7A5F2E]">سجل کا وعدہ — عزت، اعتماد اور محبت کے ساتھ ہر لمحہ محفوظ</p></Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="overflow-x-clip bg-[#0A0A0A] py-16 text-[#FDF8F0] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"><Reveal><p className="eyebrow">✦ What We Do</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.8rem)] leading-none">Services, made <span className="gold-text">with care</span></h2><p className="mt-3 max-w-2xl text-white/70">Every service begins with respect — for your family, your home and your story.</p></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((s,i)=><Reveal key={s.t}><article className="group h-full rounded-3xl border border-white/12 bg-white/[.04] p-6 hover:border-[#C5A572]/60"><div className="flex justify-between"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#C5A572] text-black"><s.icon size={22}/></span><span className="font-serif text-4xl text-white/15">0{i+1}</span></div><h3 className="font-serif mt-5 text-[1.55rem] leading-tight">{s.t}</h3><p className="font-urdu mt-1 text-[#D9C89F]">{s.u}</p><p className="mt-3 text-sm leading-relaxed text-white/65">{s.d}</p></article></Reveal>)}</div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="overflow-x-clip bg-[#FDF8F0] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">✦ Premium Packages</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.9rem)] leading-none">Honest prices.<br/><span className="gold-text">Luxurious memories.</span></h2><p className="mt-3 text-[#5A5042]">All prices in PKR. Jo bataya wohi final.</p></Reveal>
          <Reveal><h3 className="font-serif mt-12 text-3xl">Shoot Packages</h3></Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shoots.map(s=><Reveal key={s.name}><article className="card flex h-full flex-col rounded-3xl p-5"><p className="text-xs tracking-[.2em] text-[#8A6A33]">SHOOT</p><h4 className="font-serif mt-2 text-2xl leading-tight">{s.name}</h4><p className="mt-1 text-sm text-[#6B6257]">{s.note}</p><p className="font-serif mt-4 text-3xl">{fmt(s.price)}</p><a href={waLink(`Assalam-o-Alaikum! I am interested in ${s.name} (${fmt(s.price)}). Please share availability.`)} target="_blank" rel="noopener" className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#8A6A33]">Enquire <ArrowRight size={15}/></a></article></Reveal>)}</div>
          <Reveal><h3 className="font-serif mt-14 text-3xl">Wedding Full Bundles</h3></Reveal>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">{bundles.map((b,i)=><Reveal key={b.name}><article className={`relative flex h-full flex-col rounded-[1.8rem] p-6 ${i===1?'bg-[#0A0A0A] text-white shadow-2xl lg:-translate-y-2':'card'}`}><span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest ${i===1?'bg-[#C5A572] text-black':'bg-[#F3E2B3] text-[#6A531F]'}`}>{b.badge || 'WEDDING'}</span><h4 className="font-serif text-3xl">{b.name}</h4><p className="font-serif mt-2 text-4xl">{fmt(b.price)}</p><p className="mt-1 text-xs text-current opacity-70">Complete wedding bundle</p><ul className="mt-5 space-y-2.5 text-sm">{b.features.map(f=><li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#B9975B]"/><span>{f}</span></li>)}</ul><a href={waLink(`Assalam-o-Alaikum! I would like to book the ${b.name} Wedding Bundle (${fmt(b.price)}). Please confirm availability.`)} target="_blank" rel="noopener" className={`mt-auto pt-6 ${i===1?'btn-gold':'btn-dark'} block rounded-full py-3 text-center text-sm`}>Choose {b.name}</a></article></Reveal>)}</div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal><div className="card rounded-3xl p-6"><h3 className="font-serif text-2xl">Premium Albums</h3><div className="mt-4 space-y-3">{albums.map(a=><div key={a.name} className="flex items-center justify-between border-b border-dashed border-[#E2D5B8] pb-3"><span className="text-sm font-medium">{a.name}</span><b className="font-serif text-xl">{fmt(a.price)}</b></div>)}</div></div></Reveal>
            <Reveal><div className="rounded-3xl bg-[#0A0A0A] p-6 text-white"><h3 className="font-serif text-2xl">Add-ons</h3><div className="mt-4 space-y-3">{addons.map(a=><div key={a.name} className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-sm">{a.name}</span><b className="font-serif text-xl">{fmt(a.price)}{a.unit}</b></div>)}</div></div></Reveal>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="overflow-x-clip bg-[#F7EDDC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">✦ Booking Calculator</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.8rem)] leading-none">Build your day.<br/><span className="gold-text">See your total.</span></h2><p className="mt-3 max-w-2xl text-[#5A5042]">Choose a bundle or a shoot, add drone, album and extras. Your estimate updates instantly.</p></Reveal>
          <div className="mt-9 grid gap-5 lg:grid-cols-5">
            <Reveal className="lg:col-span-3"><div className="card rounded-[1.8rem] p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-2 rounded-full bg-[#F7EDDC] p-1"><button onClick={()=>setCalcMode('bundle')} className={`rounded-full py-2.5 text-sm font-semibold ${calcMode==='bundle'?'bg-black text-white':'text-[#5A5042]'}`}>Wedding Bundle</button><button onClick={()=>setCalcMode('shoot')} className={`rounded-full py-2.5 text-sm font-semibold ${calcMode==='shoot'?'bg-black text-white':'text-[#5A5042]'}`}>Shoot</button></div>
              <div className="mt-6"><label>Choose {calcMode==='bundle'?'bundle':'shoot'}</label><select value={calcMode==='bundle'?bundleIdx:shootIdx} onChange={e=>{ const v=Number(e.target.value); if(calcMode==='bundle'){setBundleIdx(v); setDays(bundles[v].days); setDrone(bundles[v].name!=='Basic');} else setShootIdx(v); }}>{(calcMode==='bundle'?bundles:shoots).map((x,i)=><option key={x.name} value={i}>{x.name} — {fmt(x.price)}</option>)}</select></div>
              <div className="mt-5"><label>Days: {calcMode==='bundle'? `${bundle.days} day(s) included` : `${days} day(s)`}</label><input type="range" min={1} max={3} value={calcMode==='bundle'?bundle.days:days} disabled={calcMode==='bundle'} onChange={e=>setDays(Number(e.target.value))} /><div className="flex justify-between text-xs text-[#6B6257]"><span>1 day</span><span>2 days</span><span>3 days</span></div></div>
              <label className="mt-5 flex cursor-pointer items-center justify-between rounded-2xl border border-[#E2D5B8] bg-[#FFFDF8] p-4"><span><b>Drone Coverage</b><span className="block text-xs text-[#6B6257]">{calcMode==='bundle' && bundle.name!=='Basic' ? 'Already included in your bundle' : 'Add aerial film & stills • Rs. 20,000'}</span></span><input type="checkbox" checked={drone} disabled={calcMode==='bundle' && bundle.name!=='Basic'} onChange={e=>setDrone(e.target.checked)} className="!w-5 !h-5 accent-[#B9975B]" /></label>
              <div className="mt-5"><label>Album</label><select value={albumIdx} onChange={e=>setAlbumIdx(Number(e.target.value))}><option value={-1}>No extra album</option>{albums.map((a,i)=><option key={a.name} value={i}>{a.name} — {fmt(a.price)}</option>)}</select></div>
              <div className="mt-6"><label>Add-ons</label><div className="mt-2 grid gap-2 sm:grid-cols-2">{addons.map(a=>{ const qty=selectedAddons[a.name]||0; return <div key={a.name} className="flex items-center justify-between rounded-xl border border-[#E2D5B8] bg-[#FFFDF8] px-3 py-2.5"><span className="text-[13px] font-medium">{a.name}<span className="block text-[11px] text-[#6B6257]">{fmt(a.price)}{a.unit}</span></span><div className="flex items-center gap-2"><button aria-label={`Decrease ${a.name}`} onClick={()=>setSelectedAddons(p=>({...p,[a.name]:Math.max(0,(p[a.name]||0)-1)}))} className="h-7 w-7 rounded-full border">−</button><b>{qty}</b><button aria-label={`Increase ${a.name}`} onClick={()=>setSelectedAddons(p=>({...p,[a.name]:(p[a.name]||0)+1}))} className="h-7 w-7 rounded-full bg-black text-white">+</button></div></div>})}</div></div>
            </div></Reveal>
            <Reveal className="lg:col-span-2"><aside className="sticky top-24 rounded-[1.8rem] bg-[#0A0A0A] p-6 text-white sm:p-7"><p className="text-xs tracking-[.25em] text-[#C5A572]">YOUR ESTIMATE</p><p className="font-serif mt-3 text-[clamp(2.4rem,6vw,3.6rem)] leading-none">{fmt(total)}</p><p className="mt-2 text-sm leading-relaxed text-white/70">{calcSummary}</p><div className="gold-line my-5"/><div className="space-y-2 text-sm"><div className="flex justify-between"><span>Base</span><b>{fmt(base)}</b></div><div className="flex justify-between"><span>Drone</span><b>{fmt(dronePrice)}</b></div><div className="flex justify-between"><span>Album</span><b>{fmt(albumPrice)}</b></div><div className="flex justify-between"><span>Add-ons</span><b>{fmt(addonTotal)}</b></div></div><a href={waLink(calcMessage)} target="_blank" rel="noopener" className="btn-gold mt-6 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm">Send Estimate on WhatsApp <MessageCircle size={17}/></a><p className="mt-3 text-center text-[11px] text-white/55">Final confirmation after availability check. No hidden charges.</p></aside></Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY — GOL DAAIRA / 360 CIRCULAR ROTATING GALLERY */}
      <section id="gallery" className="overflow-x-clip bg-[#0A0A0A] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">✦ Behind The Lens</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.8rem)] leading-none">Sajal&apos;s Gallery — <span className="gold-text">The Beautiful Gallery</span></h2><p className="mt-3 max-w-2xl text-white/65">Gol Daaira — stand in the middle of a round luxury gallery. The whole circle spins around you. Drag or swipe to spin it, or tap a side frame to bring it to the front.</p></Reveal>

          {/* Cinematic viewfinder bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-t-2xl border border-[#C5A572]/40 bg-black px-4 py-2.5">
            <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[.18em]"><span className="rec-dot" /> REC <span className="hidden text-white/50 sm:inline">•</span> <span>Sajal&apos;s Gallery</span> <span className="text-white/50">• 360° • 4K</span></p>
            <p className="text-[11px] tracking-[.18em] text-[#E8D9B8]">DRAG / SWIPE TO SPIN THE CIRCLE • TAP A FRAME TO BRING IT FRONT</p>
            <div className="flex gap-1.5" role="group" aria-label="Gallery view">
              <button onClick={()=>setGalleryMode('walk')} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${galleryMode==='walk'?'bg-[#C5A572] text-black':'border border-white/25'}`}>360° Circle</button>
              <button onClick={()=>setGalleryMode('grid')} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${galleryMode==='grid'?'bg-[#C5A572] text-black':'border border-white/25'}`}>2D Grid</button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">{['All','Bridal','Couple','Event','Outdoor','Food','Behind The Lens'].map(c=><button key={c} onClick={()=>{ setFilter(c); walkTargetRef.current=0; setWalkTarget(0); setWalk(0); }} className={`rounded-full px-4 py-2 text-xs font-semibold ${filter===c?'bg-[#C5A572] text-black':'border border-white/25 text-white/75'}`}>{c}</button>)}</div>

          {galleryMode==='walk' ? (
            <div className="mt-5">
              <div className="gallery-room circular-room relative overflow-hidden rounded-b-2xl border border-t-0 border-[#C5A572]/30" onPointerDown={onGalleryPointerDown} onPointerMove={onGalleryPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>{ if(!dragging) setPaused(false); }} style={{touchAction:'pan-y', cursor: dragging?'grabbing':'grab'}}>
                <div aria-hidden className="gallery-wall gallery-wall-circle" />
                <div aria-hidden className="gallery-spot gallery-spot-1" /><div aria-hidden className="gallery-spot gallery-spot-2" /><div aria-hidden className="gallery-spot gallery-spot-3" />
                <div aria-hidden className="gallery-particles"><i/><i/><i/><i/><i/><i/><i/><i/></div>
                <div className="viewfinder-corner tl" /><div className="viewfinder-corner tr" /><div className="viewfinder-corner bl" /><div className="viewfinder-corner br" />
                <div aria-hidden className="circle-front-glow" />
                <div className="circle-stage">
                  {filtered.map((g,i)=>{
                    const totalAngle = i * stepDeg - walk * stepDeg;
                    const norm = ((totalAngle + 540) % 360) - 180;
                    const abs = Math.abs(norm);
                    const isFront = i === frontIndex;
                    const visible = abs < 150;
                    const scale = isFront ? 1 : Math.max(0.62, 1 - abs / 340);
                    const opacity = visible ? Math.max(0.18, 1 - abs / 220) : 0;
                    return (
                      <button key={g.src} onClick={()=>openFrame(i)} aria-label={isFront ? `Open ${g.title}` : `Bring ${g.title} to the front`} className="gallery-frame-circle group" style={{opacity, transform:`translate(-50%,-50%) rotateY(${totalAngle}deg) translateZ(${radius}px) scale(${scale})`, zIndex: 100 - Math.round(abs), pointerEvents: visible?'auto':'none', filter:`brightness(${isFront ? 1.12 : Math.max(0.45, 1 - abs / 260)}) saturate(${isFront ? 1.12 : 0.92})`}}>
                        <span className="gallery-frame-light" />
                        <img src={g.src} alt={`${g.title} — Sajal Ibtehaj photography`} loading="lazy" className="gallery-frame-img aspect-[4/5] w-full object-cover" draggable={false} />
                        <span className="gallery-caption"><span className="text-[10px] tracking-[.25em] text-[#E8D9B8]">{g.cat.toUpperCase()}</span><span className="font-serif block text-[1.35rem] leading-tight">{g.title}</span><span className="font-urdu text-sm text-[#D9C89F]">{g.urdu}</span><span className="mt-1 block text-[11px] text-white/70 opacity-0 transition group-hover:opacity-100">{g.story}</span></span>
                        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 backdrop-blur"><Plus size={16}/></span>
                      </button>
                    );
                  })}
                </div>
                <div aria-hidden className="gallery-floor" />
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
                  <button aria-label="Previous photo — spin circle back" onClick={()=>spinBy(-1)} className="rounded-full border border-white/30 bg-black/55 px-4 py-2 text-sm backdrop-blur">← Prev</button>
                  <span className="rounded-full bg-black/55 px-3 py-1.5 text-[11px] tracking-widest backdrop-blur">{frontIndex+1} / {filtered.length} • {filtered[frontIndex]?.title}</span>
                  <button aria-label="Next photo — spin circle forward" onClick={()=>spinBy(1)} className="rounded-full border border-white/30 bg-black/55 px-4 py-2 text-sm backdrop-blur">Next →</button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Gallery position">
                {filtered.map((g,i)=>(
                  <button key={g.src} onClick={()=>spinToIndex(i, filtered.length)} aria-label={`Show ${g.title} in front`} title={g.title} className={`circle-dot ${i===frontIndex?'active':''}`} />
                ))}
                <span className="ml-2 text-[11px] tracking-[.18em] text-white/60">{frontIndex+1} OF {filtered.length} • {filtered[frontIndex]?.title?.toUpperCase()}</span>
              </div>
              <p className="mt-3 text-center text-xs text-white/55">Drag, swipe or use Prev / Next to spin the whole Gol Daaira — gimbal-smooth. Tap a side frame to bring it front, then tap the front frame to open it. The circle pauses while you hold or hover it.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">{filtered.map((g,i)=><button key={g.src} onClick={()=>openFrame(i)} className="group relative overflow-hidden rounded-3xl border-2 border-[#C5A572]/70 text-left shadow-[0_18px_40px_rgba(197,165,114,.18)]"><img src={g.src} alt={`${g.title} — Sajal Ibtehaj photography`} loading="lazy" className="gallery-img aspect-[4/5] w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/><div className="absolute bottom-4 left-4 right-4"><p className="text-[11px] tracking-[.25em] text-[#E8D9B8]">{g.cat.toUpperCase()}</p><p className="font-serif text-2xl">{g.title}</p><p className="font-urdu text-[#D9C89F]">{g.urdu}</p><p className="mt-1 text-[11px] text-white/75 opacity-0 transition group-hover:opacity-100">{g.story}</p></div><span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur"><Plus/></span></button>)}</div>
          )}
          <p className="mt-4 text-xs text-white/55">Tap the front portrait to view it larger. Client galleries are shared privately — never posted without permission.</p>
        </div>
      </section>

      {/* KITCHEN */}
      <section id="kitchen" className="overflow-x-clip bg-[#FDF8F0] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="grid items-center gap-8 lg:grid-cols-2"><Reveal><div className="relative"><img src={img6} alt="Sajal in her kitchen, bringing a chef's care to food and styling" className="h-[420px] w-full rounded-[2rem] object-cover sm:h-[520px]"/><span className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-full bg-[#0A0A0A] px-4 py-2 text-xs font-semibold text-[#E8D9B8]"><ChefHat size={16}/> SMEDA CERTIFIED • FOOD SAFETY</span></div></Reveal><Reveal><p className="eyebrow">✦ Sajal’s Kitchen</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.7rem)] leading-[.95]">From Lens<br/>to <span className="gold-text">Kitchen.</span></h2><p className="mt-4 leading-relaxed text-[#5A5042]">Same care. Same hygiene. Same love for detail.</p><p className="mt-3 leading-relaxed text-[#5A5042]">Her food business is not separate from her photography — it is the same promise. Clean hands, honest ingredients, beautiful presentation, and food styled like it deserves to be remembered.</p><div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl bg-[#F7EDDC] p-3"><p className="font-serif text-xl">Hygiene</p><p className="text-[11px] text-[#6B6257]">Certified care</p></div><div className="rounded-2xl bg-[#F7EDDC] p-3"><p className="font-serif text-xl">Styling</p><p className="text-[11px] text-[#6B6257]">Chef’s eye</p></div><div className="rounded-2xl bg-[#F7EDDC] p-3"><p className="font-serif text-xl">Mehman-nawazi</p><p className="text-[11px] text-[#6B6257]">Warm welcome</p></div></div><p className="font-urdu mt-5 text-lg text-[#8A6A33]">کھانا ہو یا تصویر — محبت اور صفائی سب سے پہلے</p></Reveal></div></div>
      </section>

      {/* PROCESS + TESTIMONIALS */}
      <section id="process" className="overflow-x-clip bg-[#F7EDDC] py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6"><Reveal><p className="eyebrow">✦ How It Works</p><h2 className="font-serif mt-3 text-[clamp(2.2rem,6vw,3.7rem)]">A calm, clear process</h2></Reveal><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{n:'01',t:'Inquiry',d:'Message on WhatsApp. Share your date, city and dream.'},{n:'02',t:'Booking',d:'Choose your package. Transparent price, confirmed date.'},{n:'03',t:'Shoot',d:'Relaxed direction, family comfort and beautiful light.'},{n:'04',t:'Album Delivery',d:'Edited highlights, film and your premium album — on time.'}].map(s=><Reveal key={s.t}><div className="card h-full rounded-3xl p-5"><p className="font-serif text-5xl text-[#C5A572]">{s.n}</p><h3 className="font-serif mt-3 text-2xl">{s.t}</h3><p className="mt-1 text-sm text-[#5A5042]">{s.d}</p></div></Reveal>)}</div>
        <Reveal><h2 className="font-serif mt-16 text-[clamp(2rem,5vw,3.2rem)]">Families <span className="gold-text">trust her</span></h2></Reveal><div className="mt-6 grid gap-4 md:grid-cols-3">{[
          {q:'She made our whole family feel comfortable. Our home felt respected, and our bride felt safe in front of the camera.', n:'A Family in Islamabad', r:'Wedding Coverage'},
          {q:'No pressure, no awkward moments. Sajal understood privacy completely. We received our album exactly when promised.', n:'A Bride’s Family', r:'Bridal Shoot'},
          {q:'Her eye for detail is different — she sees colour, food, light and emotion like a chef and an artist together.', n:'An Event Host', r:'Event & Food Styling'},
        ].map(t=><Reveal key={t.n}><figure className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm"><div className="flex gap-1 text-[#C5A572]">{[1,2,3,4,5].map(i=><Star key={i} size={15} fill="currentColor"/>)}</div><blockquote className="mt-3 flex-1 text-[1.05rem] leading-relaxed">“{t.q}”</blockquote><figcaption className="mt-4 border-t border-[#E9DCC0] pt-3"><b>{t.n}</b><span className="block text-xs text-[#8A6A33]">{t.r}</span></figcaption></figure></Reveal>)}</div></div></section>

      {/* FAQ */}
      <section id="faq" className="overflow-x-clip bg-[#FDF8F0] py-16 sm:py-24"><div className="mx-auto max-w-4xl px-4 sm:px-6"><Reveal><p className="eyebrow text-center">✦ Questions</p><h2 className="font-serif mt-3 text-center text-[clamp(2.2rem,6vw,3.6rem)]">Frequently asked</h2></Reveal><div className="mt-9 flex flex-col gap-3">{[
        {q:'How do I book my date?', a:'Send your date, city and package on WhatsApp. We confirm availability, share transparent pricing and reserve your date after booking.'},
        {q:'How much advance is needed to book?', a:'A booking advance confirms your date. The exact amount is shared clearly on WhatsApp before you confirm — jo bataya wohi final.'},
        {q:'When will I receive my photos and album?', a:'Edited highlights arrive first, followed by your full gallery and premium album. Delivery timelines are confirmed at booking and honoured on time.'},
        {q:'Will my photos be posted online?', a:'Never without your permission. Bridal privacy is a promise. Your photos are shared only if you choose to share them.'},
        {q:'Do you travel to other cities?', a:'Yes. Islamabad–Rawalpindi is home, and coverage in other cities is available. Travel is discussed honestly before booking.'},
      ].map((f, idx)=>{ const isOpen = faqOpen===idx; return <div key={f.q} className="card overflow-hidden rounded-2xl"><button type="button" aria-expanded={isOpen} onClick={()=>setFaqOpen(isOpen?-1:idx)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-medium">{f.q}<ChevronDown className={`shrink-0 text-[#B9975B] transition-transform ${isOpen?'rotate-180':''}`}/></button>{isOpen && <div className="px-5 pb-4"><p className="text-sm leading-relaxed text-[#5A5042]">{f.a}</p></div>}</div>; })}</div></div></section>

      {/* BOOKING */}
      <section id="booking" className="overflow-x-clip bg-[#0A0A0A] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="grid gap-8 lg:grid-cols-2">
          <Reveal><p className="eyebrow">✦ Booking & Contact</p><h2 className="font-serif mt-3 text-[clamp(2.3rem,6vw,4rem)] leading-[.95]">Your date is<br/><span className="gold-text">waiting.</span></h2><p className="mt-4 max-w-md text-white/70">Tell us about your celebration. We reply with availability, honest pricing and a calm plan.</p><div className="mt-7 space-y-3 text-sm"><a href="tel:+923149449079" className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:border-[#C5A572]"><Phone className="text-[#C5A572]"/> <span><b>0314 9449079</b><span className="block text-xs text-white/60">Primary • WhatsApp</span></span></a><a href="tel:+923180881138" className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:border-[#C5A572]"><Phone className="text-[#C5A572]"/> <span><b>0318 0881138</b><span className="block text-xs text-white/60">Secondary</span></span></a><a href="mailto:nigaresajalphotography@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:border-[#C5A572]"><Mail className="text-[#C5A572]"/> <span className="[overflow-wrap:anywhere]">nigaresajalphotography@gmail.com</span></a><a href="https://www.instagram.com/nigar.by.sajal" target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:border-[#C5A572]"><Instagram className="text-[#C5A572]"/> <span><b>@nigar.by.sajal</b><span className="block text-xs text-white/60">Instagram</span></span></a><p className="flex items-center gap-3 p-2 text-white/70"><MapPin className="text-[#C5A572]"/> Islamabad — Rawalpindi • Coverage in other cities</p></div></Reveal>
          <Reveal><form onSubmit={submitBooking} className="rounded-[1.8rem] bg-[#FDF8F0] p-5 text-[#0A0A0A] sm:p-7"><h3 className="font-serif text-3xl">Book Your Date</h3><p className="mt-1 text-sm text-[#6B6257]">Save your inquiry, then send it on WhatsApp.</p><div className="mt-5 grid gap-4"><div><label>Your Name *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" /></div><div className="grid gap-4 sm:grid-cols-2"><div><label>Event Date *</label><input type="date" value={form.eventDate} onChange={e=>setForm({...form,eventDate:e.target.value})} /></div><div><label>City *</label><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Islamabad / Rawalpindi / Other" /></div></div><div><label>Package</label><select value={form.pkg} onChange={e=>setForm({...form,pkg:e.target.value})}>{[...bundles.map(b=>`${b.name} — Wedding Bundle (${fmt(b.price)})`), ...shoots.map(s=>`${s.name} (${fmt(s.price)})`), 'Custom / Not sure yet'].map(p=><option key={p}>{p}</option>)}</select></div><div><label>Message</label><textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your event, venue and the moments you love most…" /></div></div>
            {savedNote && <p role="status" className="mt-4 rounded-xl bg-[#EAF5E6] p-3 text-sm font-medium text-[#2F5D28]">✓ {savedNote}</p>}
            {saveError && <p role="alert" className="mt-4 rounded-xl bg-[#FBE9E9] p-3 text-sm text-[#8B2E2E]">{saveError}</p>}
            <div className="mt-5 flex flex-wrap gap-3"><button type="submit" disabled={saving} className="btn-gold rounded-full px-6 py-3 text-sm disabled:opacity-60">{saving?'Saving…':'Save Inquiry'}</button><a href={waLink(bookingMessage)} target="_blank" rel="noopener" className="btn-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"><MessageCircle size={16}/> Send on WhatsApp</a></div>
            <p className="mt-3 text-[11px] text-[#6B6257]">{savedCount!==null ? `${savedCount} inquiry record(s) in the studio book.` : 'Your inquiry is stored privately for the studio.'} We never share your details.</p>
          </form></Reveal>
        </div></div>
      </section>

      <footer className="overflow-x-clip border-t border-[#E9DCC0] bg-[#FDF8F0] py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><p className="font-serif text-2xl">Nigar <span className="gold-text">e Sajal</span> <span className="font-urdu text-base text-[#8A6A33]">نگارِ سجل</span></p><p className="mt-1 text-sm text-[#6B6257]">We Capture Moments, You Cherish Forever.</p></div><nav className="flex flex-wrap gap-4 text-sm font-medium"><a href="#sajal">Meet Sajal</a><a href="#services">Services</a><a href="#packages">Packages</a><a href="#gallery">Gallery</a><a href="#booking">Booking</a></nav></div><div className="mt-8 flex flex-col justify-between gap-3 border-t border-[#E9DCC0] pt-5 text-xs text-[#6B6257] sm:flex-row"><span>© {new Date().getFullYear()} Nigar e Sajal Photography • Islamabad — Rawalpindi</span><span>Privacy first • Transparent pricing • On-time delivery</span></div></div></footer>

      {lightbox!==null && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 pt-[max(1rem,var(--safe-area-inset-top))] pb-6" role="dialog" aria-modal="true" aria-label="Gallery viewer"><div className="min-h-full flex items-center justify-center px-4"><div className="w-full max-w-4xl">
        <div className="flex items-center justify-between gap-3 text-white"><div><p className="text-[11px] tracking-[.25em] text-[#C5A572]">REC • SAJAL&apos;S GALLERY • 4K</p><p className="font-serif text-2xl">{filtered[lightbox]?.title}</p><p className="text-xs text-white/60">{filtered[lightbox]?.cat} • <span className="font-urdu text-[#D9C89F]">{filtered[lightbox]?.urdu}</span></p></div><button onClick={()=>{setLightbox(null); setAlbumView(false);}} aria-label="Close viewer" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30"><X/></button></div>
        {!albumView ? <>
          <div className="relative"><span className="lightbox-spot" /><img src={filtered[lightbox]?.src} alt={`${filtered[lightbox]?.title} — enlarged portrait`} loading="lazy" className="mt-4 max-h-[calc(100dvh-var(--safe-area-inset-top)-6rem)] w-auto max-w-full object-contain mx-auto rounded-2xl border-2 border-[#C5A572]/70 shadow-[0_0_60px_rgba(197,165,114,.35)]"/></div>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/80">{filtered[lightbox]?.story}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3"><button onClick={bookThisStyle} className="btn-gold rounded-full px-6 py-3 text-sm">Book This Style</button><button onClick={()=>setAlbumView(true)} className="rounded-full border border-[#C5A572] px-6 py-3 text-sm text-[#E8D9B8]">View Full Album</button><a href={waLink(`Assalam-o-Alaikum! I loved the "${filtered[lightbox]?.title}" (${filtered[lightbox]?.cat}) style from Sajal's Gallery. Please share availability.`)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white"><MessageCircle size={16}/> WhatsApp This Style</a></div>
          <div className="mt-5 flex items-center justify-between gap-3"><button disabled={lightbox===0} onClick={()=>setLightbox(l=>l===null?l:l-1)} className="rounded-full border border-white/30 px-4 py-2 text-sm text-white disabled:opacity-40">← Previous</button><p className="text-sm text-white/70">{lightbox+1} of {filtered.length}</p><button disabled={lightbox===filtered.length-1} onClick={()=>setLightbox(l=>l===null?l:l+1)} className="rounded-full border border-white/30 px-4 py-2 text-sm text-white disabled:opacity-40">Next →</button></div>
        </> : <>
          <p className="mt-4 text-center text-sm text-white/70">Full album — {filter==='All' ? 'all styles' : filter} • Tap any frame to return to its story.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{filtered.map((g,i)=><button key={g.src} onClick={()=>{setLightbox(i); setAlbumView(false);}} className="group overflow-hidden rounded-2xl border border-[#C5A572]/60 text-left"><img src={g.src} alt={g.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition group-hover:scale-105"/><span className="block bg-[#111] px-3 py-2"><span className="font-serif block text-white">{g.title}</span><span className="text-[11px] text-[#E8D9B8]">{g.cat}</span></span></button>)}</div>
          <button onClick={()=>setAlbumView(false)} className="mt-5 rounded-full border border-white/30 px-5 py-2.5 text-sm text-white">← Back to Photo</button>
        </>}
      </div></div></div>}
    </div>
  );
}
