// Portfolio data — sourced from Kartikay's resume + projects
const experience = [
  {
    role: "Software Engineering Consultant",
    org: "Assured Health Technologies · Bengaluru",
    date: "Aug 2025 – Jan 2026",
    points: [
      "Created 17 data migration scripts in Python to update various database fields across production.",
      "Used AWS for deployment and automated operations with CloudFormation, cutting deployment time by 67%.",
      "Optimized a Django API from 35.7s to 3.7s using indexes and removing redundant mutation queries on prefetching.",
      "Adopted the Bun runtime to reduce compile and run time by 53%.",
    ],
  },
  {
    role: "Software Engineering Intern — LitmusChaos (CNCF)",
    org: "Cloud Native Computing Foundation · Remote",
    date: "Jul 2024 – Sep 2024",
    points: [
      "Developed an upgrade agent that streamlined version transitions for Litmus, reducing manual intervention time by 30%.",
      "Engineered a sequential upgrade pipeline, reducing control-plane and database migration time.",
      "Automated MongoDB schema upgrades with every new Litmus release via manifests.",
      "Optimized the Auth server login API by 98.84%, lowering latency from 1.73s to 15.87ms.",
    ],
  },
  {
    role: "Software Engineering Intern — Code For GovTech",
    org: "Dedicated Mentoring Program under Dhiway · Remote",
    date: "Jun 2024 – Aug 2024",
    points: [
      "Designed a Go SDK for the CORD blockchain with 95% test coverage.",
      "Wrote unit and fuzz tests to strengthen coverage of the multi-modular Go SDK.",
      "Introduced DevOps practices, improving testing and delivery speed for SDK updates.",
      "Applied software development lifecycle principles, reducing code review time by 30%.",
    ],
  },
  {
    role: "Google Summer of Code Intern",
    org: "Organic Maps · Remote",
    date: "Apr 2023 – Jul 2023",
    points: [
      "Built a high-performance proxy in TypeScript/NodeJS serving 50K+ requests/day with 99.9% uptime on Cloudflare Workers.",
      "Architected a proxy converting Google Maps URIs to custom formats, reducing load time by 60%.",
      "Integrated the proxy into iOS and Android apps, improving data-fetching speed by 30% across mobile.",
    ],
  },
];

const projects = [
  {
    title: "Go-microservice",
    desc: "HTTP API server with rate throttling over gRPC. Redis-based caching (15% faster responses), rate-limiting (20% lower latency), and Prometheus/Grafana observability.",
    links: { github: "https://github.com/kartikaysaxena/go-microservice" },
  },
  {
    title: "Cloudflare Maps Proxy (GSoC)",
    desc: "TypeScript/NodeJS proxy on Cloudflare Workers serving 50K+ req/day with 99.9% uptime; converts Google Maps URIs to custom formats, cutting load time by 60%.",
    links: { org: "https://organicmaps.app" },
  },
  {
    title: "CORD Blockchain Go SDK",
    desc: "Go SDK for the CORD blockchain with 95% test coverage, unit + fuzz tests, and a multi-modular design under the Dhiway mentoring program.",
    links: { org: "https://dhiway.com" },
  },
];

// Render experience timeline
function renderExperience() {
  const container = document.getElementById("timeline");
  container.innerHTML = experience
    .map(
      (e) => `
      <div class="timeline-item">
        <div class="timeline-head">
          <span class="timeline-role">${e.role}</span>
          <span class="timeline-date">${e.date}</span>
        </div>
        <div class="timeline-org">${e.org}</div>
        <ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
}

// Render projects
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = projects
    .map((p) => {
      const gh = p.links.github
        ? `<a href="${p.links.github}" target="_blank" rel="noopener">GitHub →</a>`
        : "";
      const org = p.links.org
        ? `<a href="${p.links.org}" target="_blank" rel="noopener">Project →</a>`
        : "";
      return `
      <div class="project-card">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-links">${gh}${org}</div>
      </div>`;
    })
    .join("");
}

// Mobile nav toggle
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

// Footer year
function initYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  renderProjects();
  initNav();
  initYear();
});
