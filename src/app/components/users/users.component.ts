import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  result: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.generateForm();
  }

  buildItem() {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(new RegExp(/^[+]?\d{10,12}$/))])]
    });
  }

  submit() {
    this.result = JSON.stringify(this.form.value, null, '\t');
    this.form.reset();
    this.generateForm();
  }

  generateForm(number: number = 1) {
    const items = [];
    for (let i = 0; i < number; i++) {
      items.push(this.buildItem());
    }
    this.form = this.fb.group({
      items: this.fb.array(items)
    });
  }

  deleteUserForm(formNumber: number) {
    const items = this.form.get('items') as FormArray;
    items.removeAt(formNumber);
  }

  cleanResult() {
    this.result = '';
  }
}
