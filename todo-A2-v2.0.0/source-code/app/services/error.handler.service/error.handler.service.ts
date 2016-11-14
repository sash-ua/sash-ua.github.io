
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ErrorHandlerService {
    constructor() { }
     handleError (error: any) {
        console.log(error); // log to console instead
        return Observable.throw(error);
    }
    displayErrors(error: Error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            return ('The password is wrong.');
        } else if(errorCode === 'auth/invalid-email') {
            return ('Enter valid email!');
        } else if (errorCode === 'auth/weak-password') {
            return ('The password is too weak.');
        } else if(errorCode === 'auth/invalid-email') {
            return ('Enter valid email!');
        } else{
            return (errorMessage);
        }
    }
}