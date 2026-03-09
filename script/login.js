let allIssues = [];

const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// Fetch all issues
async function getIssues() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Network response failed");

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    return [];
  }
}

// Search issues
async function searchIssues(query) {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search request failed");

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}

// Load issues
async function loadIssues() {
  const container = document.getElementById("issue-container");
  if (!container) return;

  container.innerHTML = `<p>Loading issues...</p>`;

  allIssues = await getIssues();
  renderIssues(allIssues);
}

// Render issues
function renderIssues(issues) {
  const container = document.getElementById("issue-container");
  if (!container) return;

  container.innerHTML = "";

  issues.forEach(issue => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${issue.title}</h3>
      <p>${issue.description}</p>
    `;

    container.appendChild(card);
  });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

  loadIssues();

  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", async () => {

    const query = searchInput.value.trim();

    if (!query) {
      renderIssues(allIssues);
      return;
    }

    const results = await searchIssues(query);
    renderIssues(results);

  });

});
