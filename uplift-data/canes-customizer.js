// Service customizer: shows the visitor's picks in the summary bar. It does not touch the quote form.
(function () {
  function init(section) {
    var chips = section.querySelector(".canes-custom__chips");
    if (!chips) return;

    function render() {
      var seen = {};
      chips.innerHTML = "";
      section.querySelectorAll("input:checked").forEach(function (input) {
        var text = input.dataset.chip || input.value;
        if (seen[text]) return; // e.g. "not sure" picked on more than one question
        seen[text] = true;
        var chip = document.createElement("span");
        chip.textContent = text;
        chips.appendChild(chip);
      });
    }

    section.addEventListener("change", function (event) {
      // Pop the picked card and give phones a tiny buzz.
      var card = event.target.closest(".canes-option") && event.target.closest(".canes-option").querySelector(".canes-option__card");
      if (card && event.target.checked) {
        card.classList.remove("is-popping");
        void card.offsetWidth;
        card.classList.add("is-popping");
        var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (navigator.vibrate && !calm) navigator.vibrate(10);
      }
      render();
    });
    render();
  }

  function initAll() {
    document.querySelectorAll(".canes-custom").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
