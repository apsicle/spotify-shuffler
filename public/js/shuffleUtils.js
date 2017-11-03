/*Array functions - no AJAX*/

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

/*Functions that access the spotify Web API*/
function deleteLinks(linkArr, reorderedLinkArr, access_token) {
	// Delete links 50 at a time. (Spotify API limit)
	var position = 0;

	function startDeleteLinks(linkArr, reorderedLinkArr, access_token, position) {
		$.ajax({
			type: 'DELETE',
			url: "https://api.spotify.com/v1/me/tracks",
			contentType: 'application/json',
			headers: {
				'Authorization': 'Bearer ' + access_token
				},
			data: JSON.stringify(linkArr.slice(position, position + 50)),
			async: true,
			success: function(response) {
				if((position + 50) > linkArr.length) {
					$('#text-description')[0].innerHTML = "Reordering Songs...";
					addLinks(reorderedLinkArr, access_token);
				} else {
					startDeleteLinks(linkArr, reorderedLinkArr, access_token, position + 50);					
				};
			},
			error: function(err) {
				alert('Error: failed while reordering tracks. Restore tracks by copy and pasting song links into your spotify player');
			}
		});
	}
	
	startDeleteLinks(linkArr, reorderedLinkArr, access_token, position);
}

function addLinks(reorderedLinkArr, access_token) {
	// Add links 
	var position = 0;

	function startAddLinks(reorderedLinkArr, access_token, position) {
		$.ajax({
			type: 'PUT',
			url: "https://api.spotify.com/v1/me/tracks",
			contentType: 'application/json',
			headers: {
				'Authorization': 'Bearer ' + access_token
				},
			data: JSON.stringify(reorderedLinkArr.slice(position, position + 50)),
			async: true,
			success: function(response) {
				if((position + 50) >= reorderedLinkArr.length) {
					$('#text-description')[0].innerHTML = "Done!";
				} else {
					startAddLinks(reorderedLinkArr, access_token, position+50);
				};
			},
			error: function(err) {
				alert('Error: failed while reordering tracks. Restore tracks by copy and pasting song links into your spotify player');
			}
		});
	}

	startAddLinks(reorderedLinkArr, access_token, position)
}

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
					alert('Exception: failed while getting tracks');
				}
			});
		position += 50

	}
	
	return tracksArray;

}

function getUserProfile(access_token) {
	var profile;

	$.ajax({
		url: 'https://api.spotify.com/v1/me',
		async:true,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
            profile = response;
        }
	});
	
	return profile;
}

/*Given the array of song URIs and the list of re-ordered song URIs,
shuffles the tracks saved by the user*/
function shuffleTracks(linkArr, reorderedLinkArr, access_token) {
	$('#text-description')[0].innerHTML = "Getting Songs..."
	setTimeout(function() {
		deleteLinks(linkArr, reorderedLinkArr, access_token);
	}, 100);
}
