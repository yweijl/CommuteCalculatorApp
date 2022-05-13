import { Component, OnInit } from '@angular/core';
import { Address, ContactResponse } from 'src/app/http-client/api-http-client';
import { TravelplanService } from 'src/app/services/travelpan-service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-new-travelplan',
  templateUrl: './new-travelplan.component.html',
  styleUrls: ['./new-travelplan.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NewTravelplanComponent implements OnInit {
  constructor(public travelplanService: TravelplanService) {}

  ngOnInit(): void {}

  columnsToDisplay = ['Number', 'Origin', 'Destination'];
  expandedElement: [number, ContactResponse] | null | undefined;

  onResetTravelplan() {
    this.travelplanService.resetTravelplan();
  }

  onCalculateTravelplan() {
    this.travelplanService.onCalculateTravelplan();
  }

  getRouteOrigin(route: [id: number, contact: ContactResponse]): string {
    return `${route[1].firstName} ${route[1].lastName}`;
  }

  addressToString(address: Address): string {
    return !address
      ? ''
      : `${address.street} ${address.houseNumber}${
          !address.houseNumberAddition
            ? ''
            : ' ' + address.houseNumberAddition.trim()
        }, ${address.city}`;
  }

  destinationAddressToString(id: number): string {
    let contact = this.travelplanService?.travelplan?.find(
      (x) => x[0] === id + 1
    );
    return contact != null ? this.addressToString(contact[1].address!) : '';
  }

  getRouteDestination(id: number): string {
    let route = this.travelplanService?.travelplan?.find(
      (x) => x[0] === id + 1
    );
    return route != null ? `${route[1].firstName} ${route[1].lastName}` : '';
  }
}
