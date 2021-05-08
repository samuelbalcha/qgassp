import { Component, OnInit } from '@angular/core';
import { LandTypes } from '../../../../enums/LandTypes';

@Component({
  selector: 'location-use-change',
  templateUrl: './land-use-change.component.html',
  styleUrls: ['./land-use-change.component.scss'],
})
export class LandUseChangeComponent implements OnInit {
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
  }
}
