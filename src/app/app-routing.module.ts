import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './view/intro/intro.component';
import { HomeComponent } from './view/home/home.component';
import { AccountComponent } from './view/account/account.component';
import { CartComponent } from './view/cart/cart.component';
import { SigninComponent } from './view/signin/signin.component';
import { SignupComponent } from './view/signup/signup.component';
import { HighGradeComponent } from './view/category/high-grade/high-grade.component';
import { RealGradeComponent } from './view/category/real-grade/real-grade.component';
import { MasterGradeComponent } from './view/category/master-grade/master-grade.component';
import { PerfectGradeComponent } from './view/category/perfect-grade/perfect-grade.component';
import { ToolComponent } from './view/category/tool/tool.component';
import { SearchComponent } from './view/search/search.component';

//import auth guard
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

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
    component: SigninComponent,
    ...canActivate(redirectLoggedInToHome),
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
