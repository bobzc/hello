
var dragbox = document.getElementById("dropbox");
dragbox.addEventListener('dragenter', handleDragEnter, false);
dragbox.addEventListener('dragover', handleDragOver, false);
dragbox.addEventListener('dragleave', handleDragLeave, false);
dragbox.addEventListener('drop', handleDrop, false);
var progress = document.getElementById("progressbar");


/******************************
var images = document.getElementsByTagName("img");
var edits = document.getElementsByClassName("edit");


images[0].addEventListener('mouseover', handler, false);
images[0].addEventListener('mouseout', handler2, false);
edits[0].addEventListener('mouseover', handler, false);
console.log("21");

function handler(){
	console.log("111");
	edits[0].style.display = "inline";
}
function handler2(){
	console.log("111");
	edits[0].style.display = "none";
}



function handleDragEnter(e){
	if(e.stopPropagation)
		e.stopPropagation();
		dragbox.innerHTML="enter";
	return false;
}
***************************************************/
function handleDragOver(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();
	dragbox.innerHTML="over";
	
	return false;
}

function handleDragLeave(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();
	dragbox.innerHTML="leave";
	return false;
}

function handleDrop(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();
	dragbox.innerHTML="drop";
	var files = e.dataTransfer.files;
	var formData = new FormData();
	for(var i = 0; i < files.length; i++){
		formData.append('file', files[i]);
	}
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', './test.php');
	xhr.onload = function(){
		alert("success");
	};
	xhr.upload.onprogress = function(e){
		if(e.lengthComputable){
			var complete = (e.loaded/ e.total * 100 | 0);
			progress.value = progress.innerHTML = complete;

		}
	}
	xhr.send(formData);

	return false;
}


