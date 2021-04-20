import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'main-page',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPageComponent implements OnInit {
  isLinear = false;
  public firstFormGroup: FormGroup = new FormGroup({
    firstCtrl: new FormControl('', Validators.required),
  });

  public secondFormGroup: FormGroup = new FormGroup({
    secondCtrl: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit() {}
}
