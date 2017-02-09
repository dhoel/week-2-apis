

var state = {
    YOUTUBE_BASE_URL: 'https://www.googleapis.com/youtube/v3/search',
    key: 'AIzaSyDenH4fAGWR967TtP_ezbC8Hkj329kaCHc',
    vids: [
    ]
}

function addVids(state, items){
  state.vids = items;
}

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    key: state.key,
    part: 'snippet',
    maxResults: 10
  }
  $.getJSON(state.YOUTUBE_BASE_URL, query, callback);
}


// function displayYouTubeSearchData(data) {
//   console.log(data);
// }

function renderVids(state){
    // 1. create <li> elements from state.vids
    console.log(state.vids);


    var listElements = state.vids.map(function(vid) {
      return "<li> <img src='" + vid.snippet.thumbnails.default.url + "'></li>";
    });
    console.log(listElements);


    // 2. insert <li> elements into <ul> on dom
    $('.js-search-results').html(listElements);
}

function displayYouTubeSearchData(data) {
  console.log('func calleds');
  addVids(state, data.items);
  renderVids(state);
}


    //var temp = data.items.map(function())

    //for (var i = 0; i < data.items.length; i++) {
      //temp.thumbnailUrl = data.items[i].snippet.thumbnails.default.url;
      //console.log(temp);
      //state.vids.push(temp);
      //console.log(state.vids);
      //resultElement += '<img class = "thumbnail" src = ' + data.items[i].snippet.thumbnails.default.url + '>';
//     }
// }
//   else {
//     console.log('fail')
//     // resultElement += '<p>No results</p>';
//   }
//   console.log(state.vids);
//   //$('.js-search-results').html(resultElement);
// }
function initializeListners () {

  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });


  //  $('.js-search-results').on('click', '.thumbnail', function(event) {
  //     data.items;
  //  });
}
$(function(){initializeListners();});
