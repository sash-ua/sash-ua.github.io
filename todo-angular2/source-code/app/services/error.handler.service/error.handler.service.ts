
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ErrorHandlerService {
    constructor() { }
     handleError (error: any) {
        console.log(error); // log to console instead
        return Observable.throw(error);
    }
}