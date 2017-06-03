/* 	
	传递参数的对话框，好像一个ts只能输出一个页面
	2017.5.18 GuoJS
 */
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modalContentPage.html' /* 指向用什么页面显示 */
})

export class ModalContentPage {
	private _character; /* 角色数组 */

	constructor( /* 构造函数 */
		public platform: Platform
		, public params: NavParams
		, public viewCtrl: ViewController) {
		var characters = [
			{
				name: '格鲁姆',
				quote: 'Sneaky little hobbitses!',
				image: 'assets/img/avatar-gollum.jpg',
				items: [
					{ title: '种族', note: '霍比特' },
					{ title: '文化', note: 'River Folk' },
					{ title: 'Alter Ego', note: 'Smeagol' }
				]
			},
			{
				name: '福拉多',
				quote: 'Go back, Sam! I\'m going to Mordor alone!',
				image: 'assets/img/avatar-frodo.jpg',
				items: [
				  { title: '种族', note: '霍比特' },
				  { title: '文化', note: 'Shire Folk' },
				  { title: '武器', note: 'Sting' }
				]
			}
		];
		this._character = characters[this.params.get('charNum')];
	}

	dismiss() { /* 关闭窗口 */
		this.viewCtrl.dismiss();
	}
}
