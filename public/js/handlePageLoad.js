function onPageLoad() {
    // Grab 
    var params = getHashParams();
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

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

function onLogin(access_token) {
    // Show loggedin page
    $('#login').hide();
    $('#loggedin').show();

    // capture some useful song and profile information
    var allTracks = getMaxTracks(access_token);
    var linkArr = getLinks(allTracks);
    var URIArr = getURIs(allTracks);
    var URLArr = getExternalURLs(allTracks);
    var reorderedLinkArr = shuffleLinks(linkArr);

    // Compile templates
    var userTracksExternalUrlsSource = document.getElementById('user-tracks-external-urls-template').innerHTML,
        userTracksExternalUrlsTemplate = Handlebars.compile(userTracksExternalUrlsSource),
        userTracksExternalUrlsPlaceholder = document.getElementById('user-tracks-external-urls')
        userTracksExternalUrlsPlaceholder.innerHTML = userTracksExternalUrlsTemplate(URLArr);

    // load user profile info
    
    
    // Add click listener to shuffle button
    window.onload = function() {
        const shuffleButton = document.getElementById("shuffle-songs");
        const showLinksButton = document.getElementById("show-links");

        // start tracks hidden
        $('#user-tracks-external-urls').hide();

        shuffleButton.addEventListener ("click", function() {
            this.disabled = true; // Just click once! Then get off the dang site.
            this.id = "shuffle-songs-disabled";
            shuffleTracks(linkArr, reorderedLinkArr, access_token);
            
        }, false);
        showLinksButton.addEventListener ("click", function() { 
            var isVisible = $('#user-tracks-external-urls').is(':visible');
            if (isVisible) {
                $('#user-tracks-external-urls').hide();
            } else {
                $('#user-tracks-external-urls').show();                
            }
        }, false);
    }
}

onPageLoad();