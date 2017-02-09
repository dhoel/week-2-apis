

var state = {
    YOUTUBE_BASE_URL: 'https://www.googleapis.com/youtube/v3/search',
    key: 'AIzaSyDenH4fAGWR967TtP_ezbC8Hkj329kaCHc',
    vids: [
    ]
}

function renderVids(state){
    // 1. create <li> elements from state.vids
    var listElements = state.vids.map(function(vid) {
      return "<li id=" + vid.id.videoId + "> <img src='" +
       vid.snippet.thumbnails.medium.url + "'></li>";
    });
    //console.log(listElements);
    // 2. insert <li> elements into <ul> on dom
    $('.js-search-results').html(listElements);
}

function addVids(state, items){
  state.vids = items;
  //console.log(state.vids);
}

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    key: state.key,
    type: 'video',
    part: 'snippet',
    maxResults: 12
  }
  $.getJSON(state.YOUTUBE_BASE_URL, query, callback);
}

function displayYouTubeSearchData(data) {
  addVids(state, data.items);
  renderVids(state);
}

function initializeListners () {

  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });

  $('.js-search-results').on('click', 'li', function(e) {
    var url = 'https://www.youtube.com/watch?v=' +
    $(e.currentTarget).attr('id');
    window.open(url, '_blank');
    //console.log(vId);
  });
}

$(function(){initializeListners();});
