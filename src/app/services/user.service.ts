import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<firebase.User | null>;
  user: User | null = null;

  constructor(private readonly auth: AngularFireAuth) {
    this.user$ = this.auth.authState.pipe(
      tap(user => {
        if(user) {
        this.user = {name: user.displayName, uid: user.uid};
        }
      }),
    );
  }

}
