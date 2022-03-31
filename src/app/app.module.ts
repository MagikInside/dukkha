import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { environment } from '../environments/environment';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IntroComponent } from './intro/intro.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection/selection/selection.component';
import { DisplayComponent } from './selection/characters-display/characters-display.component';
import { SelectionDisplayComponent } from './selection/selection-display/selection-display.component';
import { PhaseDisplayComponent } from './selection/phase-display/phase-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntroComponent,
    SelectionComponent,
    DisplayComponent,
    SelectionDisplayComponent,
    PhaseDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
