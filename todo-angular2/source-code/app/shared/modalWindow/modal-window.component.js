var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import { TodosService } from "../../services/todos.service/todos.service";
import { AppComponent } from "../../AppComponent";
import { FiltersComponent } from "../../filters/filters.component";
var ModalWindowComponent = (function () {
    function ModalWindowComponent(todoService, filtersComponent, listItems) {
        this.allTodo = listItems;
        this.todoService = todoService;
        this.filtersComponent = filtersComponent;
    }
    ModalWindowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.delCompleted = Observable.fromEvent(document.getElementById('del-all-completed'), 'click')
            .subscribe(function (x) {
            _this.todoService.setLocalStorage(_this.todoService.deleteAll(_this.todoService.listItems));
            _this.allTodo.isChecked = _this.todoService.matchAllAndDone(_this.todoService.listItems);
            _this.allTodo.quantityTodos = _this.todoService.listItems.length;
            _this.filtersComponent.itemVisibility = false;
            if (_this.allTodo.quantityTodos === 0) {
                _this.allTodo.hide = true;
                _this.allTodo.isHidden = false;
            }
            ;
        });
    };
    return ModalWindowComponent;
}());
ModalWindowComponent = __decorate([
    Component({
        selector: 'm-w-del-all-done',
        template: "\n                <div class=\"modal-window\">\n                    <h2 class=\"modal-window__header\">Are you wish to delete all completed tasks, really?</h2>\n                    <div class=\"modal-window__buttons\">\n                        <input md-raised-button type=\"submit\" (click)=\"this.filtersComponent.itemVisibility = false\" (mouseenter)=\"cancelRed=true\" (mouseleave)=\"cancelRed=false\" [style.color]=\"cancelRed ? 'red' : '#000'\" class=\"modal-window__btn filters__button filters__link animated\" value=\"No\">\n                        <input md-raised-button type=\"submit\"  (mouseenter)=\"delRed=true\" (mouseleave)=\"delRed=false\" [style.color]=\"delRed ? 'red' : '#000'\" id=\"del-all-completed\" class=\"modal-window__btn filters__button filters__link animated\" value=\"Yes\">\n                    </div>\n                </div>"
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(FiltersComponent)),
    __param(2, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        FiltersComponent,
        AppComponent])
], ModalWindowComponent);
export { ModalWindowComponent };
//# sourceMappingURL=modal-window.component.js.map