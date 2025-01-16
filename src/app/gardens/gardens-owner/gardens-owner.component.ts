import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Garden } from '../../core/models/garden.model';
import { GardensService } from '../../core/services/gardens.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gardens-owner',
  imports: [RouterModule,CommonModule],
  templateUrl: './gardens-owner.component.html',
  styleUrl: './gardens-owner.component.css'
})
export class GardensOwnerComponent implements OnInit{
  //lista de huertos a desplegar
  gardens : Garden[] = [];
  //booleano de mostrar la ventana emergente de "seguro que desea eliminar"
  showModal: boolean = false;
  //si se elimina, esta variable guarda la id del huerto a eliminar
  gardenIdToDelete: number | null = null;

  constructor(private gs:GardensService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.listAllGardens();
  }

  //funcion que obtiene la lista de todos los huertos del usuario
  listAllGardens(){
    //accede al local storage para obtener los valores de la sesion
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //funcion del service para obtener los huertos por el id del usuario
    this.gs.getGardenByUserId(currentUser.id).subscribe(
      data => {
        this.gardens=data;
      }
    );
  }
  //funcion que muestra la ventana de "confirmar eliminacion"
  openDeleteDialog(idGarden: number): void {
    this.showModal = true; // Mostrar el modal
    this.gardenIdToDelete = idGarden; // Guardar el ID del huerto a eliminar
  }

  //cuando se cierra la venata se reinician los valores
  closeDeleteDialog(): void {
    this.showModal = false;
    this.gardenIdToDelete = null;
  }

  //cuando se confirma la eliminacion
  confirmDelete(): void {
    //se asegura de que el id sea valido
    if (this.gardenIdToDelete !== null) {
      //invoca la funcion del service para eliminar el huerto con el id seleccionado
      this.gs.deleteGarden(this.gardenIdToDelete).subscribe(
        () => this.listAllGardens()
      );
      //se cierra la ventana
      this.closeDeleteDialog();
    }
  }
}
