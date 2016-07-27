"use strict";
function Timer(){ //class Timer
    this.timerStart1 = 0,
    this.hours = 0,
    this.mins = 0,
    this.secs = 0,
    this.milis = 0,
    this.mins2 = 0,
    this.secs2 = 0,
    this.cs = 0,
    this.timerStart2 = 0;
    this.getCls = function (cls) {
        return document.getElementsByClassName(cls);
    };
    this.milisec = this.getCls('milis');
    this.second = this.getCls('secs');
    this.minute = this.getCls('mins');
    this.hour = this.getCls('hours');
    this.startBtnH = this.getCls('start');
    this.stopBtnH = this.getCls('stop');
    this.timerNode = this.getCls('face');
    this.displ = this.getCls('out');
    this.displTimer2 = this.getCls('face__item')[0];
}
//core Timer 1
Timer.prototype.timer1 = function(){
    this.stopBtnH[0].classList.toggle('off');
    this.startBtnH[0].classList.toggle('off');
    var self = this;
    var check = new Date().getTime();
    if(!this.timerStart1) this.timerStart1 = setInterval(function(){
        self.milis += 4;
        if(self.milis < 10){
            self.milisec[0].innerHTML = '00' + self.milis;
        } else if(self.milis > 9 && self.milis < 100) {
            self.milisec[0].innerHTML = '0' + self.milis;
        } else if(self.milis >= 1000) {
            var current = new Date().getTime();
            var diff = current - check;
            //console.log('timer 1 accuracy (ms)' + diff);                          // to check timer accuracy uncomment this row
            self.milisec[0].innerHTML = '000';
            self.secs++;
            if (self.secs < 10) {
                self.second[0].innerHTML = '0' + self.secs;
            } else if (self.secs === 60) {
                self.second[0].innerHTML = '00';
                self.mins++;
                if (self.mins < 10) {
                    self.minute[0].innerHTML = '0' + self.mins;
                } else if (self.mins === 60) {
                    self.minute[0].innerHTML = '00';
                    self.hours++;
                    if (self.hours === 24) {
                        clearInterval(self.timerStart);
                        self.timerStart = 0;
                    }
                    self.hours < 10 ? self.hour[0].innerHTML = '0' + self.hours : self.hour[0].innerHTML = self.hours;
                    self.mins = 0;
                } else {
                    self.minute[0].innerHTML = self.mins;
                }
                self.secs = 0;
            } else {
                self.second[0].innerHTML = self.secs;
            }
            self.milis = 0;
        } else {
            self.milisec[0].innerHTML = self.milis;
        }
    }, 4);
};
//core Timer 2
Timer.prototype.timer2 = function(){
    this.stopBtnH[1].classList.toggle('off');
    this.startBtnH[1].classList.toggle('off');
    var check = new Date().getTime();
    var self = this;
    if(!this.timerStart2) this.timerStart2 = setInterval(function(){
        if (self.mins2 === 0 && self.secs2 === 0 && self.cs === 0) {
            self.displTimer2.innerHTML = "00:00.00";
        } else if (self.cs < 10 && self.secs2 < 10) {
            self.displTimer2.innerHTML = "0" + self.mins2.toString() + ":0" + self.secs2.toString() + ".0" + self.cs.toString();
        } else if (self.cs < 10 && self.secs2 > 10) {
            self.displTimer2.innerHTML = "0" + self.mins2.toString() + ":" + self.secs2.toString() + ".0" + self.cs.toString();
        } else if (self.secs2 < 10) {
            self.displTimer2.innerHTML = "0" + self.mins2.toString() + ":0" + self.secs2.toString() + "." + self.cs.toString();
        } else if (self.mins2 < 10) {
            self.displTimer2.innerHTML = "0" + self.mins2.toString() + ":" + self.secs2.toString() + "." + self.cs.toString();
        }
        self.cs ++;
        if (self.cs > 99) {
            var current = new Date().getTime();
            var diff = current - check;
            //console.log('timer 2 accuracy (cs)' + diff);                          // to check timer accuracy uncomment this row
            self.cs = 0;
            self.secs2 ++;
            if (self.secs2 > 59) {
                self.secs2 = 0;
                self.mins2 ++;
            }
        }
    }, 10)
};
Timer.prototype.stop = function(f){
    if(f === 0) {
        clearInterval(this.timerStart1);
        this.timerStart1 = 0;
    }
    if(f === 1) {
        clearInterval(this.timerStart2);
        this.timerStart2 = 0;
    }
    this.stopBtnH[f].classList.add('off');
    this.startBtnH[f].classList.remove('off');
    this.split(f);
};
Timer.prototype.split = function(f){
    var clnN = this.timerNode[f].querySelector('ul').cloneNode(true);
    this.displ[f].appendChild(clnN);
};
Timer.prototype.reset = function(f){
    this.stop(f);
    if(f === 0) {
        this.hour[f].innerHTML = (this.hours = '00');
        this.minute[f].innerHTML = (this.mins = '00');
        this.second[f].innerHTML = (this.secs = '00');
        this.milisec[f].innerHTML = (this.milis = '000');
    } else {
        this.displTimer2.innerHTML = "00:00.00";
        this.mins2 = 0;
        this.secs2 = 0;
        this.cs = 0;
    }
    while(this.displ[f].children.length > 0) {
        this.displ[f].removeChild(this.displ[f].childNodes[0]);
    }
};
Timer.prototype.clickHandler = function(e){
    var eventT = e.target.name;
    if(eventT === 'start'){
        this.timer1();
    } else if(eventT === 'stop'){
        this.stop(0);
    } else if(eventT === 'reset'){
        this.reset(0);
    }else if(eventT === 'split'){
        this.split(0);
    } else if (eventT === 'start2'){
        this.timer2();
    } else if(eventT === 'stop2'){
        this.stop(1);
    } else if(eventT === 'reset2'){
        this.reset(1);
    }else if(eventT === 'split2'){
        this.split(1);
    }
};

window.onload = function(){
    var timerO = new Timer();
    window.addEventListener('click', function(e){
        timerO.clickHandler(e);
    }, false);
};