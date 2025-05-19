import axios, { AxiosHeaders } from "axios";
import type { Itarea } from "../types/Itareas";
import { renderToPipeableStream } from "react-dom/server";

const API_URL = "http://localhost:3000/tareas";

export const getAllTareas = async()=>{
    
    try {
        const response = await axios.get<Itarea[]>(API_URL)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const agregarTarea = async(nuevaTarea: Itarea)=>{
    
    try {
        const response = await axios.post<Itarea>(API_URL,{
            ...nuevaTarea,
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const editarTarea = async(tareaActualizada: Itarea)=>{
    
    try {
        const response = await axios.put<Itarea>(`${API_URL}/${tareaActualizada.id}`,{
            ...tareaActualizada,
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deletaTarea = async(idTarea: string)=>{
    
    try {
        const response = await axios.delete<Itarea>(`${API_URL}/${idTarea}`)           
        return response.data;        
    } catch (error) {
        console.error(error);
    }
}
