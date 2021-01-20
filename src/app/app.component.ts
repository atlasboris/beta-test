import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beta-test';
  On: boolean = false;
  filesNumber: number = 4;
  isCollapsed: boolean = false;

  togglePopup() {
    this.On = !this.On;
  }
}
