export function initializeConference(){
const cleanups=[];const listen=(target,type,fn,opts)=>{target.addEventListener(type,fn,opts);cleanups.push(()=>target.removeEventListener(type,fn,opts))};let disposed=false;const frames=new Set();
const requestAnimationFrame=fn=>{if(disposed)return 0;const id=window.requestAnimationFrame(t=>{frames.delete(id);if(!disposed)fn(t)});frames.add(id);return id};
const addEventListener=(type,fn,opts)=>{window.addEventListener(type,fn,opts);cleanups.push(()=>window.removeEventListener(type,fn,opts))};
const NativeObserver=window.IntersectionObserver;const IntersectionObserver=class extends NativeObserver{constructor(...args){super(...args);cleanups.push(()=>this.disconnect())}};


const gallery=document.querySelector('.gallery');const originals=[...gallery.children];originals.forEach(el=>gallery.append(el.cloneNode(true)));const cards=[...gallery.children];let last=0,phase=0;const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;function rotateGallery(t){const dt=last?Math.min((t-last)/1000,.05):0;last=t;if(!calm)phase+=dt*.22;const step=innerWidth<760? .37:.275;const radius=innerWidth<760?450:950;cards.forEach((card,i)=>{let slot=((i+phase+5)%10)-5;const a=slot*step;const x=Math.sin(a)*radius;const z=(1-Math.cos(a))*radius;card.style.transform='translate(-50%,-50%) translate3d('+x+'px,0,'+z+'px) rotateY('+(-a*180/Math.PI)+'deg)';card.style.visibility=Math.abs(a)>1.23?'hidden':'visible'});requestAnimationFrame(rotateGallery)}requestAnimationFrame(rotateGallery);
const audienceCards=[...document.querySelectorAll('.audience-card')];function openAudience(card){audienceCards.forEach(item=>{const active=item===card;item.classList.toggle('active',active);item.setAttribute('aria-expanded',String(active))})}audienceCards.forEach(card=>{listen(card,'click',()=>openAudience(card));listen(card,'pointerenter',e=>{if(e.pointerType==='mouse')openAudience(card)});listen(card,'focus',()=>openAudience(card))});
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.about-fact,.about-right h3,.about-right p').forEach((el,i)=>{el.classList.add('scroll-reveal');el.style.transitionDelay=(i%3)*100+'ms';revealObserver.observe(el)});
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const end=Number(el.dataset.count);counterObserver.unobserve(el);if(reduceMotion)return;const start=performance.now();function count(t){const progress=Math.min(1,(t-start)/1600);const eased=1-Math.pow(1-progress,3);el.textContent=Math.floor(end*eased);if(progress<1)requestAnimationFrame(count);else el.textContent=end}requestAnimationFrame(count)}),{threshold:.8});document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));


(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const experienceSection = document.querySelector('.experience-scroll');
  const experienceTabs = [...document.querySelectorAll('[data-experience]')];
  const experienceImages = [...document.querySelectorAll('.experience-image')];
  let activeExperience = -1;
  function setExperience(index) {
    if (activeExperience === index) return;
    activeExperience = index;
    experienceTabs.forEach((tab, n) => {
      tab.classList.toggle('active', n === index);
      tab.setAttribute('aria-selected', String(n === index));
      tab.tabIndex = n === index ? 0 : -1;
      experienceImages[n].classList.toggle('active', n === index);
      experienceImages[n].hidden = n !== index;
    });
  }
  let scrollPending = false;
  function updateExperience() {
    scrollPending = false;
    if (innerWidth <= 760 || reduced) return;
    const rect = experienceSection.getBoundingClientRect();
    const distance = experienceSection.offsetHeight - innerHeight;
    const progress = Math.max(0, Math.min(.9999, -rect.top / Math.max(1, distance)));
    setExperience(Math.floor(progress * experienceTabs.length));
  }
  addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateExperience); }
  }, {passive:true});
  addEventListener('resize', updateExperience);
  experienceTabs.forEach((tab, index) => {
    function activate() {
      setExperience(index);
      if (innerWidth > 760 && !reduced) {
        const sectionTop = experienceSection.getBoundingClientRect().top + scrollY;
        const distance = experienceSection.offsetHeight - innerHeight;
        scrollTo({top:sectionTop + distance * ((index + .2) / experienceTabs.length), behavior:'smooth'});
      }
    }
    listen(tab,'click', activate);
    listen(tab,'keydown', event => {
      let next = index;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % experienceTabs.length;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + experienceTabs.length) % experienceTabs.length;
      else return;
      event.preventDefault(); experienceTabs[next].focus(); experienceTabs[next].click();
    });
  });
  setExperience(0); updateExperience();
  const priceButtons = [...document.querySelectorAll('[data-price-mode]')];
  priceButtons.forEach(button => listen(button,'click', () => {
    const mode = button.dataset.priceMode;
    priceButtons.forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    document.querySelectorAll('[data-early]').forEach(price => { price.textContent = price.dataset[mode]; });
  }));
  document.querySelectorAll('[data-pass]').forEach(link => listen(link,'click', () => {
    document.querySelector('#registration-pass').value = link.dataset.pass;
  }));
  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach(item => {
    const button = item.querySelector('button');
    listen(button,'click', () => {
      const open = !item.classList.contains('open');
      faqItems.forEach(other => {
        const active = other === item && open;
        other.classList.toggle('open', active);
        other.querySelector('button').setAttribute('aria-expanded', String(active));
        other.querySelector('.faq-answer').inert = !active;
      });
    });
  });
  const form = document.querySelector('#registration-form');
  const review = document.querySelector('#registration-review');
  listen(form,'submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const dl = document.createElement('dl');
    const passNames = {community:'Community',founder:'Founder',team:'Team · 3 passes'};
    [['Name', fields.get('name')],['Email',fields.get('email')],['Stage',fields.get('stage')],['Pass',passNames[fields.get('pass')]]].forEach(([label, value]) => {
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      dl.append(dt, dd);
    });
    document.querySelector('#registration-summary').replaceChildren(dl);
    review.showModal();
  });
  review.querySelectorAll('.dialog-close,.dialog-done').forEach(button => listen(button,'click', () => review.close()));
  const video = document.querySelector('#registration-video');
  if (video && reduced) { video.autoplay = false; video.pause(); }
})();


return ()=>{disposed=true;frames.forEach(id=>window.cancelAnimationFrame(id));cleanups.forEach(fn=>fn());document.querySelectorAll('.gallery .photo').forEach((e,i)=>{if(i>=5)e.remove()})};
}