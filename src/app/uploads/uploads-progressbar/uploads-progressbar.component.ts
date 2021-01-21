import { Component, Input } from '@angular/core';
import { FileUploadService } from '../shared/upload.service';

@Component({
  selector: 'app-uploads-progressbar',
  templateUrl: './uploads-progressbar.component.html',
  styleUrls: ['./uploads-progressbar.component.scss']
})
export class UploadsProgressbarComponent {
  @Input() progressInfo: any;
  @Input() idx: number;

  constructor(private uploadService: FileUploadService) { }

  cancelUpload() {
    this.uploadService.cancelUpload(this.idx);
  }
}
