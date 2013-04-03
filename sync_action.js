window.onload = setInterval(sync,500);
var button_stat = false;
var lastModified;

var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', flip, false);


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
	if(trigger){
	
	}else{

	}

}
