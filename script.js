const btn = document.getElementById("changerBtn");

const icon = document.getElementById("changerIcon");

const icony = document.getElementById("mobile-menu-button");

// Sound to play when the changer button is pressed

const changerSound = new Audio('src/ogg.mp3');

changerSound.preload = 'auto';

// Sound to play when any main nav button is clicked (four buttons)

const navSound = new Audio('src/ogg.mp3');

navSound.preload = 'auto';

// dbhhdhed

const xSound = new Audio('src/ogg.mp3');

xSound.preload = 'auto';



// load saved mode

let dark = localStorage.getItem("site-theme") === "dark";

const aboutMe = document.getElementById("aboutme")
const linkMe = "https://mannooma10k.github.io/Info/AboutMe"
const phoneMe = document.getElementById("phoneMe")
aboutMe.addEventListener('click', function() {
    window.location.href = linkMe;
});
phoneMe.addEventListener('click', function() {
    window.location.href = linkMe;
});

// apply saved mode on load

applyTheme();



btn.addEventListener("click", () => {

    // play sound (reset to start so repeated clicks replay)

    try {

        changerSound.currentTime = 0;

        changerSound.play().catch(() => {});

    } catch (e) {

        // ignore playback errors (e.g., file missing)

    }

    



    dark = !dark;

    localStorage.setItem("site-theme", dark ? "dark" : "light");

    applyTheme();

});





function applyTheme() {

    if (dark) {

        document.body.style.transition = "background 0.5s ease";

        document.body.style.backgroundColor = "#000000";

        document.body.style.backgroundImage = "radial-gradient(white 2px, transparent 0)";

        document.body.classList.remove("light-mode");

        document.body.classList.remove("ddc");

        document.body.classList.remove("ddc1");

        document.body.classList.remove("ddb");

        document.body.classList.remove("ddb1")

        document.body.classList.add("ddr");

        icon.className = "fa-solid fa-sun";

        icon.style.color = "white";

        icony.style.color = "white";

    } else {

        document.body.style.transition = "background 0.5s ease";

        document.body.style.backgroundColor = "#ff6200";

        document.body.style.backgroundImage = "radial-gradient(black 2px, transparent 0)";

        document.body.classList.add("light-mode");

        document.body.classList.add("ddc");

        document.body.classList.add("ddc1");

        document.body.classList.add("ddb")

        document.body.classList.add("ddb1");

        icon.className = "fa-solid fa-moon";

        icon.style.color = "white";

        icony.style.color = "#ff6200";

    }

}

             // Reload when title clicked



             const reloadTextElement = document.getElementById('reload');



             reloadTextElement.addEventListener('click', function() {



                location.reload();



        });



