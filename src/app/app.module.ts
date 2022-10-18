import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HighGradeComponent } from './category/high-grade/high-grade.component';
import { RealGradeComponent } from './category/real-grade/real-grade.component';
import { MasterGradeComponent } from './category/master-grade/master-grade.component';
import { PerfectGradeComponent } from './category/perfect-grade/perfect-grade.component';
import { ToolComponent } from './category/tool/tool.component';


@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    AccountComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    HighGradeComponent,
    RealGradeComponent,
    MasterGradeComponent,
    PerfectGradeComponent,
    ToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
