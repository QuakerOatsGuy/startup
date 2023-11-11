function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("User's_Name", nameEl.value);
  window.location.href = "game.html";
}
