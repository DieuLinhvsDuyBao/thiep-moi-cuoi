document.addEventListener("DOMContentLoaded", function () {

  /* ================= HIỆU ỨNG TRÁI TIM RƠI (MỚI) ================= */
  function createHeart() {
    const container = document.getElementById('falling-hearts-container');
    // Nếu chưa thêm HTML container thì dừng lại để tránh lỗi
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    // Bạn có thể dùng icon khác như '💖', '💗' hoặc hình ảnh <img>
    heart.innerHTML = '❤';

    // --- Cấu hình ngẫu nhiên để hiệu ứng tự nhiên hơn ---

    // Vị trí xuất hiện ngẫu nhiên theo chiều ngang (0% đến 100%)
    heart.style.left = Math.random() * 100 + 'vw';

    // Kích thước ngẫu nhiên (từ 10px đến 30px)
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';

    // Thời gian rơi ngẫu nhiên (từ 3 giây đến 8 giây) - Rơi chậm cho lãng mạn
    const duration = Math.random() * 5 + 3;
    heart.style.animationDuration = duration + 's';

    // Thêm trái tim vào container
    container.appendChild(heart);

    // Quan trọng: Xóa trái tim sau khi nó rơi xong để tránh làm nặng máy
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // Tạo trái tim mới mỗi 300ms (0.3 giây).
  // Tăng số này lên nếu muốn ít trái tim hơn (ví dụ: 600)
  setInterval(createHeart, 300);


  /* ================= CODE CŨ CỦA BẠN Ở DƯỚI ================= */

  /* ================= SLIDE ẢNH THƯỜNG ================= */
  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;

  if (slides.length > 0) {
    slides[0].classList.add("active");

    setInterval(() => {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }, 4000);
  }

  /* ================= HERO SLIDER ================= */
  const heroSlides = document.querySelectorAll(".hero-slide");
  let heroIndex = 0;

  if (heroSlides.length > 0) {
    heroSlides[0].classList.add("active");

    setInterval(() => {
      heroSlides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, 4500);
  }

  /* ================= POPUP SỔ LƯU BÚT ================= */
  const openWish = document.getElementById("openWish");
  const closeWish = document.getElementById("closeWish");
  const modal = document.getElementById("wishModal");

  if (openWish && modal) {
    openWish.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (closeWish && modal) {
    closeWish.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  /* ================= GUESTBOOK ================= */
  const submitWish = document.getElementById("submitWish");
  const guestName = document.getElementById("guestName");
  const guestWish = document.getElementById("guestWish");
  const popupList = document.getElementById("guestbookList");
  const publicList = document.getElementById("guestbookPublic");

  function getData() {
    return JSON.parse(localStorage.getItem("guestbook")) || [];
  }

  function saveData(data) {
    localStorage.setItem("guestbook", JSON.stringify(data));
  }

  function renderWish() {
    const data = getData();

    if (popupList) popupList.innerHTML = "";
    if (publicList) publicList.innerHTML = "";

    data.forEach(w => {
      const item = `
        <div class="wish-item">
          <strong>${w.name}</strong>
          <p>${w.text}</p>
        </div>
      `;
      if (popupList) popupList.innerHTML += item;
      if (publicList) publicList.innerHTML += item;
    });
  }

  if (submitWish) {
    submitWish.addEventListener("click", () => {
      const name = guestName.value.trim();
      const text = guestWish.value.trim();

      if (!name || !text) {
        alert("Vui lòng nhập đầy đủ tên và lời chúc!");
        return;
      }

      const data = getData();
      data.unshift({ name, text });
      saveData(data);

      guestName.value = "";
      guestWish.value = "";

      renderWish();
    });
  }

  renderWish();

  /* ================= COUNTDOWN (ĐÃ SỬA LỖI NaN) ================= */
  // Sửa định dạng ngày tháng sử dụng dấu '/' cho an toàn
  const weddingDate = new Date("2026/01/25 00:00:00").getTime();

  const dayEl = document.getElementById("days");
  const hourEl = document.getElementById("hours");
  const minEl = document.getElementById("minutes");
  const secEl = document.getElementById("seconds");

  if (dayEl && hourEl && minEl && secEl) {
    setInterval(() => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      dayEl.textContent = days;
      // Thêm padStart để số luôn hiển thị 2 chữ số (ví dụ: 05 thay vì 5)
      hourEl.textContent = String(hours).padStart(2, '0');
      minEl.textContent = String(minutes).padStart(2, '0');
      secEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
  }
/* ================= XỬ LÝ RSVP GIAO DIỆN MỚI ================= */
  const openRSVPBtn = document.getElementById("openRSVP");
  const closeRSVPLink = document.getElementById("closeRSVPNew");
  const rsvpOverlay = document.getElementById("rsvp-overlay");
  const rsvpFormNew = document.getElementById("rsvpFormNew");
  
  // === QUAN TRỌNG: Dán URL Google Apps Script của bạn vào đây ===
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzb-Bw6dFEFG9RlZmWvGlkx2-Wf0nLCVjAxc0_MZxSJ5dM_A0k5jDMsFYMOGfTmBRMjsg/exec'; 

  // Mở form overlay
  if (openRSVPBtn && rsvpOverlay) {
    openRSVPBtn.addEventListener("click", () => {
      rsvpOverlay.style.display = "block";
      // Khóa cuộn trang chính lại
      document.body.style.overflow = "hidden"; 
    });
  }

  // Đóng form overlay
  if (closeRSVPLink && rsvpOverlay) {
    closeRSVPLink.addEventListener("click", (e) => {
      e.preventDefault(); // Chặn link nhảy trang
      rsvpOverlay.style.display = "none";
      // Mở lại cuộn trang chính
      document.body.style.overflow = "auto";
    });
  }

  // Xử lý submit form mới
  if (rsvpFormNew) {
    rsvpFormNew.addEventListener("submit", (e) => {
      e.preventDefault();

      // Hiệu ứng nút đang gửi
      const submitBtn = document.getElementById("submitRSVPNew");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "ĐANG GỬI...";
      submitBtn.disabled = true;

      // --- Lấy dữ liệu từ form mới ---
      
      // 1. Lấy các sự kiện được chọn từ checkbox
      const checkedEvents = document.querySelectorAll('input[name="events"]:checked');
      let eventsValue = "";
      checkedEvents.forEach((checkbox, index) => {
          eventsValue += checkbox.value;
          if (index < checkedEvents.length - 1) eventsValue += ", ";
      });
      // Nếu không chọn gì thì ghi chú lại
      if (eventsValue === "") eventsValue = "Chưa chọn sự kiện";

      // 2. Tổng hợp dữ liệu để gửi đi
      const data = {
        name: document.getElementById("fullName").value,
        phone:"'"+ document.getElementById("phoneNumber").value,
        attendance: eventsValue, // Gửi danh sách sự kiện tham gia vào cột Attendance
        guests: document.getElementById("guestCount").value // Gửi số lượng người đi cùng
      };

      // --- Gửi dữ liệu lên Google Sheets (Code cũ giữ nguyên) ---
      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
      })
      .then(() => {
        alert(`Cảm ơn ${data.name} đã xác nhận! Hẹn gặp bạn tại đám cưới.`);
        rsvpFormNew.reset(); // Reset form
        rsvpOverlay.style.display = "none"; // Đóng form
        document.body.style.overflow = "auto"; // Mở khóa cuộn
      })
      .catch(error => {
        console.error('Lỗi:', error);
        alert("Có lỗi xảy ra, bạn vui lòng thử lại nhé!");
      })
      .finally(() => {
        // Trả lại nút ban đầu
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

function playMusic() {
  music.play().then(() => {
    isPlaying = true;
    musicBtn.classList.add("playing");
  }).catch(() => {});
}

if (musicBtn && music) {
  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      playMusic();
    } else {
      music.pause();
      isPlaying = false;
      musicBtn.classList.remove("playing");
    }
  });
}
// ===== THANK YOU ANIMATION =====
const thankYou = document.querySelector('.thankyou-text');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      thankYou.classList.add('show');
    }
  },
  { threshold: 0.6 }
);

if (thankYou) observer.observe(thankYou);

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');

let currentIndex = 0;
let images = [];

galleryItems.forEach((item, index) => {
  const bg = item.style.backgroundImage;
  const url = bg.slice(5, -2); // lấy link ảnh
  images.push(url);

  item.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.add('active');
  lightboxImg.src = images[currentIndex];
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
}

closeBtn.onclick = closeLightbox;
nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ESC để đóng
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});



});