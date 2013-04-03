var dropbox = document.getElementById("dropbox");
var progress = document.getElementById("progressbar");

dropbox.addEventListener('dragenter', handleDragEnter, false);
dropbox.addEventListener('dragover', handleDragOver, false);
dropbox.addEventListener('dragleave', handleDragLeave, false);
dropbox.addEventListener('drop', handleDrop, false);

// mouse over image
document.getElementsByTagName("body")[0].addEventListener('mouseover', function(e){
	var t = e.target;
	if(t.tagName.toLowerCase() == 'img' && t.getAttribute('id') == null){
		var parent = t.parentNode.parentNode;
		parent.childNodes[1].style.display="inline";
		parent.childNodes[2].style.display="inline";
		t.style.border="solid 2px red";
	}else if(t.innerHTML == "E" || t.innerHTML == "X"){
		t.parentNode.childNodes[1].style.display="inline";
		t.parentNode.childNodes[2].style.display="inline";
		t.parentNode.childNodes[0].childNodes[0].style.border="solid 2px red";
	}
}, false);

// mouse out image
document.getElementsByTagName("body")[0].addEventListener('mouseout', function(e){
	var t = e.target;
	if(t.tagName.toLowerCase() == 'img' && t.getAttribute('id') == null){
		var parent = t.parentNode.parentNode;
		parent.childNodes[1].style.display="none";
		parent.childNodes[2].style.display="none";
		t.style.border="0px";
	}
	else if(t.innerHTML == "E" || t.innerHTML == "X"){
		var parent = t.parentNode;
		parent.childNodes[1].style.display="none";
		parent.childNodes[2].style.display="none";
		parent.childNodes[0].childNodes[0].style.border="0px";
	}
}, false);

// click action
document.getElementsByTagName("body")[0].addEventListener('click', function(e){
	var t = e.target;
	if(t.innerHTML == "E"){
		console.log("edit\n");
		editHandler(t);
	}else if(t.innerHTML == "X"){
		console.log("delete\n");
		deleteHandler(t);
	}else{
		console.log("no action");
		return;
	}
}, false);



// drag handlers

function handleDragEnter(e){
	if(e.stopPropagation)
		e.stopPropagation();
	return false;
}

function handleDragOver(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();
	dropbox.style.border="Solid 2px #999";
	
	return false;
}

function handleDragLeave(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();
	dropbox.style.border="Solid 0px blue";
	return false;
}

function handleDrop(e){
	if(e.stopPropagation)
		e.stopPropagation();
	e.preventDefault();

	// append image data
	var files = e.dataTransfer.files;
	var formData = new FormData();
	for(var i = 0; i < files.length; i++){
		formData.append('file', files[i]);
	}
	
	// reg ajax
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){	
		if(xhr.readyState == 4 && xhr.status == 200){
			//append image
			if(xhr.responseText == "error"){
				alert("Error! Please upload a image!");
				return;
			}
			var imgs = document.getElementsByTagName('img');
			for(var i = 0; i < imgs.length; i++){
				if(xhr.responseText.indexOf(imgs[i].getAttribute('src')) != -1){
					console.log("ok"+i);
					var img = imgs[i];
					var box = img.parentNode.parentNode;
					box.parentNode.removeChild(box);
					break;
				}
			}				

			var div_element = document.createElement("div");
			var img_element = document.createElement("div");
			var edit_element = document.createElement("span");
			var delete_element = document.createElement("span");
			
			img_element.innerHTML = xhr.responseText;
			edit_element.innerHTML = 'E';
			delete_element.innerHTML = 'X';

			div_element.appendChild(img_element);
			div_element.appendChild(edit_element);
			div_element.appendChild(delete_element);

			var panel = document.getElementById("display");
			var first = panel.childNodes[0];
			panel.insertBefore(div_element, first);
		}
	}

	xhr.open('POST', './insert.php');
	xhr.onload = function(){
		setTimeout(function(){progress.value = 0;}, 300);
	};

	// handle process bar
	xhr.upload.onprogress = function(e){
		if(e.lengthComputable){
			var complete = (e.loaded/ e.total * 100 | 0);
			progress.value = progress.innerHTML = complete;

		}
	}

	// send request
	xhr.send(formData);
	return false;
}


// edit and delete

function editHandler(target){
	var description = prompt("Enter the description:");
	if(description == null){
		return;
	}
	if(description.length > 50){
		alert('The description is too long!');
		return;
	}
	// get file name
	var img = target.parentNode.childNodes[0].childNodes[0];
	img.setAttribute("title", description);
	var src = img.getAttribute('src');
	var tmp = src.indexOf("thumb-");
	filename = src.substring(tmp+6);

	// send request
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./edit.php?filename="+filename+"&description="+description, true);
	xhr.send();
	return false;
}	

function deleteHandler(target){
	if(!confirm("Are you sure to delete this photo?")){
		return;
	}

	//get file name
	var img = target.parentNode.childNodes[0].childNodes[0];
	var src = img.getAttribute('src');
	var tmp = src.indexOf("thumb-");
	var filename = src.substring(tmp+6);
	
	// delete element
	var box = target.parentNode;
	box.parentNode.removeChild(box);	

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./delete.php?filename="+filename, true);
	xhr.send();
	return false;
}	

