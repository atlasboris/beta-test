import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUpload } from '../shared/upload.model';
import { FileUploadService } from '../shared/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnDestroy {
  @ViewChild('inputFile') inputFile: ElementRef;
  selectedFiles: FileList;
  filesUpload: FileUpload[];
  progressInfos = [];
  private subscriptions: Subscription[] = [];
  constructor(private uploadService: FileUploadService) { }


  selectFile(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.progressInfos = [];
    this.uploadService.resetData();
    for (let i = 0; i < this.selectedFiles?.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    this.resetIput()
  }

  upload(i: number, file) {
    this.progressInfos[i] = { value: 0, fileName: file.name };
    let uploadSub$: Subscription =
      this.uploadService.pushFileToStorage(new FileUpload(file))
        .subscribe(
          (percent: number) => {
            this.progressInfos[i].value = Math.round(percent);
          },
          (error) => {
            console.log("canceled task: ", error);
          }
        );
    this.subscriptions.push(uploadSub$);
  }

  resetIput() {
    this.inputFile.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
