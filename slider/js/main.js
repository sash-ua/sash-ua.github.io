// Slider
var index = 0,
    itemAmount,
    autoInt,
    setDelay,
    i;
var items = document.getElementsByClassName('slider-t2__box');
var pointsDiv = document.getElementsByClassName('slider__points_t2_act');
var cycle = function (beginIndex) {
    itemAmount = items.length;
    if (beginIndex || beginIndex === 0)index = beginIndex;
    var currItem = items[index];
    var currPoint = pointsDiv[index];
    for (i = 0; i< itemAmount; i++){
        items[i].style.display = 'none';
        pointsDiv[i].style.display = 'none';
    }
    currItem.style.display = 'inline-block';
    currPoint.style.display = 'inline-block';
};
var counter = function () {
    cycle();
    index++;
    if (index > itemAmount - 1) index = 0;
};
var autoSlide = function (){
    setDelay = 0;
    autoInt = setInterval(counter, 1200);
};
// event handler
var thisPoint = function (event){
    var index,
        el = event.target;
    if (!el.getAttribute('id')){
        for (var i = 0, max = el.parentNode.children.length; i < max; i++){
            if ( el.parentNode.children[i] === el )  index = i;
        }
    }
    clearInterval(autoInt);
    if (!setDelay) setDelay = setTimeout(autoSlide,7000);
    cycle(index);
};

window.onload = function () {
    autoSlide();
    document.getElementById('slider__group-points_ID').addEventListener('click', thisPoint, false);
};
