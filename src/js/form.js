import { showNotification } from "./notification.js";

(() => {
  "use strict";

  const selectedServiceForm = document.querySelector(".selectedServiceForm");
  const selectedServiceOverview = document.querySelector(".selectedServiceOverview");

  function attachFormListener(form) {
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showNotification("⚠️ Controlla i campi", "2500");

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      form.classList.add("was-validated");

      showNotification(
        `<div class="d-flex align-items-center">
            Invio in corso...
            <div class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></div>
          </div>`,
        "default"
      );

      fetch("/php/sendForm.php", {
        method: "POST",
        body: new FormData(form),
      })
        .then((response) => response.text())
        .then((data) => {

          if (data.includes("Dati inviati con successo")) {
            form.reset();
            form.classList.remove("was-validated");

            if (selectedServiceForm) {
              selectedServiceForm.innerHTML = "";
            }
            if (selectedServiceOverview) {
              selectedServiceOverview.classList.remove("d-none");
            }
          }
        })
        .catch((error) => showNotification(error, "default"));
    });
  }

  const existingForms = document.querySelectorAll(".needs-validation");
  existingForms.forEach((form) => attachFormListener(form));

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.matches(".needs-validation")) attachFormListener(node);
          node.querySelectorAll?.(".needs-validation").forEach((form) =>
            attachFormListener(form)
          );
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();