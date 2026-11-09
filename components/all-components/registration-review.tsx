"use client";
import {cn} from "@/lib/utils";

interface RegistrationReviewProps{className?:string}
export default function RegistrationReview({className}:RegistrationReviewProps){return (<dialog className={cn("registration-review",className)} id="registration-review"><button type="button" className="dialog-close" aria-label="Close registration review">×</button><h2>Your next step,<br />at a glance.</h2><div id="registration-summary"></div><p>March 13, 2027 · The Glasshouse, New York. No reservation or payment has been made. Keep these details ready for registration.</p><button className="primary-button dialog-done" type="button">Got it</button></dialog>);}
