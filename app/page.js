"use client";
import { useState, useEffect } from "react";

const CLIENT = {
  name: "Hallman's Power Washing",
  url: "hallmanspowerwashing.com",
  contact: "Hallman's Power Washing, Owner",
  date: "February 2025 Audit",
};

const BRAND = {
  calendly: "https://calendly.com/onlinenexusmarketing/strategy-meeting",
  email: "ogalindo@onlinenexusmarketing.com",
  slogan: "Hand it off. It's handled.",
};

const CATEGORIES = [
  {
    name: "Performance",
    score: 52,
    grade: "F",
    icon: "⚡",
    desc: "Page speed, resource loading, optimization",
    findings: [
      { status: "fail", title: "Heavy image-based design with no lazy loading.", detail: "Multiple large hero images and gallery photos load all at once when the page opens. On slower connections or mobile devices, visitors are staring at a blank screen while everything downloads." },
      { status: "fail", title: "Images lack explicit width and height attributes.", detail: "This causes layout shift as the page loads, meaning content jumps around while images pop in. Hurts Google's Core Web Vitals score." },
      { status: "warn", title: "All images routed through external CDN with complex URL encoding.", detail: "Images served from groovetech.io with extremely long encoded URLs. While WebP format is used, the routing adds latency and creates maintenance issues." },
      { status: "warn", title: "Third-party platform limits performance control.", detail: "Built on GrooveApps/GrooveFunnels, which restricts the ability to optimize code, implement caching, or control how resources load." },
      { status: "pass", title: "Images served in WebP format.", detail: "The site uses modern image formats through its CDN, which helps with file sizes compared to traditional JPEG or PNG." },
    ],
  },
  {
    name: "Mobile",
    score: 58,
    grade: "F",
    icon: "📱",
    desc: "Responsive design, touch targets, mobile UX",
    findings: [
      { status: "fail", title: "Service area is a massive vertical list of 21 city names.", detail: "On mobile, this creates an extremely long scroll through city after city, each in a large heading tag. Pushes all important content far below the fold." },
      { status: "fail", title: "ALL CAPS text throughout the entire site.", detail: "Every section header and most body text is uppercase. On small screens this significantly reduces readability and scanning speed." },
      { status: "warn", title: "No mobile-specific image sizing.", detail: "Same images load regardless of screen size, wasting bandwidth on mobile connections." },
      { status: "pass", title: "Phone number is tap-to-call enabled.", detail: "Main CTA phone number is properly linked for mobile users." },
      { status: "pass", title: "Simple 3-item navigation.", detail: "The small nav menu should translate reasonably well to mobile screens." },
    ],
  },
  {
    name: "SEO",
    score: 45,
    grade: "F",
    icon: "🔍",
    desc: "Search visibility, metadata, structured data",
    findings: [
      { status: "fail", title: "Title tag is just 'Hallman's Power Washing.'", detail: "No location, no service keywords. Someone searching 'power washing Atlantic County' gets no signal from the page title." },
      { status: "fail", title: "No meta description found.", detail: "Google will pull random text from the page for search results. That often means the IE warning or unrelated content shows up." },
      { status: "fail", title: "Zero structured data (schema markup).", detail: "No LocalBusiness, Service, or Review schema. No chance of appearing in rich search results." },
      { status: "fail", title: "Heading hierarchy is severely broken.", detail: "21 H3 tags used for city names. Google interprets headings as content structure signals. This tells search engines the page is about 21 different topics." },
      { status: "fail", title: "No individual service or location pages.", detail: "One homepage trying to rank for all services in all locations. Competitors with dedicated pages will outrank this every time." },
      { status: "fail", title: "No sitemap, no blog, no content strategy.", detail: "Google has nothing to crawl beyond three pages. No fresh content means no reason for search engines to come back." },
      { status: "warn", title: "No Open Graph or social meta tags.", detail: "When someone shares the site, there's no control over what image or description appears." },
    ],
  },
  {
    name: "Accessibility",
    score: 40,
    grade: "F",
    icon: "♿",
    desc: "Screen readers, contrast, keyboard navigation",
    findings: [
      { status: "fail", title: "All image alt text is broken or meaningless.", detail: "Every image has generic placeholder alt text. A screen reader user hears nothing useful about work quality or services." },
      { status: "fail", title: "No skip navigation link.", detail: "Keyboard-only users must tab through every element before reaching main content." },
      { status: "fail", title: "No ARIA landmarks or roles.", detail: "Screen reader users can't jump to main content, navigation, or footer sections." },
      { status: "warn", title: "All-uppercase text impacts readability.", detail: "Extended uppercase text is harder for everyone to read, especially users with dyslexia or visual processing difficulties." },
      { status: "warn", title: "Reviews section lacks semantic markup.", detail: "Testimonials aren't marked up with proper citation or review elements." },
    ],
  },
  {
    name: "Content & UX",
    score: 55,
    grade: "F",
    icon: "📄",
    desc: "User experience, CTAs, information architecture",
    findings: [
      { status: "fail", title: "Only 3 pages on the entire site.", detail: "Home, Services, and Projects. Not enough to showcase services, build local authority, or give visitors the info they need." },
      { status: "fail", title: "No contact form, quote request, or online scheduling.", detail: "Only conversion paths are phone call or Facebook Messenger. No way for someone browsing at midnight to request a quote." },
      { status: "fail", title: "Only 2 customer testimonials displayed.", detail: "Two reviews isn't enough to build real trust when competitors are showcasing dozens." },
      { status: "warn", title: "Service descriptions are generic.", detail: "No specific services mentioned like soft washing, deck cleaning, roof washing, or concrete restoration." },
      { status: "warn", title: "No before-and-after gallery on homepage.", detail: "For a power washing company, visual proof of results is the strongest sales tool. Homepage has none." },
      { status: "warn", title: "No FAQ or educational content.", detail: "Questions like 'How often should I power wash?' could drive organic traffic and build trust." },
    ],
  },
  {
    name: "Security",
    score: 62,
    grade: "D",
    icon: "🔒",
    desc: "HTTPS, headers, data protection",
    findings: [
      { status: "pass", title: "HTTPS is active.", detail: "The site loads over a secure connection." },
      { status: "pass", title: "Terms and Conditions page exists.", detail: "Legal terms page is linked from the footer." },
      { status: "warn", title: "Analytics from external domain.", detail: "Matomo tracker loaded from groovetech.io using protocol-relative URL. Third-party dependency and potential privacy concern." },
      { status: "warn", title: "No Content Security Policy or security headers.", detail: "CSP, HSTS, and X-Frame-Options would help protect against common attacks." },
      { status: "warn", title: "No cookie consent or privacy policy.", detail: "If analytics cookies are used, a privacy policy and cookie notice should be present." },
    ],
  },
  {
    name: "Technical",
    score: 48,
    grade: "F",
    icon: "⚙️",
    desc: "Code quality, platform, infrastructure",
    findings: [
      { status: "fail", title: "Built on GrooveApps with severe limitations.", detail: "This platform restricts control over HTML structure, performance, SEO, and custom functionality. Designed for funnels, not full business websites." },
      { status: "fail", title: "Internet Explorer warning still displayed.", detail: "Shows an IE compatibility message, suggesting the template hasn't been thoroughly customized. Wasted screen real estate." },
      { status: "fail", title: "Heading tags severely misused.", detail: "H3 tags used for every city name in service area (21 times). Damages both SEO and accessibility." },
      { status: "warn", title: "No favicon or manifest file.", detail: "Browser tab shows a generic icon. Can't be added to a phone's home screen properly." },
      { status: "warn", title: "Only 3 pages with minimal internal linking.", detail: "Flat architecture with no depth, no breadcrumbs, and minimal cross-linking." },
    ],
  },
];

