/* Copyright Alex Tranchenko 2016*/
'use strict';
// obj. for saving true answers
var setAnswers = {};
// origin templates
var tmpls = {
    header: "<h1 class='article article__header'><%= topic[0] %></h1>",
    quizForm: ["<form id='form<%= n %>' name='form<%= n %>' action='#'>", "</form>"],
    questionBox: ["<div class='article__block article__block<%= n %>' id='test-box<%= n %>'>", "</div>"],
    questionHead: "<h3 class='article article__ex article__ex_<%= n %>'><%= n %>. <%- txt %></h3>",
    label: "<label><input type='<%= type %>' name='q<%= n %>' value='1'><%- txt %></label></br>",
    button: "<input class='article article__button' id='submit_p1' type='submit' name='btn' value='<%= topic[1] %>'>",
    modalWindow: "<div id='mW'><h2>Results:</h2><div id='outMW'></div></div>",
    results: "<% _.forEach(result, function(res) { %><h3><%- res %></h3><% }); %>"
};
// some data
var _data = {
    topic: ["JavaScript Quiz Test", "Result"],
    type: ["radio", "checkbox"]
};
// question insert in obj. exam, key must be named "q1, q2, ..., qN'
var exam = {
    q0: [
        // Question
        "Inside which HTML element do we put the JavaScript?",
        // Answers
        // 0
        "\<script\>",
        // 1
        "\<javascript\>",
        // 2
        "\<scripting\>",
        // true answer "0" = "\<script\>"
        0
    ],
    q1: [
        "What is the correct JavaScript syntax to change the content of the HTML element below? \<p id='demo'\>This is a demonstration.\</p\>",
        "document.getElementById('demo').innerHTML = 'Hello World!'",
        "document.getElement('p').innerHTML = 'Hello World!'",
        "document.getElementByName('p').innerHTML = 'Hello World!'",
        "document.getElementByName('p').html = 'Hello World!'",
        0
    ],
    q2: [
        "Where is the correct place to insert a JavaScript?",
        "The <body> section",
        "The <head> section",
        "The <form> section",
        0,
        1
    ],
    q3: [
        "The external JavaScript file must contain the \<script\> tag.",
        "False",
        "True",
        0
    ],
    q4: [
        "How to write an IF statement in JavaScript?",
        "if i = 5 then",
        "if i == 5 then",
        "if i = 5",
        "if (i == 5)",
        "if (i === 5)",
        3,
        4
    ]
};
var test = [1, 2, 3];
// save to localStorage
var setInlet = function (quiz) {
    localStorage.setItem("exam", JSON.stringify(quiz));
};
// get from localStorage and remove data
var getOut = function () {
    var temp = JSON.parse(localStorage.getItem("exam"));
    localStorage.clear("exam");
    return temp;
};
//generate html from templates (obj. tmpls). Extract end generate obj. setAnswers with true answers form obj. exam
function genMainTamplate(_data, quiz, tmpls) {
    var key, q = 1, option = 1, d, html = "" + tmpls.modalWindow + tmpls.header;
    for (key in quiz) {
        var quantity = quiz[key].length;
        html = html + " " + _.template(tmpls.quizForm[0])({ 'n': q }) + " " + _.template(tmpls.questionBox[0])({ 'n': q }) + " " + _.template(tmpls.questionHead)({ 'n': q, 'txt': quiz[key][0] });
        setAnswers[key] = [];
        for (var i = 0; i < quantity; i++) {
            var k = quiz[key][i];
            if (typeof k === 'number') {
                setAnswers[key].push(quiz[key][i]);
            }
        }
        for (var i = 1; i < quantity; i++) {
            var k = quiz[key][i];
            if (typeof k === 'string') {
                setAnswers[key].length > 1 ? html = html + " " + _.template(tmpls.label)({ 'n': option, 'txt': quiz[key][i], 'type': _data.type[1] })
                    : html = html + " " + _.template(tmpls.label)({ 'n': q, 'txt': quiz[key][i], 'type': _data.type[0] });
                option++;
            }
        }
        html = "" + html + tmpls.questionBox[1] + tmpls.quizForm[1];
        q++;
    }
    html = "" + html + tmpls.button;
    return html;
}
// examinee answers, generating obj. result
var genResult = function () {
    var result = {}, forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        result['q' + i] = [];
        for (var j = 0; j < forms[i].length; j++) {
            if (forms[i][j].checked) {
                result['q' + i].push(j);
            }
        }
    }
    return result;
};
// compare answers to questions
var resultEq = function (setAnswers, result) {
    var res = [], resObj = {}, 
    // number response in order
    count = 1;
    for (var k in setAnswers) {
        if (_.isEqual(setAnswers[k], result[k])) {
            res.push(count + '. true');
        }
        else {
            res.push(count + '. false');
        }
        count++;
    }
    resObj.result = res;
    return resObj;
};
// pop up and down of modal window
var mWindow = function (el) {
    // the origin value of display prop. eq. 'none'
    (el.style.display === 'none' || el.style.display === '') ? el.style.display = 'inherit' : el.style.display = 'none';
};
// dedicated answers cleaning
var reChecked = function (el) {
    var s = document.querySelectorAll('input'), i;
    for (i = 0; i < s.length; i++) {
        s[i].checked = '';
        s[i].removeAttribute('checked');
    }
};
// re exam handler
var reloadHandler = function (e) {
    var el = document.getElementById("mW");
    if (e.keyCode === 27 || e.type === 'click') {
        reChecked(el);
        if (el.style.display !== 'none')
            mWindow(el);
        window.removeEventListener('keydown', reloadHandler);
        window.removeEventListener('click', reloadHandler);
    }
};
window.addEventListener('load', function () {
    // save to localStorage
    setInlet(exam);
    // get from localStorage and remove data
    var quiz = getOut();
    // insert generated exam html
    document.getElementById('main').innerHTML = _.template(genMainTamplate(_data, quiz, tmpls))(_data);
    // button "Result" event handler
    document.getElementById('submit_p1').addEventListener('click', function (e) {
        var el = document.getElementById("mW");
        e.stopPropagation();
        var answers = genResult();
        var results = resultEq(setAnswers, answers);
        // insert answers into modal window
        document.getElementById('outMW').innerHTML = _.template(tmpls.results)(results);
        mWindow(el);
        window.addEventListener('keydown', reloadHandler);
        window.addEventListener('click', reloadHandler);
    }, false);
});
//# sourceMappingURL=main.js.map