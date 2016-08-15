/**SCRIPT**/

/*
	CANVAS PAINTER 1.0
	------------------------------------------------
	Livremente adaptado do tutorial de William Malone: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
	
	Código: Fabiane Lima
	Arte: Fabiane Lima [por enquanto]
	------------------------------------------------
	PROBLEMAS CONHECIDOS:
	- Quando se troca a espessura do pincel, o desenho do canvas inteiro troca de espessura.
	- Quando se apaga tudo com o botão 'Apagar tudo' [er] e depois se troca de cor, ele demora até 'se tocar' de que outra cor foi escolhida.
*/

$(function() {
	var canvasDiv = document.getElementById('canvas-div');
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

	var colorBlack = '#000000';
	var colorGreen = '#0BB200';
	var colorYellow = '#FFCF40';
	var colorBlue = '#2F54FF';
	var colorRed = '#E04F2B';
	var eraser = '#FFFFFF';

	var curColor = colorBlack;
	var clickColor = new Array();

	var clickSize = new Array();
	var curSize = 'small';

	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 800);
	canvas.setAttribute('height', 600);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);

	if (typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");

	$('#container').on('mousedown', function(e){
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
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


	/* ---------------------------------------- botões ---------------------------------------- */
	$('.clear-canvas').on('click', function(e) {
			clickX = new Array();
			clickY = new Array();
			clickDrag = new Array();
			clearCanvas();
	});

	$('.color-black').on('mousedown', function(e) {
		curColor = colorBlack;
	});

	$('.color-green').on('mousedown', function(e) {
		curColor = colorGreen;
	});

	$('.color-yellow').on('mousedown', function(e) {
		curColor = colorYellow;
	});

	$('.color-blue').on('mousedown', function(e) {
		curColor = colorBlue;
	});

	$('.color-red').on('mousedown', function(e) {
		curColor = colorRed;
	});

	$('.size-small').on('mousedown', function(e) {
		curSize = 'small';
	});

	$('.size-medium').on('mousedown', function(e) {
		curSize = 'medium';
	});

	$('.size-large').on('mousedown', function(e) {
		curSize = 'large';
	});

	$('.eraser').on('mousedown', function(e) {
		curColor = eraser;
	});

	/* ---------------------------------------------------------------------------------------- */


	function addClick(x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
		clickColor.push(curColor);
		clickSize.push(curSize);
	}

	function redraw() {
		clearCanvas();

		var radius;

		context.strokeStyle = curColor;
		context.lineJoin = 'round';

		switch (curSize) {
			case 'small':
				radius = 3;
				break;
			case 'medium':
				radius = 7;
				break;
			case 'large':
				radius = 16;
				break;
		}

		for (i = 0; i < clickX.length; i++) {
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
		}
	}

	function clearCanvas() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
});