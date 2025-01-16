import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { Garden } from '../../core/models/garden.model';
import { GardensService } from '../../core/services/gardens.service';

@Component({
  selector: 'app-mapa',
  imports: [RouterModule,CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit{
  //mapa
  private map:any;
  //lista de huertos
  gardens : Garden[] = [];
  
  constructor(private gs:GardensService){}

  //al iniciar
  ngAfterViewInit(){
    //se muestra el mapa con el zoom y las coordenadas indicadas
    this.map = L.map('map').setView([19.43234, -99.13241],12);
    //el mapa se obitene de este link
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    //funcion para que se muestre correctamente el mapa
    setTimeout(()=>{
      this.map?.invalidateSize();
    },0);

    //parametros de los marcadores
    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41], // Tamaño del icono
      iconAnchor: [12, 41], // Punto del icono que se ancla al mapa
      popupAnchor: [1, -34], // Punto del popup respecto al icono
      shadowSize: [41, 41], // Tamaño de la sombra
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    //funcion que obtiene los huertos
    this.listAllGardens();
  }

  listAllGardens(){
    //mediante el servicio obtiene todos los huertos
    this.gs.getAllGardensList().subscribe(
      data => {
        this.gardens=data;

        //para cada huerto pone un marcador en las coordenadas guardadas
        this.gardens.forEach((garden) => {
          if (garden.latitude && garden.longitude) {
            const marker = L.marker([garden.latitude, garden.longitude]).addTo(this.map!); // Crea un marcador en el mapa
            marker.bindPopup(`<b>${garden.name}</b><br>${garden.description}`); // Agrega un popup al marcador
          }
        });
      }

      
    );
  }
}
