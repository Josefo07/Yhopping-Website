"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {ArrowUpRight,ArrowRight,MoveUpRight} from "lucide-react";
import {useLanguage} from "@/lib/i18n/LanguageContext";

const focusCopy = {
 es:[{title:"Finanzas",line:"Que las ventas se conviertan en decisiones con claridad.",detail:"Efectivo, margen y prioridades conectadas con la operación."},{title:"Operación",line:"Que los compromisos se conviertan en una ruta compartida.",detail:"Procesos, recursos y responsables trabajando en conjunto."},{title:"Equipo",line:"Que el criterio se convierta en una capacidad del equipo.",detail:"Roles claros, decisiones delegables y seguimiento."}],
 en:[{title:"Finance",line:"Turn sales into decisions made with clarity.",detail:"Cash, margins and priorities connected to operations."},{title:"Operations",line:"Turn commitments into a shared course of action.",detail:"Processes, resources and ownership working together."},{title:"People",line:"Turn sound judgment into a shared team capability.",detail:"Clear roles, delegated decisions and follow-through."}]
};
function Sculpture({active}:{active:number}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
  const host=canvas.parentElement!;let frame=0;let px=0;let py=0;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine=window.matchMedia("(pointer: fine)");
  function polygon(points:number[][],fill:string|CanvasGradient,stroke?:string){ctx!.beginPath();points.forEach(([x,y],i)=>i?ctx!.lineTo(x,y):ctx!.moveTo(x,y));ctx!.closePath();ctx!.fillStyle=fill;ctx!.fill();if(stroke){ctx!.strokeStyle=stroke;ctx!.lineWidth=.8;ctx!.stroke();}}
  function draw(){
   if(!canvas||!ctx)return;const rect=host.getBoundingClientRect();const w=rect.width,h=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr*w/600,0,0,dpr*h/540,0,0);ctx.clearRect(0,0,600,540);
   ctx.save();ctx.translate(px,py);
   const glow=ctx.createRadialGradient(300,290,10,300,290,270);glow.addColorStop(0,"rgba(28,197,220,.13)");glow.addColorStop(1,"rgba(28,197,220,0)");ctx.fillStyle=glow;ctx.fillRect(0,0,600,540);
   // Perspective field: conceptual artwork, never business data.
   ctx.strokeStyle="rgba(128,192,207,.09)";ctx.lineWidth=.6;
   for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(300+i*20,250);ctx.lineTo(300+i*95,530);ctx.stroke();}
   for(let i=0;i<7;i++){const y=292+i*i*5;ctx.beginPath();ctx.moveTo(25,y);ctx.lineTo(575,y);ctx.stroke();}
   // Three planes become one structure, echoing the Y in the brand.
   const surfaces=[[[94,175],[211,112],[315,173],[197,239]],[[315,173],[433,108],[538,170],[420,237]],[[197,239],[315,173],[420,237],[302,306]]];
   surfaces.forEach((points,i)=>{
    const shift=i===active?-12:0;const pts=points.map(([x,y])=>[x,y+shift]);
    polygon(pts.map(([x,y])=>[x,y+29]),"rgba(0,5,13,.3)");
    const g=ctx.createLinearGradient(100,100,420,310);g.addColorStop(0,i===active?"#34d9dc":"#153c51");g.addColorStop(1,i===active?"#087c94":"#0b2234");
    polygon(pts,g,i===active?"rgba(167,255,245,.95)":"rgba(113,184,203,.45)");
    polygon([pts[2],pts[3],[pts[3][0],pts[3][1]+28],[pts[2][0],pts[2][1]+28]],i===active?"#065668":"#091b2b","rgba(110,190,204,.22)");
    for(let j=1;j<=5;j++){ctx.beginPath();const a=pts[0],b=pts[1],c=pts[3],d=pts[2],t=j/6;ctx.moveTo(a[0]+(c[0]-a[0])*t,a[1]+(c[1]-a[1])*t);ctx.lineTo(b[0]+(d[0]-b[0])*t,b[1]+(d[1]-b[1])*t);ctx.strokeStyle="rgba(180,235,239,.16)";ctx.stroke();}
   });
   const stem=ctx.createLinearGradient(245,285,350,440);stem.addColorStop(0,"#1c7182");stem.addColorStop(1,"#0b2539");
   polygon([[243,272],[302,306],[361,273],[361,398],[302,433],[243,399]],stem,"rgba(108,218,219,.6)");
   polygon([[302,306],[361,273],[361,398],[302,433]],"rgba(3,16,28,.38)");
   // Quiet orbital rings make the whole visible without simulating metrics.
   ctx.save();ctx.translate(300,335);ctx.scale(1,.35);[195,235].forEach((r,i)=>{ctx.beginPath();ctx.arc(0,0,r,Math.PI*.12,Math.PI*1.88);ctx.strokeStyle=i?"rgba(115,181,201,.17)":"rgba(128,226,221,.4)";ctx.lineWidth=1;ctx.stroke();});ctx.restore();
   [[165,410],[470,345],[300,460]].forEach(([x,y],i)=>{ctx.beginPath();ctx.arc(x,y,i===active?4:2,0,Math.PI*2);ctx.fillStyle=i===active?"#9df6de":"#467d8b";ctx.fill();});
   ctx.restore();
  }
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);};
  const move=(event:PointerEvent)=>{if(reduced.matches||!fine.matches)return;const r=host.getBoundingClientRect();px=((event.clientX-r.left)/r.width-.5)*12;py=((event.clientY-r.top)/r.height-.5)*8;schedule();};
  const leave=()=>{px=0;py=0;schedule();};
  const observer=new ResizeObserver(schedule);observer.observe(host);host.addEventListener("pointermove",move);host.addEventListener("pointerleave",leave);window.addEventListener("resize",schedule);schedule();
  return()=>{observer.disconnect();cancelAnimationFrame(frame);host.removeEventListener("pointermove",move);host.removeEventListener("pointerleave",leave);window.removeEventListener("resize",schedule);};
 },[active]);
 return <canvas ref={ref} aria-hidden="true"/>;
}
export default function CanvasHero(){
 const {lang}=useLanguage();const en=lang==="en";const [active,setActive]=useState(0);const choices=focusCopy[lang];
 return <section className="canvas-hero"><div className="canvas-hero-noise" aria-hidden="true"/><div className="design-container canvas-hero-grid"><div className="canvas-hero-copy"><span className="canvas-eyebrow"><span/>{en?"BUSINESS CONSULTING / MONTERREY & MEXICO":"CONSULTORÍA EMPRESARIAL / MONTERREY Y MÉXICO"}</span><h1>{en?<>Move forward.<br/><em>With direction.</em></>:<>Crece.<br/><em>Con rumbo.</em></>}</h1><p>{en?"When everything depends on you, growth gets complicated. We connect finance, operations and people to build a business that moves as one.":"Cuando todo depende de ti, crecer se complica. Conectamos finanzas, operación y personas para construir una empresa que avance en conjunto."}</p><div className="canvas-actions"><Link href="/contacto" className="canvas-primary">{en?"Let’s discuss your business":"Hablemos de tu empresa"}<ArrowUpRight size={19}/></Link><Link href="/diagnostico-empresarial" className="canvas-secondary">{en?"Where should I start?":"¿Por dónde empiezo?"}<ArrowRight size={18}/></Link></div><div className="canvas-positioning"><span>{en?"Clear judgment.":"Criterio claro."}</span><span>{en?"Practical execution.":"Ejecución práctica."}</span><span>{en?"Shared capability.":"Capacidad compartida."}</span></div></div><div className="canvas-art-column"><div className="canvas-art-top"><span>YH / {en?"THE CONNECTED BUSINESS":"LA EMPRESA CONECTADA"}</span><MoveUpRight size={17}/></div><div className="canvas-art"><Sculpture active={active}/><span className="canvas-art-label canvas-art-label-a">{choices[0].title}</span><span className="canvas-art-label canvas-art-label-b">{choices[1].title}</span><span className="canvas-art-label canvas-art-label-c">{en?"Shared direction":"Dirección compartida"}</span></div><div className="canvas-focus-control" aria-label={en?"Explore our approach":"Explora nuestro enfoque"}>{choices.map((item,i)=><button type="button" key={item.title} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{item.title}<ArrowUpRight size={15}/></button>)}</div><div className="canvas-focus-detail" aria-live="polite"><h2>{choices[active].line}</h2><p>{choices[active].detail}</p></div><span className="canvas-art-note">{en?"Conceptual illustration · Not client data":"Ilustración conceptual · No representa datos de clientes"}</span></div></div><div className="canvas-hero-bottom design-container"><span>{en?"INTEGRATED BUSINESS CONSULTING":"CONSULTORÍA EMPRESARIAL INTEGRAL"}</span><a href="#retos">{en?"Explore the challenges":"Explora los retos"}<span>↓</span></a></div></section>;
}
