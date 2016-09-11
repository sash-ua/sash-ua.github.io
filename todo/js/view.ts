let _  = require('lo/lodash.js');

export class View {
    constructor(mapObj, tpl){
        this.mapObj = mapObj;
        this.tpl = tpl;
        this.el = document.getElementById('list-id');
    }
    static insert(elId, str){
        document.getElementById(elId).innerHTML = str;
    }
    createTpl(obj){
        let html = '';
        obj.forEach((value, key, map) => {
            html += _.template(this.tpl.input)(value);
        });
        return html;
    }
    renderTpl(obj = this.mapObj){
        this.el.innerHTML = this.createTpl(obj);
    }
}