"use client";
import {useEffect} from "react";
import {initializeConference} from "@/lib/conference-effects";
import Navbar from "@/components/all-components/navbar";
import Hero from "@/components/all-components/hero";
import About from "@/components/all-components/about";
import Audience from "@/components/all-components/audience";
import Learning from "@/components/all-components/learning";
import Speakers from "@/components/all-components/speakers";
import Agenda from "@/components/all-components/agenda";
import Experience from "@/components/all-components/experience";
import Venue from "@/components/all-components/venue";
import Tickets from "@/components/all-components/tickets";
import Faq from "@/components/all-components/faq";
import Registration from "@/components/all-components/registration";
import Footer from "@/components/all-components/footer";
import RegistrationReview from "@/components/all-components/registration-review";

export default function Page(){useEffect(()=>initializeConference(),[]);return <main><Navbar /><Hero /><About /><Audience /><Learning /><Speakers /><Agenda /><Experience /><Venue /><Tickets /><Faq /><Registration /><Footer /><RegistrationReview /></main>}