import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-image-preview',
  templateUrl: './admin-image-preview.component.html',
  styleUrls: ['./admin-image-preview.component.css']
})
export class AdminImagePreviewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public imageLink: string) { }
}
