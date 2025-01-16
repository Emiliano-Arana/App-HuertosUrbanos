import { GardenProduct } from './../../core/models/gardenProduct.model';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { GardensService } from '../../core/services/gardens.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import { GardenC } from '../../core/models/gardenC.model';
import { ProductsService } from '../../core/services/products.service'; // Servicio para obtener productos
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/product.model';
import { Relation } from '../../core/models/relation.model';
import { Garden } from '../../core/models/garden.model';
import { GardenProductService } from '../../core/services/garden-product.service';

@Component({
  selector: 'app-garden-edit',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './garden-edit.component.html',
  styleUrl: './garden-edit.component.css'
})
export class GardenEditComponent implements AfterViewInit {
  //variables del formulario
  name: string = '';
  description: string = '';
  //variables del mapa
  private map: any;
  selectedLatitude: number = 0;
  selectedLongitude: number = 0;
  //lista de productos
  gardenProducts: GardenProduct[] = [];
  // Lista de productos disponibles para agregar
  availableProducts: Product[] = [];
  //producto seleccionado
  selectedProduct!: Product;
  //valor del inventaio
  stock: number = 1;
  //id del huerto
  private gardenId:number=0;
  //marcador de la posicion del huerto en el mapa
  private marker?: L.Marker;

  constructor(
    private gs: GardensService,
    private ps: ProductsService,
    private gps:GardenProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute
  ) {}

  ngAfterViewInit() {
    // Configurar el mapa
    this.initMap();
    //cargar los valores del huerto
    this.loadGardenDetails();
    //consultar la lista de productos disponibles para agregar
    this.loadAvailableProducts();
  }

  //inicializar el mapa
  initMap(): void {
    //coordenadas y zoom
    this.map = L.map('map').setView([19.43234, -99.13241], 12);
    //de donde viene el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    //funcion para que no haya errores de carga
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    //definir marcador
    const DefaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    //comportamiento del mapa al hacer click
    this.map.on('click', (e: any) => {
      //si ya hay un marcador, lo quita
      if (this.marker) {
        this.marker.remove();
      }

      //latitud y longitud seleccionadas
      this.selectedLatitude = e.latlng.lat;
      this.selectedLongitude = e.latlng.lng;

      //pone un marcador y le añade la propiedad de poder arrastrarlo
      this.marker = L.marker([this.selectedLatitude, this.selectedLongitude], {
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

  loadGardenDetails(): void {
    //Obtiene los parametros de la url
    this.route.paramMap.subscribe((params) => {
      //obtiene el valor del id del huerto
      const id = params.get('id');
      if (id) {
        this.gardenId = +id;
      }
    });
    //peticion al servicio para obtener los valores del huerto mediante el ID
    this.gs.getGardenById(this.gardenId).subscribe({
      next: (garden) => {
        //asignaciond de valores
        this.name = garden.name;
        this.description = garden.description;
        this.selectedLatitude = garden.latitude;
        this.selectedLongitude = garden.longitude;

        //inicia el mapa con estos valores
        if (this.map) {
          this.marker = L.marker([this.selectedLatitude, this.selectedLongitude], {
            draggable: true,
          })
            .addTo(this.map)
            .on('dragend', (event: any) => {
              const marker = event.target;
              const position = marker.getLatLng();
              this.selectedLatitude = position.lat;
              this.selectedLongitude = position.lng;
            });
          }

        //indica los productos que ya hay en el huerto
        this.gardenProducts = garden.huertoProductos || [];
      },
      //mensaje de error
      error: (err) => {
        console.error('Error al cargar los detalles del huerto:', err);
        this.snackBar.open('Error al cargar los detalles del huerto.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  //carga de la lista de productos disponibles
  loadAvailableProducts(): void {
    //Peticion a la BD para obtener los productos disponibles para seleccionar
    this.ps.getProducts().subscribe((data) => {
      this.availableProducts = data;
    });
  }

  //funcion de agregar producto
  addProduct(): void {
    //crea un objeto huerto con el id de la url
    let ga=new Garden(this.gardenId,'',0,0,'',[]);
    //crea un objeto relacion que obtiene el huerto, el producto seleccionado y el inventario
    let rel=new Relation(ga,this.selectedProduct,this.stock);
    //peticion al back mediante el servicio para crear un nuevo registro en HuertoProducto
    this.gps.createRelation(rel).subscribe(
      response => {
        //recarga la página
        location.reload();
        //mensaje de éxito
        this.snackBar.open('Producto agregado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      },
      error => {
        //mensaje de error
        this.snackBar.open('No se pudo agregar el producto', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        });
      }
    )
  }

  //funcion para actualizar el stock (se ejecuta cuando el valor cambia)
  updateProductStock(product: GardenProduct, newStock: number): void {
    //creacion de un objeto huerto con el ID
    let ga=new Garden(this.gardenId,'',0,0,'',[]);
    //Creacion de un objeto relacion que obtiene el producto, el huerto y el inventario
    let rel=new Relation(ga,product.producto,newStock);

    //peticion al back mediante el servicio para actualizar el registro con el ID del registro
    this.gps.updateRelation(product.idGardenProduct,rel).subscribe(
      response => {
        //mensaje de éxito
        this.snackBar.open('Producto actualizado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      },
      error => {
        //mensaje de error
        this.snackBar.open('No se pudo actualizar el producto', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        });
      }
    )
  }

  //eliminar producto, obitiene el id de la relacion entre huerto producto
  removeProduct(productId: number): void {
    //peticion al back mediante el servicio para eliminarla
    this.gps.deleteRelation(productId).subscribe(
      response => {
        //recargar la página
        location.reload();
        //mensaje de éxito
        this.snackBar.open('Producto eliminado correctamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      },
      error => {
        //mensaje de error
        this.snackBar.open('No se pudo eliminar el producto', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        });
      }
    )
  }

  //Funcion que se ejecuta al subir el formulario
  onSubmit(): void {
    //verifica que los campos esten llenos
    if (this.name && this.description && this.selectedLatitude && this.selectedLongitude) {
      //obtiene los datos de usuario del local storage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      //crea un objeto usuario con el id del usuario actual
      let currentU = new User(currentUser.id, '', '', '', '', '', []);
      //crea un objeto huerto(para hacer una peticion al back) mediante el usuario y los datos del formulario
      let gardenData = new GardenC(0, this.name, this.selectedLatitude, this.selectedLongitude, this.description, currentU);

      //hace la peticion al back mediante el servicio, para actualizar el huerto
      this.gs.updateGarden(this.gardenId,gardenData).subscribe({
        next: (response) => {
          //mensaje de éxito
          this.snackBar.open('Huerto actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          //rediccionamiento a la lista de huertos
          this.router.navigate(['/gardens']);
        },
        error: (err) => {
          //mensaje de error
          this.snackBar.open('Error al actualizar el huerto. Inténtalo nuevamente.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    } else {
      //mensaje de informacion en caso de que no esten completos los campos
      this.snackBar.open(
        'Por favor, completa todos los campos y selecciona una ubicación en el mapa.',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        }
      );
    }
  }
}