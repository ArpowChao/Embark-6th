document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation background change on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Smooth Scrolling for Anchor Links (fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 5. Dynamic Countdown & Timeline Logic
    const timelineData = [
        { date: new Date('2026-04-27T00:00:00+08:00'), name: '開放報名與檔案上傳' },
        { date: new Date('2026-05-15T23:59:59+08:00'), name: '報名截止收件' },
        { date: new Date('2026-05-20T12:00:00+08:00'), name: '公告初賽審查時程' },
        { date: new Date('2026-05-27T08:00:00+08:00'), name: '校內實體初賽' },
        { date: new Date('2026-06-01T12:00:00+08:00'), name: '公告入選決賽名單' },
        { date: new Date('2026-06-03T13:00:00+08:00'), name: '決賽檔案繳交截止' },
        { date: new Date('2026-06-22T09:00:00+08:00'), name: '決賽場地預演' },
        { date: new Date('2026-06-29T09:00:00+08:00'), name: '海報決賽與成果展總決賽' },
        { date: new Date('2026-06-30T12:00:00+08:00'), name: '公布獲獎名單' }
    ];

    const currentPhaseEl = document.getElementById('current-phase');
    const timerEl = document.getElementById('countdown-timer');
    const timelineItems = document.querySelectorAll('.timeline-item');

    function updateCountdown() {
        const now = new Date();
        let nextEvent = null;
        let eventIndex = -1;

        // Find the next upcoming future event
        for (let i = 0; i < timelineData.length; i++) {
            if (timelineData[i].date > now) {
                nextEvent = timelineData[i];
                eventIndex = i;
                break;
            }
        }

        // Map the abstract event array logic to the 6 physical HTML timeline nodes
        let activeDomIndex = -1;
        if (eventIndex === 0 || eventIndex === 1) activeDomIndex = 0; // HTML node 0: 報名與檔案上傳
        else if (eventIndex === 2 || eventIndex === 3) activeDomIndex = 1; // HTML node 1: 校內實體初賽
        else if (eventIndex === 4 || eventIndex === 5) activeDomIndex = 2; // HTML node 2: 公布決賽與終繳
        else if (eventIndex === 6) activeDomIndex = 3; // HTML node 3: 場地預演
        else if (eventIndex === 7) activeDomIndex = 4; // HTML node 4: 總決賽
        else if (eventIndex === 8) activeDomIndex = 5; // HTML node 5: 公告獲獎
        else if (eventIndex === -1 && now > timelineData[8].date) activeDomIndex = 6; // All passed

        // Update DOM classes for active and past timeline bubbles
        timelineItems.forEach((item, index) => {
            item.classList.remove('active', 'past');
            if (index < activeDomIndex) {
                item.classList.add('past'); // Greyed out
            } else if (index === activeDomIndex) {
                item.classList.add('active'); // Pulsing orange
            }
        });

        if (nextEvent) {
            currentPhaseEl.innerHTML = `<strong>目前進度：</strong> 等待 ${nextEvent.name}`;
            
            const diff = nextEvent.date - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / 1000 / 60) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            // Using inline flex layout boxes
            timerEl.innerHTML = `
                <div class="time-box">${days.toString().padStart(2, '0')} <span>天</span></div>
                <div class="time-box">${hours.toString().padStart(2, '0')} <span>時</span></div>
                <div class="time-box">${mins.toString().padStart(2, '0')} <span>分</span></div>
                <div class="time-box">${secs.toString().padStart(2, '0')} <span>秒</span></div>
            `;
        } else {
            currentPhaseEl.innerHTML = '第六屆 Embark 啟程已圓滿落幕';
            timerEl.innerHTML = '<div class="time-box">完成 <span>Finish</span></div>';
        }
    }

    if(timerEl && currentPhaseEl) {
        updateCountdown(); // Run immediately
        setInterval(updateCountdown, 1000); // Update every second
    }
});
