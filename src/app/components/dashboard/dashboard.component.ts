import { Component, OnInit } from '@angular/core';
import { MobileService } from '../../services/mobile/mobile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private mobileService: MobileService, private router: Router) { }

  mobileData;
  searchCriteria;

  ngOnInit() {
    this.getMobileDetails();
  }

  getMobileDetails() {
    this.mobileService.getMobileData().subscribe((data) => {
      this.mobileData = data;
    });
  }

  changeStatus(status, id) {
    this.mobileService.updateMobileStatus(status, id).subscribe((data) => {
      this.getMobileDetails();
    });
  }

  goToEditMode(id) {
    this.router.navigate(['/register'] , {queryParams: {id: id}});
  };

  printReciept(id) {
    this.router.navigate(['/generateReciept'] , {queryParams: {id: id}});
  }

}
