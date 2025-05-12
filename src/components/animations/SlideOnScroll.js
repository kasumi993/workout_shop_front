// components/animations/SlideOnScroll.js
import React, { useRef, useEffect, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SlideOnScroll({ children, animationType = 'slide-bottom', trigger, start = 'top 80%', end = 'bottom 20%', endOpacity = 1, forwardedRef }) {
  const elementRef = useRef(null); // Ref interne pour l'élément animé

  useEffect(() => {
    const element = forwardedRef || elementRef; // Utilise forwardedRef si disponible, sinon ref interne

    if (element.current && typeof window !== 'undefined') {
      let animationTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || element.current,
          start: start,
          end: end,
          markers: false,
          once: true, // L'animation ne se déclenche qu'une seule fois
        },
      });

      switch (animationType) {
        case 'slide-bottom':
          animationTimeline.fromTo(element.current, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: endOpacity, duration: 1, ease: 'power2.out' });
          break;
        case 'slide-top':
          animationTimeline.fromTo(element.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: endOpacity, duration: 1, ease: 'power2.out' });
          break;
        case 'slide-left':
          animationTimeline.fromTo(element.current, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: endOpacity, duration: 1, ease: 'power2.out', delay: 0.3 });
          break;
        case 'slide-right':
          animationTimeline.fromTo(element.current, { xPercent: +100, opacity: 0 }, { xPercent: 0, opacity: endOpacity, duration: 1, ease: 'power2.out', delay: 0.3 });
          break;
        case 'fade-in':
          animationTimeline.fromTo(element.current, { opacity: 0 }, { opacity: endOpacity, duration: 1, delay: 0.3, ease: 'power2.out' });
          break;
        // Ajoutez d'autres cas pour vos animations standardisées
        default:
          break;
      }

      // Cleanup function to kill ScrollTrigger instance
      return () => {
        if (animationTimeline && animationTimeline.scrollTrigger) {
          animationTimeline.scrollTrigger.kill();
        }
      };
    }
  }, [animationType, trigger, start, end, endOpacity, forwardedRef]);

  const child = React.Children.only(children);

  return React.cloneElement(child, {
    ref: forwardedRef || elementRef, // Attache la ref à l'enfant
  });
}

const result = (props, ref) => <SlideOnScroll {...props} forwardedRef={ref} />;

export default forwardRef(result);