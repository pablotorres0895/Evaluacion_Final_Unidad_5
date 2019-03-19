function cambiarColorAmarillo(pElemento){
    $(pElemento).animate({
        color : "#DCFF0E"
    },1000,'linear', function(){
        cambiarColorBlanco(pElemento);
    }).delay(2000);
}
function cambiarColorBlanco(pElemento){
    $(pElemento).animate({
        color : "#FFFFFF"
    },1000,'linear', function(){
        cambiarColorAmarillo(pElemento);
    }).delay(2000);
}
function retornaNumAleatorio(){
    return (Math.floor(Math.random()*4)+1);
}
function llenarTablero(){
    for (let i = 0; i < 7; i++) {
        for (let f = 0; f < 8; f++) {
            let num = retornaNumAleatorio();
            
            let element = $('<img src="image/'+num+'.png" class="elemento '+ num +'" alt="'+num+'" />')
            $('.col-'+f).append(element);
        }
    }
}
function setearArregloCaramelos(pPosicion, pTipoArreglo){
    // arreglos de columnas
    let columna1 = $('.col-1').children();
    let columna2 = $('.col-2').children();
    let columna3 = $('.col-3').children();
    let columna4 = $('.col-4').children();
    let columna5 = $('.col-5').children();
    let columna6 = $('.col-6').children();
    let columna7 = $('.col-7').children();

    let columnas = $([columna1,
                     columna2,
                     columna3,
                     columna4,
                     columna5,
                     columna6,
                     columna7]);

    if (typeof(pPosicion) == 'number') {
        let filas = $([columna1.eq(pPosicion), 
            columna2.eq(pPosicion), 
            columna3.eq(pPosicion),
            columna4.eq(pPosicion), 
            columna5.eq(pPosicion), 
            columna6.eq(pPosicion),
			columna7.eq(pPosicion)
		]);
	} else 
		pPosicion = '';
	

	if (pTipoArreglo === 'columnas') 
		return columnas;
	 else if (pTipoArreglo === 'filas' && pPosicion !== '') 
		return filas;
	
}
function obtenerFilas(pPosicion) {
	let fila = setearArregloCaramelos('filas', pPosicion);
	return fila;
}
function obtenerColumnas(pPosicion) {
	let columna = setearArregloCaramelos('columnas');
	return columna[pPosicion];
}
function validarColumnas(){
    for (let fila = 0; fila < 7; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            const element = array[columna];
            
        }
    }
}

function terminarJuego(){
    $('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Juego Terminado');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}

function iniciarJuego(){
    $('.btn-reinicio').click(function () {
		if ($(this).text() == 'Reiniciar')
			windows.location.reload(true);
		
        llenarTablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: terminarJuego
		})
	});
}

$(function(){
    let movimientos = 0;
    cambiarColorBlanco($('.main-titulo')[0]);
    iniciarJuego();
})

