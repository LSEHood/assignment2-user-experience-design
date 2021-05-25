import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomeComponent } from "./pages/home/home.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ResultsComponent } from "./pages/results/results.component";
import { ClubsComponent } from "./pages/clubs/clubs.component";

const routes: Routes = [
	{ path: "contact", component: ContactComponent },
	{ path: "home", component: HomeComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "results", component: ResultsComponent },
	{ path: "clubs", component: ClubsComponent },
	{ path: "**", redirectTo: "home" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
