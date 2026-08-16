"use strict";

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
// http://127.0.0.1:5500/stretch-records/index.html
// http://127.0.0.1:5500/stretch-records/script.js
// https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap

// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
// /home/azka/Documents/SAP-Javascript/system-design-stretch/stretch-records/json/artist.json
// Js file is not changed because only json file responsible to update or delete data.

// Step 7: paste the console error the broken artists.json produced.
//script.js:77 Failed to load artists.json: SyntaxError: Unexpected non-whitespace character after JSON at position 743 (line 38 column 2)
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.
//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.
// client is my javascript running on the and once it want to
//  fetch the array of artist from json, json file is acting as a server serving the response requested in the fetch call.
