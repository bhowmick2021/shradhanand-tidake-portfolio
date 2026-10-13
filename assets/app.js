const AUDS = { india: "For Recruiters", remote: "For Remote Teams", consultancy: "For Consulting Clients" };
const root = document.documentElement;
const base = "Shradhanand Tidake - Data Analytics & BI";
function current() { const a = new URLSearchParams(location.search).get("audience"); return AUDS[a] ? a : ""; }
function render(focus) {
  const a = current();
  root.dataset.aud = a;
  document.title = a ? AUDS[a] + " | " + base : base;
  if (focus) {
    window.scrollTo(0, 0);
    const t = a ? document.querySelector(`.view[data-view=${a}] h1`) : document.querySelector(".gate h1");
    if (t) { t.tabIndex = -1; t.focus({ preventScroll: true }); }
  }
}
function go(a) { history.pushState(null, "", a ? "?audience=" + a : location.pathname); render(true); }
document.addEventListener("click", e => {
  const l = e.target.closest("a[data-aud],a[data-back]");
  if (!l || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault(); go(l.dataset.aud || "");
});
window.addEventListener("popstate", () => render(true));
render(false);

// --- demos (synthetic), scoped per view ---
const pct = x => isFinite(x) ? (x * 100).toFixed(1) + "%" : "n/a";
document.querySelectorAll(".demo").forEach(d => {
  const o = k => d.querySelector(`[data-o=${k}]`), v = k => +d.querySelector(`[data-k=${k}]`).value;
  const kind = d.dataset.demo;
  if (kind === "serp") {
    const R = [["kw-A", 900, 450], ["kw-B", 60, 6], ["kw-C", 30, 21], ["kw-D", 600, 60], ["kw-E", 10, 9]];
    d.querySelector("tbody").innerHTML = R.map((r, i) => `<tr><td>${r[0]}</td><td><input type="number" min="0" data-i="${i}" data-c="1" value="${r[1]}" aria-label="${r[0]} searches"></td><td><input type="number" min="0" data-i="${i}" data-c="2" value="${r[2]}" aria-label="${r[0]} searches with TLD"></td></tr>`).join("");
    const f = () => {
      d.querySelectorAll("tbody input").forEach(e => R[e.dataset.i][e.dataset.c] = +e.value);
      const ok = R.filter(r => r[1] > 0), w = r => Math.min(r[2], r[1]);
      o("avg").textContent = pct(ok.reduce((a, r) => a + w(r) / r[1], 0) / (ok.length || 1));
      o("pool").textContent = pct(R.reduce((a, r) => a + w(r), 0) / R.reduce((a, r) => a + r[1], 0));
    };
    d.addEventListener("input", f); f();
  } else if (kind === "dq") {
    const f = () => {
      o("pb").textContent = (v("b") / v("n") * 100).toFixed(2) + "%"; o("pa").textContent = (v("a") / v("n") * 100).toFixed(2) + "%";
      o("r").textContent = v("b") > 0 ? ((v("b") - v("a")) / v("b") * 100).toFixed(1) + "%" : "n/a";
    };
    d.addEventListener("input", f); f();
  } else {
    const f = () => o("s").textContent = v("p") > 0 ? ((v("p") - v("n")) / v("p") * 100).toFixed(1) + "%" : "n/a";
    d.addEventListener("input", f); f();
  }
});
