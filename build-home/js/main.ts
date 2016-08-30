/* Copyright Alex Tranchenko 2016*/
'use strict';

// Slider
class Slider{
    constructor(){
        this.index = 0;
    }
    circle (beginIndex){
        let items = document.getElementsByClassName('slider__slide'),
            pointsDiv = document.getElementsByClassName('slider__point_act');
        this.itemAmount = items.length;
        if (beginIndex || beginIndex === 0)this.index = beginIndex;
        var currItem = items[this.index];
        var currPoint = pointsDiv[this.index];
        for (this.i = 0; this.i < this.itemAmount; this.i++){
            items[this.i].style.display = 'none';
            pointsDiv[this.i].style.display = 'none';
        }
        currItem.style.display = 'inline-block';
        currPoint.style.display = 'inline-block';
    }
    counter () {
        this.circle();
        this.index++;
        if (this.index > this.itemAmount - 1) this.index = 0;
    }
    autoSlide (){
        this.setDelay = 0;
        this.autoInt = setInterval(this.counter.bind(this), 2000);
    }
    thisPoint (event){
        let index,
            el = event.target;
        if (!el.getAttribute('id')){
            for (let j = 0, max = el.parentNode.children.length; j < max; j++){
                if ( el.parentNode.children[j] === el )  index = j;
            }
        }
        clearInterval(this.autoInt);
        if (!this.setDelay) this.setDelay = setTimeout(this.autoSlide.bind(this),7000);
        this.circle(index);
    }
}

// Accordion
class Accordion{
    constructor(obj){
        ({targetClasses: this.targetClasses, mainEl:this.mainEl, mainElClass: this.mainElClass, mainElClassAct: this.mainElClassAct} = obj);
    }
    rmClass(){
        for(let k = 0; k < this.mainEl.length; k++){
            this.mainEl[k].className = this.mainElClass;
        }
    }
    treeMaker(e){
        let path = [];
        let node = e.target;
        while(node != document.body) {
            path.push(node);
            node = node.parentNode;
        }
        return path;
    }
    classHandler(e){
        let path = this.treeMaker(e);
        for(let k = 0; k < path.length; k++){
            if(path[k].className === this.mainElClassAct){
                path[k].className = this.mainElClass;
                this.rmClass();
            } else if(path[k].className === this.mainElClass) {
                this.rmClass();
                path[k].className = this.mainElClassAct;
            }
        }
    }
    eHandler(e){
        for(let k = 0; k < this.targetClasses.length; k++){
            if(e.target.className === this.targetClasses[k]) {
                this.classHandler(e);
            }
        }
    }
}

window.onload = function () {
    //Slider
    let s = new Slider();
    s.autoSlide();
    let slider__points = document.getElementById('slider__points');
    if(slider__points.addEventListener) {
        slider__points.addEventListener('click', s.thisPoint.bind(s), false);
    } else {
        slider__points.attachEvent('onclick', s.thisPoint.bind(s));
    }

//Accordion
    let mainEl = document.getElementsByClassName('banners__accordion');
    let obj = {
        targetClasses: ['banners__accordion_header', 'banners__accordion_name'],
        mainEl: mainEl,
        mainElClass: 'banners__accordion',
        mainElClassAct: 'banners__accordion banners__accordion_act'
    };
    let a = new Accordion(obj);
    document.getElementById('banners').addEventListener('click', a.eHandler.bind(a) , false);
};