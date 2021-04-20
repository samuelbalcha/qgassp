import { ICalculatorInput } from '../types/ICalculatorInput';
import { ICalculatorOutput } from '../types/ICalculatorOutput';

const calculate = (input: ICalculatorInput): ICalculatorOutput => {
	console.log('input', input);
	return { totalCarbon: 0 };
};

const calculatorService = {
	calculate,
};

export default calculatorService;
