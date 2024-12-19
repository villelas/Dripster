import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Homepage.css';

function Homepage() {
  useEffect(() => {
    // Drops Animation
    gsap.utils.toArray('.drop').forEach((drop, i) => {
      const duration = gsap.utils.random(8, 12); // Randomized duration
      const delay = i * 1.5; // Staggered start
      let splashTriggered = false;
  
      gsap.to(drop, {
        y: '85vh', // Drops end slightly above the bottom
        opacity: 1,
        duration,
        repeat: -1, // Infinite loop
        delay,
        ease: 'power1.in',
        onUpdate: () => {
          const dropRect = drop.getBoundingClientRect();
          const parentRect = document.querySelector('.goo').getBoundingClientRect();
          const bottomY = parentRect.height - 10;
  
          if (dropRect.top + dropRect.height >= bottomY && !splashTriggered) {
            splashTriggered = true;
            createSplash(drop);
  
            setTimeout(() => {
              splashTriggered = false;
            }, duration * 1000);
          }
        },
        onStart: () => {
          gsap.set(drop, { y: '-10vh', opacity: 0 });
        },
      });
    });
  
    const createSplash = (drop) => {
      const splash = document.createElement('div');
      splash.classList.add('splash');
  
      const parent = document.querySelector('.goo');
      parent.appendChild(splash);
  
      const dropRect = drop.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
  
      const left = dropRect.left - parentRect.left + dropRect.width / 2;
      const top = parentRect.height - 10;
  
      splash.style.left = `${left}px`;
      splash.style.top = `${top}px`;
  
      gsap.to(splash, {
        scale: 5,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => splash.remove(),
      });
    };
  
    
  }, []);
  
  return (
    <div>
      {/* Hidden SVG for the gooey effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 0 0" width="0" height="0" style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Gooey animation container */}
      <div className="goo">
        <h1>DripSter</h1>
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
        <button class="sign-in-button">Get Your Drip On</button>
      </div>
    </div>
  );
}

export default Homepage;
