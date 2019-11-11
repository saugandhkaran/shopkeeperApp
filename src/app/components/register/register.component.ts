import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from '../../services/mobile/mobile.service';
import {MobileDetails} from '../../models/mobile-details.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private mobileService: MobileService, private router: Router, private activatedRoute: ActivatedRoute) { }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    model: new FormControl(''),
    contact: new FormControl(''),
    accessories: new FormControl(''),
    issue: new FormControl(''),
    return: new FormControl('', Validators.required),
    rate: new FormControl(''),
    date: new FormControl(''),
    status: new FormControl(''),
    advance: new FormControl('')
  });

  enableEditMode = false;

  ngOnInit() {
  }

  setFormObjectForEdit(data) {
    this.registerForm.patchValue({
      name: data.name,
      model: data.model,
      contact: data.contact,
      accessories: data.accessories,
      issue: data.issue,
      return: data.return,
      rate: data.rate,
      date: data.date,
      status: data.status,
      advance: data.advance
    });
  }

  registerDevice (formObject) {
    if (!this.enableEditMode) {
      const date = new Date();
      formObject.patchValue({
        date : date,
        status : 'Pending'
      });
    }
    if (formObject.status === 'VALID' && !this.enableEditMode) {
      console.log(formObject);
      this.mobileService.registerMobile(formObject.value).subscribe((data: MobileDetails) => {
      console.log(data);
      this.router.navigate(['/generateReciept'] , {queryParams: {id: data.id}});
    });
    }

    if (formObject.status === 'VALID' && this.enableEditMode) {
      console.log(formObject);
      this.mobileService.updateMobileDetails(formObject.value).subscribe((data: MobileDetails) => {
      console.log(data);
      this.router.navigate(['/generateReciept'] , {queryParams: {id: data.id}});
    });
    }


  }
}
