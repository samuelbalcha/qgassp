const CONFIG_DEFAULT = {
	isDevelopment: false,
	isStaging: false,
	isProduction: false,
	isDemo: false,
	MONGODB_URL: '',
	JWT_SECRET: 'co2-analyzer',
	EMAIL_SENDER: 'help@co2-analyzer.org',
	EMAIL_SENDER_NAME: 'Co2 Analyzer',
};

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CONFIG_ENV = require(`./${env}`);

export default {
	...CONFIG_DEFAULT,
	...CONFIG_ENV,
};
