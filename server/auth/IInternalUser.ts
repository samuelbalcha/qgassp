export interface IInternalUser {
	_id: string;
	name: string;
	role: string;
}
export interface IUpdatePassword {
	oldPassword: string;
	password: string;
}
