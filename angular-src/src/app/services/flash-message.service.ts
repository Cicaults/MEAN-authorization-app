import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class FlashMessageService {

  constructor(private flashMessage: FlashMessagesService) { }

  // Вывод всплывающих сообщений, не больше одного одновременно
  showMessage(msg, classes, timeout){
  	let fmCount = document.getElementsByClassName('flash-message').length;
  	if(fmCount < 1) {
  		this.flashMessage.show(msg, {classes: classes, timeout: timeout});
  	}
  }

}
