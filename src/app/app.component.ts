import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { NativePage } from '../pages/native/native';
import { PopoverDemoPage } from '../pages/popover/popover';
import { SegmentsPage } from '../pages/segments/segments';
import { ToolbarPage } from '../pages/toolbar/toolbar';
import { TutorialPage } from '../pages/tutorial/tutorial';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage:any = TutorialPage;
	private _nativePage = NativePage; // Native function demo
	private _popoverDemoPage = PopoverDemoPage; // Popover demo
	private _segmentsPage = SegmentsPage; // Segments demo
	private _toolbarPage = ToolbarPage; // Toolbar demo

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

	openPopoverPage() { /* Popover demo */
		this.nav.push(this._popoverDemoPage);
	}	

	openSegmentsPage() { /* Segments demo */
		this.nav.push(this._segmentsPage);
	}
	
	openToolbarPage() {
		this.nav.push(this._toolbarPage);
	}
	
	openNativePage() { /* Native function demo */
		this.nav.push(this._nativePage);
	}	
}
