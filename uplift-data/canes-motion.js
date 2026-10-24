// Site-wide touches: content slides in as it scrolls into view, an orange services ticker runs under
// the page header, headings get an orange accent, and the Canes pelican appears throughout the page.
// Content above the fold is never hidden, and nothing moves for visitors who ask for reduced motion.
(function () {
  var REVEAL = [
    "main h2",
    ".home-service-card",
    ".home-trust__item",
    ".home-review-card",
    ".canes-process__step",
    ".canes-review-card",
    ".canes-project",
    ".canes-compare__card",
    ".canes-plan",
    ".faq-item",
    ".service-content .service-image",
    ".card",
  ].join(",");

  var TICKER = [
    "Roof Soft Washing",
    "House Washing",
    "Gutter Cleaning",
    "Paver Sealing",
    "Window Washing",
    "Driveways & Sidewalks",
    "Patios & Screen Enclosures",
  ];

  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function addTicker() {
    var anchor = document.querySelector(".canes-hero") || document.querySelector("main .banner");
    if (!anchor || document.querySelector(".canes-ticker")) return;
    var band = document.createElement("div");
    band.className = "canes-ticker";
    band.setAttribute("aria-hidden", "true");
    var track = document.createElement("div");
    track.className = "canes-ticker__track";
    // Two copies of the list so the loop is seamless.
    for (var copy = 0; copy < 2; copy++) {
      TICKER.forEach(function (text) {
        var item = document.createElement("span");
        item.textContent = text;
        track.appendChild(item);
      });
    }
    band.appendChild(track);
    anchor.insertAdjacentElement("afterend", band);
  }

  function reveal() {
    if (calm || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("canes-motion");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    var viewport = window.innerHeight;
    var lastParent = null;
    var index = 0;
    document.querySelectorAll(REVEAL).forEach(function (el) {
      if (el.closest(".canes-hero, .main-navigation, .canes-ba")) return;
      // Anything already on screen stays put; only content further down animates in.
      if (el.getBoundingClientRect().top < viewport) return;
      index = el.parentElement === lastParent ? index + 1 : 0;
      lastParent = el.parentElement;
      el.style.transitionDelay = Math.min(index, 5) * 70 + "ms";
      el.classList.add("canes-reveal");
      observer.observe(el);
    });
  }

  var PELICAN = "/uplift-data/images/brand/canes-pelican-320.webp";

  function pelicanImg(cls) {
    var img = document.createElement("img");
    img.src = PELICAN;
    img.alt = "";
    img.width = 320;
    img.height = 340;
    img.loading = "lazy";
    img.decoding = "async";
    img.className = cls;
    return img;
  }

  // Two-tone headings: the last third of a plain heading turns orange. Text is unchanged.
  function twoToneHeadings() {
    document.querySelectorAll("main h2").forEach(function (h) {
      if (h.closest(".canes-hero, .canes-ticker") || h.children.length) return;
      var words = h.textContent.trim().split(/\s+/);
      if (words.length < 2) return;
      var count = Math.max(1, Math.round(words.length / 3));
      var accent = document.createElement("span");
      accent.className = "canes-accent";
      accent.textContent = words.slice(-count).join(" ");
      h.textContent = words.slice(0, -count).join(" ") + " ";
      h.appendChild(accent);
    });
  }

  // A pelican badge on an orange band, used between sections.
  function mascotDivider() {
    var band = document.createElement("div");
    band.className = "canes-mascot-divider";
    band.setAttribute("aria-hidden", "true");
    var badge = document.createElement("div");
    badge.className = "canes-mascot-divider__badge";
    badge.appendChild(pelicanImg("canes-mascot-divider__pelican"));
    var text = document.createElement("span");
    text.innerHTML = "<strong>Canes Pressure Washing</strong><small>Palm Beach County&rsquo;s friendly crew</small>";
    badge.appendChild(text);
    band.appendChild(badge);
    return band;
  }

  // The pelican shows up throughout every page, like a real brand mascot.
  function addPelicans() {
    var main = document.querySelector("main");
    if (!main) return;

    // 1. Badge dividers between sections.
    var spots = [];
    if (document.body.classList.contains("home-page")) {
      spots = [".home-services", ".home-faq"].map(function (sel) { return document.querySelector(sel); });
      if (spots[0]) spots[0] = spots[0].nextElementSibling; // after "What we clean"
    } else if (document.querySelector(".canes-process")) {
      spots = [document.querySelector(".canes-process")];
    } else {
      var sections = main.querySelectorAll(":scope > div > section, :scope > section");
      if (sections.length > 2) spots = [sections[2]];
    }
    spots.forEach(function (el) {
      if (el && el.parentNode) el.parentNode.insertBefore(mascotDivider(), el);
    });

    // 2. Standing beside the orange "15% off" banner.
    document.querySelectorAll(".cta-1 .container").forEach(function (box) {
      box.classList.add("canes-has-pelican");
      box.appendChild(pelicanImg("canes-cta-pelican"));
    });

    // 3. Peeking over the "Contact Us Today" form.
    document.querySelectorAll(".form-container .form-header").forEach(function (head) {
      head.appendChild(pelicanImg("canes-form-pelican"));
    });

    // 4. Beside the "How we do it" steps and the commercial inquiry button.
    document.querySelectorAll(".canes-process .container, .canes-commercial__cta").forEach(function (box) {
      box.classList.add("canes-has-pelican");
      box.appendChild(pelicanImg(box.classList.contains("canes-commercial__cta") ? "canes-inline-pelican" : "canes-process-pelican"));
    });

    // 5. Home quote section and reviews header.
    document.querySelectorAll(".home-booking__intro, .canes-reviews-hero .container").forEach(function (box) {
      box.classList.add("canes-has-pelican");
      box.appendChild(pelicanImg("canes-side-pelican"));
    });
  }

  function init() {
    addTicker();
    twoToneHeadings();
    addPelicans();
    reveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
