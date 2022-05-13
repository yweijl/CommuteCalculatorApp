import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';
import { AddContactFormComponent } from '../contacts/add-contact-form/add-contact-form.component';
import {
  AddContactRequest,
  ContactResponse,
  PersistTravelplanRequest,
  RouteRegistrationResponse,
} from '../http-client/api-http-client';
import { SelectedTravelplansDataSource } from '../datatable-datasources/selected-travelplans-data-source';
import { DataSerivce } from './data-service';
import { SaveTravelplanComponent } from '../travelplans/save-travelplan/save-travelplan.component';

@Injectable({ providedIn: 'root' })
export class TravelplanService {
  public contacts: ContactResponse[] = [];
  public travelplan: [id: number, contact: ContactResponse][] = [];
  public selectedTravelplanDataSource: SelectedTravelplansDataSource =
    new SelectedTravelplansDataSource();
  public travelplanCount: number = 1;

  constructor(
    private dataService: DataSerivce,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  loadContacts(): Observable<ContactResponse[]> {
    if (this.contacts.length > 0) {
      return new Observable((observer) => {
        this.contacts;
      });
    }

    return this.dataService.getUserContacts().pipe(
      tap((data) => {
        this.contacts = data == null ? [] : data;
      })
    );
  }

  AddContact(contact: AddContactRequest): void {
    this.dataService.addContact(contact).subscribe((data) => {
      this.contacts.push(data);
    });
  }

  onOpenAddContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactFormComponent, {
      width: '650px',
      data: new AddContactRequest(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.AddContact(result);
      }
    });
  }

  onAddContactToTravelplan(ContactResponse: ContactResponse): void {
    var id = this.travelplanCount;
    this.travelplanCount++;
    this.travelplan.push([id, ContactResponse]);
    this.selectedTravelplanDataSource.setData(this.travelplan);
  }

  resetTravelplan() {
    this.travelplan = [];
    this.travelplanCount = 0;
    this.selectedTravelplanDataSource.setData(this.travelplan);
  }

  onRemoveContact(contactId: string | undefined) {
    if (!contactId) {
      this.showSnackbar('Contact id not given');
      return;
    }
    this.dataService.deleteContact(contactId).subscribe({
      next: () => {
        this.showSnackbar('Contact removed');
      },
      error: () => {
        this.showSnackbar('Error removing contact');
      },
    });
  }

  onRemoveContactFromTravelplan(travelPlanId: number) {
    if (!travelPlanId) {
      this.showSnackbar('Contact id not given');
      return;
    }
    this.travelplan = this.travelplan.filter(
      (item) => item[0] !== travelPlanId
    );
  }

  private showSnackbar(message: string) {
    this.snackBar
      .open(message, 'Close', {
        duration: 3000,
      })
      .afterDismissed()
      .subscribe();
  }

  addTravelPlan(travelPlan: PersistTravelplanRequest): void {
    this.dataService.saveTravelplan(travelPlan).subscribe({
      next: () => this.showSnackbar('Travel plan saved'),
      error: () => this.showSnackbar('Error saving travel plan'),
    });
  }

  onOpenTravelplanDialog(data: RouteRegistrationResponse[]): void {
    const dialogRef = this.dialog.open(SaveTravelplanComponent, {
      width: '40%',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTravelPlan(result);
      }
    });
  }

  onCalculateTravelplan() {
    this.dataService
      .calculateTravelplan(this.travelplan.map((item) => item[1]))
      .subscribe({
        next: (data) => {
          this.showSnackbar('Travel plan calculated');
          this.onOpenTravelplanDialog(data);
          this.resetTravelplan();
        },
        error: (error) => {
          this.showSnackbar('Error calculating travel plan' + error);
        },
      });
  }
}
