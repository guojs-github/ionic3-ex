import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { ExamplePage } from '../pages/example/example';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NativePage } from '../pages/native/native';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverDemoPage } from '../pages/popover/popover';
import { SegmentsPage } from '../pages/segments/segments';
import { ToolbarPage } from '../pages/toolbar/toolbar';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'; // 简单数据保存


@NgModule({
  declarations: [
    MyApp
	, ContactPage
	, ExamplePage
	, HomePage
	, NativePage
	, PopoverPage
	, PopoverDemoPage
	, SegmentsPage
	, TabsPage
	, ToolbarPage
	, TutorialPage
  ],
  imports: [
    BrowserModule
	, IonicModule.forRoot(MyApp)
	, IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
	, ContactPage
	, ExamplePage
	, HomePage
	, NativePage
	, PopoverPage
	, PopoverDemoPage
	, SegmentsPage
	, TabsPage
	, ToolbarPage
	, TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
