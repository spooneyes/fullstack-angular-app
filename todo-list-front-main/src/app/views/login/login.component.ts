import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {
    this.authService.observable$.subscribe(user => { if (user) this.router.navigate(['/']); });
  }

  public async submitLogin(f: NgForm) {
    console.log('test')
    const { email, password } = f.value;
    if (!email || !password)
      return;
    const loginStatus = await this.authService.login({
      email,
      password,
    });
    if (!loginStatus)
      return;
    this.router.navigate(['/']);
  }

}
