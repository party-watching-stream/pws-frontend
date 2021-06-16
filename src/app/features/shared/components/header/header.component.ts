import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../../core/services/current-user.service';
import {User} from '../../../user/models/user.model';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(value => {
      this.user = value;
    });

  }

  logout(): void {
    this.authService.logout();
  }
}
