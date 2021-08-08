import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMessage, MessageType, CloseType, NgAlertService } from '@theo4u/ng-alert';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  message: IMessage;
  closeTypes = CloseType;
  private alertSub: Subscription;

  constructor(private ngAlert: NgAlertService) {
  }

  ngOnInit () {
     this.alertSub = this.ngAlert.getSource().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy () {
    this.alertSub.unsubscribe();
  }

}
