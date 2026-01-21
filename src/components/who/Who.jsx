import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Who.css";
import plan from "../../assets/plan.webp";
import lit from "../../assets/lit.webp";
import cervin from "../../assets/cervin.webp";
import tronc from "../../assets/tronc.webp";
import adobe from "../../assets/adobe.webp";
import troisDS from "../../assets/3ds-max.png";
import autocad from "../../assets/autocad.png";
import chamois from "../../assets/chamois.webp";

gsap.registerPlugin(ScrollTrigger);
if (ScrollTrigger.isTouch) {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function Who() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const whoRef = useRef(null);
  const heroRef = useRef(null);
  const afterRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const who = whoRef.current;
    const hero = heroRef.current;
    const after = afterRef.current;
    if (!wrap || !track || !who || !hero || !after) return;

    const PALETTE = [
      "#010101",
      "#BA915B",
      "#8393D6",
      "#00A6D4",
      "#00D68F",
      "#FFD166",
    ];
    const COVER = 0.95;
    const BREATH = 24;

    const getMaxCapPx = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 1200;
      if (w >= 1024) return 720;
      if (w >= 768) return 560;
      return 420;
    };

    const computeMetrics = () => {
      gsap.set(who, { scaleY: 1, y: 0, transformOrigin: "50% 0%" });
      const whoH = who.getBoundingClientRect().height;

      const cs = getComputedStyle(hero);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const padBot = parseFloat(cs.paddingBottom) || 0;
      const heroInnerH = hero.getBoundingClientRect().height - padTop - padBot;

      const capPx = getMaxCapPx();
      const targetH = Math.min(heroInnerH * COVER, capPx);
      const sFinal = targetH / Math.max(1, whoH);
      const yFinal = (heroInnerH - whoH * sFinal) / 2;

      gsap.set(who, { scaleY: 0.001, y: BREATH, transformOrigin: "50% 0%" });
      return { sFinal: Math.max(1, sFinal), yFinal };
    };

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setSizes = () => {
      after.style.height = distance() + "px";
    };

    gsap.set(who, { scaleY: 0.001, y: BREATH, transformOrigin: "50% 0%" });
    gsap.set(track, { x: 0 });

    let metrics = computeMetrics();

    // Introduction de QUI?
    const stIntro = ScrollTrigger.create({
      trigger: wrap,
      start: "top 92%",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        const p = gsap.utils.clamp(0, 1, self.progress);
        const s = gsap.utils.interpolate(0.001, metrics.sFinal, p);
        const y = gsap.utils.interpolate(BREATH, metrics.yFinal, p);
        const snap = gsap.utils.snap(0.001);
        gsap.set(who, { scaleY: snap(s), y: Math.round(y) });
      },
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        metrics = computeMetrics();
        setSizes();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => ScrollTrigger.refresh())
        );
      });
    }

    // allège pendant le scroll : enlève le filtre uniquement lorsqu'il est actif
    ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: () => "+=" + distance(),
      onToggle: (self) => wrap.classList.toggle("is-scrolling", self.isActive),
    });

    // Horizontal
    const tweenH = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => "+=" + distance(),
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Couleurs
    gsap.set(wrap, { backgroundColor: PALETTE[0], color: "#fff" });
    const panels = Array.from(track.querySelectorAll(".panel"));

    for (let i = 0; i < Math.min(panels.length - 1, PALETTE.length - 1); i++) {
      const from = PALETTE[i],
        to = PALETTE[i + 1],
        nextPanel = panels[i + 1];
      gsap.fromTo(
        wrap,
        { backgroundColor: from },
        {
          backgroundColor: to,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: nextPanel,
            containerAnimation: tweenH,
            start: "left center",
            end: "left left",
            scrub: true,
          },
        }
      );
    }

    // --- Transition fluide Who -> Portfolio (#010101)
    const portfolio = document.querySelector(".portfolio");

    if (portfolio) {
      // Portfolio : entre en correspondant à la couleur actuelle de Who et fond vers #010101
      gsap.fromTo(
        portfolio,
        { backgroundColor: () => getComputedStyle(wrap).backgroundColor },
        {
          backgroundColor: "#010101",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: portfolio,
            start: "top bottom", // dès que le portfolio est sous le viewport
            end: "top 40%", // fond pendant la montée
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Who : en sortant, fond vers le même #010101 (pour que les bords coïncident)
      gsap.fromTo(
        wrap,
        { backgroundColor: () => getComputedStyle(wrap).backgroundColor },
        {
          backgroundColor: "#010101",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: portfolio,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // ====== ANIMATIONS DES STICKERS ======
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (mq) => {
        const { isMobile } = mq.conditions;
        const AMP = isMobile ? 1.4 : 2.0;

        const common = { ease: "none", force3D: true };

        // -------- P1 (horizontal)
        gsap.fromTo(
          ".p1 .s1",
          { xPercent: 40 * AMP, rotation: -6, scale: 0.98 },
          {
            xPercent: -40 * AMP,
            rotation: 6,
            scale: 1.02,
            ...common,
            scrollTrigger: {
              trigger: ".p1",
              containerAnimation: tweenH,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p1 .s2",
          { xPercent: 60 * AMP, rotation: -8, scale: 0.96 },
          {
            xPercent: -20 * AMP,
            rotation: 8,
            scale: 1.04,
            ...common,
            scrollTrigger: {
              trigger: ".p1",
              containerAnimation: tweenH,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );

        // -------- P2 (horizontal)
        const P2_START = "left 120%";
        const P2_END = "right -8%";
        gsap.set([".p2 .s1", ".p2 .s2", ".p2 .s3"], {
          transformOrigin: "50% 50%",
        });

        gsap.fromTo(
          ".p2 .s1",
          { yPercent: -12 * AMP, xPercent: -14, rotation: -16, scale: 0.93 },
          {
            yPercent: 56 * AMP,
            xPercent: 16,
            rotation: 18,
            scale: 1.12,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p2 .s2",
          { yPercent: 42 * AMP, xPercent: -10, rotation: -18, scale: 0.96 },
          {
            yPercent: -24 * AMP,
            xPercent: 28,
            rotation: 32,
            scale: 1.08,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p2 .s3",
          { yPercent: 4 * AMP, xPercent: 16, rotation: -12, scale: 0.97 },
          {
            yPercent: 46 * AMP,
            xPercent: -22,
            rotation: 14,
            scale: 1.07,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );

        // -------- P3 (horizontal)
        const P3_H_START = "left 92%";
        const P3_H_END = "right 8%";
        gsap.set([".p3 .s1", ".p3 .s2", ".p3 .s3"], {
          transformOrigin: "50% 50%",
        });

        gsap.fromTo(
          ".p3 .s1",
          { rotation: 0, xPercent: 0 },
          {
            rotation: 360,
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".p3",
              containerAnimation: tweenH,
              start: P3_H_START,
              end: P3_H_END,
              scrub: true,
            },
          }
        );

        const tlPastaH = gsap.timeline({
          scrollTrigger: {
            trigger: ".p3",
            containerAnimation: tweenH,
            start: P3_H_START,
            end: P3_H_END,
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        tlPastaH
          .to(
            ".p3 .s2",
            { xPercent: -32 * AMP, yPercent: 6 * AMP, rotation: 6 },
            0
          )
          .to(
            ".p3 .s2",
            { xPercent: -84 * AMP, yPercent: 18 * AMP, rotation: 12 },
            0.45
          );

        gsap.fromTo(
          ".p3 .s3",
          { yPercent: 6 * AMP, xPercent: 0, rotation: -2 },
          {
            yPercent: -28 * AMP,
            xPercent: 34,
            rotation: 14,
            ease: "none",
            scrollTrigger: {
              trigger: ".p3",
              containerAnimation: tweenH,
              start: P3_H_START,
              end: P3_H_END,
              scrub: true,
            },
          }
        );

        // ====== P3 — phase VERTICALE (placer dans le MÊME matchMedia) ======
        const vertStart = () => tweenH.scrollTrigger?.end || 0;
        const vertEnd = () => vertStart() + window.innerHeight * 1.5;
        const F = isMobile ? 1.2 : 1.0; // facteur légèrement différent sur mobile

        gsap.to(".p3 .s1", {
          rotation: "+=160",
          xPercent: "+=10",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-tronc",
            start: vertStart,
            end: vertEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".p3 .s2", {
          xPercent: () => `-=${28 * F}`,
          yPercent: () => `+=${10 * F}`,
          rotation: "+=8",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-cervin",
            start: vertStart,
            end: vertEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".p3 .s3", {
          xPercent: "+=30",
          yPercent: "-=24",
          rotation: "+=18",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-chamois",
            start: vertStart,
            end: vertEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    );

    // Force un rafraîchissement lorsque TOUTES les images (stickers) sont chargées
    const imgs = Array.from(track.querySelectorAll("img.sticker"));
    let loaded = 0;
    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) ScrollTrigger.refresh();
      } else
        img.addEventListener(
          "load",
          () => {
            loaded++;
            if (loaded === imgs.length) ScrollTrigger.refresh();
          },
          { once: true }
        );
    });

    // Redimensionnement/écouteurs
    const ro = new ResizeObserver(() => {
      setSizes();
      metrics = computeMetrics();
      ScrollTrigger.refresh();
    });
    ro.observe(track);
    ro.observe(hero);

    window.addEventListener("load", () => {
      setSizes();
      metrics = computeMetrics();
      ScrollTrigger.refresh();
    });

    setSizes();
    ScrollTrigger.refresh();

    return () => {
      stIntro.kill();
      tweenH.scrollTrigger?.kill();
      ScrollTrigger.getById("p3-vertical-tronc")?.kill();
      ScrollTrigger.getById("p3-vertical-cervin")?.kill();
      ScrollTrigger.getById("p3-vertical-chamois")?.kill();
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section className="who-wrap" ref={wrapRef}>
      <div className="who-sticky">
        <div className="who-track" ref={trackRef}>
          {/* HERO - QUI? centré */}
          <section className="panel hero" ref={heroRef}>
            <svg
              className="who-svg"
              viewBox="0 0 1000 300"
              preserveAspectRatio="xMidYMin meet"
              ref={whoRef}
            >
              <text
                x="50%"
                y="0"
                textAnchor="middle"
                dominantBaseline="text-before-edge"
                fontFamily="'Zalando Sans Expanded', sans-serif"
                fontWeight="900"
                fontSize="250"
                fill="currentColor"
              >
                QUI?
              </text>
            </svg>
          </section>

          {/* P1 — plan + tête de lit */}
          <section className="panel p1">
            <div className="panel-copy">
              <h2 className="panel-hl">Entre concept et réalité.</h2>
              <p className="panel-sl">
                Architecte d’intérieur, je crée des espaces qui racontent une{" "}
                <span className="brand">histoire</span> et accompagnent les
                usages.
              </p>
            </div>
            <div className="stickers">
              <img
                className="sticker s1"
                alt="plan"
                src={plan}
                loading="lazy"
                decoding="async"
              />
              <img
                className="sticker s2"
                alt="lit"
                src={lit}
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>

          {/* P2 — logos de la stack */}
          <section className="panel p2">
            <div className="panel-copy">
              <h2 className="panel-hl">De l’intuition au dessin.</h2>
              <p className="panel-sl">
                Plans, élévations, lumière, mobilier sur mesure, chaque projet
                avance avec précision.
              </p>
            </div>
            <div className="stickers">
              <img
                className="sticker s1"
                alt="3ds-max"
                src={troisDS}
                loading="lazy"
                decoding="async"
              />
              <img
                className="sticker s2"
                alt="autocad"
                src={autocad}
                loading="lazy"
                decoding="async"
              />
              <img
                className="sticker s3"
                alt="adobe"
                src={adobe}
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>

          {/* P3 — Naples + NYC */}
          <section className="panel p3">
            <div className="panel-copy">
              <h2 className="panel-hl">Des Alpes aux projets.</h2>
              <p className="panel-sl">
                Un regard nourri par les montagnes, les matériaux bruts et le
                goût du détail.
              </p>
            </div>
            <div className="stickers">
              <img
                className="sticker s1"
                alt="tronc"
                src={tronc}
                loading="lazy"
                decoding="async"
              />
              <img
                className="sticker s2"
                alt="cervin"
                src={cervin}
                loading="lazy"
                decoding="async"
              />
              <img
                className="sticker s3"
                alt="Photo of a chamois"
                src={chamois}
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="who-after-spacer" ref={afterRef} />
    </section>
  );
}
