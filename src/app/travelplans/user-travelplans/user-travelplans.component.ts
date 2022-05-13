import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  TravelplanResponse,
  RouteRegistrationResponse,
  NavigationAddress,
} from 'src/app/http-client/api-http-client';
import { DataSerivce } from 'src/app/services/data-service';
import { UserTravelplansDataSource } from 'src/app/datatable-datasources/user-travelplans-data-source';

@Component({
  selector: 'app-user-travelplans',
  templateUrl: './user-travelplans.component.html',
  styleUrls: ['./user-travelplans.component.scss'],
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
export class UserTravelplansComponent implements OnInit {
  constructor(private dataService: DataSerivce) {}

  months: number[] = [];
  date: Date = new Date();
  selectedDate = new Date();
  travelplans: TravelplanResponse[] = [];
  selectedTravelPlans: UserTravelplansDataSource =
    new UserTravelplansDataSource();

  columnsToDisplay = ['Date', 'Total Distance'];
  expandedElement: TravelplanResponse | null | undefined;

  ngOnInit(): void {
    this.getTravelplans();
  }

  getTravelplans() {
    this.dataService.getUserTravelplans().subscribe((data) => {
      if (data.travelPlans) {
        this.travelplans = data.travelPlans.sort(
          (a, b) =>
            b.registrationDate!.getTime() - a.registrationDate!.getTime()
        );
        this.months = [
          ...new Set(
            this.travelplans.map((x) => x.registrationDate!.getMonth())
          ),
        ];

        this.onMonthSelected(this.months[0]);
      }
    });
  }

  addressToString(route: NavigationAddress): string {
    return `${route.street} ${route.houseNumber}${
      !route.houseNumberAddition ? '' : ' ' + route.houseNumberAddition.trim()
    }, ${route.city}`;
  }

  getDistanceSum(routes: RouteRegistrationResponse[]): string {
    return this.toKm(routes.map((x) => x.distance!).reduce((a, b) => a + b, 0));
  }

  toKm(distance: number): string {
    let km = distance / 1000;
    return `${km.toFixed(1)} km`;
  }

  getMonthName(month: number) {
    this.date.setMonth(month);
    return this.date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  onMonthSelected(month: number) {
    this.date.setMonth(month);
    this.selectedDate.setMonth(month);

    let filteredmonths = this.travelplans.filter(
      (x) => x.registrationDate!.getMonth() === month
    );
    this.selectedTravelPlans.setData(filteredmonths);
  }

  onDownloadTravelplan() {
    this.dataService.downloadTravelplan(this.selectedDate.getMonth());
  }
}
