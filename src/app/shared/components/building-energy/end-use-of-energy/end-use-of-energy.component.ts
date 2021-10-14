import { Component } from '@angular/core';

@Component({
    selector: 'end-use-of-energy',
    templateUrl: './end-use-of-energy.component.html',
    styleUrls: ['./../building-energy.component.scss'],
})
export class EndUseOfEnergyComponent {
    endUseData = [
        {
            useType: 'Space Heating',
            amount: 25
        }, {
            useType: 'Water Heating',
            amount: 20
        }, {
            useType: 'Light & Appliance',
            amount: 30
        }, {
            useType: 'Pumps & Fans',
            amount: 25
        }
    ];

    public getTotal() {
        const sumall = this.endUseData.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        return sumall / 100;
    }
    constructor() { }

}