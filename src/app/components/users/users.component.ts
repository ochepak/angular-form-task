import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[+]?\d{10,12}$/))])
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

  clearResult() {
    this.result = '';
  }
}
