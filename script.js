document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logika Kursor (Hanya aktif jika bukan di HP)
    const cursor = document.getElementById('custom-cursor');
    const isMobile = window.innerWidth <= 900;

    if (!isMobile && cursor) {
        document.body.style.cursor = "none";
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Efek Hover pada elemen interaktif
        document.querySelectorAll('.interactive, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // 2. Navigasi Ganti Halaman Tanpa Reload
    const navItems = document.querySelectorAll('.nav-item, .topbar-nav a');
    const pages = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            // Update UI Menu Aktif (Sinkronkan sidebar dan topbar)
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.topbar-nav a').forEach(nav => nav.classList.remove('active'));
            
            // Tandai aktif pada menu yang memiliki data-target yang sama
            document.querySelectorAll(`[data-target="${targetId}"]`).forEach(nav => nav.classList.add('active'));

            // Ganti Halaman
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(targetId);
            if(targetPage) targetPage.classList.add('active');

            // Jika di HP, otomatis tutup sidebar setelah klik menu
            const sidebar = document.getElementById('sidebar');
            if(window.innerWidth <= 900 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // 3. Toggle Sidebar untuk HP (Hamburger Menu)
    const toggleBtn = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 4. Konfigurasi Partikel Background (tsParticles)
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: window.innerWidth < 900 ? 30 : 70, density: { enable: true, value_area: 800 } },
            color: { value: ["#fbc02d", "#d32f2f"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.5, direction: "none", random: true, outModes: "out" }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: { enable: !isMobile, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 150, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
});
