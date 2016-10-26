/* Copyright Alex Tranchenko 2016*/
'use strict';
// Slider
var Slider = (function () {
    function Slider() {
        this.index = 0;
    }
    Slider.prototype.circle = function (beginIndex) {
        var items = document.getElementsByClassName('slider__slide'), pointsDiv = document.getElementsByClassName('slider__point_act');
        this.itemAmount = items.length;
        if (beginIndex || beginIndex === 0)
            this.index = beginIndex;
        var currItem = items[this.index];
        var currPoint = pointsDiv[this.index];
        for (this.i = 0; this.i < this.itemAmount; this.i++) {
            items[this.i].style.display = 'none';
            pointsDiv[this.i].style.display = 'none';
        }
        currItem.style.display = 'inline-block';
        currPoint.style.display = 'inline-block';
    };
    Slider.prototype.counter = function () {
        this.circle();
        this.index++;
        if (this.index > this.itemAmount - 1)
            this.index = 0;
    };
    Slider.prototype.autoSlide = function () {
        this.setDelay = 0;
        this.autoInt = setInterval(this.counter.bind(this), 2000);
    };
    Slider.prototype.thisPoint = function (event) {
        var index, el = event.target;
        if (!el.getAttribute('id')) {
            for (var j = 0, max = el.parentNode.children.length; j < max; j++) {
                if (el.parentNode.children[j] === el)
                    index = j;
            }
        }
        clearInterval(this.autoInt);
        if (!this.setDelay)
            this.setDelay = setTimeout(this.autoSlide.bind(this), 7000);
        this.circle(index);
    };
    return Slider;
}());
// Accordion
var Accordion = (function () {
    function Accordion(obj) {
        (this.targetClasses = obj.targetClasses, this.mainEl = obj.mainEl, this.mainElClass = obj.mainElClass, this.mainElClassAct = obj.mainElClassAct, obj);
    }
    Accordion.prototype.rmClass = function () {
        for (var k = 0; k < this.mainEl.length; k++) {
            this.mainEl[k].className = this.mainElClass;
        }
    };
    Accordion.prototype.treeMaker = function (e) {
        var path = [];
        var node = e.target;
        while (node != document.body) {
            path.push(node);
            node = node.parentNode;
        }
        return path;
    };
    Accordion.prototype.classHandler = function (e) {
        var path = this.treeMaker(e);
        for (var k = 0; k < path.length; k++) {
            if (path[k].className === this.mainElClassAct) {
                path[k].className = this.mainElClass;
                this.rmClass();
            }
            else if (path[k].className === this.mainElClass) {
                this.rmClass();
                path[k].className = this.mainElClassAct;
            }
        }
    };
    Accordion.prototype.eHandler = function (e) {
        for (var k = 0; k < this.targetClasses.length; k++) {
            if (e.target.className === this.targetClasses[k]) {
                this.classHandler(e);
            }
        }
    };
    return Accordion;
}());
window.onload = function () {
    //Slider
    var s = new Slider();
    s.autoSlide();
    var slider__points = document.getElementById('slider__points');
    if (slider__points.addEventListener) {
        slider__points.addEventListener('click', s.thisPoint.bind(s), false);
    }
    else {
        slider__points.attachEvent('onclick', s.thisPoint.bind(s));
    }
    //Accordion
    var mainEl = document.getElementsByClassName('banners__accordion');
    var obj = {
        targetClasses: ['banners__accordion_header', 'banners__accordion_name'],
        mainEl: mainEl,
        mainElClass: 'banners__accordion',
        mainElClassAct: 'banners__accordion banners__accordion_act'
    };
    var a = new Accordion(obj);
    document.getElementById('banners').addEventListener('click', a.eHandler.bind(a), false);
};
//# sourceMappingURL=main.js.map