function save_options() {
	var address = document.getElementById("txtAddress").value;
	chrome.storage.sync.set({
		'walletAddress': address
	}, function () {
		var status = document.getElementById("status");
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);	
	});	
}

function load_options() {
	chrome.storage.sync.get({
		'walletAddress': 'muchaddressveryempty'
	}, function(item) {
		document.getElementById("txtAddress").value = item.walletAddress;	
	});
}

$("window").ready(load_options);
$("#save").click(save_options);