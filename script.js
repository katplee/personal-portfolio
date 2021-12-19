// Game nav bar fade
const slideshow = document.querySelector(".slideshow-container");
const gameNav = document.querySelector('.games-nav-wrapper');

const appearOptions = {
    threshold : 1
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry=> {
        if(!entry.isIntersecting){
            gameNav.classList.remove("show");
        }else {
            gameNav.classList.add("show");
        }
    });
}, appearOptions);

appearOnScroll.observe(slideshow);

//Media selection
const mainMedia = document.querySelector(".main-media-container");
const otherMedia = document.querySelectorAll('.other-media-wrapper');

otherMedia.forEach(medium =>{
    medium.addEventListener("click", ()=>{
        mainMedia.childNodes[1].src = medium.childNodes[1].src;
    });
})