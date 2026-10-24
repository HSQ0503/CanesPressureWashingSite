// Commercial inquiry button: ticks the Commercial property type in the existing quote form (the same
// click a visitor would make), then the link scrolls to the form.
(function () {
  function prefill() {
    var form = document.querySelector("form.cn-quote-form");
    if (!form) return;
    var type = form.querySelector('input[name="propertyType"][value="Commercial"]');
    if (type && !type.checked) type.click();
  }

  function initAll() {
    document.querySelectorAll(".canes-commercial a[href='#get-quote']").forEach(function (link) {
      link.addEventListener("click", prefill);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
