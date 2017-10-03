import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../services/flash-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  			private authService: AuthService,
  			private router: Router,
  			private flashMessage: FlashMessageService
  			) { }

  ngOnInit() {
  }

  onLogoutClick(){
  	this.authService.logout();
  	this.flashMessage.showMessage('Вы вышли', 'alert-success', 2000);
  	this.router.navigate(['/login']);
  	return false;
  }
}
