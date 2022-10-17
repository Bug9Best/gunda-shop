import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { IntroComponent } from './intro/intro.component';
import { HighgradeComponent } from './category/highgrade/highgrade.component';
import { RealgradeComponent } from './category/realgrade/realgrade.component';
import { MastergradeComponent } from './category/mastergrade/mastergrade.component';
import { HighGradeComponent } from './category/high-grade/high-grade.component';
import { RealGradeComponent } from './category/real-grade/real-grade.component';
import { MasterGradeComponent } from './category/master-grade/master-grade.component';
import { PerfectGradeComponent } from './category/perfect-grade/perfect-grade.component';
import { ToolComponent } from './category/tool/tool.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    CartComponent,
    AccountComponent,
    SearchComponent,
    IntroComponent,
    HighgradeComponent,
    RealgradeComponent,
    MastergradeComponent,
    HighGradeComponent,
    RealGradeComponent,
    MasterGradeComponent,
    PerfectGradeComponent,
    ToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
