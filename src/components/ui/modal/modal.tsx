import type { ChangeEvent, FC, FormEvent } from "react"
import { tareaStore } from "../../store/tareaStore"
import style from "./modal.module.css"
import React, { useEffect } from "react"
import type { Itarea } from "../../../types/Itareas"
import { useTarea } from "../../hooks/useTarea"
import Button from '@mui/material/Button';

type IModal= {
    handleCloseModal: VoidFunction
}
const initialState: Itarea = {
    titulo:'',
    descripcion:'',
    fechaLimite:'',
}
export const Modal: FC<IModal> = ({handleCloseModal})=>{
    
    const tareaActiva = tareaStore((state)=>state.tareaActiva);
    const setTareaActiva = tareaStore((state)=>state.setTareaActiva);

    const [formValues,setFormValues] = React.useState<Itarea>(initialState)
    const {createTarea,putEditarTarea} = useTarea()

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = e.target
        console.log(name,value)
        setFormValues((prev) => ({
            ... prev,
            [`${name}`]: value 
        }))
            
    }
    const onsubmit = (e:FormEvent)=>{
        e.preventDefault();
        console.log(formValues)
        if(tareaActiva){
            //edit
            putEditarTarea(formValues)
            console.log(formValues)
        }else{
            createTarea({...formValues,id :generateUniqueId()})
        }
        setTareaActiva(null);
        handleCloseModal();
    }
    const generateUniqueId = (): string => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${timestamp}-${random}`;
    }
    return(
        <div className={style.containerModalPrincipal}>
            <div className={style.conntenPoUp}>
                <div>
                    <h3>{tareaActiva? "Editar tarea" : "Agregar tarea" }</h3>
                </div>
                <form onSubmit={onsubmit} className={style.formContent}>
                    <div>
                        <input type="text" value={formValues.titulo} onChange={handleChange} required autoComplete="off" name="titulo" placeholder="Inrese el titulo"/>
                        <textarea required  value={formValues.descripcion} onChange={handleChange} name="descripcion" placeholder="Ingrese una descripcion" />
                        <input type="date" value={formValues.fechaLimite} onChange={handleChange} required autoComplete="off" name="fechaLimite"/>
                    </div>
                    <div className={style.buttonCard}>
                        <Button onClick={handleCloseModal} variant="contained" color="error">Cancelar</Button>
                        <Button type="submit" variant="contained">{tareaActiva ? "Editar Tarea" : "Agregar Tarea" }</Button>
                    </div>
                </form>
            </div>
        </div>
    )
} 