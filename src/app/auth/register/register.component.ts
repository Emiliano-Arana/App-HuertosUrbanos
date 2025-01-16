import { User } from './../../core/models/user.model';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //Variables del formulario
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isOwner: boolean = false;

  //Mensaje de error
  errorMessage: string = '';

  //Variable para verificar que coincidan las contraseñas
  passwordsDontMatch: boolean = false;

  //constructor que obtiene el servicio de usuario y el router
  constructor(private us : UsersService,private router: Router,private snackBar: MatSnackBar){}

  //funcion que verifique que las contraseñas coincidan
  validatePasswords() {
    this.passwordsDontMatch = this.password !== this.confirmPassword;
  }

  //Funcion que se ejecuta al subir el formulario
  onSubmit() {
    //Obtiene el valor como cadena del rol seleccionada
    const role = this.isOwner ? 'propietario' : 'usuario';
    //crea un objeto usuario con los datos proporcionados
    let user = new User(0,this.email,this.nombre,this.apellidos,this.password,role,[]);

    //funcion del objeto servicio de usuario que se conecta con la BD
    this.us.registerUser(user).subscribe({
      //mensaje de éxito
      next: (res) => {
        this.snackBar.open('Usuario creado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        //redireccion en caso de éxito
        this.router.navigate(['/login']);
      },
      //mensaje de error
      error: (err) => {
        this.errorMessage = 'Correo electrónico en uso. Intente con otro.';
        console.error(err);
      }
    });
  }
}
