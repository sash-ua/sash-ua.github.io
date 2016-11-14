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
import { Component, trigger, state, style, transition, animate, Inject } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { ErrorHandlerService } from "../../services/error.handler.service/error.handler.service";
import { TodosService } from "../../services/todos.service/todos.service";
import { AppComponent } from "../../AppComponent";
var AuthComponent = (function () {
    function AuthComponent(todoService, authService, errorH, listItems) {
        this.isHiddenAuth = 'inactive';
        this.alerts = 'inactive';
        this.authService = authService;
        this.todoService = todoService;
        this.errorH = errorH;
        this.allTodo = listItems;
    }
    AuthComponent.prototype.ngOnInit = function () { };
    AuthComponent.prototype.signIn = function (email, pass) {
        var _this = this;
        this.authService.signIn(email, pass)
            .then(function (resp) {
            if (resp.uid) {
                _this.signInMsgHandler("You have successfully registered!");
                _this.isHiddenAuth = 'inactive';
            }
        })
            .catch(function (error) {
            _this.signInMsgHandler(_this.errorH.displayErrors(error));
        });
    };
    AuthComponent.prototype.logIn = function (email, pass) {
        var _this = this;
        this.authService.logIn(email, pass)
            .then(function (resp) {
            if (resp.uid) {
                _this.signInMsgHandler("You have successfully logged in!");
                _this.isHiddenAuth = 'inactive';
            }
        })
            .catch(function (error) {
            _this.signInMsgHandler(_this.errorH.displayErrors(error));
        });
    };
    AuthComponent.prototype.logOut = function () {
        var _this = this;
        var s = this.authService.logOut()
            .then(function (resp) {
            _this.todoService.clearLocalStorage([_this.todoService.lSName[0]]);
            _this.isHiddenAuth = 'inactive';
            _this.signInMsgHandler("You have successfully logged out!");
        })
            .catch(function (error) {
            _this.errorH.handleError(error);
        });
        this.allTodo.guestInit();
    };
    AuthComponent.prototype.signInMsgHandler = function (msg) {
        var _this = this;
        this.message = msg;
        this.alerts = 'active';
        setTimeout(function () {
            _this.alerts = 'inactive';
        }, 2000);
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'auth-wndw',
        styleUrls: ['auth.component.css'],
        template: "<button md-raised-button [disableRipple]=\"true\" \n    (click)=\"isHiddenAuth === 'active' ? isHiddenAuth = 'inactive' : isHiddenAuth = 'active'; $event.stopPropagation();\" \n    class=\"reg-btn\"> {{this.allTodo.logInBtn}} </button>\n<md-card id=\"auth-window\" class=\"auth-window wrapper\"\n        (keyup.escape)=\"isHiddenAuth = 'inactive'; $event.stopPropagation();\"\n        [@openHide]=\"isHiddenAuth\">\n    <md-toolbar class=\"auth-window__sign-in\">SignIn</md-toolbar>\n    <md-card-content>\n        <form name=\"sign-in\">\n            <div class=\"auth-window__form-group\">\n                <md-input #si_email (keyup.enter)=\"signIn(si_email.value, si_pass.value); si_pass.value='';\"\n                    type=\"email\" class=\"auth-window__input auth-window__input_email\" placeholder=\"Email\"></md-input>\n                <md-input #si_pass (keyup.enter)=\"signIn(si_email.value, si_pass.value); si_pass.value='';\"\n                    type=\"password\" class=\"auth-window__input auth-window__input_pass\" placeholder=\"Password\"></md-input>\n            </div>\n        </form>\n            <button md-raised-button [disableRipple]=\"true\" \n                (click)=\"signIn(si_email.value, si_pass.value); si_pass.value='';\" \n                class=\"auth-window__btn\">Sign In</button>\n            <button md-raised-button [disableRipple]=\"true\" \n                (click)=\"si_email.value=''; si_pass.value=''; isHiddenAuth = 'inactive';\" \n                class=\"auth-window__btn\">Cancel</button>\n    </md-card-content>\n    <md-toolbar class=\"auth-window__sign-in\">LogIn</md-toolbar>\n    <md-card-content>\n        <form name=\"log-in\">\n            <div class=\"auth-window__form-group\">\n               <md-input #li_email (keyup.enter)=\"logIn(li_email.value, li_pass.value); li_pass.value='';\" \n                    type=\"email\" class=\"auth-window__input auth-window__input_email\" placeholder=\"Email\" autofocus></md-input>\n               <md-input #li_pass (keyup.enter)=\"logIn(li_email.value, li_pass.value); li_pass.value='';\" \n                    type=\"password\" class=\"auth-window__input auth-window__input_pass\" placeholder=\"Password\">></md-input>\n            </div>\n        </form>\n            <button md-raised-button [disableRipple]=\"true\" (click)=\"logIn(li_email.value, li_pass.value); li_pass.value='';\" class=\"auth-window__btn\">Log In</button>\n            <button md-raised-button [disableRipple]=\"true\" (click)=\"li_email.value=''; li_pass.value=''; isHiddenAuth = 'inactive';\" class=\"auth-window__btn\">Cancel</button>\n    </md-card-content>\n    <md-toolbar class=\"auth-window__sign-in\">LogOut</md-toolbar>\n    <md-card-content>\n            <button md-raised-button [disableRipple]=\"true\" (click)=\"logOut(); li_email.value=''; li_pass.value='';\" class=\"auth-window__logout auth-window__btn\">Log Out</button>\n    </md-card-content>\n</md-card>\n<m-w-alert [data-id]=\"this.message\" [data-bind]=\"alerts\" class=\"m-w-alert\"></m-w-alert>",
        animations: [
            trigger('openHide', [
                state('active', style({ height: '635px', opacity: 1 })),
                state('inactive', style({ height: 0 })),
                transition('* <=> *', [
                    animate(300)
                ])
            ])
        ],
        providers: [AuthService]
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AuthService)),
    __param(2, Inject(ErrorHandlerService)),
    __param(3, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        AuthService,
        ErrorHandlerService,
        AppComponent])
], AuthComponent);
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map