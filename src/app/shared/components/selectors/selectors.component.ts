import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

interface Iselected {
  name: string;
  value: boolean;
}
@Component({
  selector: 'selectors',
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.scss']
})


export class SelectorsComponent implements OnInit {

  @Input() myProject: any;

  @Output() selectedValue = new EventEmitter<Iselected>();

  landuse = false;
  trafic = false;
  buildings = false;
  consumption = false;

  selected(value: boolean, name: string) {
    if (name == 'landuse') { this.landuse = value; }
    if (name == 'trafic') { this.trafic = value; }
    if (name == 'buildings') { this.buildings = value; }
    if (name == 'consumption') { this.consumption = value; }
    this.selectedValue.emit({ name: name, value: value });
  }
  constructor() { }

  ngOnInit() {

  }

}
