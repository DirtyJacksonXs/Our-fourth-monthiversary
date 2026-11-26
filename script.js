const beginButton = document.getElementById("beginButton");
const nextButton = document.getElementById("nextButton");
const universe = document.getElementById("universo");
const letter = document.getElementById("carta");

beginButton.addEventListener("click", () => {
  universe.classList.remove("hidden");
  universe.scrollIntoView({ behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  letter.classList.remove("hidden");
  letter.scrollIntoView({ behavior: "smooth" });
});
