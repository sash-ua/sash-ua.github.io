/* Copyright Alex Tranchenko 2016*/
'use strict';

// Slider
interface SliderInput{
    slideEl: NodeListOf<Element>;
    manageEl: NodeListOf<Element>;
}
class Slider{
    private index: number = 0;
    private slideEl;
    private manageEl;
    private itemAmount: number;
    private i: number;
    private setDelay: number;
    private autoInt: number;
    constructor(config: SliderInput){
        this.slideEl = config.slideEl;
        this.manageEl = config.manageEl;
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
// Launch Sliders function
interface HTMLElement {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}
class LaunchSliders {
    private arr;
    private s: Slider;
    constructor(arr: Array<string>) {
        this.arr = arr;
    }
    addEvLisner(): void {
        let[slide, arrow, parentsArrow] = this.arr;
        let slideEl = document.querySelectorAll(slide);
        let mE = document.querySelectorAll(arrow);
        let slider__arrow = document.getElementById(parentsArrow);
        this.s = new Slider({slideEl:slideEl, manageEl:mE});
        this.s.autoSlide();
        if(slider__arrow.addEventListener) {
            slider__arrow.addEventListener('click', this.s.thisPoint.bind(this.s), false);
        } else {
            slider__arrow.attachEvent('onclick', this.s.thisPoint.bind(this.s));
        }
    }
}
// interface Masonry {
//
// }
class MasonryHandler {
    private options;
    public msnr: Object;
    constructor(options: Object) {
        this.options = options;
    }
    crt(){
        let {elem, itemSelector, columnWidth, gutter, percentPosition, isResizable, isFitWidth} = this.options;
        this.msnr = new Masonry( elem, {
            itemSelector: itemSelector,
            columnWidth: columnWidth,
            gutter: gutter,
            percentPosition: percentPosition,
            isResizable: isResizable
        });
    }
}
class ImgFinder {
    protected url: string;
    protected urlRetina: string;
    protected inputEl: string;
    protected masonryConfig: Object;
    constructor(inputEl: string, masonryConfig: Object){
        this.inputEl = inputEl;
        this.masonryConfig = masonryConfig;
        const API_KEY = '3122794-bfbc09f56912ec12a2f9a0cab';
        this.url = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=9&min_height=310&q=`;
        this.urlRetina = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=9&min_height=620&q=`;
    }
    static isRetina():boolean{
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    }
    static picRatio(h: number, w: number): number {
        return h/w;
    }
    static rm(el: any, exeption?: string): void {
        if(el.hasChildNodes()){
            for(let i = 0; i < el.childNodes.length; i++) {
                if(el.childNodes[i].className !== exeption){
                    el.removeChild(el.childNodes[i]);
                }
            }
        }
    };
    genTpl(obj: any): void {
        let gridItem: Object = document.querySelectorAll('.grid-item'),
            gridTxt: Object = document.querySelectorAll('.grid__txt'),
            cw,
            w;
        for (let i = 0; i < obj.length; i++){
            let {[i]: {webformatURL, user, webformatHeight, webformatWidth}} = obj;
            gridItem[i].style.backgroundImage = `url(${webformatURL})`;
            cw = gridItem[i].clientWidth;
            w = `${Math.floor(cw/ImgFinder.picRatio(webformatWidth, webformatHeight))}px`;
            gridItem[i].style.height = w;
            let m = new MasonryHandler(this.masonryConfig);
            m.crt();
            ImgFinder.rm(gridTxt[i]);
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(`Posted: ${user}`));
            span.style.lineHeight = w;
            gridTxt[i].appendChild(span);
        }
    };
    query():string {
        return (<HTMLInputElement>document.getElementById(this.inputEl)).value;
    };
    loadDoc():void {
        let xhttp = null,
            self = this;
        if (XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    let data = JSON.parse(xhttp.responseText);
                    self.genTpl(data.hits);
                }
            };
            if(ImgFinder.isRetina()) {
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

// Add event listners
interface Event {
    which: any;
    keyCode: any;
}
class LaunchFinder {
    private obj;
    protected masonryConfig: Object;
    constructor(obj: string[], masonryConfig: Object){
        this.obj = obj;
        this.masonryConfig = masonryConfig;
    }
    addEvsLs(): void {
        let[submitEl, inputQueryEl] = this.obj;
        let submit: HTMLElement = document.getElementById(submitEl);
        let inputQuery: HTMLElement = document.getElementById(inputQueryEl);
        if(inputQuery.attachEvent){
            inputQuery.attachEvent('onkeydown', (event) => {
                let e = window.event;
                let keyCode = e.which || e.keyCode;
                if (keyCode === 13) return false;
            });
        }
        let f = new ImgFinder(inputQueryEl, this.masonryConfig);
        f.loadDoc();
        if(submit.addEventListener) {
            submit.addEventListener('click', (ev) => {
                ev.preventDefault();
                f.loadDoc();
            });
        } else {
            submit.attachEvent('onclick', (ev) => {
                ev.returnValue = false;
                f.loadDoc();
            });
        }
    }
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
    // Masonry
    let masonryConfig = {elem:'.grid', itemSelector: '.grid-item', columnWidth: '.grid-sizer', gutter: 20,
        percentPosition: true, isResizable: true, isFitWidth: true};
    //ImgFinder
    let fData = ['search__partners', 'search__query'];
    let finder = new LaunchFinder(fData, masonryConfig);
    finder.addEvsLs();
};