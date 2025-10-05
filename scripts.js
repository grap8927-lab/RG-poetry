// scripts.js — RG Poetry
// Handles purchase, PayPal links, and library unlocks for all 15 poems.

const POEMS = {
  p001: { title:"Small Light", full:`Small Light\n\nI found a small light in the pocket of the day, a coin of amber that could not be named...\nKeep your small lights close, if you have them;` },
  p002: { title:"Paper Boats", full:`Paper Boats\n\nWe made paper boats and launched our promises down the gutter where they turned quiet and old...` },
  p003: { title:"After Rain", full:`After Rain\n\nAfter rain the street tasted like possibility, each puddle a small polished mirror...` },
  p004: { title:"Pocket Atlas", full:`Pocket Atlas\n\nHe carried a pocket atlas, each page folded to remember where he once wanted to go...` },
  p005: { title:"The Quiet Bell", full:`The Quiet Bell\n\nA bell rang in the kitchen and no one came — its echo found me before the first cup of coffee...` },
  p006: { title:"Folded Window", full:`Folded Window\n\nShe folded the window into a letter and slid it under the door where sunlight could not follow...` },
  p007: { title:"Ledger of Days", full:`Ledger of Days\n\nI keep a ledger of small days — the ones that fit into my hand like smooth stones...` },
  p008: { title:"The Harbor Letter", full:`The Harbor Letter\n\nThe harbor kept a letter it never returned; gulls learned the edges of its silence...` },
  p009: { title:"Lantern at Noon", full:`Lantern at Noon\n\nA lantern at noon is only a choice; I lit one for reasons I could not explain to the weather...` },
  p010: { title:"Bones of the Map", full:`Bones of the Map\n\nMaps leave the bones of places on my table; I trace them when I need to remember arriving...` },
  p011: { title:"Harbor of Paper", full:`Harbor of Paper\n\nIn a harbor of paper I moored small boats of thought and watched the ink tide come home...` },
  p012: { title:"The Sound of White", full:`The Sound of White\n\nWhite has a sound that is not absence but a careful listening — like the hush before a page opens...` },
  p013: { title:"Ledger of Small Losses", full:`Ledger of Small Losses\n\nI catalogue the small losses like coins, keeping each one to count and learn their weight...` },
  p014: { title:"Atlas with One Shoulder", full:`Atlas with One Shoulder\n\nHe kept the world on one shoulder and learned to smile when the moon asked for directions...` },
  p015: { title:"A Harbor in the Racket", full:`A Harbor in the Racket\n\nThe city builds its noise like scaffolding; you climb and find the harbor is only silence below...` }
};

// Library Page
function initLibraryPage() {
  const container = document.getElementById("unlocked");
  const form = document.getElementById("claimForm");
  const message = document.getElementById("claimMessage");

  // Auto unlock via URL
  const params = new URLSearchParams(window.location.search);
  if (params.has("purchase")) unlockPoem(params.get("purchase"), "auto", container, message);

  // Load previously unlocked
  Object.keys(localStorage).forEach(id => { if (POEMS[id]) renderPoem(id, container); });

  // Manual claim form
  form.addEventListener("submit", e => {
    e.preventDefault();
    const id = form.poemId.value.trim().toLowerCase();
    if (!POEMS[id]) return message.textContent = "Invalid poem ID.";
    unlockPoem(id, "manual", container, message);
  });
}

function unlockPoem(id, mode="manual", container, message) {
  if (!POEMS[id]) { if (message) message.textContent="Invalid poem ID"; return; }
  localStorage.setItem(id, "unlocked");
  if (container) renderPoem(id, container);
  if (message) message.textContent = `Unlocked: ${POEMS[id].title}`;
  console.log(`Unlocked poem ${id} (${mode})`);
}

function renderPoem(id, container) {
  if (!POEMS[id] || document.getElementById(`poem-${id}`)) return;
  const art = document.createElement("article");
  art.id = `poem-${id}`;
  art.innerHTML = `<h3>${POEMS[id].title}</h3><pre>${POEMS[id].full}</pre>`;
  container.prepend(art);
}

// Home Page Buy Buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buy").forEach(btn => {
    btn.addEventListener("click", e => {
      alert("After purchase, return to your Library and enter the poem code if it does not auto-unlock.");
    });
  });
  const params = new URLSearchParams(window.location.search);
  if (params.has("purchase")) unlockPoem(params.get("purchase"), "auto", document.getElementById("unlocked"), document.getElementById("claimMessage"));
});
