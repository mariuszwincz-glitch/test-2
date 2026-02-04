const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp01(n) {
  return Math.min(100, Math.max(0, n));
}

function setupMobileNav() {
  const toggle = qs(".nav-toggle");
  const mobile = qs(".mobile-nav");
  if (!toggle || !mobile) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    mobile.hidden = !open;
    document.documentElement.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  qsa("a", mobile).forEach((a) =>
    a.addEventListener("click", () => {
      setOpen(false);
    })
  );
}

function setupCompare() {
  qsa("[data-compare]").forEach((wrap) => {
    const range = qs(".compare-range", wrap);
    const media = qs(".compare-media", wrap) ?? wrap;

    const setPos = (v, { syncRange = false } = {}) => {
      const pos = clamp01(Number(v));
      wrap.style.setProperty("--pos", `${pos}%`);
      wrap.dataset.pos = String(pos);
      if (syncRange && range) range.value = String(Math.round(pos));
    };

    if (range) {
      setPos(range.value);
      range.addEventListener("input", (e) => setPos(e.target.value));
    }

    let dragging = false;
    let raf = 0;
    let pending = null;

    const commit = () => {
      raf = 0;
      if (pending == null) return;
      setPos(pending, { syncRange: true });
      pending = null;
    };

    const schedule = (nextPos) => {
      pending = nextPos;
      if (raf) return;
      raf = requestAnimationFrame(commit);
    };

    const posFromEvent = (e) => {
      const rect = media.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = rect.width ? x / rect.width : 0.5;
      return ratio * 100;
    };

    wrap.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      wrap.setPointerCapture(e.pointerId);
      schedule(posFromEvent(e));
    });

    wrap.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      schedule(posFromEvent(e));
    });

    const end = () => {
      dragging = false;
    };
    wrap.addEventListener("pointerup", end);
    wrap.addEventListener("pointercancel", end);
    wrap.addEventListener("lostpointercapture", end);
  });
}

function setupShowroom() {
  const root = qs("[data-showroom]");
  if (!root) return;

  const tabs = qsa(".tab[data-product]", root);
  const views = qsa(".view[data-view]", root);
  const imgBefore = qs('[data-img="before"]', root);
  const imgAfter = qs('[data-img="after"]', root);
  if (!imgBefore || !imgAfter) return;

  const data = {
    p1: {
      miniatura: {
        before: "assets/demo/product-1-before.svg",
        after: "assets/demo/product-1-after.svg",
        altBefore: "Przed (kosmetyk): płaskie światło, brak kontekstu, hurtowy kadr.",
        altAfter: "Po (kosmetyk): naturalny produkt, głębia i kontekst.",
      },
      galeria: {
        before: "assets/demo/product-1-gallery-before.svg",
        after: "assets/demo/product-1-gallery-after.svg",
        altBefore: "Przed (kosmetyk, galeria): płasko i bez sceny.",
        altAfter: "Po (kosmetyk, galeria): światło, scena i zaufanie.",
      },
    },
    p2: {
      miniatura: {
        before: "assets/demo/product-2-before.svg",
        after: "assets/demo/product-2-after.svg",
        altBefore: "Przed (elektronika): ciemno i bez separacji.",
        altAfter: "Po (elektronika): separacja, połysk, głębia.",
      },
      galeria: {
        before: "assets/demo/product-2-gallery-before.svg",
        after: "assets/demo/product-2-gallery-after.svg",
        altBefore: "Przed (elektronika, galeria): płasko i bez charakteru.",
        altAfter: "Po (elektronika, galeria): premium odbiór i czytelność.",
      },
    },
    p3: {
      miniatura: {
        before: "assets/demo/product-3-before.svg",
        after: "assets/demo/product-3-after.svg",
        altBefore: "Przed (moda): płasko, bez faktury, bez sceny.",
        altAfter: "Po (moda): faktura, światło, kontekst.",
      },
      galeria: {
        before: "assets/demo/product-3-gallery-before.svg",
        after: "assets/demo/product-3-gallery-after.svg",
        altBefore: "Przed (moda, galeria): płasko i hurtowo.",
        altAfter: "Po (moda, galeria): spójny styl i premium odbiór.",
      },
    },
  };

  let currentProduct = "p1";
  let currentView = "miniatura";

  const setActive = (els, active, cls) => {
    for (const el of els) {
      const on = el === active;
      el.classList.toggle(cls, on);
      if (el.getAttribute("role") === "tab") el.setAttribute("aria-selected", String(on));
    }
  };

  const render = () => {
    const entry = data[currentProduct]?.[currentView];
    if (!entry) return;
    imgBefore.src = entry.before;
    imgAfter.src = entry.after;
    imgBefore.alt = entry.altBefore;
    imgAfter.alt = entry.altAfter;
  };

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentProduct = String(btn.dataset.product);
      setActive(tabs, btn, "is-active");
      render();
    });
  });

  views.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentView = String(btn.dataset.view);
      setActive(views, btn, "is-active");
      render();
    });
  });

  render();
}

function setupYear() {
  const y = qs("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

setupMobileNav();
setupCompare();
setupShowroom();
setupYear();
