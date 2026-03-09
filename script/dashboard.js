// dashboard.js

const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const SEARCH_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

let allIssues = [];

// ----------------- FETCH ISSUES -----------------
async function loadIssues() {
  const container = document.getElementById("issue-container");
  if (!container) return;

  // show loading spinner
  container.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-24 gap-6 text-center">
      <span class="loading loading-spinner w-16 h-16 text-brand-purple"></span>
      <div class="space-y-3">
        <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">
          Loading Issues...
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch(API_URL);
    const result = await res.json();
    allIssues = result.data || [];
    renderIssues(allIssues);
  } catch (e) {
    console.error("Failed to load issues:", e);
    container.innerHTML = `<div class="col-span-full text-center py-20 text-red-500 font-bold">Failed to load issues</div>`;
  }
}

// ----------------- RENDER ISSUES -----------------
function renderIssues(issues) {
  const container = document.getElementById("issue-container");
  if (!container) return;

  container.innerHTML = "";

  issues.forEach(issue => {
    const isClosed = issue.status?.toLowerCase() === "closed";
    const card = document.createElement("div");
    card.className = `bg-white rounded-xl shadow-sm border-t-4 ${isClosed ? "border-closed-purple" : "border-open-green"} p-6 flex flex-col justify-between hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer`;
    
    // store status for filtering
    card.dataset.status = issue.status?.toLowerCase() || "unknown";

    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-[10px] font-black uppercase px-2 py-1 rounded bg-gray-100 text-gray-500 tracking-tighter">
            ${issue.priority || "Normal"}
          </span>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${isClosed ? "bg-closed-purple" : "bg-open-green"}"></span>
            <span class="text-[10px] font-bold text-gray-400 uppercase">${issue.status || "Unknown"}</span>
          </div>
        </div>
        <h3 class="font-bold text-gray-800 text-lg leading-tight mb-2">${issue.title}</h3>
        <p class="text-sm text-gray-400 line-clamp-3 mb-6">${issue.description}</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-brand-purple/10 flex items-center justify-center text-[10px] font-bold text-brand-purple">
            ${issue.author ? issue.author.charAt(0).toUpperCase() : "U"}
          </div>
          <span class="text-xs text-gray-700 font-bold">
            @${issue.author ? issue.author.split(" ")[0].toLowerCase() : "user"}
          </span>
        </div>
        <span class="text-[10px] text-gray-300 font-bold">
          ${new Date(issue.createdAt).toLocaleDateString()}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterIssues(status) {

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

  const btn = Array.from(document.querySelectorAll(".tab-btn")).find(b => b.textContent.toLowerCase() === status);
  if (btn) btn.classList.add("active");

  // filter issues
  if (status === "all") renderIssues(allIssues);
  else renderIssues(allIssues.filter(issue => (issue.status?.toLowerCase() || "") === status));
}

// SEARCH FUNCTION 
async function handleSearch() {
  const queryInput = document.getElementById("search-input");
  const container = document.getElementById("issue-container");
  if (!queryInput || !container) return;

  const query = queryInput.value.trim();
  if (!query) return renderIssues(allIssues);

  container.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-24 gap-6 text-center">
      <span class="loading loading-spinner w-16 h-16 text-brand-purple"></span>
      <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">Searching...</p>
    </div>
  `;

  try {
    const res = await fetch(`${SEARCH_URL}${query}`);
    const result = await res.json();
    renderIssues(result.data || []);
  } catch (e) {
    console.error("Search failed:", e);
    container.innerHTML = `<div class="col-span-full text-center py-20 text-red-500 font-bold">Search failed</div>`;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  loadIssues();

  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) searchBtn.addEventListener("click", handleSearch);

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }
});