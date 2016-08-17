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
    0],
    q1: ["What is the correct JavaScript syntax to change the content of the HTML element below? \<p id='demo'\>This is a demonstration.\</p\>", "document.getElementById('demo').innerHTML = 'Hello World!'", "document.getElement('p').innerHTML = 'Hello World!'", "document.getElementByName('p').innerHTML = 'Hello World!'", "document.getElementByName('p').html = 'Hello World!'", 0],
    q2: ["Where is the correct place to insert a JavaScript?", "The <body> section", "The <head> section", "The <form> section", 0, 1],
    q3: ["The external JavaScript file must contain the \<script\> tag.", "False", "True", 0],
    q4: ["How to write an IF statement in JavaScript?", "if i = 5 then", "if i == 5 then", "if i = 5", "if (i == 5)", "if (i === 5)", 3, 4]
};
// save to localStorage
var setInlet = function setInlet(quiz) {
    localStorage.setItem("exam", JSON.stringify(quiz));
};
// get from localStorage and remove data
var getOut = function getOut() {
    var temp = JSON.parse(localStorage.getItem("exam"));
    localStorage.clear("exam");
    return temp;
};
//generate html from templates (obj. tmpls). Extract end generate obj. setAnswers with true answers form obj. exam
function genMainTamplate(_data, quiz, tmpls) {
    var key = void 0,
        q = 1,
        option = 1,
        d = void 0,
        html = "" + tmpls.modalWindow + tmpls.header;
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
        for (var _i = 1; _i < quantity; _i++) {
            var _k = quiz[key][_i];
            if (typeof _k === 'string') {
                setAnswers[key].length > 1 ? html = html + " " + _.template(tmpls.label)({ 'n': option, 'txt': quiz[key][_i], 'type': _data.type[1] }) : html = html + " " + _.template(tmpls.label)({ 'n': q, 'txt': quiz[key][_i], 'type': _data.type[0] });
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
var genResult = function genResult() {
    var result = {},
        forms = document.querySelectorAll('form');
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
var resultEq = function resultEq(setAnswers, result) {
    var res = [],
        resObj = {},

    // number response in order
    count = 1;
    for (var k in setAnswers) {

        if (_.isEqual(setAnswers[k], result[k])) {
            res.push(count + '. true');
        } else {
            res.push(count + '. false');
        }
        count++;
    }
    resObj.result = res;
    return resObj;
};
// pop up and down of modal window
var mWindow = function mWindow(el) {
    // the origin value of display prop. eq. 'none'
    el.style.display === 'none' || el.style.display === '' ? el.style.display = 'inherit' : el.style.display = 'none';
};
// dedicated answers cleaning
var reChecked = function reChecked(el) {
    var s = document.querySelectorAll('input'),
        i = void 0;
    mWindow(el);
    for (i = 0; i < s.length; i++) {
        s[i].checked = '';
        s[i].removeAttribute('checked');
    }
};
// re exam handler
var reloadHandler = function reloadHandler(e) {
    var el = document.getElementById("mW");
    if (e.keyCode === 27 || e.type === 'click') {
        reChecked(el);
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
    });
});

//# sourceMappingURL=main-compiled.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLWNvbXBpbGVkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCBBbGV4IFRyYW5jaGVua28gMjAxNiovXG5cbid1c2Ugc3RyaWN0Jztcbi8vIG9iai4gZm9yIHNhdmluZyB0cnVlIGFuc3dlcnNcblxudmFyIHNldEFuc3dlcnMgPSB7fTtcbi8vIG9yaWdpbiB0ZW1wbGF0ZXNcbnZhciB0bXBscyA9IHtcbiAgICBoZWFkZXI6IFwiPGgxIGNsYXNzPSdhcnRpY2xlIGFydGljbGVfX2hlYWRlcic+PCU9IHRvcGljWzBdICU+PC9oMT5cIixcbiAgICBxdWl6Rm9ybTogW1wiPGZvcm0gaWQ9J2Zvcm08JT0gbiAlPicgbmFtZT0nZm9ybTwlPSBuICU+JyBhY3Rpb249JyMnPlwiLCBcIjwvZm9ybT5cIl0sXG4gICAgcXVlc3Rpb25Cb3g6IFtcIjxkaXYgY2xhc3M9J2FydGljbGVfX2Jsb2NrIGFydGljbGVfX2Jsb2NrPCU9IG4gJT4nIGlkPSd0ZXN0LWJveDwlPSBuICU+Jz5cIiwgXCI8L2Rpdj5cIl0sXG4gICAgcXVlc3Rpb25IZWFkOiBcIjxoMyBjbGFzcz0nYXJ0aWNsZSBhcnRpY2xlX19leCBhcnRpY2xlX19leF88JT0gbiAlPic+PCU9IG4gJT4uIDwlLSB0eHQgJT48L2gzPlwiLFxuICAgIGxhYmVsOiBcIjxsYWJlbD48aW5wdXQgdHlwZT0nPCU9IHR5cGUgJT4nIG5hbWU9J3E8JT0gbiAlPicgdmFsdWU9JzEnPjwlLSB0eHQgJT48L2xhYmVsPjwvYnI+XCIsXG4gICAgYnV0dG9uOiBcIjxpbnB1dCBjbGFzcz0nYXJ0aWNsZSBhcnRpY2xlX19idXR0b24nIGlkPSdzdWJtaXRfcDEnIHR5cGU9J3N1Ym1pdCcgbmFtZT0nYnRuJyB2YWx1ZT0nPCU9IHRvcGljWzFdICU+Jz5cIixcbiAgICBtb2RhbFdpbmRvdzogXCI8ZGl2IGlkPSdtVyc+PGgyPlJlc3VsdHM6PC9oMj48ZGl2IGlkPSdvdXRNVyc+PC9kaXY+PC9kaXY+XCIsXG4gICAgcmVzdWx0czogXCI8JSBfLmZvckVhY2gocmVzdWx0LCBmdW5jdGlvbihyZXMpIHsgJT48aDM+PCUtIHJlcyAlPjwvaDM+PCUgfSk7ICU+XCJcbn07XG4vLyBzb21lIGRhdGFcbnZhciBfZGF0YSA9IHtcbiAgICB0b3BpYzogW1wiSmF2YVNjcmlwdCBRdWl6IFRlc3RcIiwgXCJSZXN1bHRcIl0sXG4gICAgdHlwZTogW1wicmFkaW9cIiwgXCJjaGVja2JveFwiXVxufTtcbi8vIHF1ZXN0aW9uIGluc2VydCBpbiBvYmouIGV4YW0sIGtleSBtdXN0IGJlIG5hbWVkIFwicTEsIHEyLCAuLi4sIHFOJ1xudmFyIGV4YW0gPSB7XG4gICAgcTA6IFtcbiAgICAvLyBRdWVzdGlvblxuICAgIFwiSW5zaWRlIHdoaWNoIEhUTUwgZWxlbWVudCBkbyB3ZSBwdXQgdGhlIEphdmFTY3JpcHQ/XCIsXG4gICAgLy8gQW5zd2Vyc1xuICAgIC8vIDBcbiAgICBcIlxcPHNjcmlwdFxcPlwiLFxuICAgIC8vIDFcbiAgICBcIlxcPGphdmFzY3JpcHRcXD5cIixcbiAgICAvLyAyXG4gICAgXCJcXDxzY3JpcHRpbmdcXD5cIixcbiAgICAvLyB0cnVlIGFuc3dlciBcIjBcIiA9IFwiXFw8c2NyaXB0XFw+XCJcbiAgICAwXSxcbiAgICBxMTogW1wiV2hhdCBpcyB0aGUgY29ycmVjdCBKYXZhU2NyaXB0IHN5bnRheCB0byBjaGFuZ2UgdGhlIGNvbnRlbnQgb2YgdGhlIEhUTUwgZWxlbWVudCBiZWxvdz8gXFw8cCBpZD0nZGVtbydcXD5UaGlzIGlzIGEgZGVtb25zdHJhdGlvbi5cXDwvcFxcPlwiLCBcImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vJykuaW5uZXJIVE1MID0gJ0hlbGxvIFdvcmxkISdcIiwgXCJkb2N1bWVudC5nZXRFbGVtZW50KCdwJykuaW5uZXJIVE1MID0gJ0hlbGxvIFdvcmxkISdcIiwgXCJkb2N1bWVudC5nZXRFbGVtZW50QnlOYW1lKCdwJykuaW5uZXJIVE1MID0gJ0hlbGxvIFdvcmxkISdcIiwgXCJkb2N1bWVudC5nZXRFbGVtZW50QnlOYW1lKCdwJykuaHRtbCA9ICdIZWxsbyBXb3JsZCEnXCIsIDBdLFxuICAgIHEyOiBbXCJXaGVyZSBpcyB0aGUgY29ycmVjdCBwbGFjZSB0byBpbnNlcnQgYSBKYXZhU2NyaXB0P1wiLCBcIlRoZSA8Ym9keT4gc2VjdGlvblwiLCBcIlRoZSA8aGVhZD4gc2VjdGlvblwiLCBcIlRoZSA8Zm9ybT4gc2VjdGlvblwiLCAwLCAxXSxcbiAgICBxMzogW1wiVGhlIGV4dGVybmFsIEphdmFTY3JpcHQgZmlsZSBtdXN0IGNvbnRhaW4gdGhlIFxcPHNjcmlwdFxcPiB0YWcuXCIsIFwiRmFsc2VcIiwgXCJUcnVlXCIsIDBdLFxuICAgIHE0OiBbXCJIb3cgdG8gd3JpdGUgYW4gSUYgc3RhdGVtZW50IGluIEphdmFTY3JpcHQ/XCIsIFwiaWYgaSA9IDUgdGhlblwiLCBcImlmIGkgPT0gNSB0aGVuXCIsIFwiaWYgaSA9IDVcIiwgXCJpZiAoaSA9PSA1KVwiLCBcImlmIChpID09PSA1KVwiLCAzLCA0XVxufTtcbi8vIHNhdmUgdG8gbG9jYWxTdG9yYWdlXG52YXIgc2V0SW5sZXQgPSBmdW5jdGlvbiBzZXRJbmxldChxdWl6KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJleGFtXCIsIEpTT04uc3RyaW5naWZ5KHF1aXopKTtcbn07XG4vLyBnZXQgZnJvbSBsb2NhbFN0b3JhZ2UgYW5kIHJlbW92ZSBkYXRhXG52YXIgZ2V0T3V0ID0gZnVuY3Rpb24gZ2V0T3V0KCkge1xuICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImV4YW1cIikpO1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcihcImV4YW1cIik7XG4gICAgcmV0dXJuIHRlbXA7XG59O1xuLy9nZW5lcmF0ZSBodG1sIGZyb20gdGVtcGxhdGVzIChvYmouIHRtcGxzKS4gRXh0cmFjdCBlbmQgZ2VuZXJhdGUgb2JqLiBzZXRBbnN3ZXJzIHdpdGggdHJ1ZSBhbnN3ZXJzIGZvcm0gb2JqLiBleGFtXG5mdW5jdGlvbiBnZW5NYWluVGFtcGxhdGUoX2RhdGEsIHF1aXosIHRtcGxzKSB7XG4gICAgdmFyIGtleSA9IHZvaWQgMCxcbiAgICAgICAgcSA9IDEsXG4gICAgICAgIG9wdGlvbiA9IDEsXG4gICAgICAgIGQgPSB2b2lkIDAsXG4gICAgICAgIGh0bWwgPSBcIlwiICsgdG1wbHMubW9kYWxXaW5kb3cgKyB0bXBscy5oZWFkZXI7XG4gICAgZm9yIChrZXkgaW4gcXVpeikge1xuICAgICAgICB2YXIgcXVhbnRpdHkgPSBxdWl6W2tleV0ubGVuZ3RoO1xuICAgICAgICBodG1sID0gaHRtbCArIFwiIFwiICsgXy50ZW1wbGF0ZSh0bXBscy5xdWl6Rm9ybVswXSkoeyAnbic6IHEgfSkgKyBcIiBcIiArIF8udGVtcGxhdGUodG1wbHMucXVlc3Rpb25Cb3hbMF0pKHsgJ24nOiBxIH0pICsgXCIgXCIgKyBfLnRlbXBsYXRlKHRtcGxzLnF1ZXN0aW9uSGVhZCkoeyAnbic6IHEsICd0eHQnOiBxdWl6W2tleV1bMF0gfSk7XG4gICAgICAgIHNldEFuc3dlcnNba2V5XSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrID0gcXVpeltrZXldW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHNldEFuc3dlcnNba2V5XS5wdXNoKHF1aXpba2V5XVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IHF1YW50aXR5OyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2sgPSBxdWl6W2tleV1bX2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZXRBbnN3ZXJzW2tleV0ubGVuZ3RoID4gMSA/IGh0bWwgPSBodG1sICsgXCIgXCIgKyBfLnRlbXBsYXRlKHRtcGxzLmxhYmVsKSh7ICduJzogb3B0aW9uLCAndHh0JzogcXVpeltrZXldW19pXSwgJ3R5cGUnOiBfZGF0YS50eXBlWzFdIH0pIDogaHRtbCA9IGh0bWwgKyBcIiBcIiArIF8udGVtcGxhdGUodG1wbHMubGFiZWwpKHsgJ24nOiBxLCAndHh0JzogcXVpeltrZXldW19pXSwgJ3R5cGUnOiBfZGF0YS50eXBlWzBdIH0pO1xuICAgICAgICAgICAgICAgIG9wdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGh0bWwgPSBcIlwiICsgaHRtbCArIHRtcGxzLnF1ZXN0aW9uQm94WzFdICsgdG1wbHMucXVpekZvcm1bMV07XG4gICAgICAgIHErKztcbiAgICB9XG4gICAgaHRtbCA9IFwiXCIgKyBodG1sICsgdG1wbHMuYnV0dG9uO1xuICAgIHJldHVybiBodG1sO1xufVxuLy8gZXhhbWluZWUgYW5zd2VycywgZ2VuZXJhdGluZyBvYmouIHJlc3VsdFxudmFyIGdlblJlc3VsdCA9IGZ1bmN0aW9uIGdlblJlc3VsdCgpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sXG4gICAgICAgIGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0WydxJyArIGldID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZm9ybXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChmb3Jtc1tpXVtqXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0WydxJyArIGldLnB1c2goaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vLyBjb21wYXJlIGFuc3dlcnMgdG8gcXVlc3Rpb25zXG52YXIgcmVzdWx0RXEgPSBmdW5jdGlvbiByZXN1bHRFcShzZXRBbnN3ZXJzLCByZXN1bHQpIHtcbiAgICB2YXIgcmVzID0gW10sXG4gICAgICAgIHJlc09iaiA9IHt9LFxuXG4gICAgLy8gbnVtYmVyIHJlc3BvbnNlIGluIG9yZGVyXG4gICAgY291bnQgPSAxO1xuICAgIGZvciAodmFyIGsgaW4gc2V0QW5zd2Vycykge1xuXG4gICAgICAgIGlmIChfLmlzRXF1YWwoc2V0QW5zd2Vyc1trXSwgcmVzdWx0W2tdKSkge1xuICAgICAgICAgICAgcmVzLnB1c2goY291bnQgKyAnLiB0cnVlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaChjb3VudCArICcuIGZhbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmVzT2JqLnJlc3VsdCA9IHJlcztcbiAgICByZXR1cm4gcmVzT2JqO1xufTtcbi8vIHBvcCB1cCBhbmQgZG93biBvZiBtb2RhbCB3aW5kb3dcbnZhciBtV2luZG93ID0gZnVuY3Rpb24gbVdpbmRvdyhlbCkge1xuICAgIC8vIHRoZSBvcmlnaW4gdmFsdWUgb2YgZGlzcGxheSBwcm9wLiBlcS4gJ25vbmUnXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8IGVsLnN0eWxlLmRpc3BsYXkgPT09ICcnID8gZWwuc3R5bGUuZGlzcGxheSA9ICdpbmhlcml0JyA6IGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuLy8gZGVkaWNhdGVkIGFuc3dlcnMgY2xlYW5pbmdcbnZhciByZUNoZWNrZWQgPSBmdW5jdGlvbiByZUNoZWNrZWQoZWwpIHtcbiAgICB2YXIgcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JyksXG4gICAgICAgIGkgPSB2b2lkIDA7XG4gICAgbVdpbmRvdyhlbCk7XG4gICAgZm9yIChpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc1tpXS5jaGVja2VkID0gJyc7XG4gICAgICAgIHNbaV0ucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgfVxufTtcbi8vIHJlIGV4YW0gaGFuZGxlclxudmFyIHJlbG9hZEhhbmRsZXIgPSBmdW5jdGlvbiByZWxvYWRIYW5kbGVyKGUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1XXCIpO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3IHx8IGUudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICByZUNoZWNrZWQoZWwpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlbG9hZEhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZWxvYWRIYW5kbGVyKTtcbiAgICB9XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzYXZlIHRvIGxvY2FsU3RvcmFnZVxuICAgIHNldElubGV0KGV4YW0pO1xuICAgIC8vIGdldCBmcm9tIGxvY2FsU3RvcmFnZSBhbmQgcmVtb3ZlIGRhdGFcbiAgICB2YXIgcXVpeiA9IGdldE91dCgpO1xuICAgIC8vIGluc2VydCBnZW5lcmF0ZWQgZXhhbSBodG1sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKS5pbm5lckhUTUwgPSBfLnRlbXBsYXRlKGdlbk1haW5UYW1wbGF0ZShfZGF0YSwgcXVpeiwgdG1wbHMpKShfZGF0YSk7XG4gICAgLy8gYnV0dG9uIFwiUmVzdWx0XCIgZXZlbnQgaGFuZGxlclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfcDEnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibVdcIik7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciBhbnN3ZXJzID0gZ2VuUmVzdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRzID0gcmVzdWx0RXEoc2V0QW5zd2VycywgYW5zd2Vycyk7XG4gICAgICAgIC8vIGluc2VydCBhbnN3ZXJzIGludG8gbW9kYWwgd2luZG93XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRNVycpLmlubmVySFRNTCA9IF8udGVtcGxhdGUodG1wbHMucmVzdWx0cykocmVzdWx0cyk7XG4gICAgICAgIG1XaW5kb3coZWwpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlbG9hZEhhbmRsZXIpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZWxvYWRIYW5kbGVyKTtcbiAgICB9KTtcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLWNvbXBpbGVkLmpzLm1hcCJdLCJmaWxlIjoibWFpbi1jb21waWxlZC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
