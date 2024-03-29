import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app/services';
import { IUser } from '../../../app/services/interface.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export default class NavbarComponent implements OnInit {
  public user: IUser | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
      this.authService.observable$.subscribe(u => { this.user = u });
  }
  public async submitLogout() {
    const logoutStatus = await this.authService.logout();
    if (logoutStatus)
      window.location.replace('/');
  }

}
