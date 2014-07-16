// GET DOGE-BTC FROM CRYPTSY
var getInfo = $.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132", function(data) {
	
	var cryptsyBTC = data['return']['markets']['DOGE']['lasttradeprice'] * 100000000;
	
	// GET DOGE-USD FROM CRYPTSY
	var getCryptsyUSD = $.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=182", function(data2) {
		var convert = data2['return']['markets']['DOGE']['lasttradeprice'];
		
		document.getElementById("cryptsy").innerHTML = document.getElementById("cryptsy").innerHTML + "<div id=showhide><br><div class=left>&#208;1 = " + cryptsyBTC + " satoshi" + "<br>&#208;1000 = $" + Math.round((convert * 1000) * 100) / 100 + "" + "<\div><\div>";
		
	});
	
	var getBterBTC = $.get("https://data.bter.com/api/1/ticker/DOGE_BTC", function(data3) {
		var bterBTC = data3['last'] * 100000000;
		
		var getBterUSD = $.get("https://data.bter.com/api/1/ticker/DOGE_USD", function(data4) {			
			var bterUSD = data4['last'] * 1000;
			
			document.getElementById("bter").innerHTML = document.getElementById("bter").innerHTML + "<div id=showhide2><br><div class=left>&#208;1 = " + bterBTC + " satoshi" + "<br>&#208;1000 = $" + Math.round(bterUSD * 100) / 100 + "" + "<\div><\div>"
			
			});
		
	});
	
	// Math.round((data['last'] * 1000) * 100) / 100;
	
	// get last trade DOGE-BTC
	
	// DOGECHAIN
		var getHeight = $.get("http://dogechain.info/chain/Dogecoin/q/getblockcount", function(bheight) {
			document.getElementById("blockHeight").innerHTML = "Height: " + bheight;
			var getHash = $.get("https://dogechain.info/api/v1/block/" + bheight, function(dgjson) {
			var hash = dgjson['block']['hash'];
			document.getElementById("blockHash").innerHTML = "<span title=" + hash + ">Hash: " + hash.substring(0, 6) + "</span>";
			document.getElementById("difficulty").innerHTML = "Difficulty: " + dgjson['block']['difficulty'];
		});
	});
	
	
	// DOGECHAIN wallet balance
	
	if (walletAddress != "" && walletAddress != "muchaddressveryempty")
	{
	
		var getBalance = $.get("https://dogechain.info/api/v1/address/balance/" + walletAddress, function (jstring) {
			var success = jstring['success'];
			var balance = jstring['balance'];
		
			document.getElementById("walletBalance").innerHTML = "Wallet Balance: &#208;" + balance;
		
		});
	}
	else {
		document.getElementById("walletBalance").innerHTML = "Specify a valid Dogecoin address!"
	}
	
	console.log(data);
});

$(window).ready(function () {
	$('#loading').hide();
	$("#cryptsy").click(function() {
		$("#showhide").toggle();
	});
	$("#bter").click(function() {
		$("#showhide2").toggle();
	});
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