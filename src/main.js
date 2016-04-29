$(function(){

  // vars
  var sectionChoice;
  var selectedData;
  var imgUrl;
  var storyUrl;
  var headline;

    // fancy select/options
    $("#mySelect").selectBoxIt();
    // on option select
    $('#mySelect').on('change',function() {
        event.preventDefault();
        // smooth change between classes
        $( 'header' ).switchClass( "nyHeaderLarge", "nyHeaderSmall", 1000, "easeInOutQuad" );
        $('.newsWrapper').empty();
        sectionChoice = $('#mySelect').val();
        console.log(sectionChoice);
        $.getJSON('http://api.nytimes.com/svc/topstories/v1/'+sectionChoice+'.json?api-key=4479d1b9820757b0491ca69a63423da6:13:75123737')
            .done(function(data) {
              console.log(data);
              if (data.results.length === 0){
                $('.newsWrapper').append('<h1 class="error">Sorry, we couldn\'t find anything in the '+sectionChoice+' section right now.<h1>');
              } else {
                  selectedData = data.results
                  selectedData = selectedData.filter(function(item){
                                                    return item.multimedia.length
                                                  }).splice(0,12);
                $.each(selectedData, function (index, value) {
                     imgUrl = value.multimedia[4];
                     storyUrl = value.url;
                     headline = value.abstract;
                    $('.newsWrapper').append('<div class="contentArea contentItem'+index+'"><div class="textArea"><a href="'+storyUrl+'" target="_blank" class="newsText">'+headline+'</a></div></div>');
                    $('.contentItem'+index).css("background-image", "url('" + imgUrl.url + "')");
                }) // .each
              } // close else statement
          }); // done func
    }); // select on change
});// jQuery
