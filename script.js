const slides = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
const slideInterval = 4000;

let autoSlide = setInterval(nextSlide, slideInterval);

function showSlide(index, direction) {
    slides.forEach((slide) => {
        slide.style.display = 'none';
        slide.classList.remove('slide-in-left', 'slide-in-right', 'active');
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].style.display = 'block';
    indicators[index].classList.add('active');

    if (direction === 'left') {
        slides[index].classList.add('slide-in-left');
    } else if (direction === 'right') {
        slides[index].classList.add('slide-in-right');
    }
    
    slides[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex, 'right');
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex, 'left');
}

nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, slideInterval);
});

prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, slideInterval);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(autoSlide);
        const direction = index > currentIndex ? 'right' : 'left';
        currentIndex = index;
        showSlide(currentIndex, direction);
        autoSlide = setInterval(nextSlide, slideInterval);
    });
});

showSlide(currentIndex);
