import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";
import basicLogo from "../../assets/cern-logo.png";
import cern1 from "../../assets/cern-a.webp";
import cern2 from "../../assets/cern-b.webp";
import cern3 from "../../assets/cern-c.webp";
import cern4 from "../../assets/cern-d.webp";
import chambre1 from "../../assets/chambre-a.webp";
import chambre2 from "../../assets/chambre-b.webp";
import chambre3 from "../../assets/chambre-c.webp";
import chambre4 from "../../assets/chambre-d.webp";
import chambre5 from "../../assets/chambre-e.webp";
import bureau1 from "../../assets/bureau-a.webp";
import bureau2 from "../../assets/bureau-b.webp";
import boulangerieA from "../../assets/boulangerie-a.webp";
import boulangerieB from "../../assets/boulangerie-b.webp";
import boulangerieC from "../../assets/boulangerie-c.webp";
import boulangerieD from "../../assets/boulangerie-d.webp";
import hallA from "../../assets/hall-a.webp";
import hallB from "../../assets/hall-b.webp";
import hallC from "../../assets/hall-c.webp";
import portfolioPdf from "../../assets/portfolio.pdf";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ---------- ICÔNES ---------- */
const RepoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.44738 15.3001C-0.67262 13.9401 0.51838 12.3201 1.73738 11.6301C2.41438 11.2491 3.25738 10.9841 4.16738 10.7341C3.89658 11.25 3.5978 11.7508 3.27238 12.2341C3.00465 12.3416 2.74382 12.4655 2.49138 12.6051C1.84938 12.9671 0.99138 13.6001 1.51838 14.3951C2.03138 15.1691 2.85838 14.3181 3.24838 13.8691C3.74638 13.3611 4.30838 12.5591 4.80838 11.6791C5.33738 10.7491 5.81838 9.69911 6.27838 8.58911C6.69338 7.58911 7.06238 6.55911 7.33838 5.59911C7.61838 4.63911 7.80738 3.75011 7.87738 3.00011C7.93438 2.37711 7.90738 1.46011 7.08738 1.58011C6.26738 1.70011 6.27738 2.66011 6.47238 3.41011C6.52971 3.63345 6.60171 3.86511 6.68838 4.10511C6.62705 4.39245 6.55271 4.69578 6.46538 5.01511C6.39205 5.27911 6.31205 5.54945 6.22538 5.82611C5.87251 5.13742 5.5933 4.41341 5.39238 3.66611C5.04238 2.31611 5.02738 0.436112 6.84238 0.0461121C8.65738 -0.343888 9.11238 1.71611 8.99238 3.03611C8.89238 4.10611 8.59538 5.41611 8.14538 6.76611C8.43338 7.24311 8.74738 7.72111 9.08038 8.18611C9.43038 8.67711 9.89038 9.17911 10.2704 9.61611C11.6104 9.51611 12.9304 9.58211 13.9204 9.76911C15.2804 10.0261 16.5104 10.8791 15.7904 12.5091C15.0694 14.1391 13.2904 13.8991 12.1104 13.1401C11.1262 12.504 10.2628 11.6981 9.56038 10.7601H9.55738C8.81151 9.64155 8.12716 8.48316 7.50738 7.29011C7.21138 8.18311 6.77738 9.38011 6.40738 10.1801C6.88038 10.0701 7.37738 9.98011 7.86738 9.90511C8.06838 10.2431 8.26038 10.5731 8.45738 10.8931C8.30071 10.9164 8.13738 10.9424 7.96738 10.9711C7.35205 11.0758 6.74871 11.2011 6.15738 11.3471C6.00805 11.6338 5.86338 11.9164 5.72338 12.1951C5.22438 13.1831 4.76438 14.0951 4.19338 14.7451C3.28038 15.7851 1.57338 16.6351 0.45338 15.2751L0.44738 15.3001ZM10.9474 10.6201C11.5464 11.2321 12.1074 11.7001 12.6574 12.0601C13.3254 12.4901 14.0974 12.7411 14.4574 11.9901C14.8244 11.2371 14.1464 10.8601 13.4374 10.7201C12.7384 10.5871 11.9074 10.5811 10.9374 10.6161L10.9474 10.6201Z"
      fill="white"
    />
  </svg>
);

