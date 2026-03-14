document.getElementById("login-btn").addEventListener("click", () => {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "admin123") {

    localStorage.setItem("isLoggedIn", "true");

    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");

    loadIssues();

  } else {
    alert("Invalid username or password");
  }

});
