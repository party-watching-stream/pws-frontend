import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../features/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthService,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  async onLoginButtonClick(): Promise<void> {
    console.log(this.form);
    const email = this.form.value.email;
    const password = this.form.value.password;

    await this.authService.login({email, password});
    try {
      await this.route.navigate(['/']);
    } catch (err) {
      alert('oops! error:' + err);
    }
  }
}
