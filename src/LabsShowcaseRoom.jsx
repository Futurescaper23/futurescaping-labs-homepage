import React from "react";

function isPlaceholder(href) {
  return href.startsWith("#PLACEHOLDER");
}

function WallPreview({ visual }) {
  return (
    <i className={`wall-screen ${visual}-screen`} aria-hidden="true">
      <span className="wall-preview-tag">Preview surface</span>
      <span className="wall-preview-note">Video or live thumbnail can drop in here later</span>
    </i>
  );
}

function WallPreviewImage({ visual, previewImage, title }) {
  return (
    <i className={`wall-screen ${visual}-screen`} aria-hidden="true">
      <img src={previewImage} alt="" />
      <span className="wall-preview-tag">Preview surface</span>
      <span className="wall-preview-note">{title} preview</span>
    </i>
  );
}

function WallLaunch({ wall }) {
  const comingSoon = isPlaceholder(wall.href);
  if (comingSoon) {
    return (
      <span className="wall-cta disabled" aria-disabled="true">
        Coming Soon
      </span>
    );
  }

  const external = wall.href.startsWith("http") || wall.href.startsWith("mailto:");
  return (
    <a
      className="wall-cta"
      href={wall.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {wall.buttonLabel}
    </a>
  );
}

function MonitoringDashboardWall({ wall, wallClass }) {
  return (
    <article
      className={`cube-wall monitoring-dashboard-wall ${wallClass}`}
      data-room-focus={wall.id}
      tabIndex="0"
      aria-label={wall.title}
    >
      <div className="monitoring-title-card">
        <span className="wall-kicker">{wall.status}</span>
        <strong>
          {(wall.dashboardTitleLines || [wall.title]).map((line) => (
            <span className="monitoring-title-line" key={line}>
              {line}
            </span>
          ))}
        </strong>
      </div>

      <div className="monitoring-summary-card">
        <p>{wall.dashboardSummary || wall.description}</p>
      </div>

      <div className="monitoring-map-card">
        <img src={wall.previewImage} alt="" />
      </div>

      <div className="monitoring-chart-card">
        <img src={wall.previewImage} alt="" />
      </div>

      <div className="monitoring-cta-card">
        <WallLaunch wall={wall} />
      </div>
    </article>
  );
}

function GenericDashboardWall({ wall, wallClass }) {
  return (
    <article
      className={`cube-wall generic-dashboard-wall ${wallClass}`}
      data-room-focus={wall.id}
      tabIndex="0"
      aria-label={wall.title}
    >
      <div className="generic-title-card">
        <span className="wall-kicker">{wall.status}</span>
        <strong>
          {(wall.dashboardTitleLines || [wall.title]).map((line) => (
            <span className="monitoring-title-line" key={line}>
              {line}
            </span>
          ))}
        </strong>
      </div>

      <div className="generic-summary-card">
        <p>{wall.dashboardSummary || wall.description}</p>
      </div>

      <div className={`generic-visual-card generic-visual-primary ${wall.visual}-primary`}>
        <span className="generic-visual-label">Preview port</span>
      </div>

      <div className={`generic-visual-card generic-visual-secondary ${wall.visual}-secondary`}>
        <span className="generic-visual-label">Preview port</span>
      </div>

      <div className="generic-cta-card">
        <WallLaunch wall={wall} />
      </div>
    </article>
  );
}

function WallPanel({ wall }) {
  const wallClass = {
    front: "wall-monitoring",
    right: "wall-siteview",
    back: "wall-change",
    left: "wall-contact",
  }[wall.wall];

  if (wall.id === "monitoring") {
    return <MonitoringDashboardWall wall={wall} wallClass={wallClass} />;
  }

  if (wall.id === "siteview" || wall.id === "change" || wall.id === "contact") {
    return <GenericDashboardWall wall={wall} wallClass={wallClass} />;
  }

  return (
    <article
      className={`cube-wall ${wallClass}`}
      data-room-focus={wall.id}
      tabIndex="0"
      aria-label={wall.title}
    >
      {wall.previewImage ? (
        <WallPreviewImage visual={wall.visual} previewImage={wall.previewImage} title={wall.title} />
      ) : (
        <WallPreview visual={wall.visual} />
      )}
      <div className="wall-copy">
        <span className="wall-kicker">{wall.status}</span>
        <strong>{wall.title}</strong>
        <span>{wall.description}</span>
        <div className="wall-actions">
          <WallLaunch wall={wall} />
        </div>
      </div>
    </article>
  );
}

function WallGhost({ wall }) {
  const wallClass = {
    front: "wall-monitoring",
    right: "wall-siteview",
    back: "wall-change",
    left: "wall-contact",
  }[wall.wall];

  return <div className={`cube-wall-ghost ${wallClass}`} aria-hidden="true" />;
}

export function LabsShowcaseRoom({ title, subtitle, instruction, walls }) {
  const roomWalls = walls.filter((wall) => wall.wall);

  return (
    <div className="lab-room-experience">
      <section className="room-intro">
        <p className="eyebrow">GEO Business 2026 demo environment</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
        <p className="body-copy">{instruction}</p>
      </section>

      <section
        className="interactive-room-shell"
        aria-label="Interactive FutureScaping Labs room"
        data-lab-room
        tabIndex="0"
      >
        <div className="room-ui">
          {roomWalls.map((wall) => (
            <button key={wall.id} type="button" data-room-target={wall.id}>
              {wall.title.replace("FutureScaping ", "").replace("Contact ", "")}
            </button>
          ))}
          <button type="button" data-room-target="reset">
            Reset
          </button>
        </div>
        <div className="room-mobile-note">
          If the room feels cramped on your device, the same demos are listed below as standard
          cards.
        </div>
        <div className="immersive-viewport">
          <div className="immersive-room" data-room-stage>
            {roomWalls.map((wall) => (
              <WallGhost key={`${wall.id}-ghost`} wall={wall} />
            ))}
            {roomWalls.map((wall) => (
              <WallPanel key={wall.id} wall={wall} />
            ))}
            <div className="cube-floor" />
            <div className="cube-ceiling" />
          </div>
        </div>
      </section>
    </div>
  );
}
