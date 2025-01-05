import React, { useEffect, useRef } from 'react';
import './Homepage.css';
import gsap from 'gsap';

function Homepage() {
  const gooWrapperRef = useRef(null);

  useEffect(() => {
    const createSplash = (drop) => {
      const splash = document.createElement('div');
      splash.classList.add('splash');

      const dropRect = drop.getBoundingClientRect();
      const parentRect = document.querySelector('.goo').getBoundingClientRect();

      const left = dropRect.left - parentRect.left + dropRect.width / 2;
      const top = parentRect.height - 10;

      splash.style.left = `${left}px`;
      splash.style.top = `${top}px`;

      const parent = document.querySelector('.goo');
      parent.appendChild(splash);

      gsap.to(splash, {
        scale: 5,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => splash.remove(),
      });
    };

    const drops = gsap.utils.toArray('.drop');
    const h1Element = document.querySelector('.goo h1');

    if (!h1Element || drops.length === 0) return;

    const h1Rect = h1Element.getBoundingClientRect();

    drops.forEach((drop, i) => {
      const duration = gsap.utils.random(8, 12); // Randomized duration
      const delay = i * 1.5; // Staggered start
      let splashTriggered = false;

      gsap.fromTo(
        drop,
        {
          x: gsap.utils.random(h1Rect.left, h1Rect.right) - h1Rect.width / 2, // Start within h1 width
          y: h1Rect.bottom + 20 + window.scrollY, // Start slightly lower than h1
          scale: gsap.utils.random(0.8, 1.2), // Slight size variation
          opacity: 0.7,
        },
        {
          x: `+=${gsap.utils.random(-20, 20)}`, // Add slight horizontal drift
          y: '85vh', // Drops end slightly above the bottom
          opacity: 1,
          duration,
          delay,
          repeat: -1, // Infinite loop
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
              }, 500);
            }
          },
          onStart: () => {
            gsap.set(drop, {
              x: gsap.utils.random(h1Rect.left, h1Rect.right) - h1Rect.width / 2,
              y: h1Rect.bottom + window.scrollY,
              opacity: 0,
              scale: gsap.utils.random(0.8, 1.2),
            });
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <div className="goo-wrapper" ref={gooWrapperRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 0 0"
          width="0"
          height="0"
          style={{ display: 'none' }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
                result="goo"
              />
            </filter>
            <filter id="goo-light">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 10 -5"
                result="goo-light"
              />
            </filter>
          </defs>
        </svg>
        <div className="goo">
          <h1>DripSter</h1>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
        </div>
      </div>
      <div className="subheading">Welcome to the drip experience</div>
      <div className="sign-in-wrapper">
        <button className="sign-in-button">Sign In</button>
      </div>
    </div>
  );
}

export default Homepage;
