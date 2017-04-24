var INSTA_BASE_URL = 'https://api.instagram.com/v1/tags/coffee/media/recent?access_token=ACCESS-TOKEN&callback=callbackFunction';
var RAV_BASE_URL = '';

function getDataFromInsta(searchTerm, callback) {
    var feed = new Instafeed({
        clientId: 'YOUR_CLIENT_ID',
        get: 'tagged',
        tagName: searchTerm,
        sortBy: 'most-recent',
        target: 'instafeed',
        resolution: 'standard_resolution',
        limit: 15,
        template: '<div class=""><a href="{{link}}"><img src="{{image}}" class="instaimage"></a></div>',
        success: callback
    });
    feed.run();
    $.ajax(settings);
}



function getDataFromRav(searchTerm, callback) {
    var settings = {
        url: RAV_BASE_URL,
        data: {
            part: 'snippet',
            key: 'AIzaSyBcNX1xVrmVGTDyHb_ZDL9qeUV24VG6NLU',
            q: searchTerm,
            maxResults: 50,
            //order: title,
            //type: video,
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}


function displayYouTubeSearchData(data) {
    var resultElement = '';
    if (data.items) {
        data.items.forEach(function(item) {
            resultElement += '<p>' + item.snippet.title + '</p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '"></a>';
        });
    } else {
        resultElement += '<p>No results</p>';
    }

    $('.js-search-results').html(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(function() { watchSubmit(); });