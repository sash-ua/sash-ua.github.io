'use strict';

import 'norm/normalize.css';
import {Controller} from 'js/controller.js';

let enteredTodo = document.getElementById('todos__insert-item'),
    todosBody = document.getElementById('todos__body-id');
let c = new Controller(enteredTodo);
    c.dblclkHandler(todosBody);
    c.clickHandler(todosBody);