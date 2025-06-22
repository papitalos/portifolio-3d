import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stack {
  id: string;
  nome: string;
  tipo: string;
  logo_url: string | null;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao: string | null;
}

export interface Projeto {
  id: string;
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
  private catUrl = 'http://localhost:3000/api/categorias';

  constructor(private http: HttpClient) {}

  getProjects(categoria?: string | null): Observable<Projeto[]> {
    let options: { params?: HttpParams } = {};
    if (categoria) {
      options.params = new HttpParams().set('categoria', categoria);
    }
    return this.http.get<Projeto[]>(this.apiUrl, options);
  }

  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.catUrl);

  }
}
