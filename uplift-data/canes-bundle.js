// Bundle & save: savings meter, remembered picks across service pages, and pre-filling the quote
// form when a "Get my quote" link is clicked. It only clicks the form's existing boxes and adds a
// notes line, exactly as a visitor could; the form's own code is untouched.
(function () {
  var STORE_KEY = "canes-bundle";
  var TIERS = [
    { count: 3, percent: 20 },
    { count: 2, percent: 10 },
  ];

  function load() {
    try {
      return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function save(state) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (error) {
      // Private mode or storage blocked: the page still works, picks just aren't remembered.
    }
  }

  function discountFor(count) {
    for (var i = 0; i < TIERS.length; i++) {
      if (count >= TIERS[i].count) return TIERS[i].percent;
    }
    return 0;
  }

  function init(section) {
    var current = section.dataset.current || "";
    var boxes = Array.prototype.slice.call(section.querySelectorAll(".canes-bundle__grid input[type=checkbox]"));
    var freq = Array.prototype.slice.call(section.querySelectorAll('input[name="bundle-frequency"]'));
    var meterText = section.querySelector(".canes-bundle__meter-text");
    var bar = section.querySelector(".canes-bundle__bar span");
    var tiers = section.querySelectorAll(".canes-bundle__tier");

    // Restore picks from other service pages (the current service is always included).
    var stored = load();
    boxes.forEach(function (box) {
      box.checked = (stored.picks || []).indexOf(box.value) !== -1;
    });
    // Restore the visitor's one-time / recurring / plan choice if this page offers it.
    if (freq.some(function (radio) { return radio.value === stored.frequency; })) {
      freq.forEach(function (radio) {
        radio.checked = radio.value === stored.frequency;
      });
    }

    function picks() {
      return boxes.filter(function (box) { return box.checked; }).map(function (box) { return box.value; });
    }

    function checkedFrequency() {
      return freq.filter(function (radio) { return radio.checked; })[0];
    }

    function frequency() {
      var checked = checkedFrequency();
      return checked ? checked.value : "One-time";
    }

    function count() {
      return picks().length + (current ? 1 : 0);
    }

    var lastPercent = null;

    function render() {
      var n = count();
      var percent = discountFor(n);
      if (lastPercent !== null && percent > lastPercent) celebrate(percent);
      lastPercent = percent;
      var label;
      var detail;
      if (n >= 3) {
        label = "20% unlocked!";
        detail = n + " services bundled";
      } else if (n === 2) {
        label = "10% unlocked!";
        detail = "Add 1 more service to save 20%";
      } else {
        label = "Add a service to save 10%";
        detail = "Bundle 3 or more to save 20%";
      }
      meterText.innerHTML = "";
      var strong = document.createElement("strong");
      strong.textContent = label;
      var span = document.createElement("span");
      span.textContent = detail;
      meterText.appendChild(strong);
      meterText.appendChild(span);
      bar.style.width = Math.min(100, (n / 3) * 100) + "%";

      tiers.forEach(function (tier) {
        tier.classList.toggle("is-active", Number(tier.dataset.percent) === percent);
      });

      // Remember this page's service too, so the bundle follows the visitor to other service pages.
      var currentValue = section.dataset.currentValue || "";
      var all = load();
      all.picks = (all.picks || []).filter(function (value) {
        // Keep picks that belong to other pages' lists; replace the ones this page controls.
        return value !== currentValue && !boxes.some(function (box) { return box.value === value; });
      }).concat(currentValue && picks().length ? [currentValue] : [], picks());
      all.frequency = frequency();
      save(all);
    }

    // Little rewards: cards pop when picked, phones get a tiny buzz, and unlocking a tier
    // throws confetti from that tier's badge.
    function celebrate(percent) {
      var tier = section.querySelector('.canes-bundle__tier[data-percent="' + percent + '"]');
      var meter = section.querySelector(".canes-bundle__meter");
      restartAnimation(meter, "is-celebrating");
      if (!tier) return;
      restartAnimation(tier, "is-unlocked");
      if (reduceMotion()) return;
      var burst = document.createElement("span");
      burst.className = "canes-confetti";
      burst.setAttribute("aria-hidden", "true");
      var colors = ["#111", "#fff", "#ffd23f", "#ff8a3d", "#f25a0a"];
      for (var i = 0; i < 26; i++) {
        var piece = document.createElement("i");
        var angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.4;
        var distance = 70 + Math.random() * 70;
        piece.style.setProperty("--dx", Math.cos(angle) * distance + "px");
        piece.style.setProperty("--dy", Math.sin(angle) * distance - 40 + "px");
        piece.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");
        piece.style.background = colors[i % colors.length];
        burst.appendChild(piece);
      }
      tier.appendChild(burst);
      setTimeout(function () { burst.remove(); }, 1100);
    }

    section.addEventListener("change", function (event) {
      var card = event.target.closest("label") && event.target.closest("label").querySelector(".canes-bundle__card, .canes-plan__card");
      if (card && event.target.checked) {
        restartAnimation(card, "is-popping");
        buzz();
      }
      render();
    });
    render();

    function prefillForm() {
      var form = document.querySelector("form.cn-quote-form");
      if (!form) return;

      var services = [];
      if (section.dataset.formService) services.push(section.dataset.formService);
      boxes.forEach(function (box) {
        if (box.checked) services.push(box.dataset.formService || box.value);
      });
      services.forEach(function (name) {
        // The form renamed some services; its lookup also accepts the older names used on these pages.
        var input = window.canesFindServiceInput
          ? window.canesFindServiceInput(form, name)
          : form.querySelector('.cn-service-option input[value="' + name.replace(/"/g, '\\"') + '"]');
        if (input && !input.checked) input.click();
      });

      if (section.dataset.propertyType) {
        var type = form.querySelector('input[name="propertyType"][value="' + section.dataset.propertyType + '"]');
        if (type && !type.checked) type.click();
      }

      var notes = form.querySelector('textarea[name="message"]');
      if (!notes) return;
      var names = (current ? [current] : []).concat(picks().map(function (value) {
        var box = boxes.filter(function (b) { return b.value === value; })[0];
        return box ? box.dataset.label : value;
      }));
      var parts = [];
      if (names.length > 1) {
        parts.push("Bundle: " + names.join(" + ") + " (" + discountFor(count()) + "% bundle discount).");
      }
      var plan = checkedFrequency();
      if (plan && plan.value !== "One-time") parts.push(plan.dataset.note || "Interested in recurring service.");
      var rest = notes.value.replace(/^(Bundle:|Interested in).*(\n|$)/gm, "").replace(/^\s+/, "");
      notes.value = parts.join(" ") + (parts.length && rest ? "\n" : "") + rest;
    }

    // Every "Get my quote" link on the page carries the bundle into the form before jumping to it.
    document.querySelectorAll('a[href="#get-quote"]').forEach(function (link) {
      link.addEventListener("click", prefillForm);
    });
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function restartAnimation(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth; // reflow so the animation plays again
    el.classList.add(cls);
  }

  function buzz() {
    if (navigator.vibrate && !reduceMotion()) navigator.vibrate(12);
  }

  function initAll() {
    document.querySelectorAll(".canes-bundle").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
