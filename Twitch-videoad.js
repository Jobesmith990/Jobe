twitch-videoad.js application/javascript
(function() {
	var ourMediaPlayer = undefined;
	Object.defineProperty(window, 'MediaPlayer', {
		set: function(newMediaPlayer) {
			if (typeof(ourMediaPlayer) !== 'undefined')
				return;
			var oldLoad = newMediaPlayer.MediaPlayer.prototype.load;
			newMediaPlayer.MediaPlayer.prototype.load = function(e) {
				try {
					if (e.startsWith('https://usher.ttvnw.net/api/channel/hls/')) {
						console.log('Removing ad parameters from playlist request');
						var url = new URL(e);
						url.searchParams.delete('baking_bread');
						url.searchParams.delete('baking_brownies');
						url.searchParams.delete('baking_brownies_timeout');
						e = url.href;
					}
				} catch (err) {
					console.error('Failed to bypass Twitch livestream ad');
				}
				return oldLoad.call(this, e);
			};
			ourMediaPlayer = newMediaPlayer;
		},
		get: function() {
			return ourMediaPlayer;
		}
	});
})();
