import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ContactResponse } from 'src/app/http-client/api-http-client';
import { TravelplanService } from 'src/app/services/travelpan-service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  filteredContacts: Observable<ContactResponse[]> = new Observable();
  contactControl = new FormControl();

  constructor(readonly travelplanService: TravelplanService) {}
  ngOnDestroy(): void {
    this.travelplanService.selectedTravelplanDataSource.disconnect();
  }

  ngOnInit(): void {
    this.filteredContacts = this.travelplanService.loadContacts().pipe(
      tap(() => {
        this.filteredContacts = this.contactControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      })
    );
  }

  onAddContactToTravelplan(ContactResponse: ContactResponse): void {
    this.travelplanService.onAddContactToTravelplan(ContactResponse);
    this.contactControl.setValue('');
  }

  private _filter(value: string): ContactResponse[] {
    const filterValue = value.toLowerCase();

    return this.travelplanService.contacts.filter(
      (option) =>
        option.firstName!.toLowerCase().includes(filterValue) ||
        option.lastName!.toLowerCase().includes(filterValue)
    );
  }
}
