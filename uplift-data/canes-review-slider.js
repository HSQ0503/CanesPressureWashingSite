// Home page review slider: advances one review every few seconds, loops back to the start, and pauses
// while the visitor hovers, taps, or focuses it. Reduced-motion visitors get the buttons only.
(function () {
  var DELAY = 6000;

  function init(slider) {
    var track = slider.querySelector(".canes-rslider__track");
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var paused = false;

    function step() {
      var slide = track.querySelector(".canes-rslide");
      return slide ? slide.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
    }

    function move(dir) {
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      var atStart = track.scrollLeft <= 4;
      if (dir > 0 && atEnd) {
        track.scrollTo({ left: 0 });
      } else if (dir < 0 && atStart) {
        track.scrollTo({ left: track.scrollWidth });
      } else {
        track.scrollBy({ left: dir * step() });
      }
    }

    slider.querySelectorAll(".canes-rslider__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        move(Number(btn.dataset.dir));
      });
    });

    ["mouseenter", "focusin", "touchstart"].forEach(function (type) {
      slider.addEventListener(type, function () { paused = true; }, { passive: true });
    });
    ["mouseleave", "focusout"].forEach(function (type) {
      slider.addEventListener(type, function () { paused = false; });
    });

    if (!calm) {
      setInterval(function () {
        if (!paused && !document.hidden) move(1);
      }, DELAY);
    }
  }

  function initAll() {
    document.querySelectorAll(".canes-rslider").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
