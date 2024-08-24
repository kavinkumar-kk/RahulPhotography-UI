import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../common/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MembershipformComponent } from '../membershipform/membershipform.component';
import { MatDialog } from '@angular/material/dialog';
import { PdfgeneratorComponent } from '../pdfgenerator/pdfgenerator.component';
import { ApiserviceService } from '../api/apiservice.service';

export interface PeriodicElement {
  Age: number;
  Name: string;
  Gender: string;
  Weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Name: 'Mari', Age: 26, Gender: 'Male', Weight: 90 },
  { Name: 'Godwin', Age: 26, Gender: 'Male', Weight: 84 },
  { Name: 'Viswa', Age: 20, Gender: 'Male', Weight: 69 },
  { Name: 'Dhanraj', Age: 24, Gender: 'Male', Weight: 54 },
  { Name: 'Siva', Age: 28, Gender: 'Male', Weight: 65 },
  { Name: 'Pranav', Age: 19, Gender: 'Male', Weight: 59 },
  { Name: 'Faiz', Age: 30, Gender: 'Male', Weight: 88 },
  { Name: 'Yogesh', Age: 22, Gender: 'Male', Weight: 45 },
];

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    PdfgeneratorComponent,
  ],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css',
})
export class MembershipComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Age',
    'Gender',
    'Weight',
    'Edit',
    'Delete',
  ];
  dataSource: any;
  constructor(private apiService: ApiserviceService) {}
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
  readonly dialog = inject(MatDialog);
  addData() {
    console.log('inside add data');
    const dialogRef = this.dialog.open(MembershipformComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: 'none',
      data: { addMember: true },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     this.getMembersList();
    });
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.getMembersList();
}

getMembersList(){
  this.apiService
      .getMembership()
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.dataSource = response;
          console.log(this.dataSource)
        },
    
        error: (err: any) => { },
        complete: () => { }
      }
    );
}

  editData(rowData:any) {
    console.log(rowData, 'inside edit data');
    const dialogRef = this.dialog.open(MembershipformComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: 'none',
      data: { formValues: rowData, addMember: false },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     this.getMembersList();
    });
  }

  deleteData(rowData:any) {
    this.apiService
    .deleteMember(rowData.id)
    .subscribe(Response => {
      console.log(Response, 'Response')
      if (Response === "Member deleted successfully") { 
        this.getMembersList();
      } else {
         
      }
    }
  );
  }
}
