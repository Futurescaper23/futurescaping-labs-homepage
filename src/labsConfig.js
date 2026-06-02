export const labsConfig = {
  headline: "FutureScaping Labs",
  subtitle:
    "Interactive geospatial tools for monitoring, visualising and understanding changing places.",
  intro:
    "A focused showcase for GEO Business 2026, built to make FutureScaping's geospatial demo systems feel like real product experiences rather than static mock-ups.",
  shellBrand: {
    name: "FutureScaping Labs",
    sublabel: "Geospatial demo suite",
  },
  showcaseScenes: [
    {
      id: "monitoring",
      theme: "monitoring",
      navLabel: "Monitoring",
      navIcon: "bars",
      eyebrow: "Flagship demo",
      title: "Monitoring System",
      summary:
        "Visual change monitoring for coastal landscapes, repeat surveys and surface change evidence.",
      heroImage: "./src/assets/monitoring-sections-inset.png",
      heroImageAlt: "Monitoring section profiles and height difference view",
      detailImage: "./src/assets/monitoring-hero-island.png",
      detailImageAlt: "Monitoring system island overview with section profiles focus",
      pills: [
        {
          label: "Survey dates",
          value: "18-19 April 2026",
          subtext: "Repeatable survey review for the current monitoring window.",
        },
      ],
      dockLabel: "Launch the demo",
      dockTitle: "FutureScaping Monitoring System",
      dockCopy:
        "Open the live monitoring environment for sections, aerial context and change analysis.",
      primaryActionLabel: "Launch Monitoring Demo",
      primaryActionHref:
        "https://futurescaping-monitoring-system.onrender.com/?tab=overview&survey=2026-04-18&area=area1&section=A1-01",
      secondaryActions: [
        { label: "Surface change workflow", kind: "static" },
        { label: "Section evidence", kind: "static" },
      ],
      status: "Flagship demo",
      buttonLabel: "Launch Monitoring Demo",
      href: "https://futurescaping-monitoring-system.onrender.com/?tab=overview&survey=2026-04-18&area=area1&section=A1-01",
      descriptionShort:
        "A visual monitoring dashboard for repeatable surveys, imagery and change evidence.",
      useCases:
        "Estuaries, coastlines, rivers, harbour authorities, construction sites, erosion monitoring, habitat restoration, earthworks and land management.",
    },
    {
      id: "siteview",
      theme: "siteview",
      navLabel: "SiteView",
      navIcon: "grid",
      eyebrow: "Planning and presentation",
      title: "SiteView Planning Evidence",
      summary:
        "See the full picture. Plan with confidence using drone mapping, 3D models, viewpoints and interactive map layers.",
      heroImage: "./src/assets/siteview-hero-new.png",
      heroImageAlt: "SiteView planning evidence terrain model preview",
      detailImage: "./src/assets/siteview-inset.png",
      detailImageAlt: "SiteView detailed shed visual inset",
      pills: [
        {
          label: "Location",
          value: "Planning review workspace",
          subtext: "A polished front-end for landscapes, estates and stakeholder presentations.",
        },
      ],
      dockLabel: "Open the pack",
      dockTitle: "FutureScaping SiteView",
      dockCopy:
        "A generic planning evidence showcase combining context, viewpoints and technical layers in one clear visual experience.",
      primaryActionLabel: "Launch SiteView Demo",
      primaryActionHref: "https://futurescaping-siteview.onrender.com/",
      secondaryActions: [
        { label: "3D scene preview", kind: "static" },
        { label: "Viewpoint review", kind: "static" },
      ],
      status: "Demo system",
      buttonLabel: "Launch SiteView Demo",
      href: "https://futurescaping-siteview.onrender.com/",
      descriptionShort:
        "An interactive site presentation system for drone imagery, 3D models and guided viewpoints.",
      useCases:
        "Landscape design, planning visuals, estates, construction progress, client presentations and stakeholder engagement.",
    },
    {
      id: "evidence",
      theme: "evidence",
      navLabel: "Evidence",
      navIcon: "columns",
      eyebrow: "Survey deliverables",
      title: "Survey Evidence Pack",
      summary:
        "Drone survey outputs, plans, PDFs and mapped site evidence brought together in one client-ready workspace.",
      heroImage: "./src/assets/survey-evidence-hero.png",
      heroImageAlt: "Survey evidence planning workspace hero image",
      detailImage: "./src/assets/survey-evidence-inset.png",
      detailImageAlt: "Survey evidence layer comparison inset showing orthomosaic and height colours",
      pills: [
        {
          label: "Purpose",
          value: "Survey and planning evidence",
          subtext: "A deliverables-led workspace for site understanding, design input and downloadable outputs.",
        },
      ],
      dockLabel: "Open the pack",
      dockTitle: "FutureScaping Survey Evidence Pack",
      dockCopy:
        "A premium front-end for drone-derived deliverables, planning visuals and downloadable survey material.",
      primaryActionLabel: "Launch Survey Evidence Demo",
      primaryActionHref: "https://futurescaping-visual-projects.onrender.com/",
      secondaryActions: [
        { label: "Download plans", kind: "static" },
        { label: "Site deliverables", kind: "static" },
      ],
      status: "Demo system",
      buttonLabel: "Launch Survey Evidence Demo",
      href: "https://futurescaping-visual-projects.onrender.com/",
      descriptionShort:
        "A deliverables-led site workspace for drone outputs, planning context, downloadable PDFs and mapped evidence.",
      useCases:
        "Early-stage design input, planning support, site understanding, PDF downloads, mapped deliverables and client presentation.",
    },
  ],
  useCases: [
    {
      title: "Coastal and estuary monitoring",
      image: "./src/assets/use-case-coastal.svg",
      alt: "Illustration of a coastal estuary monitoring scene with survey sections",
    },
    {
      title: "Riverbank and erosion monitoring",
      image: "./src/assets/use-case-river.svg",
      alt: "Illustration of riverbank erosion monitoring with highlighted survey line",
    },
    {
      title: "Construction progress",
      image: "./src/assets/use-case-construction.svg",
      alt: "Illustration of a construction progress site with tracked development zones",
    },
    {
      title: "Landscape and estate management",
      image: "./src/assets/use-case-estate.svg",
      alt: "Illustration of an estate management overview with mapped grounds and paths",
    },
    {
      title: "Habitat restoration",
      image: "./src/assets/use-case-habitat.svg",
      alt: "Illustration of a habitat restoration landscape with ecological zones",
    },
    {
      title: "Survey presentation",
      image: "./src/assets/use-case-presentation.svg",
      alt: "Illustration of a survey presentation dashboard with maps and profile charts",
    },
    {
      title: "Stakeholder engagement",
      image: "./src/assets/use-case-stakeholder.svg",
      alt: "Illustration of stakeholder engagement around a mapped site presentation",
    },
    {
      title: "Planning and visual communication",
      image: "./src/assets/use-case-planning.svg",
      alt: "Illustration of planning visuals with model views and section graphics",
    },
  ],
  workflow: [
    "Capture or receive survey data",
    "Process maps, models and imagery",
    "Build an interactive visual dashboard",
    "Compare change over time",
    "Share with clients and stakeholders",
  ],
  dataInputs: [
    {
      title: "Drone imagery",
      image: "./src/assets/data-input-drone.svg",
      alt: "Hand-drawn sketch of a drone survey platform",
    },
    {
      title: "Aerial photo maps",
      image: "./src/assets/data-input-aerial.svg",
      alt: "Hand-drawn sketch of an aerial map sheet",
    },
    {
      title: "Surface-height models",
      image: "./src/assets/data-input-height.svg",
      alt: "Hand-drawn sketch of a height model graph",
    },
    {
      title: "3D models",
      image: "./src/assets/data-input-model.svg",
      alt: "Hand-drawn sketch of a 3D model block",
    },
    {
      title: "Section profiles",
      image: "./src/assets/data-input-section.svg",
      alt: "Hand-drawn sketch of section profile lines",
    },
    {
      title: "Site photography",
      image: "./src/assets/data-input-photo.svg",
      alt: "Hand-drawn sketch of a site photography frame",
    },
    {
      title: "360 panoramas",
      image: "./src/assets/data-input-panorama.svg",
      alt: "Hand-drawn sketch of a panoramic arc",
    },
    {
      title: "Environmental data",
      image: "./src/assets/data-input-environment.svg",
      alt: "Hand-drawn sketch of environmental data indicators",
    },
    {
      title: "Client notes",
      image: "./src/assets/data-input-notes.svg",
      alt: "Hand-drawn sketch of client notes and annotations",
    },
  ],
};
