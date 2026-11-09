"use client";
import {cn} from "@/lib/utils";
import mediafounderworkshopwebp from "@/src/assets/images/founder-workshop.webp";
import mediaconferencetalkwebp from "@/src/assets/images/conference-talk.webp";
import mediafoundernetworkingwebp from "@/src/assets/images/founder-networking.webp";
import mediafoundermentoringwebp from "@/src/assets/images/founder-mentoring.webp";
import mediaproductsessionwebp from "@/src/assets/images/product-session.webp";
interface HeroProps{className?:string}
export default function Hero({className}:HeroProps){return (<section className={cn("hero",className)} aria-labelledby="hero-title">

<div className="hero-inner" id="top">
<div className="eyebrow"><span></span> YOUR FIRST COMPANY STARTS HERE</div>
<div className="gallery-wrap" aria-label="Scenes of founders learning, sharing, and building together">
<div className="fade left"></div><div className="fade right"></div>
<div className="gallery" aria-hidden="true">
<div className="photo"><img src={mediafounderworkshopwebp.src} alt="People collaborating around a table in a shared workspace." /></div><div className="photo"><img src={mediaconferencetalkwebp.src} alt="Attendees gathered for a conference in a large event hall." /></div><div className="photo"><img src={mediafoundernetworkingwebp.src} alt="Business professionals exchanging ideas at a meeting." /></div><div className="photo"><img src={mediafoundermentoringwebp.src} alt="Colleagues discussing work around a laptop." /></div><div className="photo"><img src={mediaproductsessionwebp.src} alt="A team discussing product plans in a workshop." /></div>
</div>
</div>
<div className="headline-row">

<h1 id="hero-title">FORGE</h1><p className="hero-description">Meet fellow founders, learn from real experiences,<br className="hero-copy-break" /> and take the next step toward your first company.</p>

</div>
<div className="hero-meta"><div className="side-note">© 2027</div><div className="side-note right">MARCH 13, 2027<br />NEW YORK CITY</div></div>
<div className="hero-ruler" aria-hidden="true"></div><div className="bottom-bar">
<div className="bottom-label"><strong>FORGE · First-Time Founders Conference</strong><span>·</span><span>For the next generation of builders</span></div>
<a className="scroll-link" href="#event-details">Explore the conference</a>
</div>
</div>
</section>);}
