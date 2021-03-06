import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private SplashScreen: SplashScreen, private StatusBar: StatusBar, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then( () => {
      this.StatusBar.styleDefault();
      this.SplashScreen.hide();
    });
  }
}
