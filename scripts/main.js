document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".media-card");
  if (!cards.length) return;

  // Create the reusable modal element once and add it to <body>
  const modal = document.createElement("div");
  modal.className = "media-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="media-modal-backdrop" data-modal-close></div>
    <div class="media-modal-dialog" role="dialog" aria-modal="true" aria-label="Movie or TV details">
      <button class="media-modal-close" type="button" aria-label="Close details" data-modal-close>&times;</button>
      <div class="media-modal-content"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = modal.querySelector(".media-modal-content");

  /* Open the modal and populate it with the content of a given card. */
  function openModalFromCard(card) {
    modalContent.innerHTML = card.innerHTML;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  /* Close the modal, clear its content, and restore page scroll. */
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";
    document.body.classList.remove("no-scroll");
  }

  function handleCardActivate(event, card) {
    event.stopPropagation();
    openModalFromCard(card);
  }

  cards.forEach((card) => {
    const posterImg = card.querySelector(".poster img") || card;

    if (!card.querySelector(".click-hint")) {
      const hint = document.createElement("button");
      hint.type = "button";
      hint.className = "click-hint";
      hint.textContent = "Click image to see all details";
      card.appendChild(hint);

      hint.addEventListener("click", (event) => {
        handleCardActivate(event, card);
      });
    }

    // Make it visually clear that the poster (or card) is interactive
    posterImg.style.cursor = "pointer";

    // Clicking the poster (or entire card fallback) opens the modal
    posterImg.addEventListener("click", (event) => {
      handleCardActivate(event, card);
    });
  });

  // Close the modal when the user clicks the close button
  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-close]")) {
      closeModal();
    }
  });

  // Allow users to press Escape to close the modal when it's open
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});