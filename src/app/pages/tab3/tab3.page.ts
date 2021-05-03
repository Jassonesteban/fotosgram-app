import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UIserviceService } from '../../services/uiservice.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uIserviceService: UIserviceService, private postsService: PostsService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

  }

  async updateUser(fActualizar: NgForm) {

    if (fActualizar.invalid) {
      return;
    }

    const update = await this.usuarioService.UpdateUser(this.usuario);
    console.log(update);

    if(update){
      this.uIserviceService.presentToast('Se actualizo el perfil');
    } else {
      this.uIserviceService.presentToast('OH NO, hubo un error al actualizar su perfil');
    }



  }

  logout() {
    this.postsService.paginaPost = 0;
    this.usuarioService.logout();
  }
}
