import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../services/flash-message.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: String;
	password: String;

  constructor(
  			private authService: AuthService,
  			private router: Router,
  			private flashMessage: FlashMessageService,
  			private validateService: ValidateService
  			) { }

  ngOnInit() {
  }

  onLoginSubmit(){
  	let user = {
  		username: this.username,
  		password: this.password
  	}

  	if(!this.validateService.validateLogin(user)){
  		this.flashMessage.showMessage('Введите имя пользователя и пароль', 'alert-danger', 3500);
  		return false;
  	}

  	this.authService.authenticateUser(user).subscribe(data => {
  		if(data.success) {
  			this.authService.storeUserData(data.token, data.user);
  			this.flashMessage.showMessage('Вы вошли как '+data.user.name, 'alert-success', 2000);
  			this.router.navigate(['/dashboard']);
  		} else {
  			this.flashMessage.showMessage(data.msg, 'alert-danger', 4500);
  			this.router.navigate(['/login']);
  		}
  	});
  }

}
