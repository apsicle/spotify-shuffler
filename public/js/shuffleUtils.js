function getMaxTracks(access_token) {
	var empty = false;
	var position = 0;
	var tracksArray = [];

	while(empty != true) {
		$.ajax({
				type: 'GET',
				url: "https://api.spotify.com/v1/me/tracks",
				dataType: 'json',
				contentType: 'json',
				headers: {
					'Authorization': 'Bearer ' + access_token
					},
				data: {limit: 50, offset: position},
				async: false,
				success: function(response) {
					tracksArray = tracksArray.concat(response.items);

					if(response.next == null) {empty = true};
					},
				error: function(exception) {
					alert('Exception: something failed');
				}
			});
		position += 50

	}
	
	return tracksArray;
	
}

function getLinks(trackArr) {
	var linkArr = [];
	for (var i = 0; i < trackArr.length; i++) {
		linkArr.push(trackArr[i].track.id);
	}
	return linkArr;
}

function getURIs(trackArr) {
	var URIArr = [];
	for (var i = 0; i < trackArr.length; i++) {
		URIArr.push(trackArr[i].track.URI);
	}
	return URIArr;
}

function getExternalURLs(trackArr) {
	var externalURLArr = [];
	for (var i = 0; i < trackArr.length; i++) {
		externalURLArr.push(trackArr[i].track.external_urls.spotify);
	}
	return externalURLArr;
}

function shuffleLinks(linkArr) {
	var randomArr = [];
	var size = linkArr.length;
	var currentIndex = size - 1;
	var tempValue, y;

	for (var i = 0; i < size; i++) {
		y = Math.floor(Math.random() * size);
		tempValue = linkArr[i];
		linkArr[i] = linkArr[y];
		linkArr[y] = tempValue;
	}
	return linkArr;
}

function deleteLinks(linkArr, access_token) {
	var empty = false;
	var position = 0;
	var size = linkArr.length;


	while(empty != true) {
		$.ajax({
				type: 'DELETE',
				url: "https://api.spotify.com/v1/me/tracks",
				contentType: 'application/json',
				headers: {
					'Authorization': 'Bearer ' + access_token
					},
				data: JSON.stringify(linkArr.slice(position, position + 50)),
				async: false,
				success: function(response) {
					if((position + 50) > size) {empty = true};
					},
				error: function(jqxhr) {
					alert(jqxhr.responseText);
				}
			});
		position += 50;

	}
}

// function addLinks(relinkArr, access_token) {
// 	'''This version is faster but wont actually be random because spotify will place the songs in in a certain order when 
// 	given an array of song ids.'''
// 	var empty = false;
// 	var position = 0;
// 	var size = relinkArr.length;

// 	while(empty != true) {
// 		$.ajax({
// 				type: 'PUT',
// 				url: "https://api.spotify.com/v1/me/tracks",
// 				contentType: 'application/json',
// 				headers: {
// 					'Authorization': 'Bearer ' + access_token
// 					},
// 				data: JSON.stringify(relinkArr.slice(position, position + 25)),
// 				async: false,
// 				success: function(response) {
// 					if((position + 25) >= size) {empty = true};
// 					},
// 				error: function(exception) {
// 					alert('Exception: something failed');
// 				}
// 			});
// 		position += 25;

// 	}
// }

//add some saving functionality before deleting dudes playlist.
function addLinks(relinkArr, access_token) {
	var empty = false;
	var position = 0;
	var size = relinkArr.length;

	while(empty != true) {
		$.ajax({
				type: 'PUT',
				url: "https://api.spotify.com/v1/me/tracks",
				contentType: 'application/json',
				headers: {
					'Authorization': 'Bearer ' + access_token
					},
				data: JSON.stringify(relinkArr.slice(position, position + 1)),
				async: false,
				success: function(response) {
					if((position + 1) >= size) {empty = true};
					},
				error: function(exception) {
					alert('Exception: something failed');
				}
			});
		position += 1;
	}
}

function addTrack(access_token) {
	var tracks = ['3MrRksHupTVEQ7YbA0FsZK'];
	$.ajax({
				type: 'PUT',
				url: "https://api.spotify.com/v1/me/tracks",
				contentType: 'application/json',
				headers: {
					'Authorization': 'Bearer ' + access_token
					},
				data: JSON.stringify(tracks),
				async: false,
				success: function(response) {
					alert('You added the track to the playlist!')
					},
				error: function(jqxhr) {
					alert('Exception: You failed to add the track to the playlist!');
					alert(jqxhr.responseText);
					alert(JSON.stringify(tracks));
				}
			});
	empty = true;
}