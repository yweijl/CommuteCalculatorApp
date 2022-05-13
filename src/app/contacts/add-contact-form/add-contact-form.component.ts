import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddContactRequest } from 'src/app/http-client/api-http-client';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent {
  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    street: [null, Validators.required],
    houseNumber: [null, Validators.required],
    houseNumberAddition: [null],
    city: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.pattern("^\\d{4}[A-Za-z]{2}$"),
      Validators.required, 
    ])]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddContactRequest) {
      dialogRef.disableClose = true;
    }

  onSubmit(): void {
    if (this.addressForm.invalid){
      return;
    }
    this.data.firstName = this.addressForm.get('firstName')?.value;
    this.data.lastName = this.addressForm.get('lastName')?.value;
    this.data.city = this.addressForm.get('city')?.value;
    this.data.postalCode = this.addressForm.get('postalCode')?.value;
    this.data.street = this.addressForm.get('street')?.value;
    this.data.houseNumber = this.addressForm.get('houseNumber')?.value;
    this.data.houseNumberAddition = this.addressForm.get('houseNumberAddition')?.value;
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
