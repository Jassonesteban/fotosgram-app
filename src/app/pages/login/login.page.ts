import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIserviceService } from '../../services/uiservice.service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  



  loginUser = {
    email: 'jgualguanguzman@gmail.com',
    password: '123456'
  }

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  }

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiserviceService: UIserviceService, private _storage: Storage) {
    this._storage.create();
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiserviceService.alertaInformativa('Usuario/contrseña no son correctos.');
    }

  }

  async register(fRegistro: NgForm) {

    if (fRegistro.invalid) {
      return;
    }

    const valido = await  this.usuarioService.GuardarRegistro(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiserviceService.alertaInformativa('Ups, los datos ya existen en nuestro sistema, inicia sesion');
    }
  }



  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
