/* Copyright Alex Tranchenko 2016*/

'use strict';
// obj. for saving true answers
let setAnswers = {};
// origin templates
let tmpls = {
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
let _data = {
    topic: ["JavaScript Quiz Test", "Result"],
    type: ["radio", "checkbox"]
};
// question insert in obj. exam, key must be named "q1, q2, ..., qN'
let exam = {
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
// save to localStorage
let setInlet = (quiz) => {
    localStorage.setItem("exam", JSON.stringify(quiz));
};
// get from localStorage and remove data
let getOut = () => {
    let temp = JSON.parse(localStorage.getItem("exam"));
    localStorage.clear("exam");
    return temp;
};
//generate html from templates (obj. tmpls). Extract end generate obj. setAnswers with true answers form obj. exam
function genMainTamplate(_data, quiz, tmpls){
    let key,
        q = 1,
        option = 1,
        d,
        html = `${tmpls.modalWindow}${tmpls.header}`;
    for(key in quiz){
        let quantity = quiz[key].length;
        html = `${html} ${_.template(tmpls.quizForm[0])({'n': q})} ${_.template(tmpls.questionBox[0])({'n': q})} ${_.template(tmpls.questionHead)({'n': q, 'txt': quiz[key][0]})}`;
        setAnswers[key] = [];
        for(let i = 0; i < quantity; i++){
            let k = quiz[key][i];
            if(typeof k === 'number'){
                setAnswers[key].push(quiz[key][i]);
            }
        }
        for(let i = 1; i < quantity; i++){
            let k = quiz[key][i];
            if(typeof k === 'string'){
                setAnswers[key].length > 1 ? html = `${html} ${_.template(tmpls.label)({'n': option, 'txt': quiz[key][i] , 'type': _data.type[1]})}`
                    : html = `${html} ${_.template(tmpls.label)({'n': q, 'txt': quiz[key][i] , 'type': _data.type[0]})}`;
                option++;
            }
        }
        html = `${html}${tmpls.questionBox[1]}${tmpls.quizForm[1]}`;
        q++;
    }
    html = `${html}${tmpls.button}`;
    return html;
}
// examinee answers, generating obj. result
let genResult = () => {
    let result = {},
        forms = document.querySelectorAll('form');
    for(let i = 0;i < forms.length; i++){
        result['q' + i] = [];
        for(let j = 0; j < forms[i].length; j++){
            if(forms[i][j].checked ){
                result['q' + i].push(j);
            }
        }
    }
    return result;
};
// compare answers to questions
let resultEq = (setAnswers, result) => {
    let res = [],
        resObj = {},
        // number response in order
        count = 1;
    for(let k in setAnswers){

        if(_.isEqual(setAnswers[k], result[k])){
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
let mWindow = (el) => {
    // the origin value of display prop. eq. 'none'
    (el.style.display === 'none' || el.style.display === '') ? el.style.display = 'inherit' : el.style.display = 'none';
};
// dedicated answers cleaning
let reChecked = (el) => {
    let s = document.querySelectorAll('input'),
        i;
    for(i = 0; i < s.length; i++){
        s[i].checked = '';
        s[i].removeAttribute('checked');
    }
};
// re exam handler
let reloadHandler = (e) => {
    let el = document.getElementById("mW");
    if ( e.keyCode === 27 || e.type === 'click' ) {
        reChecked( el );
        if(el.style.display !== 'none') mWindow(el);
        window.removeEventListener('keydown', reloadHandler);
        window.removeEventListener('click', reloadHandler);
    }
};

window.addEventListener('load', function(){
    // save to localStorage
    setInlet(exam);
    // get from localStorage and remove data
    let quiz = getOut();
    // insert generated exam html
    document.getElementById('main' ).innerHTML = _.template(genMainTamplate(_data, quiz, tmpls))(_data);
    // button "Result" event handler
    document.getElementById('submit_p1').addEventListener('click', (e) => {
        let el = document.getElementById("mW");
        e.stopPropagation();
        let answers = genResult();
        let results = resultEq(setAnswers, answers);
        // insert answers into modal window
        document.getElementById('outMW').innerHTML = _.template(tmpls.results)(results);
        mWindow(el);
        window.addEventListener('keydown', reloadHandler);
        window.addEventListener('click', reloadHandler);
    }, false);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCBBbGV4IFRyYW5jaGVua28gMjAxNiovXG5cbid1c2Ugc3RyaWN0Jztcbi8vIG9iai4gZm9yIHNhdmluZyB0cnVlIGFuc3dlcnNcbmxldCBzZXRBbnN3ZXJzID0ge307XG4vLyBvcmlnaW4gdGVtcGxhdGVzXG5sZXQgdG1wbHMgPSB7XG4gICAgaGVhZGVyOiBcIjxoMSBjbGFzcz0nYXJ0aWNsZSBhcnRpY2xlX19oZWFkZXInPjwlPSB0b3BpY1swXSAlPjwvaDE+XCIsXG4gICAgcXVpekZvcm06IFtcIjxmb3JtIGlkPSdmb3JtPCU9IG4gJT4nIG5hbWU9J2Zvcm08JT0gbiAlPicgYWN0aW9uPScjJz5cIiwgXCI8L2Zvcm0+XCJdLFxuICAgIHF1ZXN0aW9uQm94OiBbXCI8ZGl2IGNsYXNzPSdhcnRpY2xlX19ibG9jayBhcnRpY2xlX19ibG9jazwlPSBuICU+JyBpZD0ndGVzdC1ib3g8JT0gbiAlPic+XCIsIFwiPC9kaXY+XCJdLFxuICAgIHF1ZXN0aW9uSGVhZDogXCI8aDMgY2xhc3M9J2FydGljbGUgYXJ0aWNsZV9fZXggYXJ0aWNsZV9fZXhfPCU9IG4gJT4nPjwlPSBuICU+LiA8JS0gdHh0ICU+PC9oMz5cIixcbiAgICBsYWJlbDogXCI8bGFiZWw+PGlucHV0IHR5cGU9JzwlPSB0eXBlICU+JyBuYW1lPSdxPCU9IG4gJT4nIHZhbHVlPScxJz48JS0gdHh0ICU+PC9sYWJlbD48L2JyPlwiLFxuICAgIGJ1dHRvbjogXCI8aW5wdXQgY2xhc3M9J2FydGljbGUgYXJ0aWNsZV9fYnV0dG9uJyBpZD0nc3VibWl0X3AxJyB0eXBlPSdzdWJtaXQnIG5hbWU9J2J0bicgdmFsdWU9JzwlPSB0b3BpY1sxXSAlPic+XCIsXG4gICAgbW9kYWxXaW5kb3c6IFwiPGRpdiBpZD0nbVcnPjxoMj5SZXN1bHRzOjwvaDI+PGRpdiBpZD0nb3V0TVcnPjwvZGl2PjwvZGl2PlwiLFxuICAgIHJlc3VsdHM6IFwiPCUgXy5mb3JFYWNoKHJlc3VsdCwgZnVuY3Rpb24ocmVzKSB7ICU+PGgzPjwlLSByZXMgJT48L2gzPjwlIH0pOyAlPlwiXG59O1xuLy8gc29tZSBkYXRhXG5sZXQgX2RhdGEgPSB7XG4gICAgdG9waWM6IFtcIkphdmFTY3JpcHQgUXVpeiBUZXN0XCIsIFwiUmVzdWx0XCJdLFxuICAgIHR5cGU6IFtcInJhZGlvXCIsIFwiY2hlY2tib3hcIl1cbn07XG4vLyBxdWVzdGlvbiBpbnNlcnQgaW4gb2JqLiBleGFtLCBrZXkgbXVzdCBiZSBuYW1lZCBcInExLCBxMiwgLi4uLCBxTidcbmxldCBleGFtID0ge1xuICAgIHEwOiBbXG4gICAgICAgIC8vIFF1ZXN0aW9uXG4gICAgICAgIFwiSW5zaWRlIHdoaWNoIEhUTUwgZWxlbWVudCBkbyB3ZSBwdXQgdGhlIEphdmFTY3JpcHQ/XCIsXG4gICAgICAgIC8vIEFuc3dlcnNcbiAgICAgICAgLy8gMFxuICAgICAgICBcIlxcPHNjcmlwdFxcPlwiLFxuICAgICAgICAvLyAxXG4gICAgICAgIFwiXFw8amF2YXNjcmlwdFxcPlwiLFxuICAgICAgICAvLyAyXG4gICAgICAgIFwiXFw8c2NyaXB0aW5nXFw+XCIsXG4gICAgICAgIC8vIHRydWUgYW5zd2VyIFwiMFwiID0gXCJcXDxzY3JpcHRcXD5cIlxuICAgICAgICAwXG4gICAgXSxcbiAgICBxMTogW1xuICAgICAgICBcIldoYXQgaXMgdGhlIGNvcnJlY3QgSmF2YVNjcmlwdCBzeW50YXggdG8gY2hhbmdlIHRoZSBjb250ZW50IG9mIHRoZSBIVE1MIGVsZW1lbnQgYmVsb3c/IFxcPHAgaWQ9J2RlbW8nXFw+VGhpcyBpcyBhIGRlbW9uc3RyYXRpb24uXFw8L3BcXD5cIixcbiAgICAgICAgXCJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtbycpLmlubmVySFRNTCA9ICdIZWxsbyBXb3JsZCEnXCIsXG4gICAgICAgIFwiZG9jdW1lbnQuZ2V0RWxlbWVudCgncCcpLmlubmVySFRNTCA9ICdIZWxsbyBXb3JsZCEnXCIsXG4gICAgICAgIFwiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5TmFtZSgncCcpLmlubmVySFRNTCA9ICdIZWxsbyBXb3JsZCEnXCIsXG4gICAgICAgIFwiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5TmFtZSgncCcpLmh0bWwgPSAnSGVsbG8gV29ybGQhJ1wiLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBxMjogW1xuICAgICAgICBcIldoZXJlIGlzIHRoZSBjb3JyZWN0IHBsYWNlIHRvIGluc2VydCBhIEphdmFTY3JpcHQ/XCIsXG4gICAgICAgIFwiVGhlIDxib2R5PiBzZWN0aW9uXCIsXG4gICAgICAgIFwiVGhlIDxoZWFkPiBzZWN0aW9uXCIsXG4gICAgICAgIFwiVGhlIDxmb3JtPiBzZWN0aW9uXCIsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdLFxuICAgIHEzOiBbXG4gICAgICAgIFwiVGhlIGV4dGVybmFsIEphdmFTY3JpcHQgZmlsZSBtdXN0IGNvbnRhaW4gdGhlIFxcPHNjcmlwdFxcPiB0YWcuXCIsXG4gICAgICAgIFwiRmFsc2VcIixcbiAgICAgICAgXCJUcnVlXCIsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIHE0OiBbXG4gICAgICAgIFwiSG93IHRvIHdyaXRlIGFuIElGIHN0YXRlbWVudCBpbiBKYXZhU2NyaXB0P1wiLFxuICAgICAgICBcImlmIGkgPSA1IHRoZW5cIixcbiAgICAgICAgXCJpZiBpID09IDUgdGhlblwiLFxuICAgICAgICBcImlmIGkgPSA1XCIsXG4gICAgICAgIFwiaWYgKGkgPT0gNSlcIixcbiAgICAgICAgXCJpZiAoaSA9PT0gNSlcIixcbiAgICAgICAgMyxcbiAgICAgICAgNFxuICAgIF1cbn07XG4vLyBzYXZlIHRvIGxvY2FsU3RvcmFnZVxubGV0IHNldElubGV0ID0gKHF1aXopID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImV4YW1cIiwgSlNPTi5zdHJpbmdpZnkocXVpeikpO1xufTtcbi8vIGdldCBmcm9tIGxvY2FsU3RvcmFnZSBhbmQgcmVtb3ZlIGRhdGFcbmxldCBnZXRPdXQgPSAoKSA9PiB7XG4gICAgbGV0IHRlbXAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZXhhbVwiKSk7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKFwiZXhhbVwiKTtcbiAgICByZXR1cm4gdGVtcDtcbn07XG4vL2dlbmVyYXRlIGh0bWwgZnJvbSB0ZW1wbGF0ZXMgKG9iai4gdG1wbHMpLiBFeHRyYWN0IGVuZCBnZW5lcmF0ZSBvYmouIHNldEFuc3dlcnMgd2l0aCB0cnVlIGFuc3dlcnMgZm9ybSBvYmouIGV4YW1cbmZ1bmN0aW9uIGdlbk1haW5UYW1wbGF0ZShfZGF0YSwgcXVpeiwgdG1wbHMpe1xuICAgIGxldCBrZXksXG4gICAgICAgIHEgPSAxLFxuICAgICAgICBvcHRpb24gPSAxLFxuICAgICAgICBkLFxuICAgICAgICBodG1sID0gYCR7dG1wbHMubW9kYWxXaW5kb3d9JHt0bXBscy5oZWFkZXJ9YDtcbiAgICBmb3Ioa2V5IGluIHF1aXope1xuICAgICAgICBsZXQgcXVhbnRpdHkgPSBxdWl6W2tleV0ubGVuZ3RoO1xuICAgICAgICBodG1sID0gYCR7aHRtbH0gJHtfLnRlbXBsYXRlKHRtcGxzLnF1aXpGb3JtWzBdKSh7J24nOiBxfSl9ICR7Xy50ZW1wbGF0ZSh0bXBscy5xdWVzdGlvbkJveFswXSkoeyduJzogcX0pfSAke18udGVtcGxhdGUodG1wbHMucXVlc3Rpb25IZWFkKSh7J24nOiBxLCAndHh0JzogcXVpeltrZXldWzBdfSl9YDtcbiAgICAgICAgc2V0QW5zd2Vyc1trZXldID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKXtcbiAgICAgICAgICAgIGxldCBrID0gcXVpeltrZXldW2ldO1xuICAgICAgICAgICAgaWYodHlwZW9mIGsgPT09ICdudW1iZXInKXtcbiAgICAgICAgICAgICAgICBzZXRBbnN3ZXJzW2tleV0ucHVzaChxdWl6W2tleV1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBxdWFudGl0eTsgaSsrKXtcbiAgICAgICAgICAgIGxldCBrID0gcXVpeltrZXldW2ldO1xuICAgICAgICAgICAgaWYodHlwZW9mIGsgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgICAgICBzZXRBbnN3ZXJzW2tleV0ubGVuZ3RoID4gMSA/IGh0bWwgPSBgJHtodG1sfSAke18udGVtcGxhdGUodG1wbHMubGFiZWwpKHsnbic6IG9wdGlvbiwgJ3R4dCc6IHF1aXpba2V5XVtpXSAsICd0eXBlJzogX2RhdGEudHlwZVsxXX0pfWBcbiAgICAgICAgICAgICAgICAgICAgOiBodG1sID0gYCR7aHRtbH0gJHtfLnRlbXBsYXRlKHRtcGxzLmxhYmVsKSh7J24nOiBxLCAndHh0JzogcXVpeltrZXldW2ldICwgJ3R5cGUnOiBfZGF0YS50eXBlWzBdfSl9YDtcbiAgICAgICAgICAgICAgICBvcHRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBodG1sID0gYCR7aHRtbH0ke3RtcGxzLnF1ZXN0aW9uQm94WzFdfSR7dG1wbHMucXVpekZvcm1bMV19YDtcbiAgICAgICAgcSsrO1xuICAgIH1cbiAgICBodG1sID0gYCR7aHRtbH0ke3RtcGxzLmJ1dHRvbn1gO1xuICAgIHJldHVybiBodG1sO1xufVxuLy8gZXhhbWluZWUgYW5zd2VycywgZ2VuZXJhdGluZyBvYmouIHJlc3VsdFxubGV0IGdlblJlc3VsdCA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0ge30sXG4gICAgICAgIGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IGZvcm1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgcmVzdWx0WydxJyArIGldID0gW107XG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBmb3Jtc1tpXS5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICBpZihmb3Jtc1tpXVtqXS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgcmVzdWx0WydxJyArIGldLnB1c2goaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vLyBjb21wYXJlIGFuc3dlcnMgdG8gcXVlc3Rpb25zXG5sZXQgcmVzdWx0RXEgPSAoc2V0QW5zd2VycywgcmVzdWx0KSA9PiB7XG4gICAgbGV0IHJlcyA9IFtdLFxuICAgICAgICByZXNPYmogPSB7fSxcbiAgICAgICAgLy8gbnVtYmVyIHJlc3BvbnNlIGluIG9yZGVyXG4gICAgICAgIGNvdW50ID0gMTtcbiAgICBmb3IobGV0IGsgaW4gc2V0QW5zd2Vycyl7XG5cbiAgICAgICAgaWYoXy5pc0VxdWFsKHNldEFuc3dlcnNba10sIHJlc3VsdFtrXSkpe1xuICAgICAgICAgICAgcmVzLnB1c2goY291bnQgKyAnLiB0cnVlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaChjb3VudCArICcuIGZhbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmVzT2JqLnJlc3VsdCA9IHJlcztcbiAgICByZXR1cm4gcmVzT2JqO1xufTtcbi8vIHBvcCB1cCBhbmQgZG93biBvZiBtb2RhbCB3aW5kb3dcbmxldCBtV2luZG93ID0gKGVsKSA9PiB7XG4gICAgLy8gdGhlIG9yaWdpbiB2YWx1ZSBvZiBkaXNwbGF5IHByb3AuIGVxLiAnbm9uZSdcbiAgICAoZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8IGVsLnN0eWxlLmRpc3BsYXkgPT09ICcnKSA/IGVsLnN0eWxlLmRpc3BsYXkgPSAnaW5oZXJpdCcgOiBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcbi8vIGRlZGljYXRlZCBhbnN3ZXJzIGNsZWFuaW5nXG5sZXQgcmVDaGVja2VkID0gKGVsKSA9PiB7XG4gICAgbGV0IHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLFxuICAgICAgICBpO1xuICAgIGZvcihpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBzW2ldLmNoZWNrZWQgPSAnJztcbiAgICAgICAgc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICB9XG59O1xuLy8gcmUgZXhhbSBoYW5kbGVyXG5sZXQgcmVsb2FkSGFuZGxlciA9IChlKSA9PiB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtV1wiKTtcbiAgICBpZiAoIGUua2V5Q29kZSA9PT0gMjcgfHwgZS50eXBlID09PSAnY2xpY2snICkge1xuICAgICAgICByZUNoZWNrZWQoIGVsICk7XG4gICAgICAgIGlmKGVsLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykgbVdpbmRvdyhlbCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcmVsb2FkSGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbG9hZEhhbmRsZXIpO1xuICAgIH1cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAvLyBzYXZlIHRvIGxvY2FsU3RvcmFnZVxuICAgIHNldElubGV0KGV4YW0pO1xuICAgIC8vIGdldCBmcm9tIGxvY2FsU3RvcmFnZSBhbmQgcmVtb3ZlIGRhdGFcbiAgICBsZXQgcXVpeiA9IGdldE91dCgpO1xuICAgIC8vIGluc2VydCBnZW5lcmF0ZWQgZXhhbSBodG1sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nICkuaW5uZXJIVE1MID0gXy50ZW1wbGF0ZShnZW5NYWluVGFtcGxhdGUoX2RhdGEsIHF1aXosIHRtcGxzKSkoX2RhdGEpO1xuICAgIC8vIGJ1dHRvbiBcIlJlc3VsdFwiIGV2ZW50IGhhbmRsZXJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0X3AxJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1XXCIpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBsZXQgYW5zd2VycyA9IGdlblJlc3VsdCgpO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IHJlc3VsdEVxKHNldEFuc3dlcnMsIGFuc3dlcnMpO1xuICAgICAgICAvLyBpbnNlcnQgYW5zd2VycyBpbnRvIG1vZGFsIHdpbmRvd1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0TVcnKS5pbm5lckhUTUwgPSBfLnRlbXBsYXRlKHRtcGxzLnJlc3VsdHMpKHJlc3VsdHMpO1xuICAgICAgICBtV2luZG93KGVsKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByZWxvYWRIYW5kbGVyKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVsb2FkSGFuZGxlcik7XG4gICAgfSwgZmFsc2UpO1xufSk7Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
