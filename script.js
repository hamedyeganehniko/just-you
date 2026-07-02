        (function(){
            // اسلایدر پیشرفته
            const swiper = new Swiper('.mySwiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                },
                autoplay: { delay: 4000, disableOnInteraction: false }
            });

            // اسکرول انیمیشن فید
            const faders = document.querySelectorAll('.fade-on-scroll');
            const appearOnScroll = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            faders.forEach(el => appearOnScroll.observe(el));

            // سوییچ تم سفید و مشکی با حفظ استایل صورتی
            const toggle = document.getElementById('themeToggle');
            const body = document.body;
            toggle.addEventListener('click', () => {
                body.classList.toggle('light');
                toggle.classList.toggle('active');
                // ذخیره در localStorage برای حس حرفه‌ای
                if(body.classList.contains('light')) localStorage.setItem('theme', 'light');
                else localStorage.setItem('theme', 'dark');
            });
            if(localStorage.getItem('theme') === 'light') {
                body.classList.add('light');
                toggle.classList.add('active');
            } else if(localStorage.getItem('theme') === 'dark') {
                body.classList.remove('light');
                toggle.classList.remove('active');
            }

            // دکمه Reveal نهایی با انیمیشن قوی
            const revealBtn = document.getElementById('finalRevealBtn');
            const finalMsgDiv = document.getElementById('finalMessage');
            revealBtn.addEventListener('click', () => {
                finalMsgDiv.style.display = 'block';
                finalMsgDiv.style.animation = 'fadeUp 0.6s ease';
                // اضافه کردن جلوه پارتیکل تصویری (لذت بصری)
                for(let i=0;i<30;i++) {
                    let particle = document.createElement('div');
                    particle.innerHTML = '<i class="fas fa-heart" style="color:#ff2b6d; font-size:12px;"></i>';
                    particle.style.position = 'fixed';
                    particle.style.left = (revealBtn.getBoundingClientRect().left + revealBtn.clientWidth/2) + 'px';
                    particle.style.top = (revealBtn.getBoundingClientRect().top + revealBtn.clientHeight/2) + 'px';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '9999';
                    particle.style.opacity = '0.8';
                    particle.style.transition = 'all 1.2s ease-out';
                    document.body.appendChild(particle);
                    let xMove = (Math.random() - 0.5) * 200;
                    let yMove = (Math.random() - 0.5) * 180 - 50;
                    setTimeout(() => {
                        particle.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.5)`;
                        particle.style.opacity = '0';
                    }, 10);
                    setTimeout(() => particle.remove(), 1300);
                }
                revealBtn.disabled = true;
                revealBtn.innerText = 'CONFESSION MADE';
            });

            // کاستوم کورسور حرفه‌ای
            const follower = document.querySelector('.cursor-follower');
            const dot = document.querySelector('.cursor-dot');
            document.addEventListener('mousemove', (e) => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 60);
            });
            document.querySelectorAll('a, button, .swiper-slide, .btn-elegant').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    follower.style.width = '54px';
                    follower.style.height = '54px';
                    follower.style.borderColor = '#ff2b6d';
                    follower.style.background = 'rgba(255,43,109,0.05)';
                });
                el.addEventListener('mouseleave', () => {
                    follower.style.width = '32px';
                    follower.style.height = '32px';
                    follower.style.background = 'transparent';
                });
            });
        })();