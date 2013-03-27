
var dragbox = document.getElementById("dropbox");
dragbox.addEventListener('dragenter', handleDragEnter, false);
dragbox.addEventListener('dragover', handleDragOver, false);
dragbox.addEventListener('dragleave', handleDragLeave, false);
dragbox.addEventListener('drop', handleDrop, false);
var progress = document.getElementById("progressbar");

function handleDragEnter(e){
	if(e.stopPropagation)
		e.stopPropagation();
		dragbox.innerHTML="enter";
	return false;
}

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

