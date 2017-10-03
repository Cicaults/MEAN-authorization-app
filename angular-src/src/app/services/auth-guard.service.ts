import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { FlashMessageService } from './flash-message.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
  	private authService: AuthService,
  	private router: Router,
  	private flashMessage: FlashMessageService
  	) { }

  	canActivate(){
  		if(this.authService.loggedIn())
  			return true;
  		else {
			  this.flashMessage.showMessage('Вы не авторизованы', 'alert-warning', 2000);
  			this.router.navigate(['/login']);
  			return false;
  		}
  	}
}
