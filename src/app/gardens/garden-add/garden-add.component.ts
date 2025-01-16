import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { GardensService } from '../../core/services/gardens.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import { GardenC } from '../../core/models/gardenC.model';

@Component({
  selector: 'app-garden-add',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './garden-add.component.html',
  styleUrl: './garden-add.component.css'
})
export class GardenAddComponent implements AfterViewInit{
  //Variables del formulario
  name:string= '';
  description:string= '';

  //variables del mapa
  private map:any;
  selectedLatitude: number = 0;
  selectedLongitude: number = 0;

  //se inicializan los componentes que se van a utilizar
  constructor(
    private gardensService: GardensService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  //Inicializa el mapa una vez cargado el DOM
  ngAfterViewInit(){
    // Configurar el mapa
    this.initMap();
  }

  //Inicializa el mapa
  initMap():void {
    //se crea la variable mapa
    this.map = L.map('map').setView([19.43234, -99.13241],12); //asigna las coordenadas iniciales y el valor de zoom
    //De donde va a obtener la imagen del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    //funcion para que no genere errores de carga
    setTimeout(()=>{
      this.map?.invalidateSize();
    },0);

    //define el icono de los marcadores
    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41], // Tamaño del icono
      iconAnchor: [12, 41], // Punto del icono que se ancla al mapa
      popupAnchor: [1, -34], // Punto del popup respecto al icono
      shadowSize: [41, 41], // Tamaño de la sombra
    });

    //asigna el icono
    L.Marker.prototype.options.icon = DefaultIcon;
    let marker: L.Marker;

    //listener que se ejecuta al hacer click en el mapa
    this.map.on('click', (e: any) => {
      
      //si ya hay un marcador en el mapa, lo quita para que no haya mas de uno
      if (marker) {
        marker.remove();
      }

        //asigna los valores de latitud y longitud a las variables que se van a enviar
      this.selectedLatitude = e.latlng.lat;
      this.selectedLongitude = e.latlng.lng;

      //crea el marcador
      marker = L.marker([this.selectedLatitude, this.selectedLongitude], {
        //permite que se pueda arrastrar a otra posicion
        draggable: true,
      })
        .addTo(this.map)
        .on('dragend', (event: any) => {
          const marker = event.target;
          const position = marker.getLatLng();
          this.selectedLatitude = position.lat;
          this.selectedLongitude = position.lng;
        });
    });
  }

  //Funcion que se ejecuta al subir el formulario
  onSubmit(): void {
    //obtiene el objeto del usuario actual
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //crea un objeto usuario con un id con el fin de registrar ese id en la BD
    let currentU= new User(currentUser.id,'','','','','',[]);
    //crea el objeto huerto
    let gardenData = new GardenC(0,this.name,this.selectedLatitude,this.selectedLongitude,this.description,currentU);

    // Llamar al servicio para guardar el huerto
    this.gardensService.createGarden(gardenData).subscribe({
      next: (response) => {
        // Mostrar mensaje de éxito
        this.snackBar.open('Huerto creado exitosamente', 'Cerrar', {
          duration: 3000, 
          panelClass: ['snackbar-success'],
        });

        // Redirigir a la lista de huertos
        this.router.navigate(['/gardens']);
      },
      error: (err) => {
        console.error('Error al crear el huerto:', err);

        // Mostrar mensaje de error
        this.snackBar.open('Error al crear el huerto. Inténtalo nuevamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error'], 
        });
      },
    });
  }
}
