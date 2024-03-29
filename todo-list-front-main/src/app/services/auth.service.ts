import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser, IRegisterParam, ILoginParam } from './interface.service'
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export default class AuthService {
    private user$: Subject<IUser | null> = new Subject<IUser | null>();
    public observable$: Observable<IUser | null> = this.user$.asObservable();

constructor() { }

  async loadCurrentUser() {
    const userRes = await fetch(`${environment.API_URI}/user/currentUser`, { credentials: 'include' });
    if (!userRes.ok)
      return this.user$.next(null);
    const userJson = await userRes.json();
    this.user$.next(userJson as IUser);
  }

  async login(args: ILoginParam): Promise<boolean> {
    const loginRes = await fetch(`${environment.API_URI}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!loginRes.ok)
      return false;
    const loginJson = await loginRes.json();
    this.user$.next(loginJson as IUser);
    return true;
  }

  async register(args: IRegisterParam): Promise<boolean> {
    const registerRes = await fetch(`${environment.API_URI}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    return registerRes.ok;
  }

  async logout(): Promise<boolean> {
    const logoutRes = await fetch(`${environment.API_URI}/user/logout`, { credentials: 'include' });
    return logoutRes.ok;
  }
}
