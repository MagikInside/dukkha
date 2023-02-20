import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { environment } from '../environments/environment';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IntroComponent } from './intro/intro.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection/selection/selection.component';
import { DisplayComponent } from './selection/heroes-display/heroes-display.component';
import { SelectionDisplayComponent } from './selection/selection-display/selection-display.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PrologComponent } from './intro/prolog/prolog.component';
import { LastNightComponent } from './intro/last-night/last-night.component';
import { DescriptionComponent } from './intro/description/description.component';
import { QuestionComponent } from './intro/question/question.component';
import { SelectedHeroeComponent } from './selection/selected-hero/selected-hero.component';
import { FightComponent } from './fight/fight.component';
import { CharacterComponent } from './fight/character/character.component';
import { SummaryComponent } from './fight/summary/summary.component';
import { FightPanelComponent } from './fight/fight-panel/fight-panel.component';
import { HealthComponent } from './fight/health/health.component';
import { FightResultComponent } from './fight/fight-result/fight-result.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntroComponent,
    SelectionComponent,
    DisplayComponent,
    SelectionDisplayComponent,
    PrologComponent,
    LastNightComponent,
    DescriptionComponent,
    QuestionComponent,
    SelectedHeroeComponent,
    FightComponent,
    CharacterComponent,
    SummaryComponent,
    FightPanelComponent,
    HealthComponent,
    FightResultComponent,
    ConclusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    MatButtonToggleModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
