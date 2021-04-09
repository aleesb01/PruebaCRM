import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesRoutingModule } from "./data-tables-routing.module";

import { DataTablesComponent } from './data-tables.component';
import { PipeModule } from 'app/shared/pipes/pipe.module';

import { Ent_m_service} from '../shared/services/data/ent_m.services';
import { Ent_m } from '../model/ent_m';

@NgModule({
    imports: [
        CommonModule,
        DataTablesRoutingModule,
        NgxDatatableModule,
        PipeModule
    ],
    declarations: [
      DataTablesComponent
    ],
    providers: [
        Ent_m_service    ]
})
export class DataTablesModule { }
