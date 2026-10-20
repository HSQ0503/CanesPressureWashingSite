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

    section.addEventListener("change", render);
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
