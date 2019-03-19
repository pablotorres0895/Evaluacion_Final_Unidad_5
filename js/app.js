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
function contarMovimiento() {
	var total = Number($('#movimientos-text').text());
    total = total + 1;
    console.log(total);
	$('#movimientos-text').text(total);
}
function intercambiarElementos(event, pElemento) {
    console.log("llego");
	let elementoSeleccionado = $(pElemento.draggable);
	let seleccionadoSrc = elementoSeleccionado.attr('src');
	let elementoArrojado = $(this);
	let arrojadoSrc = elementoArrojado.attr('src');
	elementoSeleccionado.attr('src', arrojadoSrc);
    elementoArrojado.attr('src', seleccionadoSrc);
    console.log($('img.eliminar').length);
	setTimeout(function () {
        llenarTablero();
        
		if ($('img.eliminar').length === 0) {
			elementoSeleccionado.attr('src', seleccionadoSrc);
			elementoArrojado.attr('src', arrojadoSrc);
		} else {
			contarMovimiento();
		}
	}, 500);

}
function restriccionMovimiento(event, pElemento) {
	pElemento.position.top = Math.min(100, pElemento.position.top);
	pElemento.position.bottom = Math.min(100, pElemento.position.bottom);
	pElemento.position.left = Math.min(100, pElemento.position.left);
	pElemento.position.right = Math.min(100, pElemento.position.right);
}

function deshabilitarEventos() {

	$('img').droppable('disable');
	$('img').draggable('disable');
}
function habilitarEventos() {

	$('img').droppable('enable');
	$('img').draggable('enable');
}
function setearEventos() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: restriccionMovimiento
	});
	$('img').droppable({
		drop: intercambiarElementos
    });
    habilitarEventos();
}
function borrarElementos(pTipo, pPosicion, pFCCaramelo){
    for (var i = 0; i < pPosicion.length; i++) {
        if (pTipo === "fila"){
		    pFCCaramelo[pPosicion[i]].addClass('eliminar');
        }
        else if (pTipo === "columna"){
            pFCCaramelo.eq(pPosicion[i]).addClass('eliminar');
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
        var filas = $([columna1.eq(pPosicion), 
            columna2.eq(pPosicion), 
            columna3.eq(pPosicion),
            columna4.eq(pPosicion), 
            columna5.eq(pPosicion), 
            columna6.eq(pPosicion),
			columna7.eq(pPosicion)
		]);
	} else 
		pPosicion = '';
	

	if (pTipoArreglo === 'columna') 
		return columnas;
	 else if (pTipoArreglo === 'fila' && pPosicion !== '') 
		return filas;
	
}
function obtenerFilas(pPosicion) {
	let fila = setearArregloCaramelos(pPosicion,'fila');
	return fila;
}
function obtenerColumnas(pPosicion) {
    let row = setearArregloCaramelos(null, 'columna');
    
	return row[pPosicion];
}
function setearPuntuacion(pCantidadElementos) {
	let puntuacion = Number($('#score-text').text());
	switch (pCantidadElementos) {
		case 3:
            puntuacion = puntuacion + 30;
			break;
		case 4:
            puntuacion = puntuacion + 40;
			break;
		case 5:
            puntuacion = puntuacion + 50;
			break;
		case 6:
            puntuacion = puntuacion + 60;
			break;
		case 7:
            puntuacion = puntuacion + 70;
	}
	$('#score-text').text(puntuacion);
}
function validarElementos(pTipo, pCantidad){
    for (let j = 0; j < pCantidad; j++) {
		let contador = 0;
		let posicionElemento = [];
        let posicionElementoExtra = [];
        if (pTipo === "fila"){
            var cantidadElementos = obtenerFilas(j);
            var comparador = cantidadElementos[0];
        }
        if (pTipo === "columna"){
            var cantidadElementos = obtenerColumnas(j);
            var comparador = cantidadElementos.eq(0);
        }
		let gap = false;
		for (let i = 1; i < cantidadElementos.length; i++) {
            let srcComparador = comparador.attr('src');
            if (pTipo === "fila"){
                var srcCaramelo = cantidadElementos[i].attr('src');
            }
            else if (pTipo === "columna"){

                var srcCaramelo = cantidadElementos.eq(i).attr('src');

            }
			if (srcComparador != srcCaramelo) {
				if (posicionElemento.length >= 3) {
					gap = true;
				} else {
					posicionElemento = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						posicionElemento.push(i - 1);
					} else {
						posicionElementoExtra.push(i - 1);
					}
				}
				if (!gap) {
					posicionElemento.push(i);
				} else {
					posicionElementoExtra.push(i);
				}
				contador += 1;
            }
            if (pTipo === "fila"){
                comparador = cantidadElementos[i];
            }
            else if (pTipo === "columna"){
                comparador = cantidadElementos.eq(i);
            }
			
		}
		if (posicionElementoExtra.length > 2) {
			posicionElemento = $.merge(posicionElemento, posicionElementoExtra);
		}
		if (posicionElemento.length <= 2) {
			posicionElemento = [];
		}
		contadorElementos = posicionElemento.length;
		if (contadorElementos >= 3) {
            borrarElementos(pTipo, posicionElemento, cantidadElementos);
			setearPuntuacion(contadorElementos);
		}
	}
}
function validarColumnas(){
    validarElementos('columna',7);
}
function validarFilas(){
    validarElementos('fila',6);
}

function animarEliminacionElementos() {
    deshabilitarEventos();
    
	$('img.eliminar').effect('pulsate', 600);
	$('img.eliminar').animate({
			opacity: '0'
		}, {
			duration: 500
		})
		.animate({
			opacity: '0'
		}, {
			duration: 500,
			complete: function () {
                $('img.eliminar').remove();
                llenarTablero();
			},
			queue: true
		});
}
function setearValidaciones(){
    validarColumnas();
    validarFilas();
    if ($('img.eliminar').length !== 0) {
		animarEliminacionElementos();
	}
}
function llenarTablero(){
    
    let encabezado = 7;
	let columnas = $('[class^="col-"]');

	columnas.each(function () {
		let caramelos = $(this).children().length;
		let contador = encabezado - caramelos;
		for (let f = 0; f < contador; f++) {

            let num = retornaNumAleatorio();
            let elemento = $('<img src="image/'+num+'.png" class="elemento"/>')

			if (f === 0 && caramelos < 1) {
				$(this).append(elemento);
			} else {
				$(this).find('img:eq(0)').before(elemento);
			}
		}
	});
    setearEventos();
    setearValidaciones();
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
			location.reload(true);
		
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

