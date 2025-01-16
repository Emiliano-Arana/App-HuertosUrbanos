import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Garden } from '../../core/models/garden.model';
import { GardensService } from '../../core/services/gardens.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gardens-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './gardens-list.component.html',
  styleUrl: './gardens-list.component.css'
})
export class GardensListComponent implements OnInit{
  //objeto de lista de huertos
  gardens : Garden[] = [];

  constructor(private gs:GardensService){}

  ngOnInit(): void {
    this.listAllGardens();
  }

  //funcion que obtiene la lista de huertos
  listAllGardens(){
    //pide la lista de todos lo huertos mediante el servicio
    this.gs.getAllGardensList().subscribe(
      data => {
        this.gardens=data;
      }
    );
  }
}
