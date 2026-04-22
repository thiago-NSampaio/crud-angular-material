import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBar } from '@angular/material/snack-bar'
import { MatButton, MatButtonModule } from "@angular/material/button";
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    FormsModule,
    MatButton,
    MatButtonModule,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent{

  nomeBusca: string = ''
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id","nome","cpf","dataNascimento","email","acoes"];
  snack: MatSnackBar = inject(MatSnackBar)
  constructor (
    private service: ClienteService,
    private router: Router
  ){}

  ngOnInit(){
    this.listaClientes = this.service.pesquisarCliente('');
  }

  preparaEditar(id: string){
    this.router.navigate(['/cadastro'],{queryParams:{id}})
  }
    
  pesquisar(){
    console.log(this.nomeBusca)
    this.listaClientes = this.service.pesquisarCliente(this.nomeBusca)
  }

  preparaDeletar(cliente: Cliente){
    cliente.deletando = true;
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente)
    this.listaClientes = this.service.pesquisarCliente('');
    this.snack.open("Item deletado com sucesso!",'Ok')
  }
}
