import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploads-popup',
  templateUrl: './uploads-popup.component.html',
  styleUrls: ['./uploads-popup.component.scss']
})
export class UploadsPopupComponent {
  @Input() progressInfos: any[] = [];
  On: boolean = true;
  isCollapsed: boolean = false;

  togglePopup() {
    this.On = !this.On;
  }

}
