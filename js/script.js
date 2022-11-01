//burger menu***************************************************
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.hamburger-window');

menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
})
//*********************************************************************** */

//gallery***********************************************************
const cards = Array.from(document.querySelectorAll(".gallery__card"));
const gallerySlider = document.querySelector(".gallery-slider");
const sliderContainer = document.querySelector(".slider__container");
const picture = Array.from(document.querySelectorAll(".gallery__card__pic"));
const sliderBtnLeft = document.querySelector(".slider__btn_left");
const sliderBtnRight = document.querySelector(".slider__btn_right");
const sliderClose = document.querySelector(".slider__close");

let cardIndex = -1;
let pictureFull;

for (const card of cards) {
    card.addEventListener("click", (event) => {
        event.preventDefault();
        cardIndex = cards.indexOf(card);
        pictureFull = picture[cardIndex].cloneNode();
        pictureFull.style.objectFit = "contain";
        sliderContainer.append(pictureFull);
        gallerySlider.classList.add("active");
    });
}

sliderBtnLeft.addEventListener("click", (event) => {
    event.preventDefault();
    changePicture("left");
});

sliderBtnRight.addEventListener("click", (event) => {
    event.preventDefault();
    changePicture("right");
});

function changePicture(dir) {
    if (dir === "left") {
        if (cardIndex > 0) {
            cardIndex--;
        } else {
            cardIndex = cards.length - 1;
        }
    } else if (dir === "right") {
        if (cardIndex < cards.length - 1) {
            cardIndex++;
        } else {
            cardIndex = 0;
        }
    }
    let newPictureFull = picture[cardIndex].cloneNode();
    newPictureFull.style.objectFit = "contain";
    pictureFull.replaceWith(newPictureFull);
    pictureFull = newPictureFull;
}

sliderClose.addEventListener("click", (event) => {
    event.preventDefault();
    gallerySlider.classList.remove("active");
    pictureFull.remove();
    newPictureFull.remove();
});
//gallery end*****************************************************************

// стрелка возврата
function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('back_to_top-show');
    } else {
        goTopBtn.classList.remove('back_to_top-show');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
let goTopBtn = document.querySelector('.back_to_top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
// стрелка возврата**************************************************


//slider********************************************************************
const images = document.querySelectorAll('.slider .slider-line figure img');
const sliderLine = document.querySelector('.slider-line');
let count = 0;
let width;


function init() {
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
    rollSlider();
}

window.addEventListener('resize', init);
init();

document.querySelector('.slider-prev').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});

document.querySelector('.slider-next').addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
});

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}
//slider********************************************************************

//button подробнее************************************************************
let btns = document.querySelectorAll(".table-btn__text");
btns.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.closest('.table-flex__block').querySelector('.table-flex__block-item2').classList.toggle("block-item2-active");

    })
})
//button подробнее************************************************************

//карусель................................................................................................
function Ant(crslId) {

    let id = document.getElementById(crslId);
    if (id) {
        this.crslRoot = id
    }
    else {
        this.crslRoot = document.querySelector('.ant-carousel')
    };

    // Carousel objects
    this.crslList = this.crslRoot.querySelector('.ant-carousel-list');
    this.crslElements = this.crslList.querySelectorAll('.ant-carousel-element');
    this.crslElemFirst = this.crslList.querySelector('.ant-carousel-element');
    this.leftArrow = this.crslRoot.querySelector('.ant-carousel-arrow-left');
    this.rightArrow = this.crslRoot.querySelector('.ant-carousel-arrow-right');

    // Initialization
    this.options = Ant.defaults;
    Ant.initialize(this)
};

Ant.defaults = {

    // Default options for the carousel
    elemVisible: 3, // Кол-во отображаемых элементов в карусели
    loop: true,     // Бесконечное зацикливание карусели 
    auto: true,     // Автоматическая прокрутка
    interval: 5000, // Интервал между прокруткой элементов (мс)
    speed: 750,     // Скорость анимации (мс)
    touch: true,    // Прокрутка  прикосновением
    arrows: true,   // Прокрутка стрелками
};

Ant.prototype.elemPrev = function (num) {
    num = num || 1;

    if (this.options.dots) this.dotOn(this.currentElement);
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.dotsVisible - 1;
    if (this.options.dots) this.dotOff(this.currentElement);

    if (!this.options.loop) {  // сдвиг вправо без цикла
        this.currentOffset += this.elemWidth * num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if (this.currentElement == 0) {
            this.leftArrow.style.display = 'none'; this.touchPrev = false
        }
        this.rightArrow.style.display = 'block'; this.touchNext = true
    }
    else {                    // сдвиг вправо с циклом
        let elm, buf, this$ = this;
        for (let i = 0; i < num; i++) {
            elm = this.crslList.lastElementChild;
            buf = elm.cloneNode(true);
            this.crslList.insertBefore(buf, this.crslList.firstElementChild);
            this.crslList.removeChild(elm)
        };
        this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
        let compStyle = window.getComputedStyle(this.crslList).marginLeft;
        this.crslList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
        this.crslList.style.marginLeft = '0px';
        setTimeout(function () {
            this$.crslList.style.cssText = 'transition:none;'
        }, this.options.speed)
    }
};

