import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AboutComponent } from "./about/about.component";
import { HelpComponent } from "./help/help.component";

export const AUTH_ROUTES: Routes = [
    {path: '',component: WelcomeComponent},
    {path: 'about',component: AboutComponent},
    {path: 'help',component: HelpComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
]