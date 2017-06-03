/*
	片段演示
	2017.5.24 GuoJS
*/
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'template.html'
})
export class SegmentsPage {
	_pet: string = "ducklings";
	_isAndroid: boolean = false; // 判断是否为Android

	constructor(platform: Platform) {
		this._isAndroid = platform.is('android');
	}
}
