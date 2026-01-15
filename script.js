const search = document.getElementById("search");
const toggle = document.getElementById("toggleTheme");

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  document.querySelectorAll("li").forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
