import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FileUpload } from '../shared/upload.model';
import { FileUploadService } from '../shared/upload.service';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss']
})
export class UploadsListComponent implements OnInit {

  fileUploads: FileUpload[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.uploadService.getFiles().snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    ).subscribe((fileUploads: FileUpload[]) => {
      this.fileUploads = [...fileUploads];
    });
  }

}
