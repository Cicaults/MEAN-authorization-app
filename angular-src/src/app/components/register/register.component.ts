import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../services/flash-message.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
  	private validateService: ValidateService, 
  	private flashMessage: FlashMessageService,
  	private authServise: AuthService,
  	private router: Router
  	) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	let user = {
  		name: this.name,
  		username: this.username,
  		email: this.email,
  		password: this.password
  	}

  	if(!this.validateService.validateRegister(user)){
  		this.flashMessage.showMessage("Заполните все поля", 'alert-danger', 3500);
		return false;
  		
  	}

  	if(!this.validateService.validateEmail(user.email)){
		this.flashMessage.showMessage("Неподходящий email", 'alert-danger', 3500);
  		return false;
  	}

  	// Register user
  	this.authServise.registerUser(user).subscribe(data => {
  		if(data.success) {
  			this.flashMessage.showMessage("Регистрация прошла успешно!", 'alert-success', 3500);
  			this.router.navigate(['/login']);
  		} else {
  			this.flashMessage.showMessage(data.msg, 'alert-danger', 3500);
  			this.router.navigate(['/register']);
  		}
  	});
  }


}
