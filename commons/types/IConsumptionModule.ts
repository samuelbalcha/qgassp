import { IProjectModule } from './IProject';

interface IEnvironment {
	population: number;
	targetArea: 'New area' | 'Partially new area' | 'Existing area';
	typeOfUrbanEnvironment: 'Rural' | 'Town' | 'City' | 'Other / mixed';
	averageHouseholdSize: number;
	averageIncomeLevel:
		| 'Top 20%'
		| '20% - 40%'
		| '40% - 60%'
		| '60% - 80%'
		| 'Bottom 80%';

	expectedRateOfGlobalDecarbonisation: number;
	sizeOfPlannedResidentialBuildings?: number;
}

interface IAreaAndPopulation {
	existingEnvironment: IEnvironment;
	newEnvironment?: IEnvironment;
}

interface IHouseHoldEnergy {
	directDistrictHeatingEmission: number;
	sourceOfHouseholdHeating: {
		districtHeating: number;
		electricity: number;
		householdFuelCombustion: number;
	};
	householdFuelCombustionMix: {
		solid: number;
		liquid: number;
		gas: number;
	};
	electricityMix?: {
		coal: number;
		gas: number;
		nuclear: number;
		hydro: number;
		wind: number;
		oilDerivatives: number;
		biomass: number;
		solarPV: number;
		solarThermal: number;
		geoThermal: number;
	};
	changeInEnergyUse?: number;
	sourceOfLocalEnergyProduction?: 'PV' | 'Wind' | 'Biomass' | 'Other';
	shareOfLocalEnergyProduction?: number;
}

interface IPublicTransport {
	bus: number;
	ferry: number;
	rail: number;
	river: number;
}

interface IConsumptionPolicy {
	areaAndPopulation: IAreaAndPopulation;
	householdEnergy: IHouseHoldEnergy;
	transportation: {
		biofuelShare: number;
		electricVehiclesShare: number;
		decreaseInPrivateFuelUse: number;
		increaseInPublicTransportUse: number;
		publicTransportShare: IPublicTransport;
	};
}

export interface IConsumption extends IProjectModule {
	baseline: {
		areaAndPopulation?: IAreaAndPopulation;
		householdEnergy?: IHouseHoldEnergy;
		transportation?: IPublicTransport;
	};
	baselineResult: {};
	policyVersions: IConsumptionPolicy[];
}
