import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<firebase.User | null>;

  constructor(private readonly auth: AngularFireAuth) { 
    this.user$ = this.auth.authState;
  }
}
