import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  idade: number = 0;
  stacks: string[] = ['Angular', 'Node.js', 'TypeScript', 'Three.js'];

  ngOnInit() {
    const birth = new Date(2003, 10, 22); // 22/11/2003 months 0-index
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    this.idade = age;
  }

  openCV() {
    // Placeholder - open curriculum link
    window.open('/assets/CV.pdf', '_blank');
  }
}
