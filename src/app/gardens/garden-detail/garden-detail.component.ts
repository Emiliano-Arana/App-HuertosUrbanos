import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Garden } from '../../core/models/garden.model';
import { GardensService } from '../../core/services/gardens.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-garden-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './garden-detail.component.html',
  styleUrls: ['./garden-detail.component.css'], // Cambié de `styleUrl` a `styleUrls`
})
export class GardenDetailComponent implements AfterViewInit {
  //mapa
  private map: L.Map | undefined;
  //datos
  idGarden!: number;
  latitude!: number;
  longitude!: number;
  //objeto hurto
  garden: Garden = {} as Garden;

  constructor(private route: ActivatedRoute, private gs: GardensService) {}

  ngAfterViewInit(): void {
    //al iniciar obtiene los parametros de la url para saber el id del huerto seleccionado
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        //le asigna el id a la variable
        this.idGarden = +id;

        //invoca a la funcion de detalles
        this.detailGarden(this.idGarden);
      }
    });
  }

  //funcion que se conecta al service para obtener los detalles del huerto
  detailGarden(id: number) {
    //se conecta al service para obtener los detalles del huerto con el id requerido
    this.gs.getGardenById(id).subscribe((data) => {
      this.garden = data;

      //asigna la latitud y longitud
      this.latitude = this.garden.latitude;
      this.longitude = this.garden.longitude;

      //inicializa el mapa una vez obtenidos los valores de posicion
      this.initMap();
    });
  }

  //se inicializa el mapa
  initMap() {
    //inicializa el zoom y las posiciones
    this.map = L.map('map').setView([this.latitude, this.longitude], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    //funcion para que se despliegue sin problemas
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    //añadir el marcador al mapa
    L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
