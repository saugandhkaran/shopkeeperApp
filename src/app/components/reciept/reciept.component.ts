import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MobileService } from '../../services/mobile/mobile.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.scss']
})
export class RecieptComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private mobileService: MobileService) { }

  ngOnInit() {
    this.fetchOrderDetails();
  }

  public recieptDetails;

  fetchOrderDetails() {
    this.route.queryParams.subscribe(params => {
      var id = params['id'];
      this.mobileService.getBillDetails(id).subscribe((data) => {
        this.recieptDetails = data[0];
      })
    });
  }

  print() {
    const doc = document.getElementById('header');
    doc.style.display = 'none';
    window.print();
    doc.style.display = 'flex';
  }
}
