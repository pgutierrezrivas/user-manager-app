import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrUsers: User[]; // creo mi variable
  userService = inject(UsersService); // injecto el servicio 'users'

  constructor() {
    this.arrUsers = []; // inicializo mi variable
  }

  ngOnInit(): void { // aqui hacemos la carga
    this.userService.getAll().subscribe((data: any) => {
      this.arrUsers = data.results;
    });
  }

}