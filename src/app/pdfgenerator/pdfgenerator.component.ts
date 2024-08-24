import { Component, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pdfgenerator',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pdfgenerator.component.html',
  styleUrl: './pdfgenerator.component.css',
})

export class PdfgeneratorComponent {
  @Input() dataSource: any;
  
  data: any = [];
  generatePDF() {
    // Create a new PDF document.
    console.log(this.dataSource, 'dataSource')
    const doc = new jsPDF();
    const str = 'kavin';
    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Gym Membership Details', 10, 10);

    // Create a table using `jspdf-autotable`.
    const headers = [['Name', 'Age', 'Address', 'Fees Paid', 'Payment', 'Paid on','Plan', 'Ph no',]];
    this.dataSource.map((item:any) => this.data.push(Object.values([item.name, item.age, item.address, item.feespaid, item.mode, new Date(
      (item.feespaiddate)).toLocaleDateString(),  item.duration, item.contactnumber])));
console.log(this.data, 'this.data')
    autoTable(doc, {
      head: headers,
      body: this.data,
      startY: 30, // Adjust the `startY` position as needed.
    });

    // Save the PDF.
    doc.save('table.pdf');
  }
}
