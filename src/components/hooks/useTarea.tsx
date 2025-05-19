import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { agregarTarea, deletaTarea, getAllTareas } from "../../http/tarea"
import type { Itarea } from "../../types/Itareas"
import Swal from "sweetalert2"

export const useTarea = ()=>{

    const {tareas, setArrayTareas,agregarNuevaTarea,eliminarTarea,editarTarea} = tareaStore(useShallow((state)=> ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarTarea: state.eliminarTarea, 
        editarTarea: state.editarTarea
    })))
    
    const getTareas = async ()=>{
            const  data = await getAllTareas();
            if(data) setArrayTareas(data); 
    }
    const createTarea = async (nuevaTarea:Itarea)=>{
        agregarNuevaTarea(nuevaTarea)
        try {
            await agregarTarea(nuevaTarea)
            Swal.fire("Exito","Tarea agregada correctamente","success")

        } catch (error) {
            eliminarTarea(nuevaTarea.id!);
            console.log(error)
        }
    }
    const putEditarTarea = async (tareaEditada:Itarea)=>{
        
        const estadoPrevio = tareas.find((el)=>el.id === tareaEditada.id);
        editarTarea(tareaEditada)
        
        try{
            await editarTarea(tareaEditada);
            Swal.fire("Exito","Tarea actualizada correctamente","success")
          }catch(error)
          {
            if(estadoPrevio)editarTarea(estadoPrevio)
            console.error(error)

          }
    }
    const eliminarTareas = async(id:string)=>{
        const estadoPrevio = tareas.find((el)=>el.id === id);
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (!confirm.isConfirmed) return;
        
        try {
            eliminarTarea(id)
            await deletaTarea(id)
            Swal.fire("Exito", "Tarea eliminada correctamente", "success");
        } catch (error) {
           if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.error("Algo salio mal")
        }
    }
    return {
        getTareas,
        createTarea,
        putEditarTarea,
        eliminarTareas,
        tareas
    };
}