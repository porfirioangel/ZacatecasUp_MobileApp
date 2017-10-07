import {Comentario} from "./comentario";

export class DetalleNegocio {
    nombre: string;
    categoria: string;
    logotipo: string;
    calificacion: number;
    sitio_web: string;
    latitud: number;
    longitud: number;
    galeria: string[];
    descripcion_breve: string;
    descripcion_completa: string;
    palabras_clave: string[];
    comentarios: Comentario[];
}
