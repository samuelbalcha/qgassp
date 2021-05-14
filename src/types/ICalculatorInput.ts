export interface ICalculatorInput {
	/**
	 * Area under conversion
	 */
	area: number;

	/**
	 * Merchantable growing stock (m3/ha)
	 */
	volume?: number;

	/**
	 * Biomass conversion & expansion factor
	 */
	bcef?: number;

	/**
	 * Above ground biomass
	 */
	aboveGroundBiomass?: number;

	/**
	 * Below ground biomass
	 */
	belowGroundBiomass?: number;

	/**
	 * Ratio of below-ground biomass to above-ground biomass
	 */
	ratioBelowGroundToAboveGround?: number;

	/**
	 * Biomass carbon fraction
	 */
	carbonFraction?: number;

	/**
	 * Soil type specific emission factor
	 */
	soilEmissionFactor?: number;
}
