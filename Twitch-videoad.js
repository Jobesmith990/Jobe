twitch-videoad.js application/javascript 
 (function() { 
 	if ( /(^|\.)twitch\.tv$/.test(document.location.hostname) === false ) { return; } 
 	var ourMediaPlayer; 
 	Object.defineProperty(window, 'MediaPlayer', { 
 		set: function(newMediaPlayer) { 
 			if ( ourMediaPlayer !== undefined ) { return; } 
 			var oldLoad = newMediaPlayer.MediaPlayer.prototype.load; 
 			newMediaPlayer.MediaPlayer.prototype.load = function(e) { 
 				try { 
 					if ( e.startsWith('https://usher.ttvnw.net/api/channel/hls/') ) { 
 						var url = new URL(e); 
 						url.searchParams.delete('baking_bread'); 
 						url.searchParams.delete('baking_brownies'); 
 						url.searchParams.delete('baking_brownies_timeout'); 
 						e = url.href; 
 					} 
 				} catch (err) { 
 					//console.error('Failed to bypass Twitch livestream ad'); 
 				} 
 				return oldLoad.call(this, e); 
 			}; 
 			ourMediaPlayer = newMediaPlayer; 
 		}, 
 		get: function() { 
 			return ourMediaPlayer; 
 		} 
 	}); 
 	var realFetch = window.fetch; 
 	window.fetch = function(input, init) { 
 		if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) { 
 			var url = new URL(arguments[0]); 
 			url.searchParams.delete('player_type'); 
 			arguments[0] = url.href; 
 		} 
 		return realFetch.apply(this, arguments); 
 	}; 
 })(); 

(function() {
	if ( /(^|\.)twitch\.tv$/.test(document.location.hostname) === false ) { return; }
	var realFetch = window.fetch;
	window.fetch = function(input, init) {
		if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) {
			var url = new URL(arguments[0]);
                        url.searchParams.forEach(function(value, key) {
                            url.searchParams.delete(key);
                        });
			arguments[0] = url.href;
		}
		return realFetch.apply(this, arguments);
	};
})();
