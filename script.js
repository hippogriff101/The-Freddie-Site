(function () {
console.log("Hey, welcome fellow coder!")
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
