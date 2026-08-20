// Progressively upgrades the native quote form and submits it to the Canes intake API.
(function () {
  var serviceOptions = [
    ["House Washing", "bi-house"],
    ["Roof Cleaning", "bi-house-up"],
    ["Driveway Cleaning", "bi-bricks"],
    ["Paver Cleaning", "bi-grid-3x3-gap"],
    ["Paver Sealing", "bi-layers"],
    ["Patio / Lanai", "bi-sun"],
    ["Window Cleaning", "bi-stars"],
    ["Gutter Cleaning", "bi-water"],
    ["Commercial Cleaning", "bi-buildings"],
    ["Christmas Lights", "bi-lightbulb"],
    ["Not Sure / Other", "bi-question-circle"],
  ];

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

  var pageServiceMap = {
    "house-washing": "House Washing",
    "roof-cleaning": "Roof Cleaning",
    "driveway-cleaning": "Driveway Cleaning",
    "paver-cleaning": "Paver Cleaning",
    "paver-sealing": "Paver Sealing",
    "patio-cleaning": "Patio / Lanai",
    "window-cleaning": "Window Cleaning",
    "gutter-cleaning": "Gutter Cleaning",
    "commercial-pressure-washing": "Commercial Cleaning",
    "building-washing": "Commercial Cleaning",
    "storefront-washing": "Commercial Cleaning",
    "graffiti-cleaning": "Commercial Cleaning",
    "dumpster-pad-cleaning": "Commercial Cleaning",
    "concrete-cleaning": "Commercial Cleaning",
  };

  function normalize(value) {
    return (value || "")
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, "-");
  }

  function getInitialServices() {
    var requestedService = normalize(
      new URLSearchParams(window.location.search).get("service"),
    );
    if (christmasAliases.indexOf(requestedService) !== -1) {
      return ["Christmas Lights"];
    }

    var slug = window.location.pathname.split("/").filter(Boolean).pop() || "";
    return pageServiceMap[slug] ? [pageServiceMap[slug]] : [];
  }

  function serviceButtons(selectedServices) {
    return serviceOptions
      .map(function (option) {
        var value = option[0];
        var icon = option[1];
        var checked = selectedServices.indexOf(value) !== -1;
        var seasonalClass = value === "Christmas Lights" ? " cn-service-option--seasonal" : "";
        return (
          '<label class="cn-service-option' +
          seasonalClass +
          '">' +
          '<input type="checkbox" value="' +
          value +
          '"' +
          (checked ? " checked" : "") +
          ">" +
          '<span><i class="bi ' +
          icon +
          '" aria-hidden="true"></i><strong>' +
          value +
          "</strong></span></label>"
        );
      })
      .join("");
  }

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

  function renderForm(form, initialServices) {
    form.classList.add("cn-quote-form--enhanced");
    form.noValidate = true;
    form.innerHTML =
      '<section class="cn-form-section" aria-labelledby="cn-services-title">' +
      sectionHeader("1", "Select Your Service(s)", "Choose one or more services you need a quote for.") +
      '<h3 id="cn-services-title" class="visually-hidden">Select your services</h3>' +
      '<div class="cn-service-grid">' +
      serviceButtons(initialServices) +
      "</div>" +
      '<input type="hidden" name="service" value="">' +
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
      '<button type="submit" class="btn cn-quote-submit">Submit Quote Request <i class="bi bi-arrow-right" aria-hidden="true"></i></button></div>';
  }

  function bindSelections(form) {
    var serviceInput = form.querySelector('input[name="service"]');
    var serviceError = form.querySelector(".cn-service-error");
    var serviceCheckboxes = Array.from(
      form.querySelectorAll(".cn-service-option input"),
    );

    function updateServices() {
      var selected = serviceCheckboxes
        .filter(function (checkbox) {
          return checkbox.checked;
        })
        .map(function (checkbox) {
          return checkbox.value;
        });
      serviceInput.value = selected.join(", ");
      serviceCheckboxes.forEach(function (checkbox) {
        checkbox.closest(".cn-service-option").classList.toggle("is-selected", checkbox.checked);
      });
      if (selected.length) serviceError.hidden = true;
    }

    serviceCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", updateServices);
    });
    updateServices();

    return function validateServices() {
      if (serviceInput.value) return true;
      serviceError.hidden = false;
      serviceCheckboxes[0].focus();
      return false;
    };
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
        data.message = [
          "Selected services: " + data.service,
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
