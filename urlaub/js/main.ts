/* Copyright Alex Tranchenko 2016*/
'use strict';

// Slider
class Slider{
    protected index: number = 0;
    protected slideEl: any;
    protected manageEl: any;
    protected itemAmount: number;
    protected i: number;
    protected setDelay: number;
    protected autoInt: any;
    constructor(slideEl:any, manageEl:any){
        this.slideEl = slideEl;
        this.manageEl = manageEl
    }
    circle (beginIndex?: number): void {
        this.itemAmount = this.slideEl.length;
        if (beginIndex || beginIndex === 0)this.index = beginIndex;
        let currItem = this.slideEl[this.index];
        for (this.i = 0; this.i < this.itemAmount; this.i++){
            this.slideEl[this.i].style.display = 'none';
        }
        currItem.style.display = 'inline-block';
    }
    counter (step: number = 1) : void {
        if(step) {
            this.index ++;
            if (this.index > this.itemAmount - 1) this.index = 0;
        } else {
            this.index--;
            if(this.index < 0) this.index = this.itemAmount - 1;
        }
        this.circle(this.index);
    }
    autoSlide (): void{
        this.setDelay = 0;
        this.autoInt = setInterval(this.counter.bind(this), 2000);
    }
    thisPoint (event: any): void {
        let step,
            j,
            max,
            el = event.target || event.srcElement;
        if (!el.getAttribute('id')){
            for (j = 0, max = el.parentNode.children.length; j < max; j++){
                if ( el.parentNode.children[j] === el )  step = j;
            }
        }
        clearInterval(this.autoInt);
        if (!this.setDelay) this.setDelay = setTimeout(this.autoSlide.bind(this),7000);
        this.counter(step);
    }
}
class LaunchSliders {
    protected arr: Array<string>;
    s: any;
    constructor(arr: Array<string>) {
        this.arr = arr;
    }
    addEvLisner(): void {
        let[slide, arrow, parentsArrow] = this.arr;
        let slideEl = document.querySelectorAll(slide);
        let mE = document.querySelectorAll(arrow);
        let slider__arrow = document.getElementById(parentsArrow);
        this.s = new Slider(slideEl, mE, slider__arrow);
        this.s.autoSlide();
        if(slider__arrow.addEventListener) {
            slider__arrow.addEventListener('click', this.s.thisPoint.bind(this.s), false);
        } else {
            slider__arrow.attachEvent('onclick', this.s.thisPoint.bind(this.s));
        }
    }
}

class ImgFinder {
    protected url: string;
    protected urlRetina: string;
    protected inputEl: string;
    constructor(inputEl: string){
        this.inputEl = inputEl;
        const API_KEY = '3122794-bfbc09f56912ec12a2f9a0cab';
        this.url = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=7&min_height=310&q=`;
        this.urlRetina = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=7&min_height=620&q=`;
    }
    query():string {
        return document.getElementById(this.inputEl).value;
    };
    isRetina():boolean{
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    }
    genTpl(obj: any): void {
        let out = document.getElementById('out'),
            gridItem = document.querySelectorAll('.grid-item'),
            gridTxt = document.querySelectorAll('.grid__txt');
        for (let i = 0; i < obj.length; i++){
            let {[i]: {webformatURL, user}} = obj;
            gridItem[i].style.backgroundImage = `url(${webformatURL})`;
            gridTxt[i].innerHTML = `Posted: ${user}`;
        }
    };
    loadDoc():void {
        let xhttp = null,
            self = this;
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    let data = JSON.parse(xhttp.responseText);
                    self.genTpl(data.hits);
                    console.log(data.hits);
                }
            };
            if(this.isRetina()) {
                xhttp.open("GET", `${this.urlRetina}${encodeURIComponent(this.query())}`, true);
            } else {
                xhttp.open("GET", `${this.url}${encodeURIComponent(this.query())}`, true);
            }
            xhttp.send();
        } else if (!xhttp) {
            return;
        }
    };
}

window.onload = function () {
    //Slider
    let sl1 = ['.slider__1_slide', '.slider__1_arrow',  'slider__1_arrows'],
        sl2 = ['.slider__2_slide', '.slider__2_arrow', 'slider__2_arrows'],
        sl3 = ['.slider__3_slide', '.slider__3_arrow', 'slider__3_arrows'];
    let s1 = new LaunchSliders(sl1);
    s1.addEvLisner();
    let s2 = new LaunchSliders(sl2);
    s2.addEvLisner();
    let s3 = new LaunchSliders(sl3);
    s3.addEvLisner();
    //ImgFinder
    let e = document.getElementById('search__partners');

    let f = new ImgFinder('search__query');
    f.loadDoc();
    if(e.addEventListener) {
        e.addEventListener('click', (ev) => {
            ev.preventDefault();
            f.loadDoc();
        });
    } else {
        e.attachEvent('onclick', f.loadDoc.bind(f));
    }
};