const categories = document.querySelectorAll(".category");
const projects = document.querySelectorAll(".project");

const projectMap = {
  ALL: [...Array(projects.length).keys()], // 0~10
  "Front-end": [0, 1, 2], // 1~3
  Mobile: [3, 4, 5, 6, 7], // 4~8
  "Back-end": [8, 9, 10], // 9~11
};

categories.forEach((category) => {
  category.addEventListener("click", () => {
    // 선택 상태 바꾸기
    categories.forEach((c) => c.classList.remove("category--selected"));
    category.classList.add("category--selected");

    const catText = category.textContent.replace(/\d/g, "").trim(); // 숫자 제거
    const showIndexes = projectMap[catText];

    projects.forEach((project, i) => {
      project.style.display = showIndexes.includes(i) ? "block" : "none";
    });
  });
});

// --- 부드러운 스크롤 ---
const menuLinks = document.querySelectorAll(
  ".header__menu__item, .home__contact, .arrow-up"
);

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.offsetTop -
            document.querySelector(".header").offsetHeight,
          behavior: "smooth",
        });
      }
    }
  });
});
