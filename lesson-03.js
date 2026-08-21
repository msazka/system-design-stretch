"use strict";

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.
//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.

console.log("sync start"); // 01
setTimeout(() => {
  console.log("timer callback"); //04
}, 0);
Promise.resolve().then(() => {
  console.log("promise reaction"); //03
});
console.log("sync end"); //02

//Promise reactions are queued as microtasks which run before macrotasks like setTimeout callbacks, so the settled Promise's .then() runs
// before the zero delay timer
//

class MissingArtistDataError extends Error {
  constructor(artist) {
    super(
      "Missing artist data: the artist record has no name. Please add the artist's name before continuing.",
    );
    this.name = "MissingArtistDataError";
    this.artist = artist;
  }
}

function checkArtistName(artist) {
  if (!artist || !artist.name || !artist.name.trim()) {
    throw new MissingArtistDataError(artist);
  }
}

function loadArtistForPage(artist) {
  try {
    checkArtistName(artist);
    return artist.name.trim();
  } catch (error) {
    if (error instanceof MissingArtistDataError) {
      const teammateMessage = `Artist page: failed while updating the artist profile. ${error.message}`;
      console.error(teammateMessage);
      throw new Error(teammateMessage);
    }

    throw error;
  }
}

try {
  loadArtistForPage({ name: "" });
} catch (error) {
  console.error("Top-level failure:", error.message);
}

function delayedTask(label, value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ label, value }), delay);
  });
}
function delayedFailure(label, delay, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`${label}: ${message}`)), delay);
  });
}
Promise.all([
  delayedTask("alpha", 10, 40),
  delayedTask("beta", 20, 10),
  delayedTask("gamma", 30, 30),
]).then((results) => {
  console.log("Promise.all results:", results);
});
Promise.all([
  delayedTask("ok1", 100, 20),
  delayedFailure("bad-task", 40, "network timeout"),
  delayedTask("ok2", 200, 30),
])
  .then((results) => {
    console.log("Promise.all succeeded:", results);
  })
  .catch((error) => {
    console.error("Promise.all failed:", error.message);
  });

Promise.allSettled([
  delayedTask("keep-1", 5, 50),
  delayedFailure("drop-me", 30, "server rejected"),
  delayedTask("keep-2", 9, 10),
]).then((results) => {
  console.log("Promise.allSettled results:", results);
});

function showVisitorMessageForArtist(artist) {
  try {
    checkArtistName(artist);
    return `Artist loaded: ${artist.name.trim()}`;
  } catch (error) {
    if (error instanceof MissingArtistDataError) {
      const visitorMessage = "Please add the artist's name before continuing.";
      console.error(`Artist page: ${visitorMessage}`);
      return visitorMessage;
    }

    throw error;
  }
}

console.log(showVisitorMessageForArtist({ name: "   " }));
