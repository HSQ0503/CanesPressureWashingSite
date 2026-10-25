// Progressively upgrades the native quote form and submits it to the Canes intake API.
(function () {
  // The services on the form. `also` lists older names that other scripts
  // (the service pages' bundle picker) may still use to tick a box. Keep the names in step with the
  // orange ticker in canes-motion.js.
  var serviceOptions = [
    { name: "Roof Soft Washing", icon: "bi-house-up", also: ["Roof Cleaning"] },
    { name: "House Washing", icon: "bi-house", also: [] },
    { name: "Driveway Cleaning", icon: "bi-car-front", detail: "+ sidewalk, porch & walkway", also: ["Paver Cleaning"] },
    { name: "Back Patio / Pool Deck", icon: "bi-sun", also: ["Patio / Lanai"] },
    { name: "Screen Enclosure Cleaning", icon: "bi-grid-3x3", also: [] },
    { name: "Exterior Window Washing", icon: "bi-stars", also: ["Window Cleaning"] },
    { name: "Gutter Cleaning", icon: "bi-water", also: [] },
    { name: "Paver Sealing", icon: "bi-layers", also: [] },
    { name: "Dock Cleaning", icon: "bi-water", also: [] },
  ];

  // "How soon?" options on the residential form.
  var timingOptions = [
    ["ASAP", "1–3 days · rush fee may apply"],
    ["Next available", "Our first open spot"],
    ["Pick a date", "Choose your day"],
  ];
  var referralSources = ["Google Search", "Facebook / Instagram", "Neighbor / Word of Mouth", "Yard Sign", "Door Hanger", "Other"];

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
    "window-cleaning": "Exterior Window Washing",
    "gutter-cleaning": "Gutter Cleaning",
  };

  // Step 1 of every quote form: the visitor picks one, then the rest of the form is built for it.
  var estimateTypes = [
    { key: "residential", label: "Residential", sub: "My home", icon: "bi-house-heart", propertyType: "Residential" },
    { key: "commercial", label: "Commercial", sub: "Businesses & commercial properties", icon: "bi-buildings", propertyType: "Commercial" },
    { key: "hoa", label: "HOA / Community", sub: "Boards, communities & property managers", icon: "bi-houses", propertyType: "HOA / Community" },
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
          '<input type="checkbox" value="' + escapeAttr(option.name) + '" data-also="' + escapeAttr(option.also.join("|")) + '"' +
          (checked ? " checked" : "") + ">" +
          '<span><i class="bi ' + option.icon + '" aria-hidden="true"></i><strong>' + option.name.replace(/&/g, "&amp;") + "</strong>" +
          (option.detail ? '<small class="cn-service-detail">' + option.detail.replace(/&/g, "&amp;") + "</small>" : "") +
          "</span></label>"
        );
      })
      .join("");
  }

  // Finds a service box by its current name or an older one. Other scripts use this to tick boxes.
  function findServiceInput(form, name) {
    return Array.prototype.filter.call(form.querySelectorAll(".cn-service-option input"), function (input) {
      return input.value === name || (input.dataset.also || "").split("|").indexOf(name) !== -1;
    })[0];
  }
  window.canesFindServiceInput = function (form, name) {
    if (form.cnQuote && !form.cnQuote.type) setType(form, "residential", form.cnQuote.initialServices);
    return findServiceInput(form, name);
  };

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
      "</div></div>"
    );
  }

  // Address with search suggestions; city and ZIP are filled in from the chosen suggestion.
  function addressField(label, required) {
    return (
      '<label class="cn-field cn-address-field"><span>' + label + (required ? "" : " <em>(optional)</em>") + "</span>" +
      '<div class="cn-address-input"><i class="bi bi-search" aria-hidden="true"></i><input type="text" name="address" maxlength="240" autocomplete="street-address" placeholder="Start typing the address" aria-autocomplete="list" aria-controls="cn-address-results"' + (required ? " required" : "") + "></div>" +
      '<ul class="cn-address-results" id="cn-address-results" role="listbox" hidden></ul><small class="cn-address-status" aria-live="polite"></small></label>' +
      '<input type="hidden" name="city"><input type="hidden" name="postalCode"><input type="hidden" name="latitude"><input type="hidden" name="longitude">'
    );
  }

  function formFooter(label) {
    return (
      '<div class="cn-form-footer"><div class="cn-hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="cn-consent"><input type="checkbox" name="consent" value="yes"><span>I agree to receive text messages from Canes Pressure Washing about my service request, including replies, quotes, and appointment confirmations. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. See our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener">Terms &amp; Conditions</a>.</span></label>' +
      '<p class="cn-quote-error" hidden>Something went wrong. Please call or text us at <a href="tel:+15615375674">(561) 537-5674</a>.</p>' +
      '<div class="cn-submit-row">' + pelican("cn-submit-pelican") +
      '<button type="submit" class="btn cn-quote-submit"><span class="cn-submit-label">' + label + '</span> <i class="bi bi-arrow-right" aria-hidden="true"></i></button></div></div>'
    );
  }

  function renderShell(form) {
    form.classList.add("cn-quote-form--enhanced");
    form.noValidate = true;
    form.innerHTML =
      '<section class="cn-form-section cn-type-section">' +
      sectionHeader("1", "What kind of estimate do you need?", "Pick one to start. The form adjusts to fit your property.") +
      '<div class="cn-type-grid" role="radiogroup" aria-label="Estimate type">' +
      estimateTypes
        .map(function (type) {
          return (
            '<label class="cn-type-option"><input type="radio" name="estimateType" value="' + type.key + '">' +
            '<span><i class="bi ' + type.icon + '" aria-hidden="true"></i><strong>' + type.label + "</strong><small>" +
            type.sub.replace(/&/g, "&amp;") + "</small></span></label>"
          );
        })
        .join("") +
      "</div>" +
      '<p class="cn-field-error cn-type-error" hidden>Please choose Residential, Commercial, or HOA to start your estimate.</p>' +
      "</section>" +
      '<div class="cn-variant"></div>';
  }

  function residentialSections(initialServices) {
    return (
      '<section class="cn-form-section cn-form-section--services" aria-labelledby="cn-services-title">' +
      sectionHeader("2", "Select Your Service(s)", "Tap everything you need. The more you bundle, the more you save.") +
      '<h3 id="cn-services-title" class="visually-hidden">Select your services</h3>' +
      savingsMeter() +
      '<div class="cn-service-grid">' +
      serviceButtons(initialServices) +
      "</div>" +
      '<p class="cn-price-note">$300 minimum per visit. Bundled services are quoted at a reduced rate.</p>' +
      '<input type="hidden" name="service" value="">' +
      '<input type="hidden" name="bundleDiscount" value="">' +
      '<p class="cn-field-error cn-service-error" hidden>Please select at least one service.</p>' +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("3", "Your Info", "So we can send your quote.") +
      '<label class="cn-field"><span>Full name</span><input type="text" name="name" required maxlength="120" autocomplete="name" placeholder="Your name"></label>' +
      '<div class="cn-field-row"><label class="cn-field"><span>Phone number</span><input type="tel" name="phone" required maxlength="40" autocomplete="tel" inputmode="tel" placeholder="(561) 555-0123"></label>' +
      '<label class="cn-field"><span>Email <em>(optional)</em></span><input type="email" name="email" maxlength="160" autocomplete="email" placeholder="name@example.com"></label></div>' +
      addressField("Address", false) +
      "</section>" +
      '<section class="cn-form-section">' +
      sectionHeader("4", "Additional Details", "Optional, but it helps us quote accurately.") +
      '<label class="cn-field"><span>Anything we should know? <em>(optional)</em></span><textarea name="message" rows="3" maxlength="1000" placeholder="Heavy staining, gate code, pets, access notes..."></textarea></label>' +
      '<fieldset class="cn-fieldset"><legend>How soon do you need us?</legend><div class="cn-choice-grid cn-choice-grid--three cn-timing-grid">' +
      timingOptions
        .map(function (option) {
          return (
            '<label class="cn-choice cn-plan-choice"><input type="radio" name="timing" value="' + option[0] + '">' +
            "<span><strong>" + option[0] + "</strong><small>" + option[1] + "</small></span></label>"
          );
        })
        .join("") +
      "</div></fieldset>" +
      '<label class="cn-field cn-timing-date" hidden><span>Preferred date</span><input type="date" name="preferredDate"></label>' +
      '<label class="cn-field cn-field--small"><span>How did you hear about us? <em>(optional)</em></span><select name="referralSource"><option value="">Choose one</option>' +
      referralSources.map(function (source) { return "<option>" + source + "</option>"; }).join("") +
      "</select></label>" +
      "</section>" +
      formFooter("Get My Free Quote")
    );
  }

  // Commercial and HOA: just the essentials, so property managers can send it in seconds.
  function quickSections(type) {
    var hoa = type === "hoa";
    return (
      '<section class="cn-form-section cn-form-section--services">' +
      '<span class="cn-bundle-flag cn-bundle-flag--dark"><i class="bi ' + (hoa ? "bi-houses" : "bi-buildings") + '" aria-hidden="true"></i> ' +
      (hoa ? "HOA &amp; community quote" : "Commercial quote") + "</span>" +
      sectionHeader("2", "Your Info", "That is all we need. We will reach out to set up a walkthrough.") +
      '<label class="cn-field"><span>Full name</span><input type="text" name="name" required maxlength="120" autocomplete="name" placeholder="Your name"></label>' +
      '<label class="cn-field"><span>Mobile number</span><input type="tel" name="phone" required maxlength="40" autocomplete="tel" inputmode="tel" placeholder="(561) 555-0123"></label>' +
      addressField(hoa ? "Community address" : "Property address", true) +
      '<label class="cn-field"><span>Anything we should know? <em>(optional)</em></span><textarea name="message" rows="3" maxlength="1000" placeholder="' +
      (hoa ? "Community name, common areas, number of homes, timeline..." : "Business name, what needs cleaning, size, timeline...") +
      '"></textarea></label>' +
      "</section>" +
      formFooter(hoa ? "Request My HOA Quote" : "Request My Commercial Quote")
    );
  }

  function bindSelections(form) {
    var serviceInput = form.querySelector('input[name="service"]');
    var serviceError = form.querySelector(".cn-service-error");
    var discountInput = form.querySelector('input[name="bundleDiscount"]');
    var meter = form.querySelector(".cn-savings");
    var bubbleTitle = meter.querySelector(".cn-savings__bubble strong");
    var bubbleText = meter.querySelector(".cn-savings__bubble span");
    var steps = Array.from(meter.querySelectorAll(".cn-savings__steps li"));
    var submitLabel = form.querySelector(".cn-submit-label");
    var serviceCheckboxes = Array.from(
      form.querySelectorAll(".cn-service-option input"),
    );
    var lastPercent = null;

    // What the pelican says at each step of the bundle.
    var pitch = [
      ["Bundle & save.", "2 services = 10% off, 3+ = 20% off."],
      ["Nice pick!", "Add one more for 10% off."],
      ["10% off unlocked!", "One more and it's 20% off."],
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

      serviceInput.value = selected.join(", ");
      discountInput.value = percent ? String(percent) : "";
      serviceCheckboxes.forEach(function (checkbox) {
        checkbox.closest(".cn-service-option").classList.toggle("is-selected", checkbox.checked);
      });
      if (count) serviceError.hidden = true;

      var line = pitch[Math.min(count, 3)];
      bubbleTitle.textContent = line[0];
      bubbleText.textContent = line[1];
      meter.dataset.tier = String(Math.min(count, 3));
      steps.forEach(function (step) {
        step.classList.toggle("is-reached", count >= Number(step.dataset.step));
      });
      submitLabel.textContent = percent ? "Claim My " + percent + "% Off Quote" : "Get My Free Quote";

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

  // Builds the chosen version of the form under the type picker. Contact and address answers carry over.
  function setType(form, key, initialServices) {
    var state = form.cnQuote;
    if (state.type === key) return;
    var carry = {};
    ["name", "email", "phone", "address", "city", "postalCode", "latitude", "longitude"].forEach(function (name) {
      var field = form.elements[name];
      if (field && field.value) carry[name] = field.value;
    });

    var variant = form.querySelector(".cn-variant");
    if (key === "residential") variant.innerHTML = residentialSections(initialServices);
    else variant.innerHTML = quickSections(key);
    form.classList.toggle("cn-quote-form--commercial", key !== "residential");

    Object.keys(carry).forEach(function (name) {
      if (form.elements[name]) form.elements[name].value = carry[name];
    });

    if (key === "residential") {
      state.validate = bindSelections(form);
      var dateField = form.querySelector(".cn-timing-date");
      form.querySelectorAll('input[name="timing"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
          dateField.hidden = radio.value !== "Pick a date";
        });
      });
      var dateInput = form.querySelector('input[name="preferredDate"]');
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().slice(0, 10);
    } else {
      state.validate = function () { return true; };
    }
    bindAddressSearch(form);

    var radio = form.querySelector('input[name="estimateType"][value="' + key + '"]');
    if (radio) radio.checked = true;
    form.querySelector(".cn-type-error").hidden = true;
    state.type = key;
  }

  function bind(form, initialServices) {
    if (form.dataset.cnQuoteBound === "true") return;
    form.dataset.cnQuoteBound = "true";
    form.cnQuote = { type: "", validate: null, initialServices: initialServices };
    renderShell(form);

    form.querySelectorAll('input[name="estimateType"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        setType(form, radio.value, initialServices);
      });
    });
    // A link can open a version directly (?type=hoa); commercial pages open on the commercial version.
    var wanted = new URLSearchParams(window.location.search).get("type") || form.dataset.mode;
    if (estimateTypes.some(function (t) { return t.key === wanted; })) setType(form, wanted, initialServices);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var state = form.cnQuote;
      if (!state.type) {
        form.querySelector(".cn-type-error").hidden = false;
        form.querySelector('input[name="estimateType"]').focus();
        return;
      }
      if (!state.validate() || !form.reportValidity()) return;
      var type = estimateTypes.filter(function (t) { return t.key === state.type; })[0];

      var errorEl = form.querySelector(".cn-quote-error");
      var button = form.querySelector(".cn-quote-submit");
      var label = button.innerHTML;
      errorEl.hidden = true;
      button.disabled = true;
      button.textContent = "Sending...";

      try {
        var data = Object.fromEntries(new FormData(form).entries());
        delete data.estimateType;
        data.consent = form.querySelector('input[name="consent"]').checked;
        data.sourcePage = window.location.href;
        data.propertyType = type.propertyType;
        var addressParts = [data.address].filter(Boolean);
        if (data.city && !String(data.address || "").includes(String(data.city))) {
          addressParts.push(data.city);
        }
        if (data.postalCode && !String(data.address || "").includes(String(data.postalCode))) {
          addressParts.push(data.postalCode);
        }
        data.address = addressParts.join(", ");
        if (type.key === "residential") {
          var bundleDiscount = data.bundleDiscount;
          // Not intake fields; they travel in the message below.
          var timing = data.timing;
          delete data.bundleDiscount;
          delete data.timing;
          data.message = [
            "Estimate type: Residential",
            "Selected services: " + data.service,
            bundleDiscount
              ? "Bundle discount: " + bundleDiscount + "% off (" + data.service.split(", ").length + " services)"
              : "",
            timing === "ASAP" ? "Timing: ASAP (within 1-3 days, rush fee may apply)" : "",
            timing === "Next available" ? "Timing: Next available" : "",
            timing === "Pick a date" ? "Timing: Requested date " + (data.preferredDate || "(no date chosen)") : "",
            data.referralSource ? "Referral source: " + data.referralSource : "",
            data.message ? "Project notes: " + data.message : "",
          ].filter(Boolean).join("\n").slice(0, 1000);
        } else {
          data.service = type.key === "hoa" ? "HOA / Community" : "Commercial";
          data.message = [
            "Estimate type: " + type.propertyType,
            data.message ? "Project notes: " + data.message : "",
          ].filter(Boolean).join("\n").slice(0, 1000);
        }
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

    // Links like the homepage's screen enclosure card tick their service before jumping to the form.
    document.querySelectorAll("a[data-quote-service]").forEach(function (link) {
      link.addEventListener("click", function () {
        var form = document.querySelector("form.cn-quote-form");
        var input = form && window.canesFindServiceInput(form, link.dataset.quoteService);
        if (input && !input.checked) input.click();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
