document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {

    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";

    if (typeof loadIssues === "function") {
      loadIssues();
    }

  } else {

    document.getElementById("login-section").style.display = "block";
    document.getElementById("dashboard-section").style.display = "none";

  }
});