import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationProvider } from '../../providers/navigation.provider';
import { Projeto } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  project!: Projeto;

  constructor(private navigation: NavigationProvider) {}

  ngOnInit() {
    const state = this.navigation.getCurrentState();
    this.project = state.data?.project;
  }

  goBack() {
    this.navigation.navigate('/projects');
  }
}
