import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenService } from '../authen/authen.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthenService
  ) { }

  get currentUser$(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }

  addUser(user: User){
    const data = doc(this.firestore, 'users', user.uid);
    return from(setDoc(data, user));
  }

  updateUser(user: User){
    const data = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(data, { ...user }));
  }
}
