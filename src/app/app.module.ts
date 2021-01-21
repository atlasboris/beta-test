import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { CommonModule } from '@angular/common';
import { UploadsPopupComponent } from './uploads/uploads-popup/uploads-popup.component';
import { UploadsProgressbarComponent } from './uploads/uploads-progressbar/uploads-progressbar.component';



@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    UploadsPopupComponent,
    UploadsProgressbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
