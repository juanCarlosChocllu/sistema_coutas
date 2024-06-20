export function calcularMontoPorMes(precio:number, cuota:number): number {
    const montoApgar:number = precio / cuota 
    return  montoApgar
}


export function multplicarDecimales(montoApagar:number, cuota:number):number{// retorna el total del los decimales
    const monto:string= montoApagar.toString();
    const montoArray:string[]= monto.split('.')// se parte del punto
    const montoDecimal= montoApagar - parseInt(montoArray[0])// se restar con el valor actual, con la parte entera  para obtener solo los decimales    
    const  totaDecimal = montoDecimal * cuota // se multiplica por el total de cuotas y el monto decimal
    return parseFloat(totaDecimal.toFixed(2))
}

export function desEstructurarMontoApagarPorCuota(montoApagar:number):number{  
    const montoApagarEntero:string[] = montoApagar.toString().split('.')  
    return parseInt(montoApagarEntero[0])
}