import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../services/flash-message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
  			private authService: AuthService,
  			private router: Router,
  			private flashMessage: FlashMessageService
  			) { }

  user: Object;

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
  		this.user = profile.user;
  	},
  	err => {
  		this.flashMessage.showMessage('Ошибка при получении данных профиля', 'alert-danger', 3000);
  		return false;
  	});
  }

}
