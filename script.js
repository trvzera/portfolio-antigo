
const toTop = document.querySelector("#back-top-btn");

if (toTop) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  });
}

let motion_dialog = document.getElementById("motion-prjs");
let open_motion = document.getElementById("motion-btn");
let close_motion = document.getElementById("close-motion");

open_motion.addEventListener("click", () => {
  motion_dialog.showModal();
});

close_motion.addEventListener("click", () => {
  motion_dialog.close();
});

let mmv_dialog = document.getElementById("mmv-prjs");
let open_mmv = document.getElementById("mmv-btn");
let close_mmv = document.getElementById("close-mmv");

open_mmv.addEventListener("click", () => {
  mmv_dialog.showModal();
});

close_mmv.addEventListener("click", () => {
  mmv_dialog.close();
});

let d3_dialog = document.getElementById("3d-prjs");
let open_3d = document.getElementById("d3-btn");
let close_3d = document.getElementById("close-3d");

open_3d.addEventListener("click", () => {
  d3_dialog.showModal();
});

close_3d.addEventListener("click", () => {
  d3_dialog.close();
});

let web_dialog = document.getElementById("web-prjs");
let open_web = document.getElementById("web-btn");
let close_web = document.getElementById("close-web");

open_web.addEventListener("click", () => {
  web_dialog.showModal();
});

close_web.addEventListener("click", () => {
  web_dialog.close();
});



document.querySelectorAll(".yt-lite").forEach((el) => {
  const id = el.dataset.yt;
  const thumb = el.querySelector(".thumb");

  thumb.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;

  el.addEventListener("click", () => {
    el.innerHTML = `
      <iframe
        width="100%" height="100%"
        src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
  });
});

// ---------- Active links for header2 (click + scroll + onload) ----------
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".app-icon");
  const navLinks = document.querySelectorAll(".app-icon a");
  const sections = Array.from(document.querySelectorAll("section, main")); // inclui <main>

  // Função para remover todas as classes e aplicar ao li desejado
  function setActiveByLi(li) {
    navItems.forEach((n) => n.classList.remove("active-app"));
    if (li) li.classList.add("active-app");
  }

  // 1) clique: marca o item clicado
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // deixa o hash normalmente (não preventDefault), mas marca o item imediatamente
      setActiveByLi(link.parentElement);
    });
  });

  // 2) scroll spy: marca pelo scroll (considera topo de cada seção)
  function onScrollSpy() {
    const scrollPos = window.scrollY + (window.innerHeight * 0.25); // ajusta sensibilidade
    let currentId = null;

    for (const sec of sections) {
      if (!sec || !sec.id) continue;
      const top = sec.offsetTop;
      if (scrollPos >= top) currentId = sec.id;
    }

    if (currentId) {
      const link = document.querySelector(`.app-icon a[href="#${currentId}"]`);
      if (link) setActiveByLi(link.parentElement);
    } else {
      // quando nenhum section corresponde (topo absoluto), marca main ou primeiro
      const mainLink = document.querySelector(`.app-icon a[href="#main"]`);
      if (mainLink) setActiveByLi(mainLink.parentElement);
      else setActiveByLi(navItems[0]); // fallback
    }
  }

  window.addEventListener("scroll", throttle(onScrollSpy, 100));
  window.addEventListener("resize", throttle(onScrollSpy, 200));

  // 3) on load: se houver hash usa ele; se não, marca 'main' ou o primeiro item
  function initActiveOnLoad() {
    const hash = location.hash; // ex: "#about"
    if (hash) {
      const link = document.querySelector(`.app-icon a[href="${hash}"]`);
      if (link) return setActiveByLi(link.parentElement);
    }

    // sem hash: se estivermos no topo (scrollY === 0) ou perto, marca main
    if (window.scrollY < 50) {
      const mainLink = document.querySelector(`.app-icon a[href="#main"]`);
      if (mainLink) return setActiveByLi(mainLink.parentElement);
    }

    // fallback: roda o scroll spy pra descobrir a seção atual
    onScrollSpy();
  }
  initActiveOnLoad();

  // ----------------- util: throttle simples -----------------
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }
});


