import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../../assets/silhouette-de-femme.png';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Animation de flou pour la photo (déjà présente)
    gsap.registerPlugin(ScrollTrigger);
    const image = imgRef.current;
    const hero = heroRef.current;
    if (!image || !hero) return;
    const tween = gsap.to(image, {
      filter: 'blur(20px)',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, []);

  // Génère les lettres du titre
  const heading = 'Pauline';
  const letters = heading.split('').map((char, index) => (
    <span key={index} className="letter" style={{ '--i': index }}>
      {char}
    </span>
  ));

  return (
    <section ref={heroRef} className="hero-section">
      <h1 className="hero-word" aria-label="PAULINE">{letters}</h1>
      <img
        ref={imgRef}
        src={profileImg}
        alt="Portrait of Pauline"
        className="hero-overlay-image"
      />
    </section>
  );
}
