var __body = document.getElementsByTagName('body')[0];
var __background;
var __viewLayer;
var __centerDiv;
var __image;
var __table;
var __eventArray;

var TD_CLASS = ['NW', "N", "NE", "W", "CENTER", "E", "SW", "S", "SE"];


function imageEvent(target, type, func, prop){
	this.eTarget = target;
	this.eType = type;
	this.eListener = func;
	this.eProp = prop;
}


document.getElementsByTagName("body")[0].addEventListener('click', function(e){
	var t = e.target;
	if(t.tagName.toLowerCase() == 'img' && t.getAttribute('id') == null){
		console.log('view image');
		viewImageHandler(t);
	}else if(t.getAttribute('id') != null && 
				t.getAttribute('id').toLowerCase() == 'background'){
		console.log('exit view');
		exitView();
	}
}, false);



function viewImageHandler(target){
	__background = createBackground();
	__viewLayer = createViewLayer(target);

	__body.appendChild(__background);
	__body.appendChild(__viewLayer);
	
	__image.onload = function (){
		setImageStyle(__image);
		setViewLayerStyle();	
	};
	__image.addEventListener('mousedown', imageDragHandler, false);
}


/********************/
/*  event handler   */
/********************/



function imageDragHandler(e){
	console.log("down");
	e.stopPropagation();
	e.preventDefault();

	__eventArray = new Array();
	__eventArray.length = 0;

	__eventArray.push(new imageEvent(__image, "mousemove", movingDragHandler, false));
	__eventArray.push(new imageEvent(__image, "mouseup", undragHandler, false));
	__eventArray.push(new imageEvent(__body, "mousemove", movingDragHandler, false));
	__eventArray.push(new imageEvent(window, "mousemove", outOfBound, false));
	__eventArray.push(new imageEvent(window, "mouseup", undragHandler, false));

	for(var i = 0; i < __eventArray.length; i++){
			var tmp = __eventArray[i];
			tmp.eTarget.addEventListener(tmp.eType, tmp.eListener, tmp.eProp);
	}
}



function movingDragHandler(e){
	console.log("moving");
	e.stopPropagation();
	e.preventDefault();
	moveBoundCheck(e);
}

function undragHandler(e){
	console.log("up");

}

function outOfBound(e){
	console.log("out");

}

function moveBoundCheck(e){
	

}




/***********************/
/* generate view layer */
/***********************/

function createBackground(){
	var bg = document.createElement("div");
	bg.setAttribute("id", "background");
	bg.style.position = "absolute";
	bg.style.top = window.pageYOffset + "px";
	bg.style.left = window.pageXOffset + "px";
	bg.style.width = window.innerWidth + "px";
	bg.style.height = window.innerHeight + "px";
	bg.style.background = "grey";
	bg.style.opacity = "0.8";
	return bg;
}

function setImageStyle(obj){
	var ratio = obj.height / obj.width;
	if(obj.height  > window.innerHeight * 0.7){
		obj.style.height = window.innerHeight * 0.7 + "px";
		obj.style.width = obj.height / ratio + "px";
	}
	if(obj.width > window.innerWidth * 0.7){
		obj.style.width = window.innerWidth * 0.7 + "px";
		obj.style.height = obj.width * ratio + "px";
	}
}

function setViewLayerStyle(){
	__viewLayer.style.width = __image.width + 30 + "px";
	__viewLayer.style.height = __image.height + 35 + "px";
	__viewLayer.style.position = "absolute";
	__viewLayer.style.top = (window.innerHeight - __image.height) / 2 + "px";
	__viewLayer.style.left = (window.innerWidth - __image.width) / 2 + "px";
}

function createViewLayer(image){
	var src = image.getAttribute('src');
	var tmp = src.indexOf("thumb-");
	var path = "./upload/" + src.substring(tmp+6);
	
	var img = document.createElement('img');
	img.setAttribute('src', path);
	img.setAttribute('id', 'image');
	__image = img;

	var table = createTable();
	__table = table;

	__centerDiv.appendChild(img);

	var div = document.createElement('div');
	div.appendChild(table);


	return div;
}


function setBaseTableStyle(obj){
	obj.style.width = "100%";
	obj.style.height = "100%";
}

function createCenterDIV(){
	var div = document.createElement('div');
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.border = "1px solid black";
	div.style.padding = "0";
	return div;
}

function createTable(){
	var ROWS = 3;
	var COLS = 3;
	var baseTable = null;

	baseTable = document.createElement("table");
	setBaseTableStyle(baseTable);

	for(var i = 0; i < ROWS; i++){
		var TRtemp = document.createElement("tr");
		for(var j = 0; j < COLS; j++){
			var TDtemp = document.createElement("td");
			TDtemp.className = TD_CLASS[i*COLS + j];
			TRtemp.appendChild(TDtemp);

			if(i*COLS+j == 4){
				var centerDIV = createCenterDIV()
				TDtemp.appendChild(centerDIV);
				__centerDiv = centerDIV;		
			}
		}

		baseTable.appendChild(TRtemp);
	}
	return baseTable;
}



function exitView(){
	__body.removeChild(__background);
	__body.removeChild(__viewLayer);
}
