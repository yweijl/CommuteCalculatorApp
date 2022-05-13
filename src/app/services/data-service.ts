import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import {
  RegisterRequest,
  AuthenticationRequest,
  AddContactRequest,
  AuthenticationClient,
  ContactsClient,
  ApiException,
  TravelplansClient,
  ContactResponse,
  WayPointsRequest,
  PersistTravelplanRequest,
  UserTravelplanResponse,
  FileResponse,
  CalculateTravelplanRequest,
} from '../http-client/api-http-client';

@Injectable({ providedIn: 'root' })
export class DataSerivce {
  constructor(
    private contactsClient: ContactsClient,
    private authenticationClient: AuthenticationClient,
    private travelplansClient: TravelplansClient,
    private router: Router
  ) {}

  getUserContacts() {
    return this.contactsClient.list();
  }

  addContact(contact: AddContactRequest) {
    return this.contactsClient.contactsPOST(contact);
  }

  deleteContact(contactId: string) {
    return this.contactsClient.contactsDELETE(contactId);
  }

  login(
    authenticationRequest: AuthenticationRequest
  ): Observable<string | void> {
    return this.authenticationClient.login(authenticationRequest).pipe(
      map((response) => this.setTokenAndNavigateToDashboard(response)),
      catchError((error: ApiException) => {
        return of(error.response);
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<string | void> {
    return this.authenticationClient.register(registerRequest).pipe(
      map((response) => this.setTokenAndNavigateToDashboard(response)),
      catchError((error: ApiException) => {
        return of(error.response);
      })
    );
  }

  saveTravelplan(travelPlan: PersistTravelplanRequest): Observable<void> {
    return this.travelplansClient.save(travelPlan);
  }

  downloadTravelplan(month: number) {
    return this.travelplansClient.download(month + 1).subscribe((x) => {
      this.downloadFile(x);
    });
  }

  private downloadFile(file: FileResponse) {
    var blob = new Blob([file.data], { type: 'csv' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = file.fileName!;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }

  calculateTravelplan(contacts: ContactResponse[]) {
    var waypoints = new Array<WayPointsRequest>();

    for (var i = 0, n = contacts.length - 1; i < n; i++) {
      waypoints.push(
        new WayPointsRequest({
          originContactId: contacts[i].id,
          destinationContactId: contacts[i + 1].id,
        })
      );
    }

    var request = new CalculateTravelplanRequest({ waypoints: waypoints });
    return this.travelplansClient.calculateTravelplan(request);
  }

  private setTokenAndNavigateToDashboard(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
  }

  public getUserTravelplans(): Observable<UserTravelplanResponse> {
    return this.travelplansClient.getUserTravelplans();
  }

  public deleteTravelplan(id: string) {
    return this.travelplansClient.deleteTravelplan(id);
  }
}
