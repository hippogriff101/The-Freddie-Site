// OK, I don't know JS, pretty much all of this JavaScript doc is vibecoded! Thats ok, right? We can still be friends? :sob: 
(function () {
console.log("Hey, welcome to my site fellow coder!")

getLatestPost().then(post => {
  const title = document.getElementById("post-title");
  const date = document.getElementById("post-date");
  const postLink = document.getElementById("post-link");

  if (title) {
    title.textContent = post.title;
  }

  if (date) {
    date.textContent = new Date(post.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  if (postLink) {
    postLink.href = post.link;
  }
}).catch(function (error) {
  console.error("Blog fetch error:", error);
});

var root = document.getElementById("footer-commit");
if (!root) return;

var owner = root.getAttribute("data-owner");
var repo = root.getAttribute("data-repo");
var link = root.querySelector(".commit-link");
var text = root.querySelector(".commit-text");
var hash = root.querySelector(".commit-hash");

if (!owner || !repo || !link || !text || !hash) return;

fetch("https://api.github.com/repos/" + owner + "/" + repo + "/commits?per_page=1")
    .then(function (res) {
    if (!res.ok) throw new Error("GitHub API request failed");
    return res.json();
    })
    .then(function (commits) {
    if (!Array.isArray(commits) || commits.length === 0) return;

    var latest = commits[0];
    if (!latest.sha || !latest.html_url) return;

    link.href = latest.html_url;
    if (latest.commit && latest.commit.message) {
        var message = latest.commit.message.split("\n")[0].trim();
        if (message) text.textContent = message;
    }
    hash.textContent = "(" + latest.sha.slice(0, 7) + ")";
    })
    .catch(function (error) {
    // Keep fallback link and text when API is unavailable.
    console.error("GitHub API Error:", error);
    });
})();

async function getLatestPost() {
  const res = await fetch("https://blog.freddieyershon.co.uk/feed.xml");
  const text = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  const entry = xml.querySelector("entry");

  if (!entry) {
    throw new Error("No blog entry found in feed");
  }

  const title = entry.querySelector("title").textContent;
  const date = entry.querySelector("updated").textContent;
  const link = entry.querySelector("link").getAttribute("href");

  return {
    title,
    date,
    link
  };
}

// 1. Define the formatting options
const options = {
  timeZone: 'Europe/London',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false 
};

// New option specifically to get the full weekday name (e.g., "Thursday")
const weekdayOptions = {
  timeZone: 'Europe/London',
  weekday: 'long'
};

const formatter = new Intl.DateTimeFormat([], options);
const weekdayFormatter = new Intl.DateTimeFormat([], weekdayOptions);

// Helper function to get the correct ordinal suffix (st, nd, rd, th)
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

// 2. Initialize the variable where your pretty date will live
let currentLondonTime = "";

// 3. Create the update function
const updateTimeVariable = () => {
  const now = new Date();
  
  // Get the day number specifically for London
  const londonDay = parseInt(now.toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric' }));
  
  // Get the weekday string (e.g., "Tuesday")
  const weekday = weekdayFormatter.format(now);
  
  // Format the rest of the date (e.g., "June 2026, 15:16")
  const parts = formatter.format(now); 
  
  // Combine them: "Tuesday, 2nd June 2026, 15:16"
  currentLondonTime = `${weekday}, ${londonDay}${getOrdinalSuffix(londonDay)} ${parts}`;
  
  // Update your DOM element inside the interval so it actually refreshes on screen
  const dateElement = document.getElementById("date");
  if (dateElement) {
    dateElement.textContent = currentLondonTime;
  }
  
  console.log("Variable updated:", currentLondonTime);
};

// 4. Run immediately and set the 1-minute interval
updateTimeVariable();
setInterval(updateTimeVariable, 60000);