import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-empleado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})

export class AgregarEmpleadoComponent {

  //Propiedades
  empleadoForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  empleadoDepartamentos: any = [
    'Administración',
    'Contabilidad',
    'Recursos Humanos',
    'TI',
    'Ventas',
    'All'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService
  ){
    this.mainForm();
  }

  ngOnInit(): void{

  }

  //Método para definir el formulario
  mainForm(){
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', 
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telefono: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }

  //Método que asigna el departamento seleccionado a la propiedad del formulario.
  actualizarDepartamento(event:Event):void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const departamentoSeleccionado = seleccionarElemento.value;
    this.empleadoForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  //getter para acceder a los controles del formulario.
  get myForm() {
    return this.empleadoForm.controls;
  }

  //Método que se ejecuta cuando se hace el submit
  onSubmit(){
    this.enviado = true;
    if(!this.empleadoForm.valid) {
      return false;
    } else {
      return this.empleadoService.agreEmpleado(this.empleadoForm.value).subscribe({
        complete: () => {
          console.log('Empleado agregado correctamente')
          this.ngZone.run(() => this.router.navigateByUrl('/listar-empleados'));
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }
}
