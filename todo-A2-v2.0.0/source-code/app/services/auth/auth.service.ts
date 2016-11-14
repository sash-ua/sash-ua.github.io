
import {Injectable} from '@angular/core';
import {database, auth} from 'firebase';
import {FB} from "../../app.module";

@Injectable()
export class AuthService {

    constructor() {}
    signIn(email: string, pass: string){
        return FB.auth().createUserWithEmailAndPassword(email, pass);
    }
    logIn(email: string, pass: string){
        return FB.auth().signInWithEmailAndPassword(email, pass);
    }
    logOut(){
        return FB.auth().signOut();
    }

}