const LiveIcon = () => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M7 17L17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- DONNÉES ---------- */
const PROJECTS = [
  {
    id: 1,
    title: "Stand du CERN",
    brand: basicLogo,
    brandAlt: "CERN",
    brandAsTitle: false,
    copy: "Ce projet réalisé en binôme a pour objectif de faire découvrir le CERN au-delà de son image mystérieuse. Le stand met en avant la collaboration internationale et la diversité des savoirs qui le composent. Les espaces circulaires entrelacés symbolisent les différentes orientations du CERN et leurs liens. La circulation immersive invite les visiteurs à explorer le stand et à découvrir de nouvelles perspectives.",
    color: "#071A40",
    repo: portfolioPdf,
    demo: null,
  },
  {
    id: 2,
    title: "Chambre parentale",
    copy: "Ce projet consiste en la conception d’une chambre parentale avec un dressing et une tête de lit sur mesure. Inspiré du style cottage anglais, la chambre est pensée pour un jeune couple d’entrepeneur britannique. Le meuble du dressing se divise en deux espaces distincts, l’un pour Madame, et l’autre pour Monsieur. Ce dressing allie fonctionnalité et organisation, tout en s’intégrant harmonieusement dans une ambiance chaleureuse et intemporelle.",
    color: "#4B69A6",
    repo: portfolioPdf,
    demo: null,
  },

  {
    id: 3,
    title: "Desk d’accueil",
    brandAsTitle: false,
    copy: "Pour ce projet, nous avions le choix de choisir une marque et de créer son desk d’accueil pour leur boutique. La marque que j’ai décidé de représenter est Maje. C’est une marque raffinée et élégante pour les femmes. Le desk est positionné au coeur de la boutique avec 2 espaces de travail pour être le point central permettant d’être accessible de n’importe quel endroit où nous nous trouvons. ",
    color: "#402B12",
    repo: portfolioPdf,
    demo: null,
  },

  {
    id: 4,
    title: "Boulangerie Tea-room",
    brandAsTitle: false,
    copy: "Mon concept est autour du thé, je suis parti de l’origine du thé, lorsqu’une feuille tombe dans de l’eau chaude. Mon but était de faire un lieu agréable et permettant de se détendre avec une tasse de thé afin de faire une parenthèse dans sa journée. ",
    color: "#BF7B3F",
    repo: portfolioPdf,
    demo: null,
  },

  {
    id: 5,
    title: "Hall d’entrée",
    brandAsTitle: false,
    copy: "Lors de mon stage chez bulthaup, j’ai participé à un projet d’aménagement d’une maison en travaillant sur l’agencement de l’entrée. L’objectif était de créer une séparation visuelle avec le séjour grâce à une cloison intégrant des rangements côté entrée et des étagères côté séjour. J’ai réalisé les plans et les élévations de l’ensemble.",
    color: "#BFA38A",
    repo: portfolioPdf,
    demo: null,
  },
];