// Mobile menu toggle behavior

 (function() {

            const menuButton = document.getElementById('mobile-menu-button');

            const mobileMenu = document.getElementById('mobile-menu');

            const closeButton = document.getElementById('mobile-menu-close'); // NEW: Get the close button

            // don't bail out just because the close button isn't present — make it optional

            if (!menuButton || !mobileMenu) return;



            function openMenu() {

                mobileMenu.classList.add('active');

                mobileMenu.setAttribute('aria-hidden', 'false');

                // move focus to first button for accessibility

                const first = mobileMenu.querySelector('.mobile-nav .nav-button');

                if (first) first.focus();

            }



            function closeMenu() {

                mobileMenu.classList.remove('active');

                mobileMenu.setAttribute('aria-hidden', 'true');

                menuButton.focus();

            }

            

            // Helper to detect a touch device

            function isTouchDevice() {

                return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

            }



            menuButton.addEventListener('click', (e) => {

                e.stopPropagation();

                try { xSound.currentTime = 0; xSound.play().catch(() => {}); } catch (err) {}

                if (mobileMenu.classList.contains('active')) closeMenu(); else openMenu();

            });

            

            // NEW: Event listener for the close 'X' button (only if present)

            if (closeButton) closeButton.addEventListener('click', closeMenu);



            // Modify overlay click behavior

            mobileMenu.addEventListener('click', (e) => {

                // Only trigger if the click is on the overlay background, not the inner menu

                if (e.target === mobileMenu) {

                    if (isTouchDevice()) {

                        // On mobile/touch: Navigate to index.html

                        window.location.href = 'index.html';

                    } else {

                        // On PC/Desktop: Close the menu

                        closeMenu();

                    }

                }

            });



            // Close on Escape

            document.addEventListener('keydown', (e) => {

                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMenu();

            });

            

            // Close when selecting a mobile nav button

            const mobileNavButtons = mobileMenu.querySelectorAll('.mobile-nav .nav-button');

            mobileNavButtons.forEach(btn => btn.addEventListener('click', () => closeMenu()));

        })();



        // Navigation button behavior:



        // - Make the first nav button (MY-ADDONS) active on load



        // - Clicking the already-active button does nothing (prevents unpressing)



        // - Clicking another button switches the active state



        (function() {



            const navButtons = document.querySelectorAll('.main-nav .nav-button');

            const mobileNavButtons = document.querySelectorAll('.mobile-nav .nav-button');

            const postsContainer = document.querySelector('.posts');

            const newsContainer = document.querySelector('.news-posts');

            const otherContainer = document.querySelector('.other-posts');

            const socialContainer = document.querySelector('.social-posts');

            const socialOverlay = document.querySelector('.social-overlay');



            if (!navButtons || navButtons.length === 0) return;



            // helper to show/hide social view with transitions

            function showSocial(show) {

                console.log('showSocial enter', show, {postsContainer: !!postsContainer, socialContainer: !!socialContainer, socialOverlay: !!socialOverlay});

                if (!postsContainer || !socialContainer || !socialOverlay) {

                    console.log('showSocial early return - missing containers');

                    return;

                }

                if (show) {

                    // hide news if visible

                    if (newsContainer) showNews(false);

                    postsContainer.classList.add('dimmed');

                    socialOverlay.classList.add('active');

                    socialOverlay.setAttribute('aria-hidden', 'false');

                    // prevent body from scrolling while overlay is open

                    try { document.body.classList.add('no-scroll'); } catch (e) {}

                    console.log('showSocial applied show: socialOverlay active=', socialOverlay.classList.contains('active'), 'body no-scroll=', document.body.classList.contains('no-scroll'));

                } else {

                    postsContainer.classList.remove('dimmed');

                    socialOverlay.classList.remove('active');

                    socialOverlay.setAttribute('aria-hidden', 'true');

                    try { document.body.classList.remove('no-scroll'); } catch (e) {}

                    console.log('showSocial applied hide: socialOverlay active=', socialOverlay.classList.contains('active'));

                }

            }



            // helper to show/hide news posts with a small transition

            function showNews(show) {

                console.log('showNews enter', show, {postsContainer: !!postsContainer, newsContainer: !!newsContainer});

                if (!postsContainer || !newsContainer) {

                    console.log('showNews early return - missing containers');

                    return;

                }

                // ensure social overlay is closed when showing news

                if (show && socialOverlay) {

                    socialOverlay.classList.remove('active');

                    socialOverlay.setAttribute('aria-hidden', 'true');

                }



                if (show) {

                    // ensure body scrolling is enabled for normal content

                    try { document.body.classList.remove('no-scroll'); } catch (e) {}

                    // animate posts out

                    postsContainer.classList.add('fade-transition');

                    postsContainer.classList.add('fade-out');

                    setTimeout(() => {

                        postsContainer.style.display = 'none';

                        // show news

                        newsContainer.style.display = 'grid';

                        newsContainer.classList.add('fade-transition');

                        // start hidden then show

                        newsContainer.classList.remove('fade-out');

                        newsContainer.classList.add('visible');

                        newsContainer.setAttribute('aria-hidden', 'false');

                        // cleanup after transition

                        setTimeout(() => {

                            postsContainer.classList.remove('fade-transition');

                            console.log('showNews completed show: posts hidden, news visible', {postsDisplay: postsContainer.style.display, newsDisplay: newsContainer.style.display});

                        }, 320);

                    }, 280);

                } else {

                    // hide news and reveal posts

                    newsContainer.classList.add('fade-transition');

                    newsContainer.classList.add('fade-out');

                    setTimeout(() => {

                        newsContainer.style.display = 'none';

                        newsContainer.classList.remove('visible');

                        newsContainer.setAttribute('aria-hidden', 'true');

                        // show posts again

                        postsContainer.style.display = 'grid';

                        postsContainer.classList.remove('fade-out');

                        postsContainer.classList.add('visible');

                        postsContainer.setAttribute('aria-hidden', 'false');

                        setTimeout(() => {

                            newsContainer.classList.remove('fade-transition');

                            postsContainer.classList.remove('fade-transition');

                            console.log('showNews completed hide: posts visible, news hidden', {postsDisplay: postsContainer.style.display, newsDisplay: newsContainer.style.display});

                        }, 320);

                    }, 280);

                }

            }



            // helper to show/hide other-addons posts with a small transition

            function showOther(show) {

                console.log('showOther enter', show, {postsContainer: !!postsContainer, otherContainer: !!otherContainer});

                if (!postsContainer || !otherContainer) {

                    console.log('showOther early return - missing containers');

                    return;

                }

                // ensure social overlay is closed when showing other addons

                if (show && socialOverlay) {

                    socialOverlay.classList.remove('active');

                    socialOverlay.setAttribute('aria-hidden', 'true');

                }



                if (show) {

                    // ensure body scrolling is enabled for normal content

                    try { document.body.classList.remove('no-scroll'); } catch (e) {}

                    // animate posts out

                    postsContainer.classList.add('fade-transition');

                    postsContainer.classList.add('fade-out');

                    setTimeout(() => {

                        postsContainer.style.display = 'none';

                        // show other addons

                        otherContainer.style.display = 'grid';

                        otherContainer.classList.add('fade-transition');

                        otherContainer.classList.remove('fade-out');

                        otherContainer.classList.add('visible');

                        otherContainer.setAttribute('aria-hidden', 'false');

                        setTimeout(() => {

                            postsContainer.classList.remove('fade-transition');

                            console.log('showOther completed show: posts hidden, other visible', {postsDisplay: postsContainer.style.display, otherDisplay: otherContainer.style.display});

                        }, 320);

                    }, 280);

                } else {

                    // hide other and reveal posts

                    otherContainer.classList.add('fade-transition');

                    otherContainer.classList.add('fade-out');

                    setTimeout(() => {

                        otherContainer.style.display = 'none';

                        otherContainer.classList.remove('visible');

                        otherContainer.setAttribute('aria-hidden', 'true');

                        // show posts again

                        postsContainer.style.display = 'grid';

                        postsContainer.classList.remove('fade-out');

                        postsContainer.classList.add('visible');

                        postsContainer.setAttribute('aria-hidden', 'false');

                        setTimeout(() => {

                            otherContainer.classList.remove('fade-transition');

                            postsContainer.classList.remove('fade-transition');

                            console.log('showOther completed hide: posts visible, other hidden', {postsDisplay: postsContainer.style.display, otherDisplay: otherContainer.style.display});

                        }, 320);

                    }, 280);

                }

            }



            // Default to the first button (MY-ADDONS)

            const defaultBtn = navButtons[0];

            defaultBtn.classList.add('active');

            // start with addons visible

            showSocial(false);



            function handleNavClick(btn, force = false) {

                console.log('handleNavClick called for:', btn && (btn.textContent||btn.innerText||btn));

                // play nav click sound

                try { navSound.currentTime = 0; navSound.play().catch(() => {}); } catch (e) {}



                if (!force && btn.classList.contains('active')) return;

                const prev = document.querySelector('.main-nav .nav-button.active');

                if (prev) prev.classList.remove('active');

                // make sure main-nav active reflects selection (if mobile used, keep parity)

                // if clicked element is from mobile, also update main-nav active when labels match

                btn.classList.add('active');



                const label = btn.textContent ? btn.textContent.trim().toUpperCase() : '';

                if (label === 'SOCIAL') {

                    showNews(false);

                    showOther(false);

                    showSocial(true);

                } else if (label === 'NEWS') {

                    showSocial(false);

                    showOther(false);

                    showNews(true);

                } else if (label === 'OTHER ADDONS' || label === 'OTHER ADDONS') {

                    // support multiple possible label casings

                    showSocial(false);

                    showNews(false);

                    showOther(true);

                } else if (label === 'MY-ADDONS') {

                    showSocial(false);

                    showNews(false);

                    showOther(false);

                } else {

                    showSocial(false);

                    showNews(false);

                    showOther(false);

                }

                // log post-view states after initiating the change

                try {

                    console.log('handleNavClick end state:', {

                        postsDisplay: postsContainer ? postsContainer.style.display : 'missing',

                        newsDisplay: newsContainer ? newsContainer.style.display : 'missing',

                        otherDisplay: otherContainer ? otherContainer.style.display : 'missing',

                        socialActive: socialOverlay ? socialOverlay.classList.contains('active') : false,

                        bodyNoScroll: document.body.classList.contains('no-scroll')

                    });

                } catch (e) { console.log('handleNavClick end logging failed', e); }

            }



            // expose to global scope so delegated handlers can call it

            try { window.handleNavClick = handleNavClick; } catch (e) {}



            navButtons.forEach(btn => {

                btn.addEventListener('click', () => handleNavClick(btn));

            });



            // Mirror behavior for mobile nav buttons (if present)

            if (mobileNavButtons && mobileNavButtons.length) {

                mobileNavButtons.forEach(mBtn => {

                    mBtn.addEventListener('click', () => {

                        // When a mobile nav button is clicked, make it the only active button

                        try {

                            // remove active from all navs

                            document.querySelectorAll('.main-nav .nav-button').forEach(b => b.classList.remove('active'));

                            document.querySelectorAll('.mobile-nav .nav-button').forEach(b => b.classList.remove('active'));

                            // find matching main nav button

                            const lbl = mBtn.textContent ? mBtn.textContent.trim().toUpperCase() : '';

                            const matching = Array.from(navButtons).find(nb => nb.textContent && nb.textContent.trim().toUpperCase() === lbl);

                            if (matching) matching.classList.add('active');

                            // set mobile button active too

                            mBtn.classList.add('active');

                            // perform the view change — prefer calling with the main button so existing logic behaves

                            handleNavClick(matching || mBtn, true);

                        } catch (e) {

                            // fallback: just call the handler (force)

                            handleNavClick(mBtn, true);

                        }

                            // close the mobile menu after selection

                        const mm = document.getElementById('mobile-menu');

                        if (mm) { mm.classList.remove('active'); mm.setAttribute('aria-hidden','true'); }

                        try { document.body.classList.remove('no-scroll'); } catch (e) {}

                    });

                });

            }



        })();



        // Delegated handler for mobile nav buttons (fallback) — catches clicks that missed individual listeners

        (function() {

            document.addEventListener('click', function delegatedMobileNav(e) {

                const btn = e.target.closest('.mobile-nav .nav-button');

                if (!btn) return;

                console.log('delegated mobile nav click for:', btn.textContent && btn.textContent.trim());

                try {

                    document.querySelectorAll('.main-nav .nav-button').forEach(b => b.classList.remove('active'));

                    document.querySelectorAll('.mobile-nav .nav-button').forEach(b => b.classList.remove('active'));

                    const lbl = btn.textContent ? btn.textContent.trim().toUpperCase() : '';

                    const mainBtns = Array.from(document.querySelectorAll('.main-nav .nav-button'));

                    const matching = mainBtns.find(nb => nb.textContent && nb.textContent.trim().toUpperCase() === lbl);

                    if (matching) matching.classList.add('active');

                    btn.classList.add('active');

                    handleNavClick(matching || btn, true);

                    const mm = document.getElementById('mobile-menu');

                    if (mm) { mm.classList.remove('active'); mm.setAttribute('aria-hidden','true'); }

                    try { document.body.classList.remove('no-scroll'); } catch (e) {}

                } catch (err) { console.error(err); }

            });

        })();







        // Post behavior: open URL when title is clicked and hide icons for that post



        (function() {



            const posts = document.querySelectorAll('.post');



            posts.forEach(post => {



                const title = post.querySelector('.post-title');



                const icons = post.querySelectorAll('.post-actions .icon-btn');



                const url = post.dataset.url;







                if (!title) return;



                title.style.cursor = 'pointer';







                title.addEventListener('click', (e) => {



                    // Hide the icons for this post



                    icons.forEach(ic => ic.style.display = 'none');







                    // Open the URL in a new tab/window if present



                    if (url) {



                        window.open(url, '_blank');



                    }



                });



            });



        })();







        // Interactive star rating behavior with persistence



        (function() {



            const starGroups = document.querySelectorAll('.stars');



            starGroups.forEach((group, idx) => {



                const stars = Array.from(group.querySelectorAll('.star'));



                const post = group.closest('.post');



                // Use post URL if available to make storage key unique, otherwise fallback to index



                const storageKey = post && post.dataset.url ? 'rating:' + post.dataset.url : 'rating:post:' + idx;



                // load saved rating (if any)



                let currentRating = 0;



                try {



                    const saved = localStorage.getItem(storageKey);



                    if (saved !== null) currentRating = parseInt(saved, 10) || 0;



                } catch (e) {



                    // localStorage may be unavailable in some contexts; ignore silently



                }







                function fill(n) {



                    stars.forEach(s => {



                        const v = parseInt(s.dataset.value, 10);



                        if (v <= n) {



                            s.classList.add('filled');



                            s.textContent = '★';



                            s.setAttribute('aria-pressed', 'true');



                        } else {



                            s.classList.remove('filled');



                            s.textContent = '☆';



                            s.setAttribute('aria-pressed', 'false');



                        }



                    });



                }







                stars.forEach(star => {



                    const val = parseInt(star.dataset.value, 10);



                    star.addEventListener('mouseover', () => fill(val));



                    star.addEventListener('focus', () => fill(val));



                    star.addEventListener('mouseout', () => fill(currentRating));



                    star.addEventListener('blur', () => fill(currentRating));



                    star.addEventListener('click', () => {



                        currentRating = val;



                        // store on containing post element as well



                        if (post) post.dataset.rating = currentRating;



                        try {



                            localStorage.setItem(storageKey, String(currentRating));



                        } catch (e) {



                            // ignore storage errors



                        }



                        fill(currentRating);



                    });



                });







                // initialize display with saved rating



                fill(currentRating);



            });



        })();







        // Mobile menu toggle behavior



        (function() {



            const menuButton = document.getElementById('mobile-menu-button');



            const mobileMenu = document.getElementById('mobile-menu');



            if (!menuButton || !mobileMenu) return;







            function openMenu() {



                mobileMenu.classList.add('active');



                mobileMenu.setAttribute('aria-hidden', 'false');



                // move focus to first button for accessibility



                const first = mobileMenu.querySelector('.mobile-nav .nav-button');



                            // play menu open/close sound

                            try { xSound.currentTime = 0; xSound.play().catch(() => {}); } catch (err) {}

                            if (mobileMenu.classList.contains('active')) closeMenu(); else openMenu();



            }







            function closeMenu() {



                mobileMenu.classList.remove('active');



                mobileMenu.setAttribute('aria-hidden', 'true');



                menuButton.focus();



            }







            menuButton.addEventListener('click', (e) => {



                e.stopPropagation();



                // play menu open/close sound (fallback handler)

                try { xSound.currentTime = 0; xSound.play().catch(() => {}); } catch (err) {}



                if (mobileMenu.classList.contains('active')) closeMenu(); else openMenu();



            });







            // Close when clicking the overlay background (but not the inner dialog)



            mobileMenu.addEventListener('click', (e) => {



                if (e.target === mobileMenu) closeMenu();



            });







            // Close on Escape



            document.addEventListener('keydown', (e) => {



                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMenu();



            });







            // Close when selecting a mobile nav button



            const mobileNavButtons = mobileMenu.querySelectorAll('.mobile-nav .nav-button');



            mobileNavButtons.forEach(btn => btn.addEventListener('click', () => closeMenu()));



        })();



        

        // Extra fallback: ensure mobile menu opens on touch devices

        (function() {

            const btn = document.getElementById('mobile-menu-button');

            const menu = document.getElementById('mobile-menu');

            if (!btn || !menu) return;



            function toggleMenu(e) {

                try { e.preventDefault(); } catch (err) {}

                try { e.stopPropagation(); } catch (err) {}

                // play sound

                try { xSound.currentTime = 0; xSound.play().catch(() => {}); } catch (err) {}

                const isActive = menu.classList.toggle('active');

                menu.setAttribute('aria-hidden', isActive ? 'false' : 'true');

                btn.setAttribute('aria-expanded', String(isActive));

                // small visual debug

                console.log('mobile menu toggled via fallback listener:', isActive);

            }



            btn.addEventListener('click', toggleMenu, { passive: false });

            btn.addEventListener('touchstart', toggleMenu, { passive: false });

        })();

      

        // Add close behavior for the social overlay close button and backdrop

        (function() {

            const socialOverlay = document.querySelector('.social-overlay');

            const socialClose = document.getElementById('social-close');

            const socialBackdrop = document.getElementById('socialBackdrop');

            const postsContainer = document.querySelector('.posts');

            if (!socialOverlay || !socialClose || !postsContainer) return;



            function closeSocial() {

                // play close sound (ogg in src/ogg.mp3)

                try { xSound.currentTime = 0; xSound.play().catch(() => {}); } catch (e) {}



                postsContainer.classList.remove('dimmed');

                socialOverlay.classList.remove('active');

                socialOverlay.setAttribute('aria-hidden', 'true');

                try { document.body.classList.remove('no-scroll'); } catch (e) {}



                // Restore main navigation active state to "MY-ADDONS" (desktop + mobile)

                try {

                    const mainBtns = document.querySelectorAll('.main-nav .nav-button');

                    mainBtns.forEach(b => b.classList.remove('active'));

                    const myMain = Array.from(mainBtns).find(b => (b.textContent||'').trim().toUpperCase() === 'MY-ADDONS');

                    if (myMain) myMain.classList.add('active');



                    const mobileBtns = document.querySelectorAll('.mobile-nav .nav-button');

                    mobileBtns.forEach(b => b.classList.remove('active'));

                    const myMobile = Array.from(mobileBtns).find(b => (b.textContent||'').trim().toUpperCase() === 'MY-ADDONS');

                    if (myMobile) myMobile.classList.add('active');

                } catch (e) {

                    // ignore

                }

            }



            socialClose.addEventListener('click', closeSocial);

            if (socialBackdrop) socialBackdrop.addEventListener('click', closeSocial);

        })();

