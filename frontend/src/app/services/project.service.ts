import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stack {
  id: number;
  nome: string;
  tipo: string;
  logo_url: string | null;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string | null;
}

export interface Projeto {
  id: number;
  titulo: string;
  sumario: string;
  descricao: string;
  url_repositorio: string;
  imagem_capa: string | null;
  data_inicio: string;
  data_fim: string | null;
  stacks: Stack[];
  categorias: Categoria[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projetos';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }
}
