import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement>{className?:string}
export default function Badge({className,...props}:BadgeProps){return <span className={cn("inline-flex rounded-full bg-[#EBEBEB] px-3 py-1 text-sm text-[#141516]",className)} {...props}/>}
