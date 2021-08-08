import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'module-loader',
  templateUrl: './module-loader.component.html',
  styleUrls: ['./module-loader.component.scss']
})



export class ModuleLoaderComponent implements OnInit {
  public myProject = {
    name: "test Project",
    location: "Kymenlaakso, Finland",
    year: "2020",
    owner: "test"
  }
  landuse = false;
  trafic = false;
  buildings = false;
  consumption = false;
  constructor() { }

  ngOnInit(): void {


  }

}
