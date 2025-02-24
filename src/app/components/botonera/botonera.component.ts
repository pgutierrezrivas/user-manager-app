import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-botonera',
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  // injectamos el servicio y las rutas
  usersService = inject(UsersService);
  router = inject(Router);

  // creamos dos inputs ya que dependiendo donde estemos, el boton va a ser 'ver detalle' o 'volver a listado' (reutilizar el mismo boton)
  @Input() _id: string;
  @Input() parent: string; // para saber si su padre tiene un valor u otro

  constructor() {
    this._id = "";
    this.parent = "";
  }

  deleteUser(_id: string) {
    let confirmation = confirm('Esta seguro de que quiere eliminar el usuario: ' + this._id);
    if (confirmation) {
      // llamo al servicio para eliminar el usuario
      this.usersService.delete(_id).subscribe({
        next: (response: User) => {
          console.log('Usuario eliminado: ', response);
          alert('Usuario eliminado correctamente');
          if (this.parent == 'view') {
            this.router.navigate(['/home']);
          }
          else if (this.parent == 'card') {
            location.reload();
          }
        }, 
        error: (err) => {
          console.error('Error al eliminar el usuario: ', err);
          alert('Hubo un error al eliminar el usuario');
        }
      });
    }
  }

}
