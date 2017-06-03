/* 	
	导航示例的明细页
	2017.5.20 GuoJS
 */
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
	templateUrl: 'naviDetailsPage.html',
})

export class NavigationDetailsPage {
	private _item; // 显示数据信息

	constructor(params: NavParams) {
		this._item = params.data.item;
	}
}
