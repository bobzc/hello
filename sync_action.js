var button_stat = false;
var version = 0;
var func = sync();

window.onload = function(){getLMS();};

var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', flip, false);

function getLMS(){
	var time;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){	
		if(xhr.readyState == 4 && xhr.status == 200){
			version = parseInt(xhr.responseText);
		//	alert(version);
			setInterval(sync, 500);
		}
	}
	xhr.open("GET", "./lmt.php", true);
	xhr.send();
	return false;
}


function flip(){
	if(button_stat){
		button.innerHTML = 'Auto-sync off';
	}else{
		button.innerHTML = 'Auto-sync on';
	}
	button_stat = !button_stat;
}


function sync(){
	var trigger = (auto_sync && !viewing && button_stat);
	console.log(version);
	if(trigger){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){	
			if(xhr.readyState == 4 && xhr.status == 200){
				if(xhr.responseText == "not-modified"){
					return;
				}else{
					var obj = JSON.parse(xhr.responseText);
					document.getElementById('display').innerHTML = obj.content;
					version = obj.time;
				}
			}
		}
		xhr.open("GET", "./content.php?version=" + version , true);
		xhr.send();
	}

}
