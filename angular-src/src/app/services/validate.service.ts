import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
  	if(!user.name || !user.username || !user.email || !user.password){
  		return false;
  	}

  	if(user.name.trim().length == 0 || user.username.trim().length == 0 || 
  		user.email.trim().length == 0 || user.password.trim().length == 0) {
  		return false;
  	}

  	return true;
  }

  validateEmail(email){
  	let rexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  	return rexp.test(email);
  }

  validateLogin(user) {
  	if(user.username === undefined || user.password === undefined)
  		return false;
  	if(user.username.trim().length == 0 || user.password.trim().length == 0)
  		return false;

  	return true;
  }

  

}
