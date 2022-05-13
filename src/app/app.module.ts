import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  API_BASE_URL,
  AuthenticationClient,
  ContactsClient,
  TravelplansClient,
} from './http-client/api-http-client';
import { AddContactFormComponent } from './contacts/add-contact-form/add-contact-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { JwtInterceptor } from './http-client/JwtInterceptor';
import { AuthGuard } from './authentication/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { NewTravelplanComponent } from './travelplans/new-travelplan/new-travelplan.component';
import { SplittedViewComponent } from './shared/splitted-view/splitted-view.component';
import { UserTravelplansComponent } from './travelplans/user-travelplans/user-travelplans.component';
import { SaveTravelplanComponent } from './travelplans/save-travelplan/save-travelplan.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-travelplans',
    component: UserTravelplansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthenticationComponent },
  { path: '**', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    AddContactFormComponent,
    AuthenticationComponent,
    ContactListComponent,
    NewTravelplanComponent,
    SplittedViewComponent,
    UserTravelplansComponent,
    SaveTravelplanComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatAutocompleteModule,
    CdkTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://localhost:7127' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' },
    AuthenticationClient,
    ContactsClient,
    TravelplansClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//https://commutecalculator20220402142458.azurewebsites.net
// https://localhost:7127
