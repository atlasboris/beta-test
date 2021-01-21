import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { FileUpload } from './upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  uploadTasks: AngularFireUploadTask[] = [];
  snapshot$: Observable<any>;
  pushFileToStorage(fileUpload: FileUpload): Observable<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, fileUpload.file);

    this.uploadTasks.push(uploadTask);

    uploadTask.snapshotChanges().pipe(
      catchError((v) => {
        console.log('catch error: ', v);
        return v
      }),
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: string) => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log("canceled snapshot: ", error);
      }
    );

    const persentage$ = uploadTask.percentageChanges();
    this.snapshot$ = uploadTask.snapshotChanges();
    this.snapshot$.subscribe((res) => {
      return res
    })

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(): AngularFireList<FileUpload> {
    return this.db.list(this.basePath);
  }

  cancelAll() {
    for (let task of this.uploadTasks) {
      task.cancel();
    }
    this.uploadTasks = [];
  }
  cancelUpload(i) {
    this.uploadTasks[i].cancel();
  }

  handleError() {
    console.log('handleError cactch error: ');
  }

  resetData() {
    this.uploadTasks = [];
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}