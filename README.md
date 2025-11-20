Dwoo’s Portfolio 페이지 기능 구현기
프로젝트 목표

이번 프로젝트에서는 나의 포트폴리오 웹사이트를 만들면서 두 가지 기능을 구현하고 싶었다.

포트폴리오 필터링 – Front-end, Mobile, Back-end 버튼을 눌렀을 때 해당하는 프로젝트만 보이도록.

부드러운 스크롤 – 메뉴를 클릭하면 페이지가 자연스럽게 스크롤되면서 이동하도록.

기존 HTML과 CSS를 활용하면서, JS를 통해 동적인 기능을 추가했다.

1️⃣ 포트폴리오 필터링 구현
HTML 구조

포트폴리오 섹션에는 프로젝트 리스트와 필터 버튼이 있다.
버튼에는 ALL / Front-end / Mobile / Back-end 텍스트와 프로젝트 개수를 표시하는 <span>을 넣었다.

<ul class="categories">
  <li><button class="category category--selected">ALL<span class="category__count">11</span></button></li>
  <li><button class="category">Front-end<span class="category__count">3</span></button></li>
  <li><button class="category">Mobile<span class="category__count">5</span></button></li>
  <li><button class="category">Back-end<span class="category__count">3</span></button></li>
</ul>


각 프로젝트는 리스트 항목 <li class="project">로 감싸져 있다.
JS에서 이 순서를 기준으로 필터링할 수 있도록 1~11번까지 정확하게 정렬했다.

JS 구현
const categories = document.querySelectorAll('.category');
const projects = document.querySelectorAll('.project');

const projectMap = {
  'ALL': [...Array(projects.length).keys()],
  'Front-end': [0,1,2],
  'Mobile': [3,4,5,6,7],
  'Back-end': [8,9,10]
};

categories.forEach(category => {
  category.addEventListener('click', () => {
    categories.forEach(c => c.classList.remove('category--selected'));
    category.classList.add('category--selected');

    const catText = category.textContent.replace(/\d/g, '').trim();
    const showIndexes = projectMap[catText];

    projects.forEach((project,i) => {
      project.style.display = showIndexes.includes(i) ? 'block' : 'none';
    });
  });
});


각 버튼 클릭 시 category--selected 클래스를 업데이트하여 선택된 버튼 표시

projectMap 객체를 이용해 각 버튼별로 보여줄 프로젝트 인덱스 정의

프로젝트 리스트를 순회하면서 해당 인덱스만 보이도록 display 속성 변경

✨ 포인트:
프로젝트의 순서를 인덱스로 관리하면 JS에서 조건문 없이도 간단하게 필터링 가능.

2️⃣ 부드러운 스크롤 구현

메뉴나 버튼 클릭 시 페이지가 바로 이동하는 대신, 자연스럽게 스크롤되도록 구현했다.

const menuLinks = document.querySelectorAll('.header__menu__item, .home__contact, .arrow-up');
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if(targetId.startsWith('#')){
      const targetElement = document.querySelector(targetId);
      if(targetElement){
        window.scrollTo({
          top: targetElement.offsetTop - document.querySelector('.header').offsetHeight,
          behavior: 'smooth'
        });
      }
    }
  });
});


메뉴, 홈 연락처 버튼, 위로 가기 버튼 모두 선택

클릭 시 기본 앵커 동작을 막고 scrollTo 사용

헤더 높이를 빼서 메뉴가 섹션을 가리지 않도록 조정

behavior: 'smooth'로 부드럽게 스크롤

✨ 포인트:
CSS scroll-behavior 대신 JS를 쓰면 헤더 높이 조정까지 쉽게 처리 가능.

3️⃣ 구현 결과

포트폴리오 필터링: 버튼 클릭 시 해당 프로젝트만 노출

부드러운 스크롤: 메뉴 클릭 시 자연스럽게 섹션 이동

모바일 대응: CSS 미디어쿼리로 반응형 완성

이번 프로젝트를 통해, 단순 HTML/CSS에서 JS를 통해 동적인 사용자 경험을 쉽게 추가할 수 있다는 것을 확인했다.

4️⃣ 소스코드 전체 링크

HTML / CSS / JS 전체 코드 보기
 (링크 걸기)
