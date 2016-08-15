/**SCRIPT**/

/*
	NOME DO PROGRAMA
	------
	Código: Fabiane Lima
	Arte: 
*/

$(function() {
	var canvasDiv = document.getElementById('container');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 800);
	canvas.setAttribute('height', 400);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
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

	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

	function addClick(x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	}

	function redraw() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.strokeStyle = '#000';
		context.lineJoin = 'round';
		context.lineWidth = 5;

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
			context.stroke();
		}
	}
});