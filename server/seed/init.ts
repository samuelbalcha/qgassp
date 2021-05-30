import { createAll } from './index';

async function run(): Promise<void> {
	console.log('Stared creating seed');
	await createAll();
}

run()
	.then(async () => {
		console.log('Done creating seed');

		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		return 1;
	});
