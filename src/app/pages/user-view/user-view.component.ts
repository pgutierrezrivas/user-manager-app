import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { BotoneraComponent } from "../../components/botonera/botonera.component";

@Component({
  selector: 'app-user-view',
  imports: [BotoneraComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute); // para poder acceder a rutas

  myUser!: User;
  private subscription!: Subscription;

  ngOnInit(): void {
    // obtengo el id del usuario que quiero cargar (viene en la ruta)
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      let _id: string = params._id as string;
      this.usersService.getById(_id).subscribe({
        next: (response: User) => { // tipo la respuesta como 'User'
          console.log('Respuesta de la API: ', response);
          this.myUser = response;
        },
        error: (err) => {
          console.log('Error al llamar a la API: ' + err); // muestro mensaje de error
        }
      });
    });
  }

  // si se abandona la pagina antes de que la solicitud se complete, cancelo la suscripcion para evitar fugas de memoria
  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe(); // cancelar la suscripción
    }
  }

}
