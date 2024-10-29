/*
Se considera para efectuar el cálculo el siguiente ejemplo:

01234567890

Etapa 1: Comenzar desde la izquierda, sumar todos los caracteres ubicados en las posiciones impares.

0 + 2 + 4 + 6 + 8 + 0 = 20

Etapa 2: Multiplicar la suma obtenida en la etapa 1 por el número 3.

20 x 3 = 60

Etapa 3: Comenzar desde la izquierda, sumar todos los caracteres que están ubicados en las posiciones pares.

1 + 3 + 5 + 7 + 9 = 25

Etapa 4: Sumar los resultados obtenidos en las etapas 2 y 3.

60 + 25 = 85

Etapa 5: Buscar el menor número que sumado al resultado obtenido en la etapa 4 dé un número múltiplo de 10. Este será el valor del dígito verificador del módulo 10.

85 + 5 = 90

De esta manera se llega a que el número 5 es el dígito verificador módulo 10 para el código 01234567890

Siendo el resultado final:

012345678905

*/

/* CONTENIDO DEL HTML */
/* <input type="text" id="input1">
<input type="text" id="input2">
<input type="text" id="input3">
<input type="text" id="input4">
<input type="text" id="input5">
<button onclick="generarCodigo()">Generar</button>
<button onclick="limpiarInputs()">Limpiar</button>
<button onclick="descargarCodigo()">Descargar</button>
<button onclick="copiarCodigo()">Copiar Código</button> 
<img id="barcode">*/

/* FUNCIONES */

function generarCodigo() {
    let cuit = document.getElementById("input1").value;
    let cai = document.getElementById("input2").value;
    let fechaVencimiento = document.getElementById("input3").value;
    let puntoVenta = document.getElementById("input4").value;
    let tipoComprobante = document.getElementById("input5").value;

    let dia = fechaVencimiento.substring(0, 2);
    let mes = fechaVencimiento.substring(2, 4);
    let anio = fechaVencimiento.substring(4, 8);
    fechaVencimiento = anio + mes + dia;

    let codigo = cuit + tipoComprobante + puntoVenta + cai + fechaVencimiento;
    let codigoVerificador = obtenerCodigoVerificador(codigo);
    let codigoFinal = codigo + codigoVerificador;

    JsBarcode("#barcode", codigoFinal, {
        format: "ITF",
        width: 2,
        height: 50,
        displayValue: true
    });
    let codigoP = document.getElementById("codigo");
    codigoP.value = codigoFinal;
}

function obtenerCodigoVerificador(codigo) {
    let sumaImpares = 0;
    let sumaPares = 0;

    for (let i = 0; i < codigo.length; i++) {
        if (i % 2 == 0) {
            sumaImpares += parseInt(codigo[i]);
        } else {
            sumaPares += parseInt(codigo[i]);
        }
    }

    let etapa2 = sumaImpares * 3;
    let etapa4 = etapa2 + sumaPares;
    let codigoVerificador = 10 - (etapa4 % 10);
    return codigoVerificador;
}

function limpiarInputs() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input5").value = "";
}

function descargarCodigo(){
    let codigo = document.getElementById("barcode");
    let image = codigo.src;
    let a = document.createElement("a");
    let stringCodigo = document.getElementById("codigo").value;
    a.href = image;
    a.download = stringCodigo + ".png";
    a.click();
}

function copiarCodigo() {
    //     <p id="codigo" hidden></p>
    let codigoP = document.getElementById("codigo");
    navigator.clipboard.writeText(codigoP.value);
}

/* CSS */



/* LISTADO DE COMPROBANTES PARA EL INPUT 5 (ES UN SELECT) */