export default function Portfolio() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const gctx = gsap.context(() => {
      // Intro : fondu/glissement lors de l'entrée dans le pin
      const introEl = root.querySelector(".pf-intro");
      if (introEl) {
        const getEnd = () => introEl.offsetHeight * 0.9; // distance = ~hauteur intro
        gsap.fromTo(
          introEl,
          { y: 0, opacity: 1 },
          {
            y: -28,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root, // l’intera sezione
              start: "top top",
              end: () => "+=" + getEnd(),
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // --- BOUCLE CONTINUE : BASIC (FIX) ---
      function waitForAssets(scope) {
        const imgs = Array.from(scope.querySelectorAll("img"));
        if (!imgs.length) return Promise.resolve();
        return Promise.all(
          imgs.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) =>
                  img.addEventListener("load", res, { once: true })
                )
          )
        );
      }

      function setupAutoLoop(card, selector) {
        const demo = card.querySelector(selector);
        const track = demo?.querySelector(".bd-track");
        if (!demo || !track) return () => {};

        if (!track.dataset.duped) {
          const originals = Array.from(track.children);
          originals.forEach((n) => track.appendChild(n.cloneNode(true)));
          track.dataset.duped = "1";
        }

        let anim, ro;
        let desiredPaused = !card.classList.contains("is-front"); // pause si non-front au démarrage
        // _setPaused disponible dès le début
        demo._setPaused = (p) => {
          desiredPaused = !!p;
          if (anim) anim.paused(desiredPaused);
        };

        const setX = gsap.quickSetter(track, "x", "px");

        const build = () => {
          anim && anim.kill();
          gsap.set(track, { x: 0 });
          const dist = track.scrollWidth / 2;
          const speed = +(demo.dataset.speed || 80);
          const dur = Math.max(2, dist / speed);
          const driver = { t: 0 };
          anim = gsap.to(driver, {
            t: dist,
            duration: dur,
            ease: "none",
            repeat: -1,
            onUpdate() {
              const v = -(driver.t % dist);
              setX(Math.round(v)); // au lieu de setX(v)
            },
          });
          // applique immédiatement l'état souhaité (pause/lecture)
          anim.paused(desiredPaused);
        };

        const imgsReady = Array.from(track.querySelectorAll("img")).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) =>
                img.addEventListener("load", r, { once: true })
              )
        );
        Promise.all(imgsReady).then(build);

        ro = new ResizeObserver(build);
        ro.observe(track);

        const onVis = () => anim && anim.paused(document.hidden);
        document.addEventListener("visibilitychange", onVis);

        return () => {
          document.removeEventListener("visibilitychange", onVis);
          ro && ro.disconnect();
          anim && anim.kill();
          demo._setPaused = null;
        };
      }

      // --- ANIMATIONS DES CARTES (inchangées sauf suppression lecture/pause démo) ---
      const cardsEls = gsap.utils.toArray(".pf-card");
      const cards = cardsEls.filter((el) => el instanceof HTMLElement);

      const cleanups = [];
      cards.forEach((card) => {
        if (card.querySelector('[data-demo="basic"]')) {
          cleanups.push(setupAutoLoop(card, ".pf-demo--basic"));
        }
        if (card.querySelector('[data-demo="rl"]')) {
          cleanups.push(setupAutoLoop(card, ".pf-demo--rl"));
        }
        // NOUVEAU : costvista
        if (card.querySelector('[data-demo="cost"]')) {
          cleanups.push(setupAutoLoop(card, ".pf-demo--cost"));
        }
        if (card.querySelector('[data-demo="pano"]')) {
          cleanups.push(setupAutoLoop(card, ".pf-demo--pano"));
        }
      });

      // ... (matchMedia + timeline des cartes reste identique, mais ENLEVER la partie lecture/pause)
      const LAYER_OFFSET = 26,
        SCALE_STEP = 0.02,
        ROT_X_DESK = 18,
        ROT_X_MOB = 12,
        ROT_Z = 3.5,
        LIFT_IN_VH = 0.12,
        LIFT_OUT_VH = 0.7,
        PIN_FACTOR = 0.95;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const H = () => stage.clientHeight; // 100svh “stabile”
          const ROTX = mq.conditions.reduce
            ? 0
            : mq.conditions.desktop
            ? ROT_X_DESK
            : ROT_X_MOB;
          const LAYER = mq.conditions.mobile ? 18 : LAYER_OFFSET;

          // init carte
          cards.forEach((card, i) => {
            gsap.set(card, {
              y: i * LAYER,
              scale: 1 - i * SCALE_STEP,
              zIndex: cards.length - i,
              rotateX: 0,
              rotateZ: 0,
              z: 0.01,
              transformOrigin: "50% 100%",
              force3D: true,
              backfaceVisibility: "hidden",
            });
          });

          // funzioni usate nella timeline (ti erano sparite)
          const stepIn = () => H() * (mq.conditions.mobile ? 0.14 : LIFT_IN_VH);
          const stepOut = () =>
            H() * (mq.conditions.mobile ? 0.78 : LIFT_OUT_VH); // leggermente meno aggressivo
          const SEG = 1;
          const t = (i) => i * SEG;

          // *** UNICA definizione, PRIMA dell'uso ***
          function setFront(idx) {
            cards.forEach((card, i) => {
              card.classList.toggle("is-front", i === idx);
              card.querySelector(".pf-demo")?._setPaused?.(i !== idx); // pausa le demo non-front
            });
          }
          setFront(0); // stato iniziale

          // timeline
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              pin: stage,
              pinReparent: true,
              start: "top top",
              end: () => "+=" + (cards.length - 1) * H() * PIN_FACTOR,
              scrub: mq.conditions.mobile ? 0.25 : true,
              anticipatePin: mq.conditions.mobile ? 2 : 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            if (i > 0) {
              tl.to(
                card,
                {
                  y: (i - 1) * (LAYER * 0.35),
                  scale: 1,
                  rotateX: 0,
                  rotateZ: 0,
                  duration: SEG,
                },
                t(i - 1)
              );
            }
            if (i < cards.length - 1) {
              tl.to(
                card,
                {
                  y: i * LAYER - stepIn(),
                  rotateX: ROTX,
                  rotateZ: i % 2 ? -ROT_Z : ROT_Z,
                  // boxShadow: "0 40px 120px rgba(0,0,0,.22)",
                  duration: SEG * 0.45,
                },
                t(i)
              );

              tl.to(card, { "--shadow-o": 1, duration: SEG * 0.45 }, t(i));

              tl.to(
                card,
                {
                  y: i * LAYER - (stepIn() + stepOut()),
                  opacity: 0.98,
                  duration: SEG * 0.55,
                },
                t(i) + SEG * 0.45
              );

              // 🔔 metà segmento: passa il "front" alla card successiva
            }
          });
          let currentFront = 0;
          tl.eventCallback("onUpdate", () => {
            // ogni segmento dura SEG (1): arrotondiamo il tempo alla card più vicina
            const newFront = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(tl.time() / SEG))
            );
            if (newFront !== currentFront) {
              setFront(newFront);
              currentFront = newFront;
            }
          });

          return () => tl.kill();
        }
      );

      return () => {
        mm.revert();
        cleanups.forEach((fn) => fn());
      };
    }, root);

    return () => gctx.revert();
  }, []);

  return (
    <section className="portfolio" ref={rootRef} aria-label="Portfolio">
      {/* Intro nel normale flusso, con margini gestiti via CSS */}
      <div className="pf-intro-wrap">
        <div className="pf-intro">
          <h2 className="pf-ih">Sélection de projets</h2>
          <p className="pf-id">
            Là où usage, matière et lumière se rencontrent.
          </p>
        </div>
      </div>

      <div className="pf-stage" ref={stageRef}>
        {PROJECTS.map((p) => (
          <article
            className="pf-card"
            key={p.id}
            style={{ "--accent": p.color }}
          >
            <header className="pf-header">
              <h3 className={`pf-title ${p.brandAsTitle ? "sr-only" : ""}`}>
                {p.title}
              </h3>
              {p.brand && (
                <img
                  className={`pf-brand ${
                    p.brandAsTitle ? "pf-brand--solo" : ""
                  }`}
                  src={p.brand}
                  alt={p.brandAsTitle ? p.brandAlt || p.title : ""}
                  aria-hidden={p.brandAsTitle ? "false" : "true"}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </header>

            <p className="pf-copy">{p.copy}</p>

            <div className="pf-actions">
              {p.repo && (
                <a
                  className="pf-btn pf-btn--repo"
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} repository`}
                >
                  <RepoIcon />
                  <span>Portfolio</span>
                </a>
              )}
              {p.demo && (
                <a
                  className="pf-btn pf-btn--live"
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} live site`}
                >
                  <LiveIcon />
                  <span>Live</span>
                </a>
              )}
            </div>
            {p.id === 1 && (
              <div
                className="pf-demo pf-demo--basic"
                data-demo="basic"
                data-speed="90"
              >
                <div className="bd-track">
                  <div className="bd-panel">
                    <img
                      src={cern1}
                      alt="cern"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={cern2}
                      alt="cern"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={cern3}
                      alt="cern"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={cern4}
                      alt="cern"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            )}
            {p.id === 2 && (
              <div
              className="pf-demo pf-demo--basic"
              data-demo="basic"
              data-speed="90"
            >
              <div className="bd-track">
                <div className="bd-panel">
                  <img
                    src={chambre1}
                    alt="chambre"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bd-panel">
                  <img
                    src={chambre2}
                    alt="chambre"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bd-panel">
                  <img
                    src={chambre4}
                    alt="chambre"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bd-panel">
                  <img
                    src={chambre3}
                    alt="chambre"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bd-panel">
                  <img
                    src={chambre5}
                    alt="chambre"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
            )}
            {p.id === 3 && (
              <div
              className="pf-demo pf-demo--basic"
              data-demo="basic"
              data-speed="90"
            >
              <div className="bd-track">
                <div className="bd-panel">
                  <img
                    src={bureau1}
                    alt="bureau"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bd-panel">
                  <img
                    src={bureau2}
                    alt="bureau"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
            )}
            {p.id === 4 && (
              <div
                className="pf-demo pf-demo--pano"
                data-demo="pano"
                data-speed="86"
              >
                <div className="bd-track">
                  <div className="bd-panel">
                    <img
                      src={boulangerieA}
                      alt="Gallery room — wall of artworks"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={boulangerieB}
                      alt="Artwork detail — zoom & metadata overlay"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={boulangerieC}
                      alt="Minimap and room navigation"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={boulangerieD}
                      alt="Minimap and room navigation"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            )}
            {p.id === 5 && (
              <div
                className="pf-demo pf-demo--pano"
                data-demo="pano"
                data-speed="86"
              >
                <div className="bd-track">
                  <div className="bd-panel">
                    <img
                      src={hallA}
                      alt="Hall"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={hallB}
                      alt="Hall"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bd-panel">
                    <img
                      src={hallC}
                      alt="Hall"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
