import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomeComponent } from "./pages/home/home.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
	{ path: "contact", component: ContactComponent },
	{ path: "home", component: HomeComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "register", component: RegisterComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
