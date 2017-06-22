import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ExamplePage } from '../example/example';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
	templateUrl: 'template.html',
  	providers: [
		ScreenOrientation
	]
})

export class TabsPage {
	tab1Root = HomePage;
	tab2Root = ExamplePage;
	tab3Root = ContactPage;

	constructor(
		public screenOrientation: ScreenOrientation // 显示方向
		, public platform: Platform // 当前系统信息
	) {
		this.init();
	}
	
	init() { // Initialize
		console.log("Is ios?" + this.platform.is("ios"));
		console.log("Is android?" + this.platform.is("android"));
		console.log("Is core?" + this.platform.is("core"));
		console.log("Is cordova?" + this.platform.is("cordova"));		
		if (this.platform.is("cordova")) // 在支持cordova的设备上进行设置
			this.screenOrientation.lock("portrait-primary"); // 设置为默认竖直显示方向
	}
}
