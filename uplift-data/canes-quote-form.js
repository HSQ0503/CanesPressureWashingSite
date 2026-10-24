// Progressively upgrades the native quote form and submits it to the Canes intake API.
(function () {
  // The services on the form, with their starting prices. `also` lists older names that other scripts
  // (the service pages' bundle picker) may still use to tick a box. Keep the names in step with the
  // orange ticker in canes-motion.js.
  var serviceOptions = [
    { name: "Roof Soft Washing", icon: "bi-house-up", price: "From $750", also: ["Roof Cleaning"] },
    { name: "House Washing", icon: "bi-house", price: "From $275", also: [] },
    {
      name: "Driveway Cleaning",
      icon: "bi-car-front",
      price: "From $200",
      detail: "Sidewalk, front porch & walkway included",
      also: ["Paver Cleaning"],
    },
    { name: "Back Patio / Pool Deck", icon: "bi-sun", price: "From $150 a visit", also: ["Patio / Lanai"] },
    { name: "Exterior Window Washing", icon: "bi-stars", price: "From $220", detail: "Recurring plans available", also: ["Window Cleaning"] },
    { name: "Gutter Cleaning", icon: "bi-water", price: "From $200", also: [] },
    { name: "Paver Sealing", icon: "bi-layers", price: "From $1.75 / sq ft", also: [] },
  ];
  var WINDOWS = "Exterior Window Washing";

  // Same plans as the window cleaning page's plan picker.
  var windowPlans = [
    ["One-time", "Just this once", ""],
    ["Quarterly plan", "4 cleans a year · biggest savings + free screen cleaning", "Most popular"],
    ["Tri-annual plan", "3 cleans a year · great savings", ""],
    ["Bi-annual plan", "2 cleans a year · save more", ""],
  ];

  // Bundle discount tiers: number of services picked -> percent off.
  var TIERS = [
    { count: 3, percent: 20 },
    { count: 2, percent: 10 },
  ];
  var PELICAN = "/uplift-data/images/brand/canes-pelican-320.webp";

  var pageServiceMap = {
    "house-washing": "House Washing",
    "roof-cleaning": "Roof Soft Washing",
    "driveway-cleaning": "Driveway Cleaning",
    "paver-cleaning": "Driveway Cleaning",
    "concrete-cleaning": "Driveway Cleaning",
    "paver-sealing": "Paver Sealing",
    "patio-cleaning": "Back Patio / Pool Deck",
    "window-cleaning": WINDOWS,
    "gutter-cleaning": "Gutter Cleaning",
  };

  var commercialPages = [
    "commercial-pressure-washing",
    "building-washing",
    "storefront-washing",
    "graffiti-cleaning",
    "dumpster-pad-cleaning",
    "concrete-cleaning",
  ];

  function pageSlug() {
    var slug = window.location.pathname.split("/").filter(Boolean).pop() || "";
    return slug.replace(/\.html$/, "");
  }

  function getInitialServices() {
    var slug = pageSlug();
    return pageServiceMap[slug] ? [pageServiceMap[slug]] : [];
  }

  function discountFor(count) {
    for (var i = 0; i < TIERS.length; i++) {
      if (count >= TIERS[i].count) return TIERS[i].percent;
    }
    return 0;
  }

  function escapeAttr(text) {
    return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function pelican(cls) {
    return '<img class="' + cls + '" src="' + PELICAN + '" alt="" width="320" height="340" loading="lazy" decoding="async">';
  }

  function serviceButtons(selectedServices) {
    return serviceOptions
      .map(function (option) {
        var checked = selectedServices.indexOf(option.name) !== -1;
        return (
          '<label class="cn-service-option">' +
          '<input type="checkbox" value="' +
          escapeAttr(option.name) +
          '" data-also="' +
          escapeAttr(option.also.join("|")) +
          '"' +
          (checked ? " checked" : "") +
          ">" +
          '<span><i class="bi ' +
          option.icon +
          '" aria-hidden="true"></i><strong>' +
          option.name.replace(/&/g, "&amp;") +
          "</strong>" +
          '<b class="cn-service-price">' + option.price + "</b>" +
          (option.detail ? '<small class="cn-service-detail">' + option.detail.replace(/&/g, "&amp;") + "</small>" : "") +
          '<small class="cn-service-bundle">Bundle pricing available</small>' +
          '<em class="cn-service-perk" aria-hidden="true"></em></span></label>'
        );
      })
      .join("");
  }

  // Shown once windows are picked: Florida build-up pitch plus the recurring plan choice.
  function windowPlanPanel() {
    return (
      '<fieldset class="cn-window-plan" hidden>' +
      '<legend><i class="bi bi-arrow-repeat" aria-hidden="true"></i> Interested in a recurring window plan?</legend>' +
      '<p class="cn-window-plan__pitch"><strong>Florida is tough on glass.</strong> Humidity, salt air, pollen, and afternoon storms leave spots and film on windows within weeks. That is why so many homeowners lock in a recurring plan and save: their windows stay spotless all year for less than booking one-off cleans.</p>' +
      '<div class="cn-choice-grid cn-choice-grid--two">' +
      windowPlans
        .map(function (plan) {
          return (
            '<label class="cn-choice cn-plan-choice"><input type="radio" name="windowPlan" value="' + plan[0] + '">' +
            "<span>" + (plan[2] ? '<em class="cn-plan-ribbon">' + plan[2] + "</em>" : "") +
            "<strong>" + plan[0].replace(" plan", "") + "</strong><small>" + plan[1] + "</small></span></label>"
          );
        })
        .join("") +
      "</div></fieldset>"
    );
  }

  // Finds a service box by its current name or an older one. Other scripts use this to tick boxes.
  function findServiceInput(form, name) {
    return Array.prototype.filter.call(form.querySelectorAll(".cn-service-option input"), function (input) {
      return input.value === name || (input.dataset.also || "").split("|").indexOf(name) !== -1;
    })[0];
  }
  window.canesFindServiceInput = findServiceInput;

  function choiceButtons(name, values, selected) {
    return values
      .map(function (value) {
        return (
          '<label class="cn-choice"><input type="radio" name="' +
          name +
          '" value="' +
          value +
          '"' +
          (value === selected ? " checked" : "") +
          "><span>" +
          value +
          "</span></label>"
        );
      })
      .join("");
  }

  function sectionHeader(number, title, description) {
    return (
      '<div class="cn-section-heading"><span class="cn-step-number">' +
      number +
      "</span><div><h3>" +
      title +
      "</h3><p>" +
      description +
      "</p></div></div>"
    );
  }

  function savingsMeter() {
    return (
      '<div class="cn-savings" data-tier="0">' +
      '<div class="cn-savings__mascot">' + pelican("cn-savings__pelican") + "</div>" +
      '<div class="cn-savings__body">' +
      '<p class="cn-savings__bubble" aria-live="polite"><strong></strong><span></span></p>' +
      '<ol class="cn-savings__steps" aria-hidden="true">' +
      '<li data-step="1"><b>1</b><small>service</small></li>' +
      '<li data-step="2"><b>2</b><small>10% off</small></li>' +
      '<li data-step="3"><b>3+</b><small>20% off</small></li>' +
      "</ol>" +
      '<div class="cn-savings__bar" aria-hidden="true"><span></span></div>' +
      "</div></div>"
    );
  }

  function renderForm(form, initialServices) {
    form.classList.add("cn-quote-form--enhanced");
    form.noValidate = true;
    form.innerHTML =
      '<section class="cn-form-section cn-form-section--services" aria-labelledby="cn-services-title">' +
      pelican("cn-peek-pelican") +
      '<span class="cn-bundle-flag"><i class="bi bi-tag-fill" aria-hidden="true"></i> Bundle &amp; save up to 20%</span>' +
      sectionHeader("1", "Select Your Service(s)", "Pick 2 services and save 10%. Pick 3 or more and save 20%.") +
      '<h3 id="cn-services-title" class="visually-hidden">Select your services</h3>' +
      '<div class="cn-service-grid">' +
      serviceButtons(initialServices) +
      "</div>" +
      '<p class="cn-price-note">Starting prices shown. Your final quote depends on property size and condition, and bundled services are quoted at a reduced rate.</p>' +
      windowPlanPanel() +
      savingsMeter() +
      '<input type="hidden" name="service" value="">' +
      '<input type="hidden" name="bundleDiscount" value="">' +
      '<p class="cn-field-error cn-service-error" hidden>Please select at least one service.</p>' +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("2", "Property Details", "Help us understand the property so we can prepare an accurate quote.") +
      '<fieldset class="cn-fieldset"><legend>Property type</legend><div class="cn-choice-grid cn-choice-grid--three">' +
      choiceButtons("propertyType", ["Residential", "Commercial", "HOA / Community"], "Residential") +
      "</div></fieldset>" +
      '<label class="cn-field cn-address-field"><span><i class="bi bi-geo-alt" aria-hidden="true"></i> Street address <em>(optional)</em></span>' +
      '<div class="cn-address-input"><i class="bi bi-search" aria-hidden="true"></i><input type="text" name="address" maxlength="240" autocomplete="street-address" placeholder="Start typing the property address" aria-autocomplete="list" aria-controls="cn-address-results"></div>' +
      '<ul class="cn-address-results" id="cn-address-results" role="listbox" hidden></ul><small class="cn-address-status" aria-live="polite"></small></label>' +
      '<div class="cn-field-row"><label class="cn-field"><span>City</span><input type="text" name="city" maxlength="100" autocomplete="address-level2" placeholder="City"></label>' +
      '<label class="cn-field"><span>ZIP code</span><input type="text" name="postalCode" maxlength="10" autocomplete="postal-code" inputmode="numeric" placeholder="ZIP code"></label></div>' +
      '<input type="hidden" name="latitude"><input type="hidden" name="longitude">' +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("3", "Your Contact Info", "We’ll use this to send your confirmation and follow up with a quote.") +
      '<label class="cn-field"><span><i class="bi bi-person" aria-hidden="true"></i> Full name</span><input type="text" name="name" required maxlength="120" autocomplete="name" placeholder="Your name"></label>' +
      '<div class="cn-field-row"><label class="cn-field"><span><i class="bi bi-envelope" aria-hidden="true"></i> Email <em>(optional)</em></span><input type="email" name="email" maxlength="160" autocomplete="email" placeholder="name@example.com"></label>' +
      '<label class="cn-field"><span><i class="bi bi-telephone" aria-hidden="true"></i> Phone number</span><input type="tel" name="phone" required maxlength="40" autocomplete="tel" inputmode="tel" placeholder="(561) 555-0123"></label></div>' +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("4", "Scheduling Preference", "Tell us what works best—we’ll confirm availability with you.") +
      '<label class="cn-field"><span><i class="bi bi-calendar3" aria-hidden="true"></i> Preferred start date <em>(optional)</em></span><input type="date" name="preferredDate"></label>' +
      '<fieldset class="cn-fieldset"><legend>Preferred time of day</legend><div class="cn-choice-grid cn-choice-grid--two">' +
      choiceButtons("preferredTime", ["Morning (7am–11am)", "Afternoon (11am–3pm)", "Late afternoon (3pm–6pm)", "Flexible"], "Flexible") +
      "</div></fieldset>" +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("5", "Additional Details", "Anything else helps us prepare a more accurate quote.") +
      '<label class="cn-field"><span><i class="bi bi-chat-left-text" aria-hidden="true"></i> Project notes <em>(optional)</em></span><textarea name="message" rows="4" maxlength="1000" placeholder="Property size, heavy staining, access notes, timing, or anything else..."></textarea></label>' +
      '<fieldset class="cn-fieldset"><legend>How did you hear about us? <span>(optional)</span></legend><div class="cn-choice-grid cn-choice-grid--two">' +
      choiceButtons("referralSource", ["Google Search", "Facebook / Instagram", "Neighbor / Word of Mouth", "Yard Sign", "Door Hanger", "Other"], "") +
      "</div></fieldset>" +
      "</section>" +
      '<div class="cn-form-footer"><div class="cn-hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="cn-consent"><input type="checkbox" name="consent" value="yes"><span>I agree to receive text messages from Canes Pressure Washing about my service request, including replies, quotes, and appointment confirmations. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. See our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener">Terms &amp; Conditions</a>.</span></label>' +
      '<p class="cn-quote-error" hidden>Something went wrong. Please call or text us at <a href="tel:+15615375674">(561) 537-5674</a>.</p>' +
      '<div class="cn-submit-row">' + pelican("cn-submit-pelican") +
      '<button type="submit" class="btn cn-quote-submit"><span class="cn-submit-label">Submit Quote Request</span> <i class="bi bi-arrow-right" aria-hidden="true"></i></button></div></div>';
  }

  function bindSelections(form) {
    var serviceInput = form.querySelector('input[name="service"]');
    var serviceError = form.querySelector(".cn-service-error");
    var discountInput = form.querySelector('input[name="bundleDiscount"]');
    var meter = form.querySelector(".cn-savings");
    var bubbleTitle = meter.querySelector(".cn-savings__bubble strong");
    var bubbleText = meter.querySelector(".cn-savings__bubble span");
    var bar = meter.querySelector(".cn-savings__bar span");
    var steps = Array.from(meter.querySelectorAll(".cn-savings__steps li"));
    var submitLabel = form.querySelector(".cn-submit-label");
    var windowPanel = form.querySelector(".cn-window-plan");
    var serviceCheckboxes = Array.from(
      form.querySelectorAll(".cn-service-option input"),
    );
    var lastPercent = null;

    // What the pelican says at each step of the bundle.
    var pitch = [
      ["Bundle & save!", "Pick 2 services and get 10% off. Pick 3 and get 20% off."],
      ["Nice pick!", "Select one more service and get 10% off."],
      ["10% off unlocked!", "Come on, just one more and you get 20% off."],
      ["20% off unlocked!", "Max savings. Bang it all out!"],
    ];

    function updateServices() {
      var selected = serviceCheckboxes
        .filter(function (checkbox) {
          return checkbox.checked;
        })
        .map(function (checkbox) {
          return checkbox.value;
        });
      var count = selected.length;
      var percent = discountFor(count);
      var nextPercent = discountFor(count + 1);

      serviceInput.value = selected.join(", ");
      discountInput.value = percent ? String(percent) : "";
      serviceCheckboxes.forEach(function (checkbox) {
        var option = checkbox.closest(".cn-service-option");
        option.classList.toggle("is-selected", checkbox.checked);
        // Unpicked cards advertise what picking them unlocks.
        var perk = option.querySelector(".cn-service-perk");
        perk.textContent = !checkbox.checked && nextPercent > percent ? nextPercent + "% off" : "";
      });
      if (count) serviceError.hidden = true;
      windowPanel.hidden = selected.indexOf(WINDOWS) === -1;

      var line = pitch[Math.min(count, 3)];
      bubbleTitle.textContent = line[0];
      bubbleText.textContent = line[1];
      meter.dataset.tier = String(Math.min(count, 3));
      bar.style.width = Math.min(100, (count / 3) * 100) + "%";
      steps.forEach(function (step) {
        step.classList.toggle("is-reached", count >= Number(step.dataset.step));
      });
      submitLabel.textContent = percent ? "Claim My " + percent + "% Off Quote" : "Submit Quote Request";

      if (lastPercent !== null && percent > lastPercent) celebrate();
      lastPercent = percent;
    }

    function celebrate() {
      replay(meter, "is-celebrating");
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (navigator.vibrate) navigator.vibrate(15);
      var burst = document.createElement("span");
      burst.className = "cn-confetti";
      burst.setAttribute("aria-hidden", "true");
      var colors = ["#111", "#fff", "#ffd23f", "#ff8a3d", "#f25a0a"];
      for (var i = 0; i < 24; i++) {
        var piece = document.createElement("i");
        var angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.4;
        var distance = 60 + Math.random() * 70;
        piece.style.setProperty("--dx", Math.cos(angle) * distance + "px");
        piece.style.setProperty("--dy", Math.sin(angle) * distance - 40 + "px");
        piece.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");
        piece.style.background = colors[i % colors.length];
        burst.appendChild(piece);
      }
      meter.querySelector(".cn-savings__mascot").appendChild(burst);
      setTimeout(function () { burst.remove(); }, 1100);
    }

    serviceCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) replay(checkbox.closest(".cn-service-option"), "is-popping");
        updateServices();
      });
    });
    updateServices();

    return function validateServices() {
      if (serviceInput.value) return true;
      serviceError.hidden = false;
      serviceCheckboxes[0].focus();
      return false;
    };
  }

  function replay(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth; // reflow so the animation plays again
    el.classList.add(cls);
  }

  function formatAddress(properties, query) {
    var typedHouseNumber = /^\s*(\d+[a-zA-Z-]?)\s+\S/.exec(query || "");
    var houseNumber = properties.housenumber || (typedHouseNumber && typedHouseNumber[1]);
    var street = [houseNumber, properties.street || properties.name]
      .filter(Boolean)
      .join(" ");
    var city = properties.city || properties.town || properties.village || properties.district || properties.locality || properties.county || "";
    var state = properties.state === "Florida" ? "FL" : properties.state;
    var region = [state, properties.postcode].filter(Boolean).join(" ");
    return [street, city, region]
      .filter(Boolean)
      .join(", ");
  }

  function bindAddressSearch(form) {
    var input = form.querySelector('input[name="address"]');
    var cityInput = form.querySelector('input[name="city"]');
    var postalInput = form.querySelector('input[name="postalCode"]');
    var latitudeInput = form.querySelector('input[name="latitude"]');
    var longitudeInput = form.querySelector('input[name="longitude"]');
    var results = form.querySelector(".cn-address-results");
    var status = form.querySelector(".cn-address-status");
    var timer;
    var controller;
    var activeIndex = -1;

    function closeResults() {
      results.hidden = true;
      results.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
      activeIndex = -1;
    }

    function selectAddress(feature) {
      var properties = feature.properties || {};
      input.value = formatAddress(properties, input.value);
      cityInput.value = properties.city || properties.town || properties.village || properties.district || properties.locality || "";
      postalInput.value = properties.postcode || "";
      longitudeInput.value = feature.geometry && feature.geometry.coordinates[0] || "";
      latitudeInput.value = feature.geometry && feature.geometry.coordinates[1] || "";
      status.textContent = "Address selected.";
      closeResults();
    }

    function showResults(features) {
      results.innerHTML = "";
      if (!features.length) {
        status.textContent = "No matches found. You can still enter the address manually.";
        return;
      }

      features.forEach(function (feature, index) {
        var item = document.createElement("li");
        var button = document.createElement("button");
        button.type = "button";
        button.id = "cn-address-option-" + index;
        button.setAttribute("role", "option");
        button.innerHTML = '<i class="bi bi-geo-alt-fill" aria-hidden="true"></i><span>' +
          formatAddress(feature.properties || {}, input.value) +
          "</span>";
        button.addEventListener("click", function () {
          selectAddress(feature);
        });
        item.appendChild(button);
        results.appendChild(item);
      });
      status.textContent = features.length + " address suggestions available.";
      results.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }

    input.addEventListener("input", function () {
      window.clearTimeout(timer);
      status.textContent = "";
      if (input.value.trim().length < 4) {
        closeResults();
        return;
      }

      timer = window.setTimeout(async function () {
        if (controller) controller.abort();
        controller = new AbortController();
        status.textContent = "Searching addresses...";
        try {
          var query = encodeURIComponent(input.value.trim());
          var response = await fetch(
            "https://photon.komoot.io/api/?limit=6&lang=en&lat=26.71&lon=-80.09&bbox=-87.65,24.4,-79.8,31.1&layer=house&layer=street&q=" + query,
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error("Address search failed");
          var data = await response.json();
          var features = (data.features || []).filter(function (feature) {
            return (feature.properties.countrycode || "").toLowerCase() === "us";
          });
          showResults(features);
        } catch (error) {
          if (error.name !== "AbortError") {
            closeResults();
            status.textContent = "Address search is unavailable. Enter the address manually.";
          }
        }
      }, 300);
    });

    input.addEventListener("keydown", function (event) {
      var options = Array.from(results.querySelectorAll("button"));
      if (results.hidden || !options.length) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex = event.key === "ArrowDown"
          ? (activeIndex + 1) % options.length
          : (activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        options.forEach(function (option, index) {
          option.setAttribute("aria-selected", String(index === activeIndex));
        });
        input.setAttribute("aria-activedescendant", options[activeIndex].id);
      } else if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        options[activeIndex].click();
      } else if (event.key === "Escape") {
        closeResults();
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".cn-address-field")) closeResults();
    });
  }

  function bind(form, initialServices) {
    if (form.dataset.cnQuoteBound === "true") return;
    form.dataset.cnQuoteBound = "true";
    renderForm(form, initialServices);
    var validateServices = bindSelections(form);
    bindAddressSearch(form);

    if (commercialPages.indexOf(pageSlug()) !== -1) {
      var commercial = form.querySelector('input[name="propertyType"][value="Commercial"]');
      if (commercial) commercial.checked = true;
    }

    var dateInput = form.querySelector('input[name="preferredDate"]');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().slice(0, 10);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!validateServices() || !form.reportValidity()) return;

      var errorEl = form.querySelector(".cn-quote-error");
      var button = form.querySelector(".cn-quote-submit");
      var label = button.innerHTML;
      errorEl.hidden = true;
      button.disabled = true;
      button.textContent = "Sending...";

      try {
        var data = Object.fromEntries(new FormData(form).entries());
        data.consent = form.querySelector('input[name="consent"]').checked;
        data.sourcePage = window.location.href;
        var addressParts = [data.address].filter(Boolean);
        if (data.city && !String(data.address || "").includes(String(data.city))) {
          addressParts.push(data.city);
        }
        if (data.postalCode && !String(data.address || "").includes(String(data.postalCode))) {
          addressParts.push(data.postalCode);
        }
        data.address = addressParts.join(", ");
        var bundleDiscount = data.bundleDiscount;
        // Neither is an intake field; both travel in the message below.
        var windowPlan = data.service.indexOf(WINDOWS) !== -1 ? data.windowPlan : "";
        delete data.bundleDiscount;
        delete data.windowPlan;
        data.message = [
          "Selected services: " + data.service,
          bundleDiscount
            ? "Bundle discount: " + bundleDiscount + "% off (" + data.service.split(", ").length + " services)"
            : "",
          windowPlan ? "Window plan: " + windowPlan : "",
          data.propertyType ? "Property type: " + data.propertyType : "",
          data.preferredDate ? "Preferred date: " + data.preferredDate : "",
          data.preferredTime ? "Preferred time: " + data.preferredTime : "",
          data.referralSource ? "Referral source: " + data.referralSource : "",
          data.message ? "Project notes: " + data.message : "",
        ].filter(Boolean).join("\n").slice(0, 1000);
        var response = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        var output = await response.json().catch(function () {
          return {};
        });
        if (response.ok && output.ok) {
          window.location.href = "/thanks";
          return;
        }
      } catch (error) {}

      errorEl.hidden = false;
      button.disabled = false;
      button.innerHTML = label;
    });
  }

  function init() {
    var initialServices = getInitialServices();
    document.querySelectorAll("form.cn-quote-form").forEach(function (form) {
      bind(form, initialServices);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
