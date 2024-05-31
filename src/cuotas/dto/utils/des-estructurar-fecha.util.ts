
export function desEstructuraFecha(fecha:string){
    const partesFecha = fecha.split('-');
    const año = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]) - 1; 
    const dia = parseInt(partesFecha[2]);
    return [año, mes, dia]
}