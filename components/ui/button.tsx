import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva,type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";
const variants=cva("inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0048D8] disabled:opacity-50",{variants:{variant:{default:"bg-[#0048D8] text-[#FFFFFF] hover:bg-[#141516]",outline:"border border-[#566173] bg-[#FFFFFF] text-[#141516]",ghost:"text-[#141516] hover:bg-[#EBEBEB]"},size:{default:"px-6 py-3",sm:"px-4 py-2",lg:"px-8 py-4"}},defaultVariants:{variant:"default",size:"default"}});
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof variants>{className?:string;asChild?:boolean}
export default function Button({className,variant,size,asChild=false,...props}:ButtonProps){const Comp=asChild?Slot:"button";return <Comp className={cn(variants({variant,size}),className)} {...props}/>}
