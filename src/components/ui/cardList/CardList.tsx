 import type { FC } from "react";
import type { Itarea } from "../../../types/Itareas";
import styles from "./CardList.module.css";
import { useTarea } from "../../hooks/useTarea";
import Button from '@mui/material/Button';

type IcartList = {
    tarea: Itarea
    handleOpenModal:(tarea:Itarea)=>void
}

 export const CardList:FC<IcartList> = ({ tarea,handleOpenModal })=>{
    const {eliminarTareas} = useTarea()
    
    const eliminarTarea = ()=>{
        eliminarTareas(tarea.id!)
    }
    const editarTarea = ()=>{
        handleOpenModal(tarea)
    }
    return(
        <div className={styles.containerCard}>
            <div className={styles.dataCard}>
                    <h3>Titulo: {tarea.titulo}</h3>                
                    <p>{tarea.descripcion}</p>
                    <b>{tarea.fechaLimite}</b>
                
            </div>
            <div className={styles.actionCards}>
                <Button onClick={editarTarea} >Editar</Button>
                <Button onClick={eliminarTarea} color="error" variant="contained">Eliminar</Button>
            </div>
        </div>
    )
    
 }