Ant.prototype.elemNext = function (num) {
    num = num || 1;

    if (this.options.dots) this.dotOn(this.currentElement);
    this.currentElement += num;
    if (this.currentElement >= this.dotsVisible) this.currentElement = 0;
    if (this.options.dots) this.dotOff(this.currentElement);

    if (!this.options.loop) {  // сдвиг влево без цикла
        this.currentOffset -= this.elemWidth * num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if (this.currentElement == this.dotsVisible - 1) {
            this.rightArrow.style.display = 'none'; this.touchNext = false
        }
        this.leftArrow.style.display = 'block'; this.touchPrev = true
    }
    else {                    // сдвиг влево с циклом
        let elm, buf, this$ = this;
        this.crslList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
        this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
        setTimeout(function () {
            this$.crslList.style.cssText = 'transition:none;';
            for (let i = 0; i < num; i++) {
                elm = this$.crslList.firstElementChild;
                buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
                this$.crslList.removeChild(elm)
            };
            this$.crslList.style.marginLeft = '0px'
        }, this.options.speed)
    }
};

Ant.initialize = function (that) {

    // Constants
    that.elemCount = that.crslElements.length; // Количество элементов
    let elemStyle = window.getComputedStyle(that.crslElemFirst);
    that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
        parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

    // Variables
    that.currentElement = 0; that.currentOffset = 0;
    that.touchPrev = true; that.touchNext = true;
    let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let fnTime = getTime();
            if (fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };

    // Start initialization
    if (that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
        that.options.auto = false; that.options.touch = false;
        that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if (!that.options.loop) {       // если нет цикла - уточнить количество точек
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.touchPrev = false;    // отключить прокрутку прикосновением вправо
        that.options.auto = false; // отключить автопркрутку
    }
    else if (that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.crslList.addEventListener('mouseenter', function () {
            clearInterval(that.autoScroll)
        }, false);
        that.crslList.addEventListener('mouseleave', setAutoScroll, false)
    };

    if (that.options.touch) {   // инициализация прокрутки прикосновением
        that.crslList.addEventListener('touchstart', function (e) {
            xTouch = parseInt(e.touches[0].clientX);
            yTouch = parseInt(e.touches[0].clientY);
            stTime = getTime()
        }, false);
        that.crslList.addEventListener('touchmove', function (e) {
            if (!xTouch || !yTouch) return;
            xDiff = xTouch - parseInt(e.touches[0].clientX);
            yDiff = yTouch - parseInt(e.touches[0].clientY);
            mvTime = getTime();
            if (Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
                stTime = 0;
                if (that.touchNext && xDiff > 0) {
                    bgTime = mvTime; that.elemNext()
                }
                else if (that.touchPrev && xDiff < 0) {
                    bgTime = mvTime; that.elemPrev()
                }
            }
        }, false)
    };

    if (that.options.arrows) {  // инициализация стрелок
        if (!that.options.loop) that.crslList.style.cssText =
            'transition:margin ' + that.options.speed + 'ms ease;';
        that.leftArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemNext()
            }
        }, false)
    }
    else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
    };
};

new Ant();
//карусель................................................................................................




//slider2******************************************************************** 
const images2 = document.querySelectorAll('.slider2 .slider-line2 figure img');
const sliderLine2 = document.querySelector('.slider-line2');
let count2 = 0;
let width2;


function init2() {
    width2 = document.querySelector('.slider2').offsetWidth;
    sliderLine2.style.width = width2 * images.length + 'px';
    images2.forEach(item => {
        item.style.width = width2 + 'px';
        item.style.height = 'auto';
    });
    rollSlider2();
}

window.addEventListener('resize', init2);
init2();

document.querySelector('.slider-prev2').addEventListener('click', function () {
    count2--;
    if (count2 < 0) {
        count2 = images.length - 1;
    }
    rollSlider2();
});

document.querySelector('.slider-next2').addEventListener('click', function () {
    count2++;
    if (count2 >= images.length) {
        count2 = 0;
    }
    rollSlider2();
});

function rollSlider2() {
    sliderLine2.style.transform = 'translate(-' + count2 * width2 + 'px)';
}
//slider2********************************************************************



