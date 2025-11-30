document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll("[data-theme-switcher]");
  if (!selects.length) {
    return;
  }

  selects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const target = event.target;
      if (!target.value) {
        return;
      }
      window.location.href = target.value;
    });
  });
});


