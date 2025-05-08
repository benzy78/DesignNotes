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

// ナビゲーションに現在地を示す実装
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".header__nav-links a");

  // IntersectionObserverの作成
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry.target.id, entry.isIntersecting, entry.boundingClientRect);
        // console.log(`監視中: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}`);

        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            if (link.getAttribute("href").slice(1) === entry.target.id) {
              link.classList.add("current");
            } else {
              link.classList.remove("current");
            }
          });
        }
      });
    },
    { rootMargin: "0px 0px -60% 0px", threshold: 0 } // 調整
  );

  // すべてのセクションを監視対象にする
  sections.forEach((section) => observer.observe(section));
});
// ナビゲーションに現在地を示す実装 end

// dropdown
const dropdown = document.getElementById('dropdown');
  const button = document.getElementById('dropdownButton');

  button.addEventListener('click', (e) => {
    e.stopPropagation(); // 外側クリックとの干渉防止
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
  // dropdown end

  // date picker calender
  const input = document.getElementById('dateInput');
  const calendar = document.getElementById('calendar');

  let currentDate = new Date(); // 表示中の年月

  input.addEventListener('focus', () => {
    calendar.style.display = 'block';
    generateCalendar(currentDate);
  });

  document.addEventListener('mousedown', (e) => {
    if (
      !calendar.contains(e.target) &&
      !input.contains(e.target)
    ) {
      calendar.style.display = 'none';
    }
  });
  

  function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let html = `
      <div class="calendar-header">
        <button id="prevMonth">&lt;</button>
        <span>${year}年 ${month + 1}月</span>
        <button id="nextMonth">&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
          </tr>
        </thead>
        <tbody><tr>`;

    let dayCount = 0;
    for (let i = 0; i < startDay; i++) {
      html += `<td></td>`;
      dayCount++;
    }

    for (let d = 1; d <= totalDays; d++) {
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        d === today.getDate();

      html += `<td class="${isToday ? 'today' : ''}">${d}</td>`;
      dayCount++;

      if (dayCount % 7 === 0) html += `</tr><tr>`;
    }

    html += `</tr></tbody></table>`;
    calendar.innerHTML = html;

    // イベント再登録
    calendar.querySelectorAll('td').forEach(td => {
      if (td.textContent !== '') {
        td.addEventListener('click', () => {
          const selectedDate = new Date(year, month, parseInt(td.textContent));
          const yyyy = selectedDate.getFullYear();
          const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const dd = String(selectedDate.getDate()).padStart(2, '0');
          input.value = `${yyyy}-${mm}-${dd}`;
          calendar.style.display = 'none';
        });
      }
    });

    // 月送りボタン
    calendar.querySelector('#prevMonth').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate);
    });

    calendar.querySelector('#nextMonth').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate);
    });
  }
  // calender end

  // counter
  const input2 = document.getElementById('count');
  const plus = document.getElementById('increase');
  const minus = document.getElementById('decrease');

  plus.addEventListener('click', () => {
    input2.value = Number(input2.value) + 1;
  });

  minus.addEventListener('click', () => {
    if (input2.value > 0) {
      input2.value = Number(input2.value) - 1;
    }
  });
  // counter end


  // range slider
  const minRange = document.getElementById('minRange');
  const maxRange = document.getElementById('maxRange');
  const sliderRange = document.getElementById('sliderRange');
  const minInput = document.getElementById('minPrice');
  const maxInput = document.getElementById('maxPrice');

  function updateSlider() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);
    // バリデーション（重なり防止）
    if (min > max) min = max;
    if (max < min) max = min;
    const percentMin = (min / 50000) * 100;
    const percentMax = (max / 50000) * 100;
    sliderRange.style.left = percentMin + '%';
    sliderRange.style.width = (percentMax - percentMin) + '%';
    minInput.value = min;
    maxInput.value = max;
  }
  function syncFromInputs() {
    let min = parseInt(minInput.value) || 0;
    let max = parseInt(maxInput.value) || 0;
    // 範囲制限
    if (min < 0) min = 0;
    if (max > 50000) max = 50000;
    if (min > max) min = max;
    minRange.value = min;
    maxRange.value = max;
    updateSlider();
  }
  minRange.addEventListener('input', updateSlider);
  maxRange.addEventListener('input', updateSlider);
  minInput.addEventListener('change', syncFromInputs);
  maxInput.addEventListener('change', syncFromInputs);
  updateSlider(); // 初期化
// range slider end


  // toggle-sort btn
  const buttons = document.querySelectorAll('.toggle-button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 任意のロジック（表示切り替えなど）
      console.log('選択ビュー:', button.id);
    });
  });
// toggle-sort btn end


  // toggle btn
  const switchBtn = document.getElementById('switchBtn');

  switchBtn.addEventListener('click', () => {
    switchBtn.classList.toggle('on');

    const isOn = switchBtn.classList.contains('on');
    console.log('通知設定：', isOn ? 'ON' : 'OFF');
  });
    // toggle btn end


    // modal
    const openBtn = document.querySelector('.open-modal-btn');
    const overlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
  
    openBtn.addEventListener('click', () => {
      overlay.classList.add('show');
    });
  
    cancelBtn.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
  
    // 背景クリックでも閉じる
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
    // modal end


    // Toast
    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          ${
            type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' :
            type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />' :
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />'
          }
        </svg>
        ${message}
      `;
      container.appendChild(toast);
  
      // 自動で非表示
      setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => container.removeChild(toast), 500);
      }, 3000);
    }
    // Toast end