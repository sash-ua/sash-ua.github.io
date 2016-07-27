'use strict';
var data = [],
    messages = ['Enter login (don\'t use spaces, ".", "\\", "/"): ',
        'Enter your login (don\'t use spaces, ".", "\\", "/"): ',
        ', you successfully authorized!',
        'Error login!',
        'Error login, let\'s try again',
        'Login must be longer than 3 characters, try again',
        'You cancel authorization. Have a good day!'],
    login,
    flag = 0;
function controller(){
    var i, tmp;
    if(flag === 0){
        for(i = 0; i <= 5; i++){
            if(i < 5) {
                var piece = view(messages[0], 'p');
                console.log(piece === undefined);
                console.log(piece);
                var elem = model(piece);
                var order = controllerDecision(elem);
                if(order === 'cancel') return;
                if(!order)i--;
            } else {
                login = view(messages[1], 'p');
                elem = model(login, 'nr');
                order = controllerDecision(elem);
                if(order === 'cancel') return;
                if(!order)i--;
            }
        }
        flag = 1;
    }
    tmp = modelCompare();
    if(tmp !== -1){
        view(login + messages[2], 'a');
    } else {
        view(messages[3], 'a');
    }
}
function controllerDecision(elem){
    if(elem === 'tooShort') {
        view(messages[5], 'a');
        return 0;
    } else if (elem === 'cancel'){
        view(messages[6], 'a');
        return 'cancel';
    } else if(elem){
        return 1;
    }
}
function view(message, f){
    var i,
        m = message || 0;
    if(m && f ==='p') {
        return prompt(message);
    } else if(m && f === 'a'){
        alert(m);
    }
}
function dbInterface(d){
    data.push(d);
}
function model(d, rec){
    rec = rec || 'r';
    if(d !== null && d !== undefined){
        d = d.replace(/(\s|\u00A0|[.]|\\|\/|[undefined]|[null])+/g, '');
        if( d.length <= 3){
            return 'tooShort';
        } else if(rec === 'r') {
            dbInterface(d);
            return 1;
        } else if (rec === 'nr'){
            return 1;
        }
    } else {
        return 'cancel';
    }
}
function modelCompare(){
    var i, tmp;
    for(i = 0; i < data.length; i++){
        tmp = data[i].indexOf(login);
        if(tmp !== -1){
            return tmp;
        }
    }
    return tmp;
}
controller();
