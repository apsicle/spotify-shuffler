var onPageLoad = function() {
    
    var params = getHashParams();
    
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
        console.log(access_token);

    if (error) {
        alert('There was an error during the authentication');
    } else {
        console.log(access_token);
        
        if (access_token) {
            // Generate the logged-in page
            onLogin(access_token);
            

        } else {
            // Otherwise, render the login screen.
            $('#login').show();
            $('#loggedin').hide();
        }
    }
}

// Def
/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

function onLogin(access_token) {
    // capture some useful song information in array format
    var allTracks = getMaxTracks(access_token);
    var linkArr = getLinks(allTracks);
    var URIArr = getURIs(allTracks);
    var URLarr = getExternalURLs(allTracks);
    var reorderedLinkArr = shuffleLinks(linkArr);

    // Compile templates
    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
    userProfileTemplate = Handlebars.compile(userProfileSource),
    userProfilePlaceholder = document.getElementById('user-profile');
    
    var userTracksExternalUrlsSource = document.getElementById('user-tracks-external-urls-template').innerHTML,
        userTracksExternalUrlsTemplate = Handlebars.compile(userTracksExternalUrlsSource),
        userTracksExternalUrlsPlaceholder = document.getElementById('user-tracks-external-urls')
        userTracksExternalUrlsPlaceholder.innerHTML = userTracksExternalUrlsTemplate(URLarr);

    // load user profile info
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
            userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            // If everything is working (you logged in and have an access token), 
            // show the page as logged in - i.e. the actual site + shuffling button.
            $('#login').hide();
            $('#loggedin').show();
        }
    });

    /**
     * delete links and re-add them, shuffled (spotify webapi doesn't allow for quick shuffling in-place);
    */
    function shuffleTracks() {
        deleteLinks(linkArr, access_token);
        addLinks(reorderedLinkArr, access_token);
        document.getElementById("shuffle-songs").disabled = false;
        alert('Success!');
    }

    // Add click listener to shuffle button
    window.onload = function() {
        const button = document.getElementById("shuffle-songs");
        button.addEventListener ("click", function() {
            this.disabled = true; 
            setTimeout(shuffleTracks, 1);
        }, false);
    }
}

onPageLoad();