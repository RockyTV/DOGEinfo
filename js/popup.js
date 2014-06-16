var getInfo = $.get("https://api.prelude.io/last-usd/DOGE", function(data) {
	
	document.getElementById("priceDOGE").innerHTML = utf8_decode("Ð") + "1000 = $" + Math.round((data['last'] * 1000) * 100) / 100;
	
	// get last trade DOGE-BTC
	var getSatoshi = $.get("https://api.prelude.io/last/DOGE", function(preludeSatoshi) {
		var satoshi = preludeSatoshi['last'] * 100000000;
		document.getElementById("priceSatoshi").innerHTML = utf8_decode("Ð") + "1 = " + satoshi + " satoshi";
	});
	
	// DOGECHAIN
		var getHeight = $.get("http://dogechain.info/chain/Dogecoin/q/getblockcount", function(bheight) {
			document.getElementById("blockHeight").innerHTML = "Height: " + bheight;
			var getHash = $.get("https://dogechain.info/api/v1/block/" + bheight, function(dgjson) {
			var hash = dgjson['block']['hash'];
			document.getElementById("blockHash").innerHTML = "Hash: " + hash.substring(0, 6);
			document.getElementById("difficulty").innerHTML = "Difficulty: " + dgjson['block']['difficulty'];
		});
	});
	
	var awesomehash = "https://awesomehash.com/index.php?";
	var awesomehashApi = awesomehash + "page=api&";
	var navbardata = awesomehashApi + "action=getnavbardata"
	
	// AwesomeHash statistics
	var getAwesome = $.getJSON("https://awesomehash.com/index.php?page=api&action=getnavbardata", function(awesome) {
		
		var networkhash = Math.round(awesome['getnavbardata']['data']['network']['hashrate']);
		var modifier = awesome['getnavbardata']['data']['network']['hashratemodifiername'];
		console.log(networkhash);
		
		document.getElementById("networkHash").innerHTML = "Net. Hashrate: " + networkhash + " " + modifier;
			
	});
	
	// DOGECHAIN wallet balance
	var getBalance = $.get("https://dogechain.info/api/v1/address/balance/" + walletAddress, function (jstring) {
		var success = jstring['success'];
		var balance = jstring['balance'];
		
		
		if (success == 1)
		{
			document.getElementById("walletBalance").innerHTML = "Wallet Balance: " + utf8_decode("Ð") + balance;	
		}
		
		
	});
	
	console.log(data);
});

$(window).ready(function () {
	$('#loading').hide();
});

function load_options() {
	chrome.storage.sync.get({
		'walletAddress': 'muchaddressveryempty'
	}, function(item) {
		walletAddress = item.walletAddress;	
	});
}

$(window).ready(load_options);


function utf8_decode(str_data){
		// http://kevin.vanzonneveld.net
		// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
		// +	  input by: Aman Gupta
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// *	 example 1: utf8_decode('Kevin van Zonneveld');
		// *	 returns 1: 'Kevin van Zonneveld'
		
		var tmp_arr = [], i = ac = c = c1 = c2 = 0;
		
		while (i < str_data.length) {
			c = str_data.charCodeAt(i);
			if (c < 128) {
				tmp_arr[ac++] = String.fromCharCode(c);
				i++;
			}
			else 
				if ((c > 191) && (c < 224)) {
					c2 = str_data.charCodeAt(i + 1);
					tmp_arr[ac++] = String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = str_data.charCodeAt(i + 1);
					c3 = str_data.charCodeAt(i + 2);
					tmp_arr[ac++] = String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
		}
		
		return tmp_arr.join('');
}