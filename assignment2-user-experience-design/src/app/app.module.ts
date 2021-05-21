import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./structure/header/header.component";
import { FooterComponent } from "./structure/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { DataTablesModule } from "angular-datatables";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
		ContactComponent,
	],
	imports: [BrowserModule, AppRoutingModule, DataTablesModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
