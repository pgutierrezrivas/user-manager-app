import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  router = inject(Router);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  usersForm: FormGroup;
  isUpdate: boolean = false; // creo variable booleana para cambiar el valor del boton 'guardar' o 'actualizar'

  private subscription!: Subscription;

  constructor() {
    // inicializo las variables en el constructor
    this.usersForm = new FormGroup({
      _id: new FormControl(''), // campo oculto para el id
      first_name: new FormControl('', [Validators.required,
       Validators.minLength(3), Validators.maxLength(20)]),
      last_name: new FormControl('', [Validators.required,
       Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required,
       Validators.email]),
      image: new FormControl('', [Validators.required,
       Validators.pattern('https?://.+')]),
      username: new FormControl('', [Validators.required,
       Validators.minLength(6)]),
      password: new FormControl('', [Validators.required,
       Validators.minLength(6)]),
    }, []);
  }

  ngOnInit(): void {
    // cuando entre en el formulario, si tiene parametros en la ruta, quiero cargar esos datos
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      if (params._id) {
        this.isUpdate = true;
        // peticion al servicio getById usando observables
        this.usersService.getById(params._id).subscribe({
          next: (response: User) => {
            console.log("Datos del usuario: ", response);

            this.usersForm = new FormGroup({
              _id: new FormControl(response._id), // campo oculto para el id
              first_name: new FormControl(response.first_name, [Validators.required,
                Validators.minLength(3), Validators.maxLength(20)]),
              last_name: new FormControl(response.last_name, [Validators.required,
                Validators.minLength(3), Validators.maxLength(20)]),
              email: new FormControl(response.email, [Validators.required,
                Validators.email]),
              image: new FormControl(response.image, [Validators.required,
                Validators.pattern('https?://.+')]),
              username: new FormControl(response.username, [Validators.required,
                Validators.minLength(6)]),
              password: new FormControl(response.password, [Validators.required,
                Validators.minLength(6)]),
            }, []);
          },
          error: (err) => {
            console.log("Error al obtener el usuario: " + err);
          }
        });
      }
    });
  }

  getDataForm(): void {
    // obtengo los valores del formulario
    let newUser: User = this.usersForm.value as User;

    // verifico si el formulario es valido
    if (this.usersForm.valid) {
      if (this.isUpdate) {
        // modo actualizacion de un usuario (update)
        this.usersService.update(newUser).subscribe({
          next: (response: User) => {
            console.log('Usuario actualizado: ', response);
            alert('Usuario actualizado correctamente');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error al actualizar el usuario: ', err);
            alert('Hubo un error al actualizar el usuario');
          }
        });
      } else {
        // modo creacion de un usuario (insert)
        this.usersService.insert(newUser).subscribe({
          next: (response: User) => {
            console.log('Usuario creado: ', response);
            alert('Usuario creado correctamente');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error al crear el usuario: ', err);
            alert('Hubo un error al crear el usuario');
          }
        });
      }
    } else {
      console.log('Formulario no válido', this.usersForm.errors);
      alert('Formulario no válido. Por favor, revise todos los campos')
    }
  }

  // si se abandona la pagina antes de que la solicitud se complete, cancelo la suscripcion para evitar fugas de memoria
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // cancelar la suscripción
    }
  }

}
