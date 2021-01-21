import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../shared/upload.service';

@Component({
  selector: 'app-uploads-popup',
  templateUrl: './uploads-popup.component.html',
  styleUrls: ['./uploads-popup.component.scss']
})
export class UploadsPopupComponent {
  @Input() progressInfos: any[] = [];
  On: boolean = true;
  isCollapsed: boolean = false;

  constructor(private uploadService: FileUploadService) { }

  togglePopup() {
    this.On = !this.On;
  }

  cancelAll() {
    this.uploadService.cancelAll();
  }

}
