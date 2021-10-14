/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'transport-policy',
	templateUrl: './transport-policy.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class TransportPolicyComponent {
	@Output() onTransportPolicyChange: EventEmitter<any>;

	public biofuelShare = 80;
	public electricVehiclesShare = 80;

	public decreaseInPrivateFuelUse = 20;
	public decreaseInPrivateTransportOwnership = 20;
	public increaseInPublicTransport = 20;
	public shareOfPublicTransport = 20;

	constructor() {
		this.onTransportPolicyChange = new EventEmitter<any>();
	}
}
