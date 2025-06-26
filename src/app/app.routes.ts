import { Routes } from '@angular/router';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: 'listar-empleados'
    },
    {
        path: 'listar-empleados',
        component: ListarEmpleadosComponent
    },
    {
        path: 'agregar-empleado',
        component: AgregarEmpleadoComponent
    },
    {
        path: 'editar-empleado/:id',
        component: EditarEmpleadoComponent
    },
    {
        path:'**',
        redirectTo: 'listar-empleados'
    }
];
