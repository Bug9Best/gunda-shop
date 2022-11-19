import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGModule } from './modules/primeng.module';

import { HomeComponent } from './view/home/home.component';
import { AccountComponent } from './view/account/account.component';
import { CartComponent } from './view/cart/cart.component';
import { SigninComponent } from './view/signin/signin.component';
import { SignupComponent } from './view/signup/signup.component';
import { HighGradeComponent } from './view/category/high-grade/high-grade.component';
import { RealGradeComponent } from './view/category/real-grade/real-grade.component';
import { MasterGradeComponent } from './view/category/master-grade/master-grade.component';
import { PerfectGradeComponent } from './view/category/perfect-grade/perfect-grade.component';
import { ToolComponent } from '../app/view/category/tool/tool.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ModalComponent } from './component/modal/modal.component';
import { SearchComponent } from './view/search/search.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    AccountComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    HighGradeComponent,
    RealGradeComponent,
    MasterGradeComponent,
    PerfectGradeComponent,
    ToolComponent,
    NavbarComponent,
    SearchComponent,
    ModalComponent,
    FooterComponent
  ],
  imports: [
    ToastModule,
    BrowserModule,
    FormsModule,
    PrimeNGModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],

  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
