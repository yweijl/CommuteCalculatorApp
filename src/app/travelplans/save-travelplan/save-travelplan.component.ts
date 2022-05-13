import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  RouteRegistrationResponse,
  PersistTravelplanRequest,
  RouteRegistrationRequest,
  NavigationAddress,
} from 'src/app/http-client/api-http-client';

@Component({
  selector: 'app-save-travelplan',
  templateUrl: './save-travelplan.component.html',
  styleUrls: ['./save-travelplan.component.scss'],
})
export class SaveTravelplanComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SaveTravelplanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RouteRegistrationResponse[]
  ) {
    dialogRef.disableClose = true;
  }

  travelplanName: string = '';
  selectedDate = new FormControl(new Date());

  ngOnInit(): void {}

  onSave(): void {
    let tempDate = new Date();
    let registrationDate: Date = this.selectedDate.value;
    registrationDate.setHours(
      tempDate.getHours(),
      tempDate.getMinutes(),
      tempDate.getSeconds()
    );

    var request = new PersistTravelplanRequest({
      name: this.travelplanName,
      registrationDate: registrationDate,
      routes: this.data?.map(
        (x) =>
          new RouteRegistrationRequest({
            destination: x.destination,
            distance: x.distance,
            origin: x.origin,
          })
      ),
    });
    this.dialogRef.close(request);
  }

  dateChanged(type: string, event: any): void {
    this.selectedDate.setValue(event.value);
  }

  addressToString(address: NavigationAddress): string {
    return `${address.street} ${address.houseNumber} ${address.houseNumberAddition} ${address.postalCode} ${address.city}`;
  }

  onDiscard(): void {
    this.dialogRef.close();
  }
}
