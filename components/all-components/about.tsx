"use client";
import {useEffect,useRef,useState} from "react";
import {motion,useReducedMotion,useScroll,useTransform} from "framer-motion";
import {Compass,Target,Users,Lightbulb} from "lucide-react";
import {cn} from "@/lib/utils";
import workshop from "@/src/assets/images/founder-workshop.webp";
interface AboutProps {className?:string}
export default function About({className}:AboutProps){
 const section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),slot=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();const [frame,setFrame]=useState({left:0,top:0,width:0,height:0,vw:0,vh:0});
 const {scrollYProgress}=useScroll({target:section,offset:["start start","end end"]});
 useEffect(()=>{const measure=()=>{if(!stage.current||!slot.current)return;const a=stage.current.getBoundingClientRect(),b=slot.current.getBoundingClientRect();setFrame({left:b.left-a.left,top:b.top-a.top,width:b.width,height:b.height,vw:stage.current.clientWidth,vh:stage.current.clientHeight})};measure();const observer=new ResizeObserver(measure);if(stage.current)observer.observe(stage.current);window.addEventListener('resize',measure);return()=>{observer.disconnect();window.removeEventListener('resize',measure)}},[]);
 const left=useTransform(scrollYProgress,[.08,.85],[frame.left,0]),top=useTransform(scrollYProgress,[.08,.85],[frame.top,0]);
 const width=useTransform(scrollYProgress,[.08,.85],[frame.width,frame.vw]),height=useTransform(scrollYProgress,[.08,.85],[frame.height,frame.vh]);
 const radius=useTransform(scrollYProgress,[.08,.85],[20,0]),opacity=useTransform(scrollYProgress,[.08,.5],[1,0]);
 const cardOpacity=useTransform(scrollYProgress,[.82,.95],[0,1]);
 const cardY=useTransform(scrollYProgress,[.82,.95],[50,0]);
 const animate=frame.vw>900&&!reduced;
 const cards=[{title:'Ways to move forward',text:'Practical talks, workshops, and conversations to help you start.',Icon:Users},{title:'Shared ambition',text:'Build your first company with a clear and useful next step.',Icon:Target},{title:'Our mission',text:'Give new founders the guidance and connections to move forward.',Icon:Compass},{title:'Our vision',text:'Help promising ideas find the support to become real businesses.',Icon:Lightbulb}];
 return <section ref={section} className={cn("about-redesign about-expand-scene",className)} id="event-details"><div ref={stage} className="about-expand-stage">
 <motion.header className="center-heading" style={animate?{opacity}:undefined}><h2>Make your first<br/>move count.</h2><p>Practical learning and new connections for your first company.</p></motion.header>
 <div className="about-feature-grid">
 <motion.div className="about-feature-column" style={animate?{opacity}:undefined}>{cards.slice(0,2).map(({title,text,Icon})=><article className="about-feature-card" key={title}><span className="feature-icon"><Icon size={24}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</motion.div>
 <div ref={slot} className="about-image-slot">{!animate&&<div className="about-feature-image"><img src={workshop.src} alt="Founders working together during a practical workshop."/></div>}</div>
 <motion.div className="about-feature-column" style={animate?{opacity}:undefined}>{cards.slice(2).map(({title,text,Icon})=><article className="about-feature-card" key={title}><span className="feature-icon"><Icon size={24}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</motion.div>
 </div>
 {animate&&<motion.div className="about-expanding-image" style={{left,top,width,height,borderRadius:radius}}><img src={workshop.src} alt="Founders collaborating in a workshop, expanding to fill the screen as you scroll."/></motion.div>}
 <motion.article className="about-image-story" style={animate?{opacity:cardOpacity,y:cardY}:undefined}><h2>A conference built<br/>for the beginning.</h2><p>Honest founder stories, practical discussions, and people on a similar journey. Find the clarity to take your next step.</p></motion.article>
 </div></section>
}
