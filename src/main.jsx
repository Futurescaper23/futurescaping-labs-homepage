import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { labsConfig } from "./labsConfig.js";
import "./styles.css";

function isPlaceholder(url) {
  return url.startsWith("#PLACEHOLDER");
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" focusable="false">
      <path
        d="M4 10h10.2m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShellIcon({ kind }) {
  const paths = {
    home: (
      <>
        <path d="M4 11.5 12 5l8 6.5V20H4z" />
        <path d="M9 20v-5h6v5" />
      </>
    ),
    grid: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="M12 6v12" />
        <path d="M4 12h16" />
      </>
    ),
    cloud: <path d="M7 18h10a4 4 0 1 0-.9-7.9A5.5 5.5 0 0 0 5 12.5" />,
    bars: (
      <>
        <path d="M5 18V9" />
        <path d="M12 18V5" />
        <path d="M19 18v-7" />
      </>
    ),
    split: (
      <>
        <path d="M9 6H5v12h4" />
        <path d="M15 6h4v12h-4" />
        <path d="M12 4v16" />
      </>
    ),
    columns: (
      <>
        <path d="M6 4v16" />
        <path d="M12 4v16" />
        <path d="M18 4v16" />
      </>
    ),
  };

  return (
    <svg className="fs-shell__nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[kind] || paths.home}
    </svg>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function SceneButton({ label, href, kind = "link", primary = false }) {
  if (kind === "static" || !href || isPlaceholder(href)) {
    return (
      <span className={`scene-button ${primary ? "primary" : "secondary"} disabled`} aria-disabled="true">
        {label}
      </span>
    );
  }

  const external = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <a
      className={`scene-button ${primary ? "primary" : "secondary"}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {label}
      {primary ? <ArrowIcon /> : null}
    </a>
  );
}

function HeroVisual({ scene }) {
  if (scene.theme === "evidence") {
    return <img className="fs-shell__image" src={scene.heroImage} alt={scene.heroImageAlt || ""} />;
  }

  if (scene.theme === "change") {
    return (
      <div className="fs-shell__change-visual" aria-hidden="true">
        <div className="fs-shell__change-pane fs-shell__change-pane--before">
          <span>Before survey</span>
        </div>
        <div className="fs-shell__change-pane fs-shell__change-pane--after">
          <span>After survey</span>
        </div>
        <div className="fs-shell__change-slider">
          <i />
        </div>
      </div>
    );
  }

  return <img className="fs-shell__image" src={scene.heroImage} alt={scene.heroImageAlt || ""} />;
}

function HeroShell({ scenes, brand }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScene = scenes[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % scenes.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [scenes.length]);

  const reelScenes = useMemo(() => scenes.map((scene, index) => ({ ...scene, index })), [scenes]);

  return (
    <section className={`fs-shell fs-shell--${activeScene.theme}`} id="showcase">
      <div className="fs-shell__stage">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className={`fs-shell__scene ${index === activeIndex ? "is-active" : ""}`}
            aria-hidden={index === activeIndex ? "false" : "true"}
          >
            <HeroVisual scene={scene} />
            <div className="fs-shell__scene-grid" />
          {scene.detailImage ? (
            <div className={`fs-shell__detail-card fs-shell__detail-card--${scene.theme}`}>
              <img src={scene.detailImage} alt={scene.detailImageAlt || ""} />
            </div>
          ) : (
              <div className={`fs-shell__detail-card fs-shell__detail-card--${scene.theme} is-placeholder`}>
                <span>Preview set in progress</span>
              </div>
            )}
          </div>
        ))}

      <div className="fs-shell__glow" />

      <div className="fs-shell__copy">
          <div className="fs-shell__brand">
            <div className="fs-shell__mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div>
              <p className="fs-shell__brandname">{brand.name}</p>
              <p className="fs-shell__brandsub">{brand.sublabel}</p>
            </div>
          </div>
          <p className="fs-shell__eyebrow">{activeScene.eyebrow}</p>
          <h1 className="fs-shell__title">{activeScene.title}</h1>
          <p className="fs-shell__summary">{activeScene.summary}</p>
        </div>

      <div className="fs-shell__nav">
          <div className="fs-shell__nav-list">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                className={`fs-shell__nav-item ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <ShellIcon kind={scene.navIcon} />
                <span className="fs-shell__nav-label">{scene.navLabel}</span>
              </button>
            ))}
        </div>
      </div>

      <div className="fs-shell__reel" aria-label="Demo selector">
          {reelScenes.map((scene) => (
            <button
              key={scene.id}
              type="button"
              className={`fs-shell__reel-item ${scene.index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(scene.index)}
            >
              <span>{String(scene.index + 1).padStart(2, "0")}</span>
              <strong>{scene.title}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoCard({ demo }) {
  const comingSoon = isPlaceholder(demo.href);
  const external = demo.href.startsWith("http") || demo.href.startsWith("mailto:");

  return (
    <article className={`demo-card demo-card-${demo.theme}`}>
      <div className="card-topline">
        <span className="status-badge">{demo.status}</span>
        {comingSoon ? <span className="soon-badge">Preview set in progress</span> : null}
      </div>
      <h3>{demo.title}</h3>
      <p className="card-description">{demo.descriptionShort}</p>
      <div className="card-preview">
        {demo.heroImage ? <img src={demo.heroImage} alt="" /> : <div className="card-preview-placeholder" />}
      </div>
      <div className="use-case-block">
        <span>Use cases</span>
        <p>{demo.useCases}</p>
      </div>
      {comingSoon ? (
        <span className="demo-button disabled" aria-disabled="true">
          Preview set in progress
        </span>
      ) : (
        <a
          className="demo-button"
          href={demo.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {demo.buttonLabel}
          <ArrowIcon />
        </a>
      )}
    </article>
  );
}

function App() {
  return (
    <main>
      <header className="hero" id="top">
        <HeroShell scenes={labsConfig.showcaseScenes} brand={labsConfig.shellBrand} />
      </header>

      <section className="section demo-section" id="demo-systems">
        <SectionHeader eyebrow="Demo systems" title="Three front-end demos ready for live conversations">
          Each one is designed to feel like a product preview rather than a brochure page,
          so clients can quickly understand the value of the workflow.
        </SectionHeader>
        <div className="demo-grid">
          {labsConfig.showcaseScenes.map((demo) => (
            <DemoCard demo={demo} key={demo.id} />
          ))}
        </div>
      </section>

      <section className="section use-cases-section">
        <SectionHeader eyebrow="Use cases" title="Built around real site and landscape needs" />
        <div className="use-case-grid">
          {labsConfig.useCases.map((useCase) => (
            <article className="use-case-card" key={useCase.title}>
              <div className="use-case-visual">
                <img src={useCase.image} alt={useCase.alt || ""} />
              </div>
              <p>{useCase.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section" id="process">
        <SectionHeader eyebrow="How it works" title="From survey data to a client-ready dashboard" />
        <div className="timeline">
          {labsConfig.workflow.map((step, index) => (
            <article className="timeline-step" key={step}>
              <div className="timeline-step__top">
                <span className="timeline-step__number">{String(index + 1).padStart(2, "0")}</span>
                <div className="timeline-step__track" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section data-section">
        <SectionHeader eyebrow="Typical data inputs" title="Designed to bring mixed evidence together" />
        <div className="data-grid">
          {labsConfig.dataInputs.map((input) => (
            <article className="data-card data-card--sketch" key={input.title}>
              <div className="data-card__sketch">
                <img src={input.image} alt={input.alt || ""} />
              </div>
              <p>{input.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="geo-banner">
        <div>
          <p className="eyebrow">GEO Business 2026</p>
          <h2>Built for real-world geospatial conversations</h2>
        </div>
        <p>
          These demos are being prepared as part of FutureScaping&apos;s showcase for GEO
          Business 2026 on 3-4 June 2026 at ExCeL London. They are designed to show how drone
          and survey data can become monitoring, presentation and decision-making tools.
        </p>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Interested in a monitoring or visualisation dashboard?</h2>
          <p>
            FutureScaping can build bespoke visual systems for sites, landscapes and
            environments where clear communication of change matters.
          </p>
        </div>
        <div className="contact-card">
          <strong>Phil Chrimes</strong>
          <span>FutureScaping</span>
          <a href="mailto:create@futurescaping.co.uk?subject=FutureScaping%20Labs%20Demo%20Enquiry">
            create@futurescaping.co.uk
          </a>
          <a href="https://futurescaping.co.uk" target="_blank" rel="noreferrer">
            futurescaping.co.uk
          </a>
          <a
            className="primary-button"
            href="mailto:create@futurescaping.co.uk?subject=FutureScaping%20Labs%20Demo%20Enquiry"
          >
            Contact FutureScaping
            <ArrowIcon />
          </a>
        </div>
      </section>

      <footer>
        <span>FutureScaping Labs</span>
        <a href="https://futurescaping.co.uk" target="_blank" rel="noreferrer">
          futurescaping.co.uk
        </a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
