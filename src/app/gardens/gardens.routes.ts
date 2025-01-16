import { Routes } from "@angular/router";
import { GardensListComponent } from "./gardens-list/gardens-list.component";
import { GardenDetailComponent } from "./garden-detail/garden-detail.component";
import { GardensOwnerComponent } from "./gardens-owner/gardens-owner.component";
import { GardenEditComponent } from "./garden-edit/garden-edit.component";
import { Component } from "@angular/core";
import { MapaComponent } from "./mapa/mapa.component";
import { GardenAddComponent } from "./garden-add/garden-add.component";
import { authOwnerGuard } from "../core/guards/auth-owner.guard";
import { authUserGuard } from "../core/guards/auth-user.guard";

export const GARDENS_ROUTES: Routes = [
    //rutas de acceso a los componentes
    {path: '', component: GardensListComponent,
        //guarda para verificar que tiene el rol de usuario
        canMatch:[authUserGuard]
    },
    {path: '', component: GardensOwnerComponent,
        //guarda para verificar que tiene el rol de propietario
        canMatch:[authOwnerGuard]
    },
    {path: 'add-garden', component: GardenAddComponent,
        //guarda para verificar que tiene el rol de pripietario
        canMatch:[authOwnerGuard]
    },
    {path: 'edit-garden/:id', component: GardenEditComponent,
        //guarda para verificar que tiene el rol de propietario
        canMatch:[authOwnerGuard]
    },
    {path: 'mapa',component: MapaComponent},
    {path: 'garden-detail/:id', component: GardenDetailComponent}
]

