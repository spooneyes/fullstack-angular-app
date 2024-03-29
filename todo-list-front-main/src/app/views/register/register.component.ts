import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
  ) {
    this.titleService.setTitle('Register');
  }
    ngOnInit(): void {
      this.authService.observable$.subscribe(user => { if (user) this.router.navigate([ '/' ]); });
    }

    async submitRegister(f: NgForm) {
      const { first_name, last_name, email, password } = f.value;
      if (!first_name || !last_name || !email || !password)
        return;
      const registerStatus = await this.authService.register({
        first_name,
        last_name,
        email,
        password,
      });
      if (!registerStatus)
        return;
      return this.router.navigate([ 'login' ]);
    }

}
