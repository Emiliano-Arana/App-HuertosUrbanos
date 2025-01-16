import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarHomeComponent } from './shared/ui/navbar-home/navbar-home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,NavbarComponent,RouterOutlet,FormsModule,MatDialogModule,NavbarHomeComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendADS';
  //variable que indica si se muestra la barra de navegacion secundaria
  showSecondaryNavbar: boolean = false;

  constructor(private router: Router) {
    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      //la barra se muestra en estas rutas
      this.showSecondaryNavbar = ['/', '/about', '/help'].includes(currentRoute);
    });
  }
}
