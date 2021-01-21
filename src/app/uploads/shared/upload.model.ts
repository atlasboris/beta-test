export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  state: any;

  constructor(file: File) {
    this.file = file;
  }
}