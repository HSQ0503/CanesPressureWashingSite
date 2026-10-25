// Commercial inquiry button: picks the Commercial estimate type in the quote form (the same click a
// visitor would make), then the link scrolls to the form.
(function () {
  function prefill() {
    var form = document.querySelector("form.cn-quote-form");
    if (!form) return;
    var type = form.querySelector('input[name="estimateType"][value="commercial"]');
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
