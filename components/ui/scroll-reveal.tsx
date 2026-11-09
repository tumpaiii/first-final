"use client";
import {Children,Fragment,isValidElement,useRef,type ReactNode} from "react";
import {motion,useScroll,useTransform,useReducedMotion,type MotionValue} from "framer-motion";
import {cn} from "@/lib/utils";
interface ScrollRevealProps{className?:string;children:ReactNode}
function Word({children,progress,index,total}:{children:string;progress:MotionValue<number>;index:number;total:number}){
 const opacity=useTransform(progress,[index/(total+3),(index+4)/(total+3)],[0.15,1]);
 const filter=useTransform(progress,[index/(total+3),(index+4)/(total+3)],["blur(4px)","blur(0px)"]);
 return <motion.span style={{opacity,filter,display:"inline-block"}}>{children}</motion.span>;
}
export default function ScrollReveal({className,children}:ScrollRevealProps){
 const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:["start 94%","end 64%"]});
 const rotate=useTransform(scrollYProgress,[0,1],[2,0]);
 const parts:ReactNode[]=[];let count=0;
 Children.forEach(children,child=>{if(typeof child==="string")child.split(/(\s+)/).forEach(word=>{parts.push(word);if(word.trim())count++});else if(isValidElement(child))parts.push(child)});
 let index=0;
 return <motion.span ref={ref} className={cn("block origin-left",className)} style={reduced?undefined:{rotate}}>{reduced?children:parts.map((part,i)=>typeof part==="string"&&part.trim()?<Word key={i} progress={scrollYProgress} index={index++} total={count}>{part}</Word>:<Fragment key={i}>{part}</Fragment>)}</motion.span>;
}
