import { create } from "zustand";
import type { Itarea } from "../../types/Itareas";

interface tareaStore {
    tareas: Itarea[],
    tareaActiva: Itarea | null,
    setTareaActiva: (tareaActiva: Itarea | null) => void
    setArrayTareas: (arrayDeTareas: Itarea[]) => void
    agregarNuevaTarea: (nuevaTarea: Itarea) => void
    editarTarea: (tareActualizada: Itarea) => void
    eliminarTarea: (idTarea: string) => void
}

export const tareaStore = create<tareaStore>((set)=>({
    
    tareas: [],
    tareaActiva: null,

    setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),
    agregarNuevaTarea: (nuevaTarea) => set((state)=> ({tareas: [...state.tareas, nuevaTarea]})),
    
    editarTarea: (tareaEditada) => set((state) => {
        const arregloTarea = state.tareas.map((tarea) =>
            tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
        );
        return { tareas: arregloTarea };
    }),

    eliminarTarea: (idTarea) => set((state)=>{
        const arregloTarea = state.tareas.filter((tarea)=> tarea.id !== idTarea )
        return { tareas: arregloTarea }
    }),
    
    setTareaActiva: (tareaActivaIn)=> set(()=> ({tareaActiva: tareaActivaIn}))
}))