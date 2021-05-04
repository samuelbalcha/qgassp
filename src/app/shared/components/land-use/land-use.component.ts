import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { LandTypes } from '../../../../enums/LandTypes';

@Component({
  selector: 'land-use',
  templateUrl: './land-use.component.html',
  styleUrls: ['./land-use.component.scss'],
})
export class LandUseComponent implements OnInit {
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
