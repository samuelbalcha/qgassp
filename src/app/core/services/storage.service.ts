/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

interface ICache {
	[key: string]: any;
}

@Injectable()
export class StorageService {
	cache: ICache = {};

	get(key: string) {
		if (this.cache[key]) {
			return this.cache[key];
		}

		const item = window.localStorage.getItem(key);
		return JSON.parse(item as string);
	}

	set(key: string, data: any) {
		this.cache[key] = cloneDeep(data);
		return window.localStorage.setItem(key, JSON.stringify(data));
	}

	remove(key: string) {
		delete this.cache[key];
		return window.localStorage.removeItem(key);
	}

	clear() {
		this.cache = {};
		return window.localStorage.clear();
	}
}
