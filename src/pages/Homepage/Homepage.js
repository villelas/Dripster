import React, { useEffect, useRef } from 'react';
import './Homepage.css';
import gsap from 'gsap';
import '../../components/Header/Header.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Homepage() {
  const gooWrapperRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = () => {
    navigate('/sign-in'); // Navigate to the sign-in page
  };

  useEffect(() => {
    const drops = gsap.utils.toArray('.drop');
    const h1Element = document.querySelector('.goo h1');

    if (!h1Element || drops.length === 0) {
      console.warn("Required elements are not present in the DOM");
      return;
    }

    const h1Rect = h1Element.getBoundingClientRect();

    drops.forEach((drop, i) => {
      const duration = gsap.utils.random(8, 12);
      const delay = i * 1.5;

      gsap.fromTo(
        drop,
        {
          x: gsap.utils.random(h1Rect.left, h1Rect.right) - h1Rect.width / 2,
          y: h1Rect.bottom + 20 + window.scrollY,
          scale: gsap.utils.random(0.8, 1.2),
          opacity: 0.7,
        },
        {
          x: `+=${gsap.utils.random(-20, 20)}`,
          y: '85vh',
          opacity: 1,
          duration,
          delay,
          repeat: -1,
          ease: 'power1.in',
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
      {/* Add Header component */}
      <div className="top-header">
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#creator">Creator</a>
          <a href="#ai-agent">AI Agent</a>
          <a href="#color-theory">Color Theory</a>
        </nav>
      </div>

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
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -9"
                result="goo"
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
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Homepage;