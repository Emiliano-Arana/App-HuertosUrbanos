import { CommonModule } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //variables del formulario
  email: string = '';
  password: string = '';

  //mensaje de error a mostrar
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {

    //Conexion con el servicio que maneja la coneccion con la BD
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        //Obtencion del rol
        if (response && response.role === 'usuario' ||response.role === 'propietario') {
          this.router.navigate(['/gardens']).then(() => {
            // Una vez que la navegación esté completa, recarga la página
            location.reload();
          });
        }
      },
      (error) => {
        //No se encontró el usuario
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    );
  }

}
