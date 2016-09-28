/* Copyright Alex Tranchenko 2016*/
'use strict';
var Slider = (function () {
    function Slider(config) {
        this.index = 0;
        this.slideEl = config.slideEl;
        this.manageEl = config.manageEl;
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
var LaunchSliders = (function () {
    function LaunchSliders(arr) {
        this.arr = arr;
    }
    LaunchSliders.prototype.addEvLisner = function () {
        var _a = this.arr, slide = _a[0], arrow = _a[1], parentsArrow = _a[2];
        var slideEl = document.querySelectorAll(slide);
        var mE = document.querySelectorAll(arrow);
        var slider__arrow = document.getElementById(parentsArrow);
        this.s = new Slider({ slideEl: slideEl, manageEl: mE });
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
// interface Masonry {
//
// }
var MasonryHandler = (function () {
    function MasonryHandler(options) {
        this.options = options;
    }
    MasonryHandler.prototype.crt = function () {
        var _a = this.options, elem = _a.elem, itemSelector = _a.itemSelector, columnWidth = _a.columnWidth, gutter = _a.gutter, percentPosition = _a.percentPosition, isResizable = _a.isResizable, isFitWidth = _a.isFitWidth;
        this.msnr = new Masonry(elem, {
            itemSelector: itemSelector,
            columnWidth: columnWidth,
            gutter: gutter,
            percentPosition: percentPosition,
            isResizable: isResizable
        });
    };
    return MasonryHandler;
}());
var ImgFinder = (function () {
    function ImgFinder(inputEl, masonryConfig) {
        this.inputEl = inputEl;
        this.masonryConfig = masonryConfig;
        var API_KEY = '3122794-bfbc09f56912ec12a2f9a0cab';
        this.url = "https://pixabay.com/api/?key=" + API_KEY + "&image_type=photo&per_page=9&min_height=310&q=";
        this.urlRetina = "https://pixabay.com/api/?key=" + API_KEY + "&image_type=photo&per_page=9&min_height=620&q=";
    }
    ImgFinder.isRetina = function () {
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    };
    ImgFinder.picRatio = function (h, w) {
        return h / w;
    };
    ImgFinder.rm = function (el, exeption) {
        if (el.hasChildNodes()) {
            for (var i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].className !== exeption) {
                    el.removeChild(el.childNodes[i]);
                }
            }
        }
    };
    ;
    ImgFinder.prototype.genTpl = function (obj) {
        var gridItem = document.querySelectorAll('.grid-item'), gridTxt = document.querySelectorAll('.grid__txt'), cw, w;
        for (var i = 0; i < obj.length; i++) {
            var _a = i, _b = obj[_a], webformatURL = _b.webformatURL, user = _b.user, webformatHeight = _b.webformatHeight, webformatWidth = _b.webformatWidth;
            gridItem[i].style.backgroundImage = "url(" + webformatURL + ")";
            cw = gridItem[i].clientWidth;
            w = Math.floor(cw / ImgFinder.picRatio(webformatWidth, webformatHeight)) + "px";
            gridItem[i].style.height = w;
            var m = new MasonryHandler(this.masonryConfig);
            m.crt();
            if (gridTxt[i].hasChildNodes()) {
                ImgFinder.rm(gridTxt[i]);
            }
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode("Posted: " + user));
                gridTxt[i].appendChild(span);
            }
        }
    };
    ;
    ImgFinder.prototype.query = function () {
        return document.getElementById(this.inputEl).value;
    };
    ;
    ImgFinder.prototype.loadDoc = function () {
        var xhttp = null, self = this;
        if (XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    var data = JSON.parse(xhttp.responseText);
                    self.genTpl(data.hits);
                }
            };
            if (ImgFinder.isRetina()) {
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
var LaunchFinder = (function () {
    function LaunchFinder(obj, masonryConfig) {
        this.obj = obj;
        this.masonryConfig = masonryConfig;
    }
    LaunchFinder.prototype.addEvsLs = function () {
        var _a = this.obj, submitEl = _a[0], inputQueryEl = _a[1];
        var submit = document.getElementById(submitEl);
        var inputQuery = document.getElementById(inputQueryEl);
        if (inputQuery.attachEvent) {
            inputQuery.attachEvent('onkeydown', function (event) {
                var e = window.event;
                var keyCode = e.which || e.keyCode;
                if (keyCode === 13)
                    return false;
            });
        }
        var f = new ImgFinder(inputQueryEl, this.masonryConfig);
        f.loadDoc();
        if (submit.addEventListener) {
            submit.addEventListener('click', function (ev) {
                ev.preventDefault();
                f.loadDoc();
            });
        }
        else {
            submit.attachEvent('onclick', function (ev) {
                ev.returnValue = false;
                f.loadDoc();
            });
        }
    };
    return LaunchFinder;
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
    // Masonry
    var masonryConfig = { elem: '.grid', itemSelector: '.grid-item', columnWidth: '.grid-sizer', gutter: 20,
        percentPosition: true, isResizable: true, isFitWidth: true };
    //ImgFinder
    var fData = ['search__partners', 'search__query'];
    var finder = new LaunchFinder(fData, masonryConfig);
    finder.addEvsLs();
};
//# sourceMappingURL=main.js.map