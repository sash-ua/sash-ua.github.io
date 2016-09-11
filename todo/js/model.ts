let _  = require('lo/lodash.js');

export class Model {
    constructor(){
        this.obj = new Map();
        this.tpl = {
            input: "<li id='<%= todoId %>' class='list__item'><label  class='todos__item' data-id='<%= todoId %>' title='Double-click to edit a Todo' ><%= value %><input type='text' id='<%= todoId %>_edit' data-id='<%= todoId %>' class='todos__edit' placeholder='Edit to-do' autofocus></label><input type='checkbox' class='todos__checkbox todos__checkbox_sub' data-id='<%= todoId %>' <%= state %>><button class='todos__checkbox todos__checkbox_del animated>' data-id='<%= todoId %>'></button></li>",
            classItem: ['visible', 'inactive', 'filters__link_act', 'visible_edit'],
            el: ['todos__body-id', 'filters__count', 'filters__link'],
            state: ['checked', '']
        };
        this.c = 0;
    }
    static addClass(el, classItem, f = 0, classesList = ''){
        let idEl = document.getElementById(el),
            classEl = document.getElementsByClassName(el);
        // add / remove class by ID.
        if(idEl){
            if(f === 1){
                idEl.classList.add(classItem);
            } else if(f === 2){
                idEl.classList.remove(classItem);
            }
            // Remove all class by class name and add one class.
        } else if((classEl) && f === 3){
            if(classesList.contains(el)){
                Model.delClass(classItem);
                classesList.add(classItem);
            }
        }
    }
    // remove all class by class name
    static delClass(className){
        let allSelectors = document.querySelectorAll('.' + className);
        for(let i = 0; i < allSelectors.length; i++){
            allSelectors[i].classList.remove(className);
        }
    }
    // if f = 1 then sorting original map obj., else return sorted clone of it.
    static sorting(state, mapObj, f = 0){
        let tempObj = mapObj;
        if(f){
            tempObj.forEach((value, key, map) => {
                if(value.state !== state) {
                    tempObj.delete(key);
                }
            });
        } else {
            tempObj = _.clone(mapObj);
            tempObj.forEach((value, key, map) => {
                if(value.state !== state) {
                    tempObj.delete(key);
                }
            });
        }
        return tempObj;
    }
    static quantityActTodos(state, mapObj){
        let t = 0;
        mapObj.forEach((value, key, map) => {
            if(value.state !== state) {
                t++;
            }
        });
        return t;
    }
    // gen. todoN obj., add into this.obj
    addTodoItem(enteredTodo){
        let todo,
            todoName = this.genTodoName();
        todo = {
            value: enteredTodo.value,
            todoId: todoName,
            state: ""
        };
        this.addItem(todoName, todo);
    }
    getObj(){
        return this.obj;
    }
    getTpl(){
        return this.tpl;
    }
    addItem(key, item){
        this.obj.set(key, item);
        return this.obj;
    }
    removeItem(key){
        this.obj.delete(key);
        return this.obj;
    }
    clearAll(){
        this.obj.clear();
        return this.obj;
    }
    checkItem(key){
        this.obj.has(key);
        return this.obj;
    }
    counter(){
        this.c++;
    }
    genTodoName(){
        this.counter();
        return `todo${this.c}`;
    }
    // check / uncheck all checked symbols
    selectAll(state, mapObj = this.obj){
        let origin = mapObj;
        mapObj.forEach((value, key, map) => {
            value.state = state;
        });
        return mapObj;
    }
    // toggle STATE: 'checked' / ''. One todoN CHECKED or NOT
    selectTodo(el, mapObj = this.obj){
        mapObj.forEach((value, key, map) => {
            if(key === el && value.state === 'checked') {
                value.state = '';
            } else if (key === el) {
                value.state = 'checked';
            }
        });
        return mapObj;
    }
    // add new VALUE to edited TODO
    editTodo(el, elValue, mapObj = this.obj){
        mapObj.forEach((value, key, map) => {
            if(key === el) {
                value.value = elValue;
            }
        });
        return mapObj;
    }
    // check that STATE: CHECKED eq. or not to quantity of all this.obj's records
    revChecked(mapObj = this.obj){
        let s = mapObj.size,
            q = 0;
        mapObj.forEach((value, key, map) => {
            if(value.state === 'checked') {
                q++;
            }
        });
        return (s === q);
    }
    // filter track by "state" from this.obj
    filters(e){
        if(e.target.id === 'all') {
            return this.getObj();
        } else if(e.target.id === 'active') {
            return Model.sorting(this.tpl.state[1], this.getObj());
        } else if(e.target.id === 'complited') {
            return Model.sorting(this.tpl.state[0], this.getObj());
        } else if(e.target.id === 'clear_complited'){
            return this.obj = Model.sorting(this.tpl.state[1], this.getObj(), 1);
        }
    }
    checkView(mapObj, tpl){
        // if one TODOS entered add filters buttons and checked symbols
        if(mapObj.size > 0) {
            Model.addClass(tpl.el[0],tpl.classItem[0], 1);
        } else {
            Model.addClass(tpl.el[0],tpl.classItem[0], 2);
        }
        // add/remove RED to main ALL CHECKED symbol
        if (!this.revChecked(mapObj)){
            Model.addClass(tpl.el[0],tpl.classItem[1], 1);
        } else {
            Model.addClass(tpl.el[0],tpl.classItem[1], 2);
        }
    }
    todoEditMode(e, todoEdit){
        let elId = e.target.getAttribute('data-id'),
            el = document.getElementById(elId),
            loseFocusEv,
            escEv;
        Model.addClass(elId, this.getTpl().classItem[3], 1);
        // if focus loses edit field escape
        todoEdit.addEventListener('blur', loseFocusEv = (e) => {
            Model.addClass(elId, this.getTpl().classItem[3], 2);
            todoEdit.removeEventListener('blur', loseFocusEv);
        });
        //if press 'esc' edit field escape
        todoEdit.addEventListener('keydown', escEv = (e) => {
            if(e.keyCode === 27){
                Model.addClass(elId, this.getTpl().classItem[3], 2);
                todoEdit.value = '';
                todoEdit.removeEventListener('keydown', escEv);
            }
        });
    }
}