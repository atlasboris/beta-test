import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { CommonModule } from '@angular/common';
import { UploadsPopupComponent } from './uploads/uploads-popup/uploads-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    UploadDetailComponent,
    UploadsListComponent,
    UploadsPopupComponent
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
