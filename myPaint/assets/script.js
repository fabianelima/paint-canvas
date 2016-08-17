/**SCRIPT**/

/*
	CANVAS PAINTER 1.0
	------------------------------------------------
	Livremente adaptado do tutorial de William Malone: 
	http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app
	
	Código: Fabiane Lima
	Arte: Fabiane Lima
	------------------------------------------------
	FUTUROS RECURSOS:
	- Desenhar formas geométricas: retângulo, círculo, triângulo.
*/

$(function() {
	/* preparando o terreno */
	var canvasDiv = document.getElementById('canvas-div');
	var clickX = [];
	var clickY = [];
	var clickDrag = [];
	var paint;


	/* paleta de cores e espessura do traço */
	var colorBlack = '#000000';
	var colorGreen = '#0BB200';
	var colorYellow = '#FFCF40';
	var colorBlue = '#2F54FF';
	var colorRed = '#E04F2B';
	var eraser = '#FFFFFF';

	var clickColor = [];
	var curColor = colorBlack;

	var clickSize = [];
	var curSize = 'small';

	var clickTool = [];
	var curTool = 'pencil';


	/* o canvas propriamente dito */
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 800);
	canvas.setAttribute('height', 600);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);


	if (typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");


	/* posição do mouse no container */
	$('#container').on('mousedown', function(e){
		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});

	$('#container').on('mousemove', function(e) {
		if (paint) {
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});

	$('#container').on('mouseup', function(e) {
		paint = false;
	});

	$('#container').on('mouseleave', function(e) {
		paint = false;
	});


	/* botões */
	$('.clear-canvas').on('click', function(e) {
		clickX = [];
		clickY = [];
		clickDrag = [];
		clickColor = [];
		clickSize = [];
		clickTool = [];
		clearCanvas();
	});

	$('.color-black').on('mousedown', function(e) {		curColor = colorBlack;		});
	$('.color-green').on('mousedown', function(e) {		curColor = colorGreen;		});
	$('.color-yellow').on('mousedown', function(e) {	curColor = colorYellow;		});
	$('.color-blue').on('mousedown', function(e) {		curColor = colorBlue;		});
	$('.color-red').on('mousedown', function(e) {		curColor = colorRed;		});
	$('.size-small').on('mousedown', function(e) {		curSize = 'small';			});
	$('.size-medium').on('mousedown', function(e) {		curSize = 'medium';			});
	$('.size-large').on('mousedown', function(e) {		curSize = 'large';			});
	$('.eraser').on('mousedown', function(e) {			curColor = eraser;			});
	$('.tool-pencil').on('mousedown', function(e) {		curTool = 'pencil';			});
	$('.tool-rect').on('mousedown', function(e) {		curTool = 'rect';			});
	$('.tool-circ').on('mousedown', function(e) {		curTool = 'circ';			});


	/* função que gerencia o clicar/arrastar */
	function addClick(x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
		clickColor.push(curColor);
		clickSize.push(curSize);
		clickTool.push(curTool);
	}


	/* função que redesenha o canvas a cada novo clique e opção */
	function redraw() {
		clearCanvas();

		context.strokeStyle = curColor;
		context.lineJoin = 'round';

		for (i = 0; i < clickX.length; i++) {
			if (clickSize[i] == 'small') {
				radius = 3
			}
			else if (clickSize[i] == 'medium') {
				radius = 7
			}
			else if (clickSize[i] == 'large') {
				radius = 16
			}

			context.beginPath();
			
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1], clickY[i - 1]);
			}
			else {
				context.moveTo(clickX[i], clickY[i]);
			}

			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.strokeStyle = clickColor[i];
			context.lineWidth = radius;
			context.stroke();

			if (clickTool[i] == 'rect') {				// Se eu descobrir como acerta esse trecho, mato a charada.
				clearCanvas();
				var x = clickX[i];
				var y = clickY[i];
				var w = canvas.width - clickX[i];
				var h = canvas.height - clickY[i];
				context.strokeRect(x, y, w, h);
			}

			/*if (clickTool[i] == 'circ') {				// Se eu descobrir como acerta esse trecho, mato a charada.
				centerX = canvas.width / 2;
				centerY = canvas.height / 2;
				rad = 70;
				clearCanvas();
				context.arc(clickX, clickY, rad, 0, (2 * Math.PI), false);
			}*/
		}
	}


	/* função que limpa o canvas */
	function clearCanvas() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
});