const CRITICAL_FINDINGS = [
  {
    num: "01",
    title: "Every Image on the Site Is Invisible to Search Engines and Screen Readers",
    impact: "All images across the site have broken or meaningless alternative text. Google cannot understand what your images show, which hurts search ranking for image results. Anyone using assistive technology gets no useful information. For a service business that relies on visual proof of quality work, before-and-after photos should be the strongest selling point online, but right now they're invisible.",
    severity: "critical",
    tag: "Critical — Accessibility + SEO",
  },
  {
    num: "02",
    title: "No Contact Form and No Online Booking Means Lost Leads",
    impact: "The only way to reach the business is by calling or messaging on Facebook. No contact form, no quote request, no online scheduling. Over 60% of consumers prefer to contact service businesses online rather than by phone. Every day without an online contact option is leaving money on the table.",
    severity: "warning",
    tag: "High — Lead Generation",
  },
  {
    num: "03",
    title: "No Local SEO Foundation Means Invisible in Search Results",
    impact: "No structured data markup, no sitemap, no optimized meta descriptions, and broken heading structure. Every city name is tagged as an H3 heading. No individual service pages, no blog content, no location-specific landing pages. Someone searching 'power washing Egg Harbor' is far more likely to find a competitor because this site gives Google almost nothing to work with.",
    severity: "info",
    tag: "High — Search Visibility",
  },
];