let comprobantes = [
    { value: "01", innerHTML: "FACTURAS A" },
    { value: "02", innerHTML: "NOTAS DE DEBITO A" },
    { value: "03", innerHTML: "NOTAS DE CREDITO A" },
    { value: "04", innerHTML: "RECIBOS A" },
    { value: "05", innerHTML: "NOTAS DE VENTA AL CONTADO A" },
    { value: "06", innerHTML: "FACTURAS B" },
    { value: "07", innerHTML: "NOTAS DE DEBITO B" },
    { value: "08", innerHTML: "NOTAS DE CREDITO B" },
    { value: "09", innerHTML: "RECIBOS B" },
    { value: "10", innerHTML: "NOTAS DE VENTA AL CONTADO B" },
    { value: "11", innerHTML: "FACTURAS C" },
    { value: "12", innerHTML: "NOTAS DE DEBITO C" },
    { value: "13", innerHTML: "NOTAS DE CREDITO C" },
    { value: "15", innerHTML: "RECIBOS C" },
    { value: "16", innerHTML: "NOTAS DE VENTA AL CONTADO C" },
    { value: "17", innerHTML: "LIQUIDACION DE SERVICIOS PUBLICOS CLASE A" },
    { value: "18", innerHTML: "LIQUIDACION DE SERVICIOS PUBLICOS CLASE B" },
    { value: "19", innerHTML: "FACTURAS DE EXPORTACION" },
    { value: "20", innerHTML: "NOTAS DE DEBITO POR OPERACIONES CON EL EXTERIOR" },
    { value: "21", innerHTML: "NOTAS DE CREDITO POR OPERACIONES CON EL EXTERIOR" },
    { value: "22", innerHTML: "FACTURAS - PERMISO EXPORTACION SIMPLIFICADO - DTO. 855/97" },
    { value: "23", innerHTML: "COMPROBANTES “A” DE COMPRA PRIMARIA PARA EL SECTOR PESQUERO MARITIMO" },
    { value: "24", innerHTML: "COMPROBANTES “A” DE CONSIGNACION PRIMARIA PARA EL SECTOR PESQUERO MARITIMO" },
    { value: "25", innerHTML: "COMPROBANTES “B” DE COMPRA PRIMARIA PARA EL SECTOR PESQUERO MARITIMO" },
    { value: "26", innerHTML: "COMPROBANTES “B” DE CONSIGNACION PRIMARIA PARA EL SECTOR PESQUERO MARITIMO" },
    { value: "27", innerHTML: "LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A" },
    { value: "28", innerHTML: "LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B" },
    { value: "29", innerHTML: "LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C" },
    { value: "30", innerHTML: "COMPROBANTES DE COMPRA DE BIENES USADOS" },
    { value: "31", innerHTML: "MANDATO - CONSIGNACION" },
    { value: "32", innerHTML: "COMPROBANTES PARA RECICLAR MATERIALES" },
    { value: "33", innerHTML: "LIQUIDACION PRIMARIA DE GRANOS" },
    { value: "34", innerHTML: "COMPROBANTES A DEL APARTADO A  INCISO F)  R.G. N°  1415" },
    { value: "35", innerHTML: "COMPROBANTES B DEL ANEXO I, APARTADO A, INC. F), R.G. N° 1415" },
    { value: "36", innerHTML: "COMPROBANTES C DEL Anexo I, Apartado A, INC.F), R.G. N° 1415" },
    { value: "37", innerHTML: "NOTAS DE DEBITO O DOCUMENTO EQUIVALENTE QUE CUMPLAN CON LA R.G. N° 1415" },
    { value: "38", innerHTML: "NOTAS DE CREDITO O DOCUMENTO EQUIVALENTE QUE CUMPLAN CON LA R.G. N° 1415" },
    { value: "39", innerHTML: "OTROS COMPROBANTES A QUE CUMPLEN CON LA R G  1415" },
    { value: "40", innerHTML: "OTROS COMPROBANTES B QUE CUMPLAN CON LA R.G. N° 1415" },
    { value: "41", innerHTML: "OTROS COMPROBANTES C QUE CUMPLAN CON LA R.G. N° 1415" },
    { value: "43", innerHTML: "NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B" },
    { value: "44", innerHTML: "NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C" },
    { value: "45", innerHTML: "NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A" },
    { value: "46", innerHTML: "NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B" },
    { value: "47", innerHTML: "NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C" },
    { value: "48", innerHTML: "NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A" },
    { value: "49", innerHTML: "COMPROBANTES DE COMPRA DE BIENES NO REGISTRABLES A CONSUMIDORES FINALES" },
    { value: "50", innerHTML: "RECIBO FACTURA A  REGIMEN DE FACTURA DE CREDITO" },
    { value: "51", innerHTML: "FACTURAS M" },
    { value: "52", innerHTML: "NOTAS DE DEBITO M" },
    { value: "53", innerHTML: "NOTAS DE CREDITO M" },
    { value: "54", innerHTML: "RECIBOS M" },
    { value: "55", innerHTML: "NOTAS DE VENTA AL CONTADO M" },
    { value: "56", innerHTML: "COMPROBANTES M DEL ANEXO I  APARTADO A  INC F) R.G. N° 1415" },
    { value: "57", innerHTML: "OTROS COMPROBANTES M QUE CUMPLAN CON LA R.G. N° 1415" },
    { value: "58", innerHTML: "CUENTAS DE VENTA Y LIQUIDO PRODUCTO M" },
    { value: "59", innerHTML: "LIQUIDACIONES M" },
    { value: "60", innerHTML: "CUENTAS DE VENTA Y LIQUIDO PRODUCTO A" },
    { value: "61", innerHTML: "CUENTAS DE VENTA Y LIQUIDO PRODUCTO B" },
    { value: "63", innerHTML: "LIQUIDACIONES A" },
    { value: "64", innerHTML: "LIQUIDACIONES B" },
    { value: "66", innerHTML: "DESPACHO DE IMPORTACION" },
    { value: "68", innerHTML: "LIQUIDACION C" },
    { value: "70", innerHTML: "RECIBOS FACTURA DE CREDITO" },
    { value: "80", innerHTML: "INFORME DIARIO DE CIERRE (ZETA) - CONTROLADORES FISCALES" },
    { value: "81", innerHTML: "TIQUE FACTURA A" },
    { value: "82", innerHTML: "TIQUE FACTURA B" },
    { value: "83", innerHTML: "TIQUE" },
    { value: "88", innerHTML: "REMITO ELECTRONICO" },
    { value: "89", innerHTML: "RESUMEN DE DATOS" },
    { value: "90", innerHTML: "OTROS COMPROBANTES - DOCUMENTOS EXCEPTUADOS - NOTAS DE CREDITO" },
    { value: "91", innerHTML: "REMITOS R" },
    { value: "99", innerHTML: "OTROS COMPROBANTES QUE NO CUMPLEN O ESTÁN EXCEPTUADOS DE LA R.G. 1415 Y SUS MODIF" },
    { value: "110", innerHTML: "TIQUE NOTA DE CREDITO" },
    { value: "111", innerHTML: "TIQUE FACTURA C" },
    { value: "112", innerHTML: "TIQUE NOTA DE CREDITO A" },
    { value: "113", innerHTML: "TIQUE NOTA DE CREDITO B" },
    { value: "114", innerHTML: "TIQUE NOTA DE CREDITO C" },
    { value: "115", innerHTML: "TIQUE NOTA DE DEBITO A" },
    { value: "116", innerHTML: "TIQUE NOTA DE DEBITO B" },
    { value: "117", innerHTML: "TIQUE NOTA DE DEBITO C" },
    { value: "118", innerHTML: "TIQUE FACTURA M" },
    { value: "119", innerHTML: "TIQUE NOTA DE CREDITO M" },
    { value: "120", innerHTML: "TIQUE NOTA DE DEBITO M" },
    { value: "201", innerHTML: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyMEs (FCE) A" },
    { value: "202", innerHTML: "NOTA DE DEBITO ELECTRÓNICA MiPyMEs (FCE) A" },
    { value: "203", innerHTML: "NOTA DE CREDITO ELECTRÓNICA MiPyMEs (FCE) A" },
    { value: "206", innerHTML: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyMEs (FCE) B" },
    { value: "207", innerHTML: "NOTA DE DEBITO ELECTRÓNICA MiPyMEs (FCE) B" },
    { value: "208", innerHTML: "NOTA DE CREDITO ELECTRÓNICA MiPyMEs (FCE) B" },
    { value: "211", innerHTML: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyMEs (FCE) C" },
    { value: "212", innerHTML: "NOTA DE DEBITO ELECTRÓNICA MiPyMEs (FCE) C" },
    { value: "213", innerHTML: "NOTA DE CREDITO ELECTRÓNICA MiPyMEs (FCE) C" },
    { value: "331", innerHTML: "LIQUIDACION SECUNDARIA DE GRANOS" },
    { value: "332", innerHTML: "CERTIFICACION ELECTRONICA (GRANOS)" },
    { value: "995", innerHTML: "REMITO ELECTRÓNICO CÁRNICO" }
];

// start on document ready

document.addEventListener("DOMContentLoaded", function() {

    let select = document.getElementById("input5");

    console.log(select);

    for (const element of comprobantes) {
        let option = document.createElement("option");
        option.value = element.value;
        option.innerHTML = element.innerHTML;
        select.appendChild(option);
    }
});