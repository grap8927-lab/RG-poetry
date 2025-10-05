// scripts.js — RG Poetry
// Handles purchase, PayPal links, and library unlocks for all 15 poems.

const POEMS = { /* same POEMS object as original (p001–p015) */ };

// ============ HOME PAGE LOGIC ============
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buy").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = btn.dataset.id;
      const title = encodeURIComponent(btn.dataset.title);
      const price = btn.dataset.price;
      const paypalLink = `https://www.paypal.me/RobGrosse1/${price}?note=${title}-${id}`;
      window.open(paypalLink, "_blank");
      alert(`After purchase, return to your Library and enter code: ${id}`);
    });
  });

  const params = new URLSearchParams(window.location.search);
  if (params.has("purchase")) {
    const poemId = params.get("purchase");
    unlockPoem(poemId, "auto");
  }
});

// ============ LIBRARY PAGE LOGIC ============
function initLibraryPage() {
  const unlockedContainer = document.getElementById("unlocked");
  const form = document.getElementById("claimForm");
  const message = document.getElementById("claimMessage");

  const params = new URLSearchParams(window.location.search);
  if (params.has("purchase")) {
    const poemId = params.get("purchase");
    unlockPoem(poemId, "auto", unlockedContainer, message);
  }

  Object.keys(localStorage).forEach(key => {
    if (POEMS[key]) renderPoem(key, unlockedContainer);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const poemId = form.poemId.value.trim().toLowerCase();
    if (!POEMS[poemId]) {
      message.textContent = "Invalid poem ID. Please check and try again.";
      return;
    }
    unlockPoem(poemId, "manual", unlockedContainer, message);
  });
}

function unlockPoem(poemId, mode = "manual", container, message) {
  if (!POEMS[poemId]) {
    if (message) message.textContent = "Invalid poem ID.";
    return;
  }
  localStorage.setItem(poemId, "unlocked");
  if (container) renderPoem(poemId, container);
  if (message) message.textContent = `Unlocked: ${POEMS[poemId].title}`;
}

function renderPoem(poemId, container) {
  const poem = POEMS[poemId];
  if (!poem || document.getElementById(`poem-${poemId}`)) return;
  const art = document.createElement("article");
  art.id = `poem-${poemId}`;
  art.innerHTML = `<h3>${poem.title}</h3><pre>${poem.full}</pre>`;
  container.prepend(art);
}
