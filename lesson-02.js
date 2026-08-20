"use strict";

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

console.log("doors open");
setTimeout(() => console.log("encore"), 1000);
setTimeout(() => console.log("soundcheck"), 0);
console.log("main act");
setTimeout(() => console.log("intermission"), 500);
console.log("lights down");

// Your prediction:
// 1. doors open right
// 2. main act right
// 3. soundcheck wrong
// 4. lights down wrong
// 5. intermission right
// 6. encore right

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

function prepare(artist) {
  //push 02 pop 03
  return "Now playing " + format(artist);
}
function format(artist) {
  // push 03 pop 02
  return artist.name.toUpperCase(); // push 04 pop 01
}
console.log(prepare({ name: "Asake" })); //push 01 pop04
/*
stack trace starts adding a function call when console.log is called where it push function call prepare
when its called it execute return and push format call, when executed it push again a function toUpperCase.
so order of execution is starting to pop in following order
toUppercase->format->prepare->console.log
*/

// countdown from 10 to 0

let count = 10;
const timer = setInterval(() => {
  console.log(count);
  if (count === 0) {
    clearInterval(timer);
  }
  count--;
}, 1000);

//Javascript runs on single stack, which means one frame at one time. If anything has to wait
// it is handed off outside the stack so stack can be free. when that is finished, callbacks
// land back in queue not on the stack.
// the task of event loop it to watch the stack; if its empty pull next callback from the queue and run it.
//This is how thousand waiting tasks dont block anything.They are not running but parked until the single thread has a free slot to handle each one.