function gradeColor(grade) {
  const map = { A: "#22c55e", B: "#276EF1", C: "#eab308", D: "#f97316", F: "#ef4444" };
  return map[grade] || "#ef4444";
}
function gradeBg(grade) {
  const map = {
    A: "rgba(34,197,94,.1)", B: "rgba(39,110,241,.1)",
    C: "rgba(234,179,8,.1)", D: "rgba(249,115,22,.1)", F: "rgba(239,68,68,.1)",
  };
  return map[grade] || "rgba(239,68,68,.1)";
}

function AnimatedGauge({ score, grade }) {
  const [offset, setOffset] = useState(628);
  useEffect(() => {
    const timer = setTimeout(() => setOffset(628 - (score / 100) * 628), 100);
    return () => clearTimeout(timer);
  }, [score]);
  return (
    <div style={{ position: "relative", width: 240, height: 240 }}>
      <svg viewBox="0 0 220 220" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="110" cy="110" r="96" fill="none" stroke="#19191d" strokeWidth="12" />
        <circle cx="110" cy="110" r="96" fill="none" stroke={gradeColor(grade)} strokeWidth="12" strokeLinecap="round"
          strokeDasharray="628" strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -3, fontFamily: "'Space Mono',monospace", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: gradeColor(grade), marginTop: 4, letterSpacing: 1, textTransform: "uppercase" }}>Grade: {grade}</div>
      </div>
    </div>
  );
}

