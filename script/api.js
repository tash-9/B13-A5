const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const SEARCH_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

async function getIssues() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data || [];
}

async function searchIssues(query) {
  const res = await fetch(`${SEARCH_URL}${query}`);
  const data = await res.json();
  return data.data || [];
}