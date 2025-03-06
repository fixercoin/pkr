     const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const promoBanner = document.getElementById('promo-banner');
    const closeBanner = document.getElementById('close-banner');

    // Menú móvil
    menuButton.addEventListener('click', () => {
      menuButton.classList.toggle('active');
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    // Cerrar banner
    closeBanner.addEventListener('click', () => {
      promoBanner.style.transform = 'translateY(-100%)';
      promoBanner.style.opacity = '0';
      setTimeout(() => {
        promoBanner.remove();
        document.querySelector('main').classList.remove('pt-40');
        document.querySelector('main').classList.add('pt-32');
      }, 300);
    });

    // Efecto de scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      const scrollY = window.scrollY;
      
      header.style.backdropFilter = scrollY > 100 ? 'blur(16px)' : 'blur(8px)';
      header.style.backgroundColor = scrollY > 100 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)';
    });

    // Inicializar efecto de blur dinámico
    const header = document.querySelector('header');
    header.style.transition = 'backdrop-filter 0.3s ease, background-color 0.3s ease';
