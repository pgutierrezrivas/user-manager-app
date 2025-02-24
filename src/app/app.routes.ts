import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' }, // redirige a 'home' en caso de ruta vacia
    { path: 'home', component: UserListComponent }, // muestra la lista de todos los usuarios
    { path: 'user/:_id', component: UserViewComponent }, // ruta dinamica que muestra la vista detalle de un usuario
    { path: 'newuser', component: NewUserComponent }, // muestra formulario para agregar un nuevo usuario
    { path: 'updateuser/:_id', component: UpdateUserComponent }, // ruta dinamica que reutiliza el formulario de registro para actualizar los datos de un usuario
    { path: '**', component: Page404Component } // en caso de ruta no encontrada
];