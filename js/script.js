document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".header__nav");
  const navItems = document.querySelectorAll(".header__nav-links a"); 

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active"); // メニューを閉じる
    });
  });
});


$(document).ready(function() {
  $(".acco__btn-plus").on("click", function() {
      // クリックされたボタンの親要素（.acco__card）内の .acco__answer をトグルする
      $(this).siblings(".acco__answer").slideToggle(300);
      // アクティブなクラスを付与・削除（必要ならアイコン変更などに利用）
      $(this).toggleClass("turn");
  });
});

$(document).ready(function() {
  $(".acco__btn-arrow").on("click", function() {
      // クリックされたボタンの親要素（.acco__card）内の .acco__answer をトグルする
      $(this).siblings(".acco__answer").slideToggle(300);
      // アクティブなクラスを付与・削除（必要ならアイコン変更などに利用）
      $(this).toggleClass("turn");
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
