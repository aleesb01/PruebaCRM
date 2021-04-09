import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableData } from './data/datatables.data';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Ent_m_service} from '../shared/services/data/ent_m.services';
import { Vta_fac_g_service} from '../shared/services/data/vta_fac_g';

import { Ent_m, Ent_m_res } from 'app/model/ent_m';

@Component({
  selector: 'app-datatables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss', '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [Ent_m_service, Vta_fac_g_service]
})
export class DataTablesComponent implements OnInit {

  
  // public
  public contentHeader: object;

  // row data
  public rows: any [] = [];

  public response: Ent_m_res[] = [];

  // column header
  public columnsFact = [
    { name: 'Número factura', prop: 'num_fac' },
    { name: 'Fecha factura', prop: 'fch' },
    { name: 'Base total', prop: 'bas_tot' },
    { name: 'IVA total', prop: 'tlf' },
    { name: 'Total factura', prop: 'tot_fac' }
  ];


  // column header
  public columns = [
    { name: 'Código', prop: 'id' },
    { name: 'Nombre', prop: 'name' },
    { name: 'Email', prop: 'eml' },
    { name: 'Teléfono', prop: 'tlf' },
    { name: 'Cif', prop: 'cif' }
  ];

  // multi Purpose datatable Row data
  public multiPurposeRows = DatatableData;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  // server side row data
  public serverSideRowData;

  // server side row data
  public serverSideRowDataFacturas;

  // private
  private tempData = [];
  private multiPurposeTemp = [];

  /**
   * inlineEditingUpdate
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdate(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * filterUpdate
   *
   * @param code
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }

  /**
   * customChkboxOnSelect
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  /**
   * serverSideSetPage
   *
   * @param event
   */
  serverSideSetPage(event) {
  /*  this.http
      .get('assets/data/datatable-data.json')
      .pipe(map((data) => data as Array<any>))
      .subscribe((data) => {
        this.serverSideRowData = data;
      }); */


     /* this.ent_m_service.sendGetRequest().pipe(map((data) => data as Array<any>))
      .subscribe((data) => {
        this.serverSideRowData = data;
        });*/

        this.ent_m_service.sendGetRequest().pipe(map((data) => data as Array<Ent_m_res>))
        .subscribe((data) => {
            this.serverSideRowData  = data['ent_m'];

      });
    }

     /**
   * serverSideSetPage
   *
   * @param event
   */
  serverGetFacturas(event) {
       this.vta_fac_g_service.getFacturar().pipe(map((data) => data as Array<any>))
          .subscribe((data) => {
              this.serverSideRowDataFacturas  = data['vta_fac_g'];

       });
      }

  /**
   * MultiPurposeFilterUpdate
   *
   * @param event
   */
  MultiPurposeFilterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.multiPurposeTemp.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.multiPurposeRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient, private ent_m_service: Ent_m_service, private vta_fac_g_service: Vta_fac_g_service) {
    this.tempData = Array<Ent_m>();
    this.multiPurposeTemp = Array<Ent_m>();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // Initially load first page
    this.serverSideSetPage({ offset: 0 });
    this.serverGetFacturas({ offset: 0 });

    // content header
    this.contentHeader = {
      headerTitle: 'Datatables',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '#'
          },
          {
            name: 'Forms & Tables',
            isLink: true,
            link: ''
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }
}
