// REMEMBER 
//----------------------
// The insertAdjacentElement() method inserts a given element node at a given position relative to the element it is invoked upon.
//-----------------------

(() => {

    const mobileWidth = 680;

    const addMenuBg = () => {
        const pageWidth = window.innerWidth;
        const bodyOffset = document.body.scrollTop || document.documentElement.scrollTop;
        const nav = document.querySelector('header nav');

        if(pageWidth > mobileWidth) {
            bodyOffset > 0 ? nav.classList.add('aw-nav-fixed') : nav.classList.remove('aw-nav-fixed');
        }
        
    }

    const reorderResponsiveMenu = () => {
        const pageWidth = window.innerWidth;
        const navContainer = document.querySelector('header nav .aw-container');
        const navigation = document.querySelector('header nav .aw-navigation');
        const mobileNavigation = document.querySelector('body > .aw-navigation');

        if(pageWidth <= mobileWidth && navigation) {
            document.body.insertAdjacentElement('afterbegin', navigation);
        } else if (pageWidth > mobileWidth && mobileNavigation) {
            navContainer.insertAdjacentElement('beforeend', mobileNavigation);
        }
        
    }

    const mobileMenuToggle = () => {
        const mobileMenuToggle = document.querySelector('.aw-nav-toggle');
        mobileMenuToggle.addEventListener('click', () => {
            const mobileNavigation = document.querySelector('body > .aw-navigation');

            mobileNavigation.classList.toggle('aw-navigation-opened');
        });
    }

    const onNavItemClick = () => {
        const navItemList = document.querySelectorAll('.aw-section-link');
        const navItems = [...navItemList];

        navItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();

                const sectionId = e.target.getAttribute("href") || event.target.dataset.href;
                
                scrollToSection(sectionId);
            });
        });
        
    }

    const scrollToSection = sectionId => {

        let sectionPosition, sectionOffset;
        const navigationHeight = document.querySelector('header nav').offsetHeight;
        const pageWidth = window.innerWidth;

        if(sectionId !== '#') {
            sectionOffset = document.querySelector(sectionId).offsetTop;
            sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;
        } else {    
            sectionPosition = 0;
        }

        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': sectionPosition
        })
    }

    const sliderTestimonial = () => {
        let firstChild, lastChild;
        const prevArrow = document.querySelector('#aw-testimonials-prev');
        const nextArrow = document.querySelector('#aw-testimonials-next');
        const testimonials = document.querySelector('.aw-testimonials ul');

        document.addEventListener('click', (e) => {
            if(e.target === prevArrow) {
                lastChild = testimonials.lastElementChild;
                testimonials.insertAdjacentElement('afterbegin', lastChild);
            } else if (e.target === nextArrow) {
                firstChild = testimonials.firstElementChild;
                testimonials.insertAdjacentElement('beforeend', firstChild);
            }
        });
    }

    const onGalleryImageClick = () => {
        const galleryImgList = document.querySelectorAll('#aw-gallery li');
        const galleryImages = [...galleryImgList];

        galleryImages.forEach(img => {
            img.addEventListener('click', e => {
                galleryImgOpen(e.target);
            });
        })
    }

    const galleryImgOpen = img => {
        const imgSrc = img.getAttribute('src');
        const openedImage = `<div class='aw-backdrop'><img src="${imgSrc}" alt=''/><span class="aw-backdrop-close">X</span></div>`;
        
        document.body.insertAdjacentHTML('beforeend', openedImage);
        galleryImgClose();
    }

    const galleryImgClose = () => {

        const closeBtn = document.querySelector('.aw-backdrop-close');

        closeBtn.addEventListener('click', () => {
            const backdrop = document.querySelector('.aw-backdrop');
            backdrop.remove();
        });
    }

    window.addEventListener('scroll', () => {
        addMenuBg();
    });

    window.addEventListener('resize', () => {
        reorderResponsiveMenu();
    });


    reorderResponsiveMenu();
    onNavItemClick();
    sliderTestimonial();
    onGalleryImageClick();
    mobileMenuToggle();

})();
