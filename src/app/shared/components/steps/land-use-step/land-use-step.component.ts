import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { LandTypes } from '../../../../../enums/LandTypes';

@Component({
  selector: 'land-use-step',
  templateUrl: './land-use-step.component.html',
  styleUrls: ['./../steps.scss'],
})
export class LandUseStepComponent implements OnInit {
  public landTypes = Object.values(LandTypes);

  public fromLandType: any;
  public fromSelectedLandType = '';
  public toLandType: any;
  public toSelectedLandType = '';

  constructor() {}

  ngOnInit() {}

  onFromLandTypeSelected(_event: any) {
    this.fromLandType = this.fromSelectedLandType;
  }

  onToLandTypeSelected(_event: any) {
    this.toLandType = this.toSelectedLandType;
    // this.dataSource[0].transformation = `${this.fromSelectedLandType} to ${this.toSelectedLandType}`;
  }
}
