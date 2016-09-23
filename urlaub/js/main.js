/* Copyright Alex Tranchenko 2016*/
'use strict';
// Slider
var Slider = (function () {
    function Slider(slideEl, manageEl) {
        this.index = 0;
        this.slideEl = slideEl;
        this.manageEl = manageEl;
    }
    Slider.prototype.circle = function (beginIndex) {
        this.itemAmount = this.slideEl.length;
        if (beginIndex || beginIndex === 0)
            this.index = beginIndex;
        var currItem = this.slideEl[this.index];
        for (this.i = 0; this.i < this.itemAmount; this.i++) {
            this.slideEl[this.i].style.display = 'none';
        }
        currItem.style.display = 'inline-block';
    };
    Slider.prototype.counter = function (step) {
        if (step === void 0) { step = 1; }
        if (step) {
            this.index++;
            if (this.index > this.itemAmount - 1)
                this.index = 0;
        }
        else {
            this.index--;
            if (this.index < 0)
                this.index = this.itemAmount - 1;
        }
        this.circle(this.index);
    };
    Slider.prototype.autoSlide = function () {
        this.setDelay = 0;
        this.autoInt = setInterval(this.counter.bind(this), 2000);
    };
    Slider.prototype.thisPoint = function (event) {
        var step, j, max, el = event.target || event.srcElement;
        if (!el.getAttribute('id')) {
            for (j = 0, max = el.parentNode.children.length; j < max; j++) {
                if (el.parentNode.children[j] === el)
                    step = j;
            }
        }
        clearInterval(this.autoInt);
        if (!this.setDelay)
            this.setDelay = setTimeout(this.autoSlide.bind(this), 7000);
        this.counter(step);
    };
    return Slider;
}());
// Launch Sliders function
var LaunchSliders = (function () {
    function LaunchSliders(arr) {
        this.arr = arr;
    }
    LaunchSliders.prototype.addEvLisner = function () {
        var _a = this.arr, slide = _a[0], arrow = _a[1], parentsArrow = _a[2];
        var slideEl = document.querySelectorAll(slide);
        var mE = document.querySelectorAll(arrow);
        var slider__arrow = document.getElementById(parentsArrow);
        this.s = new Slider(slideEl, mE, slider__arrow);
        this.s.autoSlide();
        if (slider__arrow.addEventListener) {
            slider__arrow.addEventListener('click', this.s.thisPoint.bind(this.s), false);
        }
        else {
            slider__arrow.attachEvent('onclick', this.s.thisPoint.bind(this.s));
        }
    };
    return LaunchSliders;
}());
// Finder for section Ideas
var ImgFinder = (function () {
    function ImgFinder(inputEl) {
        this.inputEl = inputEl;
        var API_KEY = '3122794-bfbc09f56912ec12a2f9a0cab';
        this.url = "https://pixabay.com/api/?key=" + API_KEY + "&image_type=photo&per_page=7&min_height=310&q=";
        this.urlRetina = "https://pixabay.com/api/?key=" + API_KEY + "&image_type=photo&per_page=7&min_height=620&q=";
    }
    ImgFinder.genTpl = function (obj) {
        var out = document.getElementById('out'), gridItem = document.querySelectorAll('.grid-item'), gridTxt = document.querySelectorAll('.grid__txt');
        for (var i = 0; i < obj.length; i++) {
            var _a = i, _b = obj[_a], webformatURL = _b.webformatURL, user = _b.user;
            gridItem[i].style.backgroundImage = "url(" + webformatURL + ")";
            gridTxt[i].innerHTML = "Posted: " + user;
        }
    };
    ;
    ImgFinder.prototype.query = function () {
        return document.getElementById(this.inputEl).value;
    };
    ;
    ImgFinder.prototype.isRetina = function () {
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    };
    ImgFinder.prototype.loadDoc = function () {
        var xhttp = null;
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    var data = JSON.parse(xhttp.responseText);
                    ImgFinder.genTpl(data.hits);
                }
            };
            if (this.isRetina()) {
                xhttp.open("GET", "" + this.urlRetina + encodeURIComponent(this.query()), true);
            }
            else {
                xhttp.open("GET", "" + this.url + encodeURIComponent(this.query()), true);
            }
            xhttp.send();
        }
        else if (!xhttp) {
            return;
        }
    };
    ;
    return ImgFinder;
}());
window.onload = function () {
    //Slider
    var sl1 = ['.slider__1_slide', '.slider__1_arrow', 'slider__1_arrows'], sl2 = ['.slider__2_slide', '.slider__2_arrow', 'slider__2_arrows'], sl3 = ['.slider__3_slide', '.slider__3_arrow', 'slider__3_arrows'];
    var s1 = new LaunchSliders(sl1);
    s1.addEvLisner();
    var s2 = new LaunchSliders(sl2);
    s2.addEvLisner();
    var s3 = new LaunchSliders(sl3);
    s3.addEvLisner();
    //ImgFinder
    var e = document.getElementById('search__partners');
    var inputQuery = document.getElementById('search__query');
    if (inputQuery.attachEvent) {
        inputQuery.attachEvent('onkeydown', function (ev) {
            var keyCode = (window.event) ? ev.which : ev.keyCode;
            if (keyCode === 13)
                return false;
            console.log(keyCode);
        });
    }
    var f = new ImgFinder('search__query');
    f.loadDoc();
    if (e.addEventListener) {
        e.addEventListener('click', function (ev) {
            ev.preventDefault();
            f.loadDoc();
        });
    }
    else {
        e.attachEvent('onclick', function (ev) {
            ev.returnValue = false;
            f.loadDoc();
        });
    }
};
//# sourceMappingURL=main.js.map