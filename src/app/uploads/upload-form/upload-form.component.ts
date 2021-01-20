import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../shared/upload.model';
import { FileUploadService } from '../shared/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  selectedFiles: FileList;
  // currentFileUpload: FileUpload;
  filesUpload: FileUpload[];
  progressInfos = [];
  percentage: number;

  constructor(private uploadService: FileUploadService) { }

  selectFile(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    for (let i = 0; i < this.selectedFiles?.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(i: number,file) {

    this.progressInfos[i] = { value: 0, fileName: file.name };

    this.uploadService.pushFileToStorage(new FileUpload(file))
      .subscribe(
        (percent: number) => {
          this.progressInfos[i].value = Math.round(percent);
        },
        error => {
          console.log(error);
        }
      );
  }

}
