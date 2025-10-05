import { Component } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addgame',
  imports: [
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  HeaderAdmin
],
  templateUrl: './addgame.html',
  styleUrl: './addgame.scss'
})
export class Addgame {

}