function CategoryCard({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#111113", border: "1px solid #27272a", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
      <div className="category-header" onClick={() => setOpen(!open)}
        style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "background .2s" }}
        onMouseEnter={e => e.currentTarget.style.background = "#19191d"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#19191d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{cat.icon}</div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{cat.name}</h3>
            <span style={{ fontSize: 13, color: "#71717a" }}>{cat.desc}</span>
          </div>
        </div>
        <div className="category-right" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 28, borderRadius: 6, fontSize: 13, fontWeight: 700, background: gradeBg(cat.grade), color: gradeColor(cat.grade) }}>{cat.grade}</span>
          <span style={{ fontSize: 16, color: "#71717a", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "20px 24px 24px", borderTop: "1px solid #27272a" }}>
          {cat.findings.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < cat.findings.length - 1 ? "1px solid rgba(39,39,42,.5)" : "none" }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, marginTop: 2,
                background: f.status === "fail" ? "rgba(239,68,68,.1)" : f.status === "warn" ? "rgba(249,115,22,.1)" : "rgba(34,197,94,.1)",
                color: f.status === "fail" ? "#ef4444" : f.status === "warn" ? "#f97316" : "#22c55e",
              }}>
                {f.status === "fail" ? "✕" : f.status === "warn" ? "⚠" : "✓"}
              </div>
              <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6 }}>
                <strong style={{ color: "#fafafa", fontWeight: 600 }}>{f.title}</strong> {f.detail}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AuditDashboard() {
  const overall = 51;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: "#09090b", color: "#fafafa", minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(9,9,11,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #27272a", padding: "16px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="https://res.cloudinary.com/dhs9d8tou/image/upload/v1769829242/onmlogo_bhcbxa.png" alt="Online Nexus Marketing" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
            <span style={{ fontSize: 13, color: "#a1a1aa", fontWeight: 500, letterSpacing: .5, textTransform: "uppercase" }}>Website Audit Report</span>
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 8 }}>
            {["Overview", "Findings", "Scorecard", "Details", "Next Steps"].map(s => (
              <a key={s} href={`#${s.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: 13, color: "#71717a", textDecoration: "none", padding: "6px 14px", borderRadius: 6, fontWeight: 500 }}>{s}</a>
            ))}
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "1px solid #27272a", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#a1a1aa", fontSize: 18, lineHeight: 1 }}
            aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{ display: "none", flexDirection: "column", padding: "12px 24px 16px", borderTop: "1px solid #27272a", maxWidth: 1080, margin: "0 auto" }}>
            {["Overview", "Findings", "Scorecard", "Details", "Next Steps"].map(s => (
              <a key={s} href={`#${s.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)}
                style={{ fontSize: 14, color: "#a1a1aa", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid #1a1a1e", fontWeight: 500 }}>{s}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="overview" className="hero-section" style={{ padding: "80px 0 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#111113", border: "1px solid #27272a", padding: "8px 16px", borderRadius: 100, fontSize: 12, color: "#a1a1aa", marginBottom: 24, fontWeight: 500, letterSpacing: .3, textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#276EF1", animation: "pulse 2s infinite" }} /> Audit Complete
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>
            Hallman&apos;s <span style={{ background: "linear-gradient(135deg,#276EF1,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Power Washing</span>
          </h1>
          <p style={{ fontSize: 18, color: "#a1a1aa", marginBottom: 8 }}>{CLIENT.url}</p>
          <p style={{ fontSize: 13, color: "#71717a", fontFamily: "'Space Mono',monospace" }}>Prepared {CLIENT.date} &bull; Online Nexus Marketing</p>
        </div>
      </section>

      {/* Overall Score */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="score-grid" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "center" }}>
          <AnimatedGauge score={overall} grade="F" />
          <div className="score-text">
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -.5, marginBottom: 8 }}>Significant Issues Found</h2>
            <p style={{ color: "#a1a1aa", fontSize: 15, lineHeight: 1.7, maxWidth: 480 }}>
              The audit uncovered critical problems across accessibility, SEO, and user experience that are costing real leads and visibility. The site is built on a limited website builder platform with only 3 pages, broken image descriptions, no contact form, and no search engine optimization. Visitors searching for power washing in Atlantic County are unlikely to find this site.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, margin: "48px 0" }}>
          {[
            { num: "3", label: "Total Pages", color: "#ef4444" },
            { num: "0", label: "Contact Forms", color: "#ef4444" },
            { num: "21", label: "Misused Heading Tags", color: "#f97316" },
            { num: "0", label: "Schema Markup Found", color: "#ef4444" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#111113", border: "1px solid #27272a", borderRadius: 12, padding: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color }} />
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: -1, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#71717a", fontWeight: 500, textTransform: "uppercase", letterSpacing: .5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Findings */}
      <section id="findings" style={{ padding: "48px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -.5 }}>Critical Findings</h2>
            <p style={{ color: "#a1a1aa", fontSize: 15, marginTop: 4 }}>The three most impactful issues affecting the business right now</p>
          </div>
          {CRITICAL_FINDINGS.map((f, i) => (
            <div key={i} style={{
              background: "#111113", border: "1px solid #27272a", borderRadius: 12, padding: 28, marginBottom: 16,
              borderLeft: `3px solid ${f.severity === "critical" ? "#ef4444" : f.severity === "warning" ? "#f97316" : "#eab308"}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontFamily: "'Space Mono',monospace" }}>Finding {f.num}</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>{f.impact}</div>
              <span style={{
                display: "inline-block", marginTop: 12, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: .5,
                background: f.severity === "critical" ? "rgba(239,68,68,.1)" : f.severity === "warning" ? "rgba(249,115,22,.1)" : "rgba(234,179,8,.1)",
                color: f.severity === "critical" ? "#ef4444" : f.severity === "warning" ? "#f97316" : "#eab308",
              }}>{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Scorecard */}
      <section id="scorecard" style={{ padding: "48px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -.5 }}>Category Scorecard</h2>
            <p style={{ color: "#a1a1aa", fontSize: 15, marginTop: 4 }}>How the site performs across seven audit categories</p>
          </div>
          <div style={{ background: "#111113", border: "1px solid #27272a", borderRadius: 12, overflow: "hidden" }}>
            <table className="scorecard-table" style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  {["Category", "Grade", "Score", ""].map((h, i) => (
                    <th key={i} style={{ fontSize: 11, color: "#71717a", textAlign: "left", padding: "12px 16px", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, borderBottom: "1px solid #27272a", fontFamily: "'Space Mono',monospace", width: i === 2 ? "40%" : "auto" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((c, i) => (
                  <tr key={i}>
                    <td style={{ padding: 16, borderBottom: i < CATEGORIES.length - 1 ? "1px solid #27272a" : "none", fontWeight: 600, fontSize: 15 }}>{c.name}</td>
                    <td style={{ padding: 16, borderBottom: i < CATEGORIES.length - 1 ? "1px solid #27272a" : "none" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 28, borderRadius: 6, fontSize: 13, fontWeight: 700, background: gradeBg(c.grade), color: gradeColor(c.grade) }}>{c.grade}</span>
                    </td>
                    <td style={{ padding: 16, borderBottom: i < CATEGORIES.length - 1 ? "1px solid #27272a" : "none" }}>
                      <div style={{ width: "100%", height: 6, background: "#19191d", borderRadius: 3, overflow: "hidden", minWidth: 120 }}>
                        <div style={{ height: "100%", width: `${c.score}%`, borderRadius: 3, background: gradeColor(c.grade) }} />
                      </div>
                    </td>
                    <td style={{ padding: 16, borderBottom: i < CATEGORIES.length - 1 ? "1px solid #27272a" : "none", fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 14, textAlign: "right", color: gradeColor(c.grade), minWidth: 40 }}>{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Category Details */}
      <section id="details" style={{ padding: "48px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -.5 }}>Detailed Breakdown</h2>
            <p style={{ color: "#a1a1aa", fontSize: 15, marginTop: 4 }}>Expand each category to see specific findings</p>
          </div>
          {CATEGORIES.map((c, i) => <CategoryCard key={i} cat={c} />)}
        </div>
      </section>

      {/* CTA */}
      <section id="next-steps" className="cta-section" style={{ padding: "64px 0", margin: "48px 0", borderTop: "1px solid #27272a", borderBottom: "1px solid #27272a", textAlign: "center" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <img src="https://res.cloudinary.com/dhs9d8tou/image/upload/v1768967465/DSC07006_mh1pnc.jpg" alt="Oscar Galindo"
            style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid #27272a", margin: "0 auto 20px", display: "block", objectFit: "cover" }} />
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -.5, marginBottom: 8 }}>Ready to Talk About It?</h2>
          <p style={{ color: "#a1a1aa", fontSize: 15, marginBottom: 28, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>This audit is yours whether we work together or not. If you want to walk through the findings and talk about what a rebuild would look like, I&apos;m happy to.</p>
          <a href={BRAND.calendly} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#276EF1", color: "#fff", padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
            Book a Strategy Call →
          </a>
          <div style={{ marginTop: 20, fontSize: 13, color: "#71717a", fontFamily: "'Space Mono',monospace" }}>
            Oscar Galindo &bull; <a href={`mailto:${BRAND.email}`} style={{ color: "#a1a1aa", textDecoration: "none" }}>{BRAND.email}</a>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "#71717a", fontStyle: "italic", letterSpacing: .3 }}>&ldquo;{BRAND.slogan}&rdquo;</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 0", textAlign: "center", fontSize: 12, color: "#71717a", borderTop: "1px solid #27272a" }}>
        &copy; 2025 <a href="https://onlinenexusmarketing.com" target="_blank" rel="noopener noreferrer" style={{ color: "#a1a1aa", textDecoration: "none" }}>Online Nexus Marketing</a> &bull; Website Audit Report
      </footer>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @media(max-width:768px){
          .nav-links{display:none !important}
          .mobile-menu-btn{display:block !important}
          .mobile-menu{display:flex !important}
          .score-grid{grid-template-columns:1fr !important;justify-items:center;text-align:center}
          .score-text{text-align:center}
          .scorecard-table th:nth-child(3),
          .scorecard-table th:nth-child(4),
          .scorecard-table td:nth-child(3),
          .scorecard-table td:nth-child(4){display:none}
          .category-header{flex-wrap:wrap;gap:12px}
          .category-right{margin-left:auto}
          .hero-section{padding:48px 0 36px !important}
          .cta-section{padding:40px 0 !important;margin:24px 0 !important}
        }
        @media(max-width:480px){
          .stat-grid{grid-template-columns:1fr 1fr !important}
        }
      `}</style>
    </div>
  );
}
