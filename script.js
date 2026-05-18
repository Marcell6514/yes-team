document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Logika Kursor Interaktif ---
    const cursor = document.getElementById('custom-cursor');
    const interactives = document.querySelectorAll('.interactive');

    // Kursor mengikuti pergerakan mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Menambah efek besar saat kursor di atas elemen yang bisa diklik
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });


    // --- 2. Logika Navigasi (Ganti Halaman Tanpa Reload) ---
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const pages = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah browser scroll ke atas

            // Ambil ID target dari atribut data-target
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            // Hapus class active dari semua menu dan halaman
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Tambahkan class active ke menu yang diklik dan halaman yang dituju
            item.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });


    // --- 3. Konfigurasi Partikel (Membutuhkan koneksi internet untuk tsParticles) ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80, // Jumlah partikel
                density: { enable: true, value_area: 800 }
            },
            color: { value: ["#fbc02d", "#d32f2f", "#ffffff"] }, // Warna: Emas, Merah, Putih
            shape: { type: "circle" },
            opacity: {
                value: 0.6,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: { enable: true, mode: "grab" }, // Efek garis saat dihover
                onClick: { enable: true, mode: "push" }, // Tambah partikel saat diklik
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

});