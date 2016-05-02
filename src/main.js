$(function(){
  // vars
  var $sectionChoice;
  var selectedData;
  var imgUrl;
  var storyUrl;
  var headline;
    // fancy select/options
    $("#mySelect").selectBoxIt();
    // on option select
    $('#mySelect').on('change',function() {
        event.preventDefault();
        $('header').switchClass( "nyHeaderLarge", "nyHeaderSmall", 1000, "easeOutBounce" );   // smooth change between classes
        $('.nyt_logo_before').switchClass( "nyt_logo_before", "nyt_logo_after", 100 );   // smooth change between classes
        $('.newsWrapper').empty();    // clear any previous content
        $('#loading_area').append('<img class="loading_gif" src="build/assets/images/ajax-loader.gif" alt="loading">');   // show loading gif
        $sectionChoice = $('#mySelect').val(); // store the option value
        $.getJSON('http://api.nytimes.com/svc/topstories/v1/'+$sectionChoice+'.json?api-key=4479d1b9820757b0491ca69a63423da6:13:75123737') // call the API using our variable
            .done(function(data) {
              if (data.results.length === 0){
                $('.newsWrapper').append('<h1 class="error">Sorry, we couldn\'t find anything in the '+$sectionChoice+' section right now.<h1>'); // error handling
              } else {
                  selectedData = data.results // change the value of selectedData to the results array
                  selectedData = selectedData.filter(function(item){ // checks if the result has images, and takes the first 12
                                                      return item.multimedia.length
                                                     }).splice(0,12);
                $.each(selectedData, function (index, value) {
                     imgUrl = value.multimedia[4]; // using the large image files
                     storyUrl = value.url;
                     headline = value.abstract;
                    $('.newsWrapper').append('<div class="contentArea contentItem'+index+'"><div class="textArea"><a href="'+storyUrl+'" target="_blank" class="newsText textId'+index+'">'+headline+'</a></div></div>');
                    $('.contentItem'+index).css("background-image", "url('" + imgUrl.url + "')");
                    // this if/else will load the articles abstract on a mobile device for a better UX.
                    if (window.matchMedia('(min-width: 600px)').matches) {
                      // Code to show/hide text on images
                      $('.textId'+index).hide();
                      $( '.contentItem'+index ).mouseover(function() {
                        $( '.textId'+index ).fadeIn( 100 );
                      });
                      $( '.contentItem'+index ).mouseout(function() {
                        $( '.textId'+index ).fadeOut( 100 );
                      });
                        } else {
                          $('.textId'+index).show();
                        }
                }) // .each
              }; // close else statement
            }) // done func
            .always(function() {
             $('#loading_area').hide();
            }) // always func
    }); // select on change
});// jQuery
