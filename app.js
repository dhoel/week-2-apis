var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    key: 'AIzaSyDenH4fAGWR967TtP_ezbC8Hkj329kaCHc',
    part: 'snippet',
    maxResults: 10
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


// function displayYouTubeSearchData(data) {
//   console.log(data);
// }

function displayYouTubeSearchData(data) {
  //console.log(data);
  var resultElement = '';
  if (data.items) {
    for (var i = 0; i < data.items.length; i++) {
      //console.log(data.items[i].snippet.title);
      resultElement += '<p>' + data.items[i].snippet.title + '</p>';
    }
}
  else {
    console.log('fail')
    // resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});
