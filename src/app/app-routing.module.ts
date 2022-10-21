import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: "intro",
    component: IntroComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "account",
    component: AccountComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "login",
    component: SigninComponent
  },
  {
    path: "register",
    component: SignupComponent
  },
  {
    path: "category/high-grade",
    component: HighGradeComponent
  },
  {
    path: "category/real-grade",
    component: RealGradeComponent
  },
  {
    path: "category/master-grade",
    component: MasterGradeComponent
  },
  {
    path: "category/perfect-grade",
    component: PerfectGradeComponent
  },
  {
    path: "category/tool",
    component: ToolComponent
  },
  {
    path: "search",
    component: SearchComponent
  },
  {
    path: "",
    redirectTo: "intro",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
