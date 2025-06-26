import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Empleado {
  id?: string;
  nombre: string;
  departamento: string;
  email: string;
  telefono: string;
  puesto: string;
}

@Component({
  standalone: true,
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule] // ✅ esto es lo único que faltaba
})
export class EditarEmpleadoComponent implements OnInit {
  editarEmpleadoForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  empleadoDepartamentos: string[] = [
    'Administracion',
    'Contabilidad',
    'Recursos Humanos',
    'TI',
    'Ventas'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainForm();

    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getEmpleado(id);
    }
  }

  mainForm(): void {
    this.editarEmpleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  actualizarDepartamento(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const departamentoSeleccionado = seleccionarElemento.value;
    this.editarEmpleadoForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  get myForm() {
    return this.editarEmpleadoForm.controls;
  }

  getEmpleado(id: string): void {
    this.empleadoService.getEmpleado(id).subscribe((data) => {
      this.editarEmpleadoForm.patchValue({
        nombre: data.nombre,
        departamento: data.departamento,
        email: data.email,
        telefono: data.telefono
      });
    });
  }

  onSubmit(): void {
    this.enviado = true;

    if (!this.editarEmpleadoForm.valid) {
      return;
    }

    if (window.confirm('¿Seguro que desea modificar este usuario?')) {
      const id = this.actRoute.snapshot.paramMap.get('id');
      if (id) {
        this.empleadoService.actuEmpleado(id, this.editarEmpleadoForm.value).subscribe({
          complete: () => {
            console.log('Empleado modificado correctamente');
            this.router.navigateByUrl('/listar-empleados');
          },
          error: (e) => {
            console.error('Error al modificar empleado:', e);
          }
        });
      }
    }
  }
}
//password mongoatlas: bwg0AiDEjyeFrkVX