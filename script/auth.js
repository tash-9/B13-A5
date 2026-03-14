<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("isLoggedIn") === "true") {

    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");

    if (typeof loadIssues === "function") {
      loadIssues();
    }

  }

});
=======
document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("isLoggedIn") === "true") {

    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");

    if (typeof loadIssues === "function") {
      loadIssues();
    }

  }

});
>>>>>>> 028da5444d0170c220aeaf81170f8173ea9bc80a
