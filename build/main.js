'use strict';

$(function () {
  // vars
  // fancy select/options
  $("#mySelect").selectBoxIt();
  // on option select
  $('#mySelect').on('change', function () {
    event.preventDefault();
    $('header').switchClass("nyHeaderLarge", "nyHeaderSmall", 1000, "easeOutBounce"); // smooth change between classes
    $('.nyt_logo_before').switchClass("nyt_logo_before", "nyt_logo_after", 100); // smooth change between classes
    $('.newsWrapper').empty(); // clear any previous content
    $('#loading_area').append('<img class="loading_gif" src="build/assets/images/ajax-loader.gif" alt="loading">'); // show loading gif
    var $sectionChoice = $('#mySelect').val(); // store the option value
    $.getJSON('http://api.nytimes.com/svc/topstories/v1/' + $sectionChoice + '.json?api-key=4479d1b9820757b0491ca69a63423da6:13:75123737') // call the API using our variable
    .done(function (data) {
      if (data.results.length === 0) {
        $('.newsWrapper').append('<h1 class="error">Sorry, we couldn\'t find anything in the ' + $sectionChoice + ' section right now.<h1>'); // error handling
      } else {
          var selectedData = data.results.filter(function (item) {
            return item.multimedia.length;
          }).splice(0, 12);
          $.each(selectedData, function (index, value) {
            var imgUrl = value.multimedia[4]; // using the large image files
            console.log(imgUrl);
            var storyUrl = value.url;
            var headline = value.abstract;
            $('.newsWrapper').append('\n                      <div class="contentArea contentItem' + index + '">\n                      <div class="textArea">\n                      <a href="' + storyUrl + '" target="_blank" class="newsText textId\'+index+\'">' + headline + '</a>\n                      </div>\n                      </div>');
            $('.contentItem' + index).css("background-image", 'url(' + imgUrl.url + ')');
            // this if/else will load the articles abstract on a mobile device for a better UX.
            if (window.matchMedia('(min-width: 600px)').matches) {
              // Code to show/hide text on images
              $('.textId' + index).hide();
              $('.contentItem' + index).mouseover(function () {
                $('.textId' + index).fadeIn(100);
              });
              $('.contentItem' + index).mouseout(function () {
                $('.textId' + index).fadeOut(100);
              });
            } else {
              $('.textId' + index).show();
            }
          }); // .each
        }; // close else statement
    }) // done func
    .always(function () {
      $('#loading_area').hide();
    }); // always func
  }); // select on change
}); // jQuery