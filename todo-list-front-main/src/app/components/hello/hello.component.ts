import { Component, OnInit , Input} from '@angular/core';
import { IUser } from 'src/app/services/interface.service';
import { AuthService } from '../../../app/services';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export default class HelloComponent implements OnInit {
  public user: IUser | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.observable$.subscribe(u => { this.user = u });
  }

}
