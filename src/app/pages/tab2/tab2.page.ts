import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(private postsService: PostsService, private route: Router, private geolocation: Geolocation, private Camara: Camera) { }

  async crearPost() {
    const creado = await this.postsService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');

  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = resp.coords.latitude + " , " + resp.coords.longitude;
      this.post.coords = coords;
      console.log(coords);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
    console.log(this.post);
  }

  camera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.Camara.DestinationType.FILE_URI,
      encodingType: this.Camara.EncodingType.JPEG,
      mediaType: this.Camara.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.Camara.PictureSourceType.CAMERA
    };
    this.procesarIMG(options);


  }

  gallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.Camara.DestinationType.FILE_URI,
      encodingType: this.Camara.EncodingType.JPEG,
      mediaType: this.Camara.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.Camara.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarIMG(options);

  }

  procesarIMG(options: CameraOptions) {
    this.Camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postsService.subirImg(imageData);
      this.tempImages.push(img);
    }, (err) => {
      // Handle error
    });
  }

}
