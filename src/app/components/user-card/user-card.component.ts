import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { BotoneraComponent } from "../botonera/botonera.component";

@Component({
  selector: 'app-user-card',
  imports: [BotoneraComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() myUser!: User; // para yo poder usarlo en mi html

}