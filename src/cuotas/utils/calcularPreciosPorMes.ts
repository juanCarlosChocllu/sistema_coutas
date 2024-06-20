export function calcularMontoPorMes(precio:number, cuota:number): number {
    const montoApgar:number = precio / cuota
    return  montoApgar
}


export function multplicarDecimales(montoApagar:number, cuota:number):number{
    const monto:string= montoApagar.toString();
    const montoArray:string[]= monto.split('.')
    const nuevoMonto= montoApagar - parseInt(montoArray[0])
    const  totaDecimal = nuevoMonto * cuota
    return parseInt(totaDecimal.toFixed())
    
}

export function desEstructurarMontoApagarPorCuota(montoApagar:number):number{
    const monto:string[] = montoApagar.toString().split('.')
    return parseInt(monto[0])
}