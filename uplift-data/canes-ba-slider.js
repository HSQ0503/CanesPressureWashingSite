// Before/after comparison sliders: drag anywhere on the photo, or focus it and use arrow keys.
(function () {
  function init(frame) {
    var range = frame.querySelector(".canes-ba__range");
    var dragging = false;

    function setPosition(percent) {
      var clamped = Math.max(0, Math.min(100, percent));
      frame.style.setProperty("--pos", clamped + "%");
      if (range) range.value = String(Math.round(clamped));
    }

    function positionFromPointer(event) {
      var rect = frame.getBoundingClientRect();
      setPosition(((event.clientX - rect.left) / rect.width) * 100);
    }

    frame.addEventListener("pointerdown", function (event) {
      if (event.button !== 0) return;
      dragging = true;
      frame.setPointerCapture(event.pointerId);
      positionFromPointer(event);
    });

    frame.addEventListener("pointermove", function (event) {
      if (dragging) positionFromPointer(event);
    });

    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (type) {
      frame.addEventListener(type, function () {
        dragging = false;
      });
    });

    if (range) {
      range.addEventListener("input", function () {
        setPosition(Number(range.value));
      });
    }
  }

  function initAll() {
    document.querySelectorAll(".canes-ba__frame").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
