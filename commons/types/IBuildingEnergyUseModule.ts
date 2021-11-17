interface IResidentialBuildings {
	totalHousingUnits: number;
	apartment: number;
	terraced: number;
	semiDetached: number;
	detached: number;
}

interface ICommercialBuildings {
	totalFloorArea: number;
	retal: number;
	health: number;
	hospitality: number;
	offices: number;
	industrial: number;
	warehouses: number;
	other: number;
}

interface IBuildingEnergyUsePolicy {
	residentialBuildings: {
		newBuildings: {
			floorAreaOfNewUnits: number;
			totalHousingUnits: number;
			shareOfElectricityFromRE: number;
			buildingTypes: IResidentialBuildings;
		};
		retrofitBuildings: {
			floorAreaOfNewUnits: number;
			totalHousingUnits: number;
			shareOfElectricityFromRE: number;
			buildingTypes: IResidentialBuildings;
		};
	};
}

export interface IBuildingEnergyUse {
	baseline: {
		buildings: {
			residential: IResidentialBuildings;
			commercial: ICommercialBuildings;
		};
	};
	baselineResult: {};
	policyVersion: IBuildingEnergyUsePolicy[];
}
