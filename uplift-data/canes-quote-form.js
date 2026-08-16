// Enhances and submits the native estimate-request form. Posts JSON to the
// Canes platform intake API and sends the visitor to /thanks on success.
(function () {
  var christmasService = "Christmas Lights";
  var christmasAliases = [
    "christmas-lights",
    "christmas-lighting",
    "christmas-light-installation",
    "christmaslights",
    "christmas",
    "xmas-lights",
    "holiday-lights",
    "holiday-lighting",
  ];

  function normalizeService(value) {
    return (value || "")
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, "-");
  }

  function shouldPreselectChristmasLights() {
    var requestedService = new URLSearchParams(window.location.search).get(
      "service",
    );

    return christmasAliases.indexOf(normalizeService(requestedService)) !== -1;
  }

  function ensureChristmasOption(select) {
    var option = Array.from(select.options).find(function (item) {
      return (
        normalizeService(item.value || item.textContent) === "christmas-lights"
      );
    });

    if (!option) {
      option = document.createElement("option");
      option.value = christmasService;
      option.textContent = christmasService;
      select.appendChild(option);
    }

    return option;
  }

  function createSeasonalControl(form, select, option) {
    var control = document.createElement("div");
    control.className = "cn-seasonal-service";
    control.innerHTML =
      '<button class="cn-seasonal-service__button" type="button" aria-pressed="false">' +
      '<span class="cn-seasonal-service__icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M8.2 3.5 12 7.3l3.8-3.8M8.2 20.5l3.8-3.8 3.8 3.8M2.9 11.2 8 12l-.8 5.1M21.1 12.8 16 12l.8-5.1"/></svg>' +
      "</span>" +
      '<span class="cn-seasonal-service__copy"><strong>Christmas Lights</strong><small>Now booking through Christmas</small></span>' +
      '<span class="cn-seasonal-service__status">Seasonal service</span>' +
      "</button>";

    var button = control.querySelector("button");
    var status = control.querySelector(".cn-seasonal-service__status");
    var field = select.closest(".cn-field");

    function updateState() {
      var isSelected = select.value === option.value;
      control.classList.toggle("is-selected", isSelected);
      form.classList.toggle("cn-quote-form--christmas", isSelected);
      if (field) field.classList.toggle("cn-field--christmas", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
      status.textContent = isSelected ? "Selected" : "Seasonal service";
    }

    button.addEventListener("click", function () {
      select.value = option.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.focus({ preventScroll: true });
    });
    select.addEventListener("change", updateState);

    if (field) {
      field.parentNode.insertBefore(control, field);
    } else {
      select.parentNode.insertBefore(control, select);
    }

    updateState();
  }

  function enhanceServices(form, preselectChristmas) {
    var select = form.querySelector('select[name="service"]');
    if (!select) return;

    var christmasOption = ensureChristmasOption(select);
    if (preselectChristmas) select.value = christmasOption.value;
    createSeasonalControl(form, select, christmasOption);
  }

  function bind(form, preselectChristmas) {
    if (form.dataset.cnQuoteBound === "true") return;
    form.dataset.cnQuoteBound = "true";
    enhanceServices(form, preselectChristmas);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var errorEl = form.querySelector(".cn-quote-error");
      var button = form.querySelector(".cn-quote-submit");
      var label = button.textContent;
      errorEl.hidden = true;
      button.disabled = true;
      button.textContent = "Sending...";
      try {
        var data = Object.fromEntries(new FormData(form).entries());
        data.consent = form.querySelector('input[name="consent"]').checked;
        var res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        var out = await res.json().catch(function () {
          return {};
        });
        if (res.ok && out.ok) {
          window.location.href = "/thanks";
          return;
        }
      } catch (err) {}
      errorEl.hidden = false;
      button.disabled = false;
      button.textContent = label;
    });
  }

  function init() {
    var preselectChristmas = shouldPreselectChristmasLights();
    document.querySelectorAll("form.cn-quote-form").forEach(function (form) {
      bind(form, preselectChristmas);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
