// Submit handler for the native estimate-request form. Posts JSON to the
// Canes platform intake API and sends the visitor to /thanks on success.
(function () {
  function bind(form) {
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
  document.querySelectorAll("form.cn-quote-form").forEach(bind);
})();
