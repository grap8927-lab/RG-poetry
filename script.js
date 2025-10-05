// scripts.js — Robert Grosse Poetry
// Handles purchase, PayPal links, and library unlocks for all 15 poems.
// Author: Robert Grosse
// Clean, ready-to-launch build.

const POEMS = {
  p001: {
    title: "Small Light",
    price: 5,
    full: `Small Light

I found a small light in the pocket of the day,
a coin of amber that could not be named.
It fit the hollow of my hand like a secret,
a warmth I kept when the street lamps failed.

I walked home with it folded in my palm,
talked to its hush in grocery aisles and elevators,
and once, by the river, I let it warm my breath
until the world around me forgot to be cold.

Keep your small lights close, if you have them;
they are poor currency but honest and true.
They buy soft hours, quiet apologies,
and the rare permission to begin again.`
  },

  p002: {
    title: "Paper Boats",
    price: 6,
    full: `Paper Boats

We made paper boats and launched our promises
down the gutter where they turned quiet and old.
They skimmed the rain and took on little names,
ink bleeding like small maps into the fold.

Children cheered for the ones that kept afloat,
but most sank shallow and gathered leaves.
We called them reckless, then called them brave,
for any small thing that dared the current’s grief.

Years later I found one folded in a book,
its paper soft with time and memory.
I smoothed the crease and read the faded note:
Forgive the path; we tried to set us free.`
  },

  p003: {
    title: "After Rain",
    price: 7,
    full: `After Rain

After rain the street tasted like possibility,
each puddle a small polished mirror.
I walked and collected weather like coins,
pocketed the clouds with careful fingers.

Streetlights made a softened hallelujah,
and bicycles traced calligraphy on wet gray.
I listened for the city's softer pulse,
for the way the world learned to breathe again.

Come with me after rain, the sidewalks say,
bring nothing but the willingness to see.
We will trade our heavy for the honest shine
of evening's thin and sudden clarity.`
  },

  p004: {
    title: "Pocket Atlas",
    price: 8,
    full: `Pocket Atlas

He carried a pocket atlas, each page folded
to remember where he once wanted to go.
Maps named small towns and old harbor lights,
their paper gone soft from fingers that wished.

He traced the routes with the tip of a thumb,
measuring the distance like a private ache.
Sometimes he paused, the world a lit fuse,
and chose instead to learn a new street's name.

Maps are not only routes; they're promises kept,
licenses to leave and reasons to return.
He kept a town tucked in the edge of his shirt
and the quiet courage of someone who learns.`
  },

  p005: {
    title: "The Quiet Bell",
    price: 9,
    full: `The Quiet Bell

A bell rang in the kitchen and no one came;
its echo found me before the first cup of coffee.
I followed the sound like a simple task,
and discovered evening folded into morning.

We had a small bell for small remembrances,
for doors, for tea, for arrivals that mattered.
It rang only once when letters came from far,
and once more when we learned to speak again.

There is a bell in every house that waits,
and often the smallest ring means the most.
Listen when it calls: you may not be alone,
and the room you stand in might be a harbor.`
  },

  p006: {
    title: "Folded Window",
    price: 10,
    full: `Folded Window

She folded the window into a letter
and slid it under the door where sunlight could not follow.
The air smelled of travel and rain postponed,
and dust rehearsed the steps of returning light.

Windows are faith in both directions:
inside looking out, and out forgiving in.
When she closed it again, the world applauded softly,
and the glass forgot which side it was on.`
  },

  p007: {
    title: "Ledger of Days",
    price: 11,
    full: `Ledger of Days

I keep a ledger of small days—
the ones that fit into my hand like smooth stones.
They don't shout or shimmer, they simply rest,
warm with the simple fact of being kept.

Every line I draw is a mercy,
a quiet record that I was here.
Some pages balance, some don't.
But all of them belong to the same book.`
  },

  p008: {
    title: "The Harbor Letter",
    price: 12,
    full: `The Harbor Letter

The harbor kept a letter it never returned;
gulls learned the edges of its silence.
Ships came and went with ordinary faith,
but the tide remembered what it read.

Some words were too heavy to send.
Some were salt before ink.
And the paper waited, folded forever
between goodbye and grace.`
  },

  p009: {
    title: "Lantern at Noon",
    price: 13,
    full: `Lantern at Noon

A lantern at noon is only a choice;
I lit one for reasons I could not explain to the weather.
It glowed with a soft defiance,
a small rebellion against clarity.

Sometimes we must shine where no shadow asks.
Sometimes light is not for seeing,
but for saying — I am still here.`
  },

  p010: {
    title: "Bones of the Map",
    price: 14,
    full: `Bones of the Map

Maps leave the bones of places on my table;
I trace them when I need to remember arriving.
Roads hum like quiet veins, oceans breathe in blue,
and the world feels folded but alive.

Every border is a story drawn too soon,
every name a promise waiting to be spoken.
When I close the map, I can still feel it move —
a heart with a thousand coordinates.`
  },

  p011: {
    title: "Harbor of Paper",
    price: 15,
    full: `Harbor of Paper

In a harbor of paper I moored small boats of thought
and watched the ink tide come home.
Each word sailed differently, some slow, some sure,
but all returned with salt at the edges.

Writing is how I row toward silence.
Reading is how I reach the shore.`
  },

  p012: {
    title: "The Sound of White",
    price: 18,
    full: `The Sound of White

White has a sound that is not absence
but a careful listening—
like the hush before a page opens,
like snow deciding to fall.

In it I hear beginnings rehearsed,
promises warming their hands.
It is the color of forgiveness
when spoken softly enough.`
  },

  p013: {
    title: "Ledger of Small Losses",
    price: 20,
    full: `Ledger of Small Losses

I catalogue the small losses like coins,
keeping each one to count and learn their weight.
A laugh missed, a scent forgotten,
a chair left pulled too far from the table.

It is not grief but arithmetic—
the mathematics of tenderness,
the proof that even less can still be love.`
  },

  p014: {
    title: "Atlas with One Shoulder",
    price: 22,
    full: `Atlas with One Shoulder

He kept the world on one shoulder
and learned to smile when the moon asked for directions.
He didn’t complain; he simply shifted the weight,
turned the ache into posture, the burden into song.

Some carry oceans, others silence.
Both are heavy, both are holy.`
  },

  p015: {
    title: "A Harbor in the Racket",
    price: 25,
    full: `A Harbor in the Racket

The city builds its noise like scaffolding;
you climb and find the harbor is only silence below.
I leaned there once and watched it breathe,
a stillness deeper than sound itself.

Peace, it turns out, doesn’t hide from noise.
It waits beneath it — patient, unchanged.`
  }
};

// ============ HOME PAGE LOGIC ============
document.addEventListener("DOMContentLoaded", () => {
  // Buy button handling
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

  // Auto unlock if redirected from PayPal
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

  // Auto unlock if URL has ?purchase=ID
  const params = new URLSearchParams(window.location.search);
  if (params.has("purchase")) {
    const poemId = params.get("purchase");
    unlockPoem(poemId, "auto", unlockedContainer, message);
  }

  // Load previously unlocked poems
  Object.keys(localStorage).forEach(key => {
    if (POEMS[key]) {
      renderPoem(key, unlockedContainer);
    }
  });

  // Manual claim form
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
  console.log(`Unlocked poem ${poemId} (${mode})`);
}

function renderPoem(poemId, container) {
  const poem = POEMS[poemId];
  if (!poem || document.getElementById(`poem-${poemId}`)) return;
  const art = document.createElement("article");
  art.id = `poem-${poemId}`;
  art.innerHTML = `<h3>${poem.title}</h3><pre>${poem.full}</pre>`;
  container.prepend(art);
}
