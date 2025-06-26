import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-empleados',
  imports: [RouterLink],
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit{
  //propiedades
  listEmpleados: any=[];

  constructor(private empleadoService:EmpleadoService){
    this.getEmpleados();
  }

  ngOnInit(): void {
    
  }

  //metodo que hace la peticion al service para obtener los empleados 
  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.listEmpleados = data;
      console.log("Datos cargados:", this.listEmpleados);
    })
  }

  //metodo para eliminar un empleado
  eliEmpleado(empleado: any, index:any){
    if(window.confirm('estas sefuro de eliminar?')){
      this.empleadoService.eliEmpleado(empleado._id)
      .subscribe((data)=>{
        this.listEmpleados.splice(index,1);
      })
    }
  }


}
