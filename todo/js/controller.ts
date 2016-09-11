import {Model} from 'js/model.js';
import {View} from 'js/view.js';

export class Controller{
    constructor(enteredTodo){
        this.enteredTodo = enteredTodo;
        this.m = new Model();
        this.v = new View(this.m.getObj(),
        this.m.getTpl());
    }
    htmlRender(mapObj = this.m.getObj()){
        this.v.renderTpl(mapObj);
        this.m.checkView(this.m.getObj(), this.m.getTpl());
    }
    checkInputTodo(e) {
        if(e.keyCode === 13 && e.target.value.replace(/(\s)+/g, '').length > 0 ){
            Model.delClass(this.m.getTpl().classItem[2]);
            if(e.target.id === 'todos__insert-item'){
                this.m.addTodoItem(e.target);
                e.target.value = '';
                this.htmlRender();
                View.insert(this.m.getTpl().el[1], this.m.getObj().size);
            } else {
                let el = e.target.getAttribute('data-id');
                this.m.editTodo(el, e.target.value, this.m.getObj());
                this.htmlRender();
                View.insert(this.m.getTpl().el[1], this.m.getObj().size);
                Model.addClass(el, this.m.getTpl().classItem[3], 2);
            }
        }
        e.target.removeEventListener('keypress', this.checkInputTodo);
    }
    checkAllTodos(e){
        if(e.target.checked === true) {
            this.m.selectAll('checked');
        }
        if (e.target.checked === false) {
            this.m.selectAll('');
        }
        this.htmlRender();
    }
    checkOneTodo(e){
        let el = e.target.getAttribute('data-id');
        if(e.target.checked === true) {
            this.m.selectTodo(el);
        }
        if(e.target.checked === false) {
            this.m.selectTodo(el);
        }
        this.htmlRender();
    }
    delOneTodo(e){
        let el = e.target.getAttribute('data-id'),
            locMapObj = this.m.removeItem(el);
        this.htmlRender();
        View.insert(this.m.getTpl().el[1], locMapObj.size);
        Model.delClass(this.m.getTpl().classItem[2]);
    }
    filters(e){
        let objLocal = this.m.filters(e),
            classesList = e.target.classList;
        this.htmlRender(objLocal);
        Model.addClass(this.m.getTpl().el[2], this.m.getTpl().classItem[2], 3, classesList);
        if(objLocal){
            //insert the quantity of todos.
            View.insert(this.m.getTpl().el[1], objLocal.size);
        }
    }
    dblclkHandler(el){
        el.addEventListener('dblclick', (e) => {
            let ev = e;
            if(e.target.tagName  === 'LABEL') {
                let todoEditId = ev.target.children[0];
                this.m.todoEditMode(ev, todoEditId);
            }
        }, false);
    }
    clickHandler(el){
        el.addEventListener('keypress', this.checkInputTodo.bind(this));
        el.addEventListener('click', (e) => {
            if(e.target.tagName  === 'INPUT') {
                e.target.addEventListener('keypress', this.checkInputTodo.bind(this));
            }
            if(e.target.id === 'todos__check-all'){
                this.checkAllTodos(e);
            }
            if(e.target.classList.contains('todos__checkbox_sub')){
                this.checkOneTodo(e);
            }
            if(e.target.classList.contains('filters__link')){
                this.filters(e);
            }
            if(e.target.nodeName === 'BUTTON'){
                this.delOneTodo(e);
            }
        }, false);
    }
}