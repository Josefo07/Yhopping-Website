"use client";
import {useRef,useState} from "react";
import Link from "next/link";
import {useLanguage} from "@/lib/i18n/LanguageContext";

const copy = {
 es:{
  eyebrow:"ORIENTACIÓN EJECUTIVA EMPRESARIAL",title:"Practica las decisiones que exige dirigir.",
  intro:"Trabaja situaciones de liderazgo, comunicación y gestión mediante ejercicios guiados, criterios claros y acciones aplicables a tu empresa.",
  try:"Prueba un ejemplo",programs:"Conoce el enfoque",demo:"Laboratorio de delegación",
  note:"Demostración interactiva con opciones y respuestas preparadas. No es una conversación con IA, un diagnóstico ni una evaluación de tu equipo.",
  case:"Delegué una tarea y terminó regresando a mí.",
  facts:"Caso ilustrativo: pediste un reporte al equipo. Llegó incompleto y terminaste haciéndolo tú. No sabemos todavía qué acuerdos existían ni qué impidió cumplirlos.",
  start:"Comenzar práctica",step:"Paso",question:"¿Qué se había acordado antes de pedir el reporte?",
  choices:["Solo pedí el reporte; no definimos criterios ni una fecha precisa.","Definimos resultado, fecha y criterios de aceptación.","No tengo claridad sobre lo que acordamos."],
  feedback:[
   "Faltan acuerdos verificables en este caso. Conviene aclararlos antes de atribuir el resultado a falta de capacidad o compromiso del equipo. Esto tampoco demuestra que los acuerdos sean la única causa.",
   "Los acuerdos son un punto de partida, no prueba de que hubiera recursos o comprensión suficientes. Revisa acceso a información, carga de trabajo, dudas, seguimiento y cumplimiento antes de concluir qué ocurrió.",
   "Primero recupera la solicitud y contrástala con la otra persona. La falta de información no permite concluir quién falló ni por qué."
  ],
  next:"Preparar una acción",back:"Anterior",review:"Lectura del caso",task:"Prepara una conversación de seguimiento",
  taskDesc:"Completa una ficha de práctica. Usa datos ficticios o generales: no escribas nombres, información confidencial ni detalles personales sensibles.",
  labels:["Resultado esperado","Responsable o rol","Fecha o momento","Criterios de aceptación","Siguiente revisión"],
  examples:["Reporte de pendientes con estado y siguiente acción","Responsable de operación","Viernes antes de las 12:00","Cada pendiente tiene responsable, fecha y bloqueo identificado","Revisión intermedia el jueves a las 16:00"],
  sample:"Cargar ejemplo ilustrativo",finish:"Ver mi ficha",required:"Completa los cinco campos para generar tu ficha.",
  result:"Tu ficha de práctica",resultNote:"Preparaste una acción. Todavía falta aplicarla y comprobar lo que ocurra; esta ficha no acredita una mejora.",
  script:"Guion para ensayar",scriptIntro:"Puedes adaptar esta estructura:",
  scriptBody:"Acordemos el resultado, quién lo prepara y cuándo lo revisaremos. Estos son los criterios de aceptación. ¿Qué dudas o recursos faltan? Si aparece un bloqueo, definamos cuándo avisar y quién puede resolverlo.",
  reflection:"Después de aplicarlo, revisa: ¿qué se acordó?, ¿qué ocurrió?, ¿qué quedó pendiente? Distingue lo observado de tu interpretación.",
  download:"Descargar ficha (.txt)",reset:"Reiniciar práctica",edit:"Editar mi ficha",
  privacy:"La ficha y tus opciones permanecen en la memoria de esta página. No se envían al servidor ni a una IA. Al recargar o salir de la página se pierden; la descarga crea un archivo en tu dispositivo.",
  scope:"Cómo funciona la orientación",scopeText:"Elegir una situación, revisar hechos e interpretaciones, practicar una respuesta, definir una acción y revisar su aplicación. La orientación desarrolla criterio mediante práctica; no sustituye la responsabilidad de quien decide.",
  program:"Programa en desarrollo",programTitle:"Autogestión y conversaciones difíciles para líderes",
  programText:"Propuesta de veinte sesiones en cuatro ciclos: respuesta bajo presión, autoevaluación realista, límites y conversaciones difíciles, e incertidumbre y coherencia. Contenido educativo; no es terapia ni ofrece resultados garantizados.",
  status:"La demostración está disponible. El programa completo aún no tiene fechas ni inscripciones confirmadas. No se ofrece acreditación académica.",
  ask:"Consultar sobre el programa",business:"¿Necesitas revisar cómo funciona tu empresa?",businessText:"La autoevaluación empresarial es una herramienta distinta: revisa prácticas de seis áreas del negocio. No utiliza esta ficha para puntuarte.",assessment:"Ir a la autoevaluación"
 },
 en:{
  eyebrow:"EXECUTIVE BUSINESS GUIDANCE",title:"Practice the decisions leadership demands.",
  intro:"Work through leadership, communication and management situations with guided exercises, clear criteria and actions you can apply in your business.",
  try:"Try an example",programs:"Explore the approach",demo:"Delegation practice lab",
  note:"Interactive demonstration with prepared options and responses. This is not an AI conversation, a diagnosis or an evaluation of your team.",
  case:"I delegated a task and ended up doing it myself.",
  facts:"Illustrative case: you asked your team for a report. It was incomplete and you finished it yourself. We do not yet know what was agreed or what prevented completion.",
  start:"Start practice",step:"Step",question:"What was agreed before the report was requested?",
  choices:["I only asked for the report; we did not define criteria or a precise deadline.","We defined the outcome, deadline and acceptance criteria.","I am not clear on what we agreed."],
  feedback:[
   "This case lacks verifiable agreements. Clarify them before attributing the outcome to a lack of ability or commitment. This does not establish that unclear agreements are the only cause.",
   "Agreements are a starting point, not proof that resources or understanding were sufficient. Review access to information, workload, questions, follow-up and delivery before drawing conclusions.",
   "First recover the request and discuss it with the other person. Missing information does not establish who failed or why."
  ],
  next:"Prepare an action",back:"Back",review:"Reading the case",task:"Prepare a follow-up conversation",
  taskDesc:"Complete a practice worksheet. Use fictional or general details: do not enter names, confidential information or sensitive personal details.",
  labels:["Expected outcome","Owner or role","Date or timing","Acceptance criteria","Next review"],
  examples:["List of open items with status and next action","Operations owner","Friday before noon","Each item has an owner, date and identified blocker","Interim review on Thursday at 16:00"],
  sample:"Load illustrative example",finish:"View my worksheet",required:"Complete all five fields to generate your worksheet.",
  result:"Your practice worksheet",resultNote:"You prepared an action. Applying it and checking what happens are still pending; this worksheet does not establish improvement.",
  script:"Conversation rehearsal",scriptIntro:"Adapt this structure:",
  scriptBody:"Let us agree on the outcome, its owner and when we will review it. These are the acceptance criteria. What questions or missing resources remain? If a blocker arises, let us define when to flag it and who can resolve it.",
  reflection:"After applying it, review: what was agreed, what happened and what remains open? Separate observations from interpretation.",
  download:"Download worksheet (.txt)",reset:"Restart practice",edit:"Edit worksheet",
  privacy:"Your worksheet and choices stay in this page's memory. They are not sent to a server or an AI. Reloading or leaving the page clears them; downloading creates a file on your device.",
  scope:"How guidance works",scopeText:"Choose a situation, examine facts and interpretations, practice a response, define an action and review its application. Guidance develops judgment through practice; decision-makers retain responsibility.",
  program:"Program in development",programTitle:"Self-management and difficult conversations for leaders",
  programText:"A proposal for twenty sessions in four cycles: responding under pressure, realistic self-assessment, boundaries and difficult conversations, and uncertainty and consistency. Educational content, not therapy or a guarantee of results.",
  status:"The demonstration is available. Dates and registration for the full program are not confirmed. No academic accreditation is offered.",
  ask:"Ask about the program",business:"Need to review how your business operates?",businessText:"The business self-assessment is a separate tool covering practices across six business areas. This worksheet is not used to score you.",assessment:"Go to self-assessment"
 }
};
export default function Orientation(){
 const {lang}=useLanguage(); const c=copy[lang];
 const [step,setStep]=useState(0); const [choice,setChoice]=useState<number|null>(null);
 const [fields,setFields]=useState<string[]>(["","","","",""]);
 const heading=useRef<HTMLHeadingElement>(null);
 const complete=fields.every(value=>value.trim().length>0);
 function move(value:number){setStep(value); requestAnimationFrame(()=>heading.current?.focus());}
 function reset(){setChoice(null);setFields(["","","","",""]);move(0);}
 function download(){
  if(choice===null||!complete)return;
  const text=[c.eyebrow,c.note,"",c.case,c.choices[choice],c.feedback[choice],"",...c.labels.map((label,i)=>label+": "+fields[i]),"",c.scriptBody,"",c.resultNote,c.reflection].join("\n");
  const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
  const anchor=document.createElement("a");anchor.href=url;anchor.download="Yhopping-ficha-delegacion.txt";anchor.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <div className="orientation-page">
  <section className="orientation-hero"><div className="design-container">
   <span className="design-kicker">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.intro}</p>
   <div className="orientation-actions"><a className="design-button" href="#ejemplo">{c.try}</a><a className="orientation-secondary" href="#enfoque">{c.programs} →</a></div>
  </div></section>
  <section className="orientation-section" id="ejemplo"><div className="design-container orientation-lab">
   <aside><span className="design-kicker">{c.demo}</span><h2>{c.case}</h2><p>{c.facts}</p><p className="orientation-note">{c.note}</p><p className="orientation-note">{c.privacy}</p></aside>
   <div className="orientation-card">
    <div className="orientation-progress" aria-label={lang==="es"?"Progreso de la demostración":"Demonstration progress"}>{[0,1,2,3].map(i=><span key={i} aria-current={step===i?"step":undefined}>{String(i+1).padStart(2,"0")}</span>)}</div>
    <h3 ref={heading} tabIndex={-1}>{step===0?c.demo:step===1?c.question:step===2?c.task:c.result}</h3>
    {step===0&&<><p>{c.note}</p><p>{c.facts}</p><button className="design-button" type="button" onClick={()=>move(1)}>{c.start} →</button></>}
    {step===1&&<><fieldset className="orientation-options"><legend className="sr-only">{c.question}</legend>{c.choices.map((text,i)=><label key={text} className={choice===i?"is-selected":""}><input type="radio" name="delegation-context" checked={choice===i} onChange={()=>setChoice(i)}/><span>{text}</span></label>)}</fieldset>{choice!==null&&<div className="orientation-feedback" role="status"><h4>{c.review}</h4><p>{c.feedback[choice]}</p></div>}<div className="orientation-actions"><button className="design-text-button" type="button" onClick={()=>move(0)}>{c.back}</button><button className="design-button" type="button" disabled={choice===null} onClick={()=>move(2)}>{c.next} →</button></div></>}
    {step===2&&<><p>{c.taskDesc}</p><button className="design-text-button" type="button" onClick={()=>setFields([...c.examples])}>{c.sample} ↗</button><form onSubmit={event=>{event.preventDefault();if(complete&&choice!==null)move(3);}}>{c.labels.map((label,i)=><div className="orientation-field" key={i}><label htmlFor={"orientation-field-"+i}>{label}</label><input id={"orientation-field-"+i} value={fields[i]} maxLength={500} required autoComplete="off" onChange={event=>setFields(fields.map((value,index)=>index===i?event.target.value:value))}/></div>)}{!complete&&<p className="orientation-note">{c.required}</p>}<div className="orientation-actions"><button className="design-text-button" type="button" onClick={()=>move(1)}>{c.back}</button><button className="design-button" type="submit" disabled={!complete}>{c.finish} →</button></div></form></>}
    {step===3&&<><p className="orientation-feedback">{c.resultNote}</p><dl className="orientation-sheet">{c.labels.map((label,i)=><div key={i}><dt>{label}</dt><dd>{fields[i]}</dd></div>)}</dl><h4>{c.script}</h4><p>{c.scriptIntro}</p><blockquote>{c.scriptBody}</blockquote><p>{c.reflection}</p><div className="orientation-actions"><button className="design-button" type="button" onClick={download}>{c.download}</button><button className="design-text-button" type="button" onClick={()=>move(2)}>{c.edit}</button><button className="design-text-button" type="button" onClick={reset}>{c.reset}</button></div><Link className="orientation-secondary" href="/contacto">{c.ask} →</Link></>}
   </div>
  </div></section>
  <section className="orientation-section orientation-soft" id="enfoque"><div className="design-container orientation-lab"><div><span className="design-kicker">YHOPPING</span><h2>{c.scope}</h2><p>{c.scopeText}</p></div><div className="orientation-card"><span className="design-kicker">{c.program}</span><h3>{c.programTitle}</h3><p>{c.programText}</p><p className="orientation-note">{c.status}</p><Link className="design-button" href="/contacto">{c.ask} →</Link></div></div></section>
  <section className="orientation-section"><div className="design-container"><h2>{c.business}</h2><p>{c.businessText}</p><Link className="design-text-button" href="/diagnostico-empresarial">{c.assessment} →</Link></div></section>
 </div>;
}
