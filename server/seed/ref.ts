export class RefClass {
	public path: string;

	constructor(path: string) {
		this.path = path;
	}
}

export default (path: string): RefClass => {
	return new RefClass(path);
};
