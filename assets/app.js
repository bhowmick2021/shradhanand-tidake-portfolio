const AUD = {
  india: {
    items: ["15+ years in Mumbai, from registry operations to analytics leadership", "Commercial wins: vendor cost restructuring, dispute-loss reduction, data-quality fixes", "Mentors analysts; works across Engineering, Brand, Channel and Finance"],
    pdf: "resumes/Shradhanand_Tidake_Resume_India.pdf"
  },
  remote: {
    items: ["Owns analytics end to end: requirement, pipeline, validated dashboard", "AI-assisted Python scrapers running as scheduled jobs, replacing recurring AI/token-dependent runs", "Works across technology, finance, brand and channel teams on shared data definitions"],
    pdf: "resumes/Shradhanand_Tidake_Resume_Remote.pdf"
  }
};
function setAud(a) {
  if (!AUD[a]) a = "india";
  document.querySelectorAll(".toggle button").forEach(b => b.setAttribute("aria-selected", b.dataset.aud === a));
  document.getElementById("aud-panel").innerHTML = "<ul>" + AUD[a].items.map(i => "<li>" + i + "</li>").join("") + "</ul>";
  document.getElementById("cta-pdf").href = AUD[a].pdf;
  document.body.dataset.aud = a;
}
document.querySelectorAll(".toggle button").forEach(b => b.onclick = () => { setAud(b.dataset.aud); history.replaceState(null, "", "#" + b.dataset.aud); });
setAud(location.hash.slice(1));

const STORIES = [
  ["Competitive SERP intelligence", "Registrar search results were hard to track consistently for TLD visibility, positioning and geography.", "Integrated scraping, BigQuery transformation, KPI definitions, validation and Tableau delivery for GoDaddy and Namecheap.", "Tracking of TLD appearance share, keyword performance and geographic trends in one reporting flow.", "Competitive positioning and bidding decisions rest on defined, validated metrics."],
  ["Namecheap SERP dashboard", "Appearance-share figures varied by reporting level because aggregation and denominators were inconsistent.", "Designed a standardized dashboard with corrected aggregation and denominator logic.", "Consistent appearance-share and positioning analysis across daily, weekly and monthly views.", "Stakeholders compare periods without re-deriving the numbers."],
  ["GoDaddy .tech keyword analysis", "Needed to see where .tech was missing while extensions such as .ai and .io appeared.", "Led development and refinement of keyword-level visibility analysis.", "Keyword-level view of competitive visibility, including cases where .tech was absent.", "Supports bidding and TLD-positioning decisions."],
  ["AI-assisted data collection", "Recurring AI/token-dependent runs were costly to operate and a cart-upsell scraper was blocked by Akamai in earlier attempts.", "Built AI-assisted Python scrapers for three client workflows; used Codex-assisted development to establish the cart-upsell scraper.", "Scrapers run as locally scheduled cron processes; the previously blocked data source now works locally.", "Reliable, repeatable data acquisition without recurring AI execution."],
  ["ETL revenue correction", "Erroneous transaction revenue reduced trust in downstream data.", "Designed and validated ETL correction logic; also built a Tableau data-recency framework later extended to six key dashboards.", "Erroneous revenue proportion fell from about 0.60% to 0.25% in testing.", "More reliable revenue reporting and a scalable way to monitor data freshness."],
  ["Payment-dispute investigation", "A sharp rise in Stripe payment disputes was driving losses.", "Proactively investigated patterns and coordinated user blocking and extra account-security measures.", "Monthly dispute cases fell about 88% (123 in November to 15 in December); monthly losses fell about 90%.", "Direct reduction in financial loss and risk."],
  ["Vendor cost optimization", "A complex NCC escrow billing issue spanned 12 TLDs; a WhoisXML upgrade was proposed at a high annual cost.", "Drove commercial resolution, consolidated escrow billing and negotiated the WhoisXML plan.", "Annual escrow run-rate down by more than 50% versus 2023 billed cost; WhoisXML plan about 38% below the proposal.", "Lower recurring cost while keeping access to business-critical registration data."]
];
document.getElementById("stories").innerHTML = STORIES.map(s => `<article class="card"><h3>${s[0]}</h3><dl><dt>Problem</dt><dd>${s[1]}</dd><dt>Contribution</dt><dd>${s[2]}</dd><dt>Delivered change</dt><dd>${s[3]}</dd><dt>Business impact</dt><dd>${s[4]}</dd></dl></article>`).join("");

