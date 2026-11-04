// ---------- Pomodoro (solo existe en estudio.html) ----------
(function () {
  const display = document.getElementById("time");
  if (!display) return;

  const modeLabel = document.getElementById("mode");
  const startBtn = document.getElementById("start");
  const resetBtn = document.getElementById("reset");
  const WORK = 25 * 60;
  const BREAK = 5 * 60;

  let seconds = WORK;
  let working = true;
  let timer = null;

  function render() {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    display.textContent = m + ":" + s;
    modeLabel.textContent = working ? "Enfoque" : "Descanso";
    document.title = m + ":" + s + " · Guía Universitaria";
  }

  function tick() {
    seconds--;
    if (seconds < 0) {
      working = !working;
      seconds = working ? WORK : BREAK;
    }
    render();
  }

  startBtn.addEventListener("click", function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
      startBtn.textContent = "Reanudar";
    } else {
      timer = setInterval(tick, 1000);
      startBtn.textContent = "Pausar";
    }
  });

  resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    working = true;
    seconds = WORK;
    startBtn.textContent = "Iniciar";
    render();
  });

  render();
})();

// ---------- Checklist con progreso (solo en bienestar.html) ----------
(function () {
  const boxes = document.querySelectorAll(".checklist input");
  const bar = document.getElementById("bar");
  const text = document.getElementById("bar-text");
  if (!boxes.length || !bar) return;

  function update() {
    const done = document.querySelectorAll(".checklist input:checked").length;
    const pct = Math.round((done / boxes.length) * 100);
    bar.style.width = pct + "%";
    text.textContent = done + " de " + boxes.length + " hábitos hoy (" + pct + "%)";
  }

  boxes.forEach(function (b) { b.addEventListener("change", update); });
  update();
})();

// ---------- Pestañas de técnicas (solo en estudio.html) ----------
(function () {
  const tabs = document.querySelectorAll(".tab");
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
      document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("show"); });
      tab.setAttribute("aria-selected", "true");
      document.getElementById(tab.dataset.panel).classList.add("show");
    });
  });
})();

// ---------- Aparición suave al hacer scroll ----------
(function () {
  if (!document.documentElement.classList.contains("js")) return;
  const selector = [
    ".hero > *", ".tabs", ".project", ".split > *", ".card", ".habit", ".step-list li",
    ".day li", ".checklist li", ".progress", ".callout", ".video-wrap", "table",
    "main h2.section-title", "main > .lead", "main > p", "main > figure"
  ].join(",");
  const items = document.querySelectorAll(selector);
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) {
    // retraso escalonado entre hermanos para un efecto en cascada
    const i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--d", Math.min(i, 5) * 0.1 + "s");
    el.classList.add("reveal");
    io.observe(el);
  });
})();
