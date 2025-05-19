import React from "react";
import style from "./ListTareas.module.css";
import { tareaStore } from "../../store/tareaStore";
import { CardList } from "../cardList/CardList";
import { Modal } from "../modal/modal";
import type { Itarea } from "../../../types/Itareas";
import { useTarea } from "../../hooks/useTarea";
import Button from '@mui/material/Button';

export const ListTareas = ()=>{
    
    const [openModal,setOpenModal] = React.useState(false);
    
    const {getTareas,tareas} = useTarea()
    const setTarea = tareaStore((state)=> state.setTareaActiva)  
    
    const handleOpenModal = (tarea:Itarea)=>{
        setTarea(tarea)
        setOpenModal(true)
    }

    const handleCloseModal = ()=>{
        setOpenModal(false)
    }
    
    React.useEffect(()=>{
        getTareas();
    },[]);

    return(
        <>
         <div className={style.containerPrincipalList}>
                <div className={style.containerTitleAndButton}>
                    <h2>Lista tareas</h2>
                    <Button onClick={()=>{setOpenModal(true)}}>agregar Tarea</Button>
                </div>
                <div className={style.containerList}>
                    {
                        tareas.length > 0 ?
                        (
                        tareas.map((el)=> 
                            <CardList 
                            tarea={el} 
                            handleOpenModal={handleOpenModal}
                            />
                        )                        
                        )
                    :
                    (
                        <div>No hay tareas</div>    
                    ) 
                    
                    }
                </div>
            </div>
            { openModal && <Modal handleCloseModal={handleCloseModal} />}
        </>
    )
}