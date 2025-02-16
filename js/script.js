$(document).ready(function() {
  $(".acco__btn").on("click", function() {
      // クリックされたボタンの親要素（.acco__card）内の .acco__answer をトグルする
      $(this).siblings(".acco__answer").slideToggle(300);
      
      // アクティブなクラスを付与・削除（必要ならアイコン変更などに利用）
      $(this).toggleClass("turn");
  });
});