const SK = {
  "Data & Analytics": "Data Analysis | SQL | BigQuery | Tableau (Advanced: LOD & Table Calculations, Dashboard Design) | Data Visualization | Excel | Google Sheets | Data Validation | Data Quality | Data Governance | Root Cause Analysis | Exploratory Analysis | Predictive Modeling | KPI Design & Development",
  "Business Analysis": "Requirements Gathering | Business Requirements (BRD) | Business Logic | Process Analysis | Stakeholder Management | Solution Validation | Cross-functional Coordination",
  "Commercial Analytics": "Pricing Analysis | Domain Economics | Renewal Analysis | Market Analysis | Channel Analysis | Competitive Analysis | Cost Optimization | NPV Analysis | IRR Analysis Support",
  "Automation & AI": "Machine Learning | Python for Analytics & Automation | Web Scraping | Cron Scheduling | Workflow Automation | Natural Language Processing | AI Tools Integration | Automated Coding",
  "Leadership & Delivery": "Analytics Project Leadership | Stakeholder Alignment | Vendor Management | Problem Solving | Management Reporting | Team Mentoring | Process Improvement | Risk & Issue Management"
};
document.getElementById("skillgrid").innerHTML = Object.entries(SK).map(([k, v]) => `<article class="card"><h3>${k}</h3><p>${v.split(" | ").join(" &middot; ")}</p></article>`).join("");
document.getElementById("certs").innerHTML = ["Fundamental of Business Analysis - Udemy (Jan 2024)", "Data Warehouse ETL Testing & Data Quality Management A-Z - Udemy (May 2024)", "Generative AI for data analytics - Udemy (Dec 2023)", "Leadership - Practical Leadership Skills - Udemy (June 2024)", "Learn SQL for Data Analysis with Google BigQuery - Udemy (July 2020)", "Management Skills - Team Leadership Skills Masterclass - Udemy (June 2024)", "Master Course in Tableau for Business Intelligence - Udemy (Jan 2024)", "Productivity and Time Management - Udemy (July 2020)", "Project Management for Non Project Managers - PMP/PMI - Udemy (Jul 2020)", "Statistics for Data Science and Business Analysis - Udemy (Mar 2024)", "IT Project Management - ISB (Jan 2025)"].map(c => `<li>${c.replace(/&/g, "&amp;")}</li>`).join("");

// --- demos (synthetic) ---
const pct = x => isFinite(x) ? (x * 100).toFixed(1) + "%" : "n/a";
const $ = id => document.getElementById(id);
const D1 = [["kw-A", 900, 450], ["kw-B", 60, 6], ["kw-C", 30, 21], ["kw-D", 600, 60], ["kw-E", 10, 9]];
$("d1rows").innerHTML = D1.map((r, i) => `<tr><td>${r[0]}</td><td><input type="number" min="0" data-i="${i}" data-c="1" value="${r[1]}" aria-label="${r[0]} searches"></td><td><input type="number" min="0" data-i="${i}" data-c="2" value="${r[2]}" aria-label="${r[0]} searches with TLD"></td></tr>`).join("");
function d1() {
  document.querySelectorAll("#d1rows input").forEach(e => D1[e.dataset.i][e.dataset.c] = +e.value);
  const ok = D1.filter(r => r[1] > 0);
  const avg = ok.reduce((a, r) => a + Math.min(r[2], r[1]) / r[1], 0) / (ok.length || 1);
  const S = D1.reduce((a, r) => a + r[1], 0), W = D1.reduce((a, r) => a + Math.min(r[2], r[1]), 0);
  $("d1a").textContent = pct(avg); $("d1b").textContent = pct(W / S);
}
$("d1rows").oninput = d1; d1();
function d2() {
  const n = +$("d2n").value, b = +$("d2b").value, a = +$("d2a").value;
  $("d2pb").textContent = (b / n * 100).toFixed(2) + "%"; $("d2pa").textContent = (a / n * 100).toFixed(2) + "%";
  $("d2r").textContent = b > 0 ? ((b - a) / b * 100).toFixed(1) + "%" : "n/a";
}
["d2n", "d2b", "d2a"].forEach(i => $(i).oninput = d2); d2();
function d3() {
  const p = +$("d3p").value, n = +$("d3n").value;
  $("d3s").textContent = p > 0 ? ((p - n) / p * 100).toFixed(1) + "%" : "n/a";
}
["d3p", "d3n"].forEach(i => $(i).oninput = d3); d3();
