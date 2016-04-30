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
        $( 'header' ).switchClass( "nyHeaderLarge", "nyHeaderSmall", 1000, "easeOutBounce" );   // smooth change between classes
        $('.newsWrapper').empty();    // clear any previous content
        $('#loading_area').append('<img class="loading_gif" src="assets/images/ajax-loader.gif" alt="loading">');   // show loading gif
        $sectionChoice = $('#mySelect').val(); // store the option value
        $.getJSON('http://api.nytimes.com/svc/topstories/v1/'+$sectionChoice+'.json?api-key=4479d1b9820757b0491ca69a63423da6:13:75123737') // call the API using our variable
            .done(function(data) {
              if (data.results.length === 0){
                $('.newsWrapper').append('<h1 class="error">Sorry, we couldn\'t find anything in the '+sectionChoice+' section right now.<h1>'); // error handling
              } else {
                  selectedData = data.results // change the value of selectedData to the results array
                  selectedData = selectedData.filter(function(item){ // checks if the result has images, and takes the first 12
                                                    return item.multimedia.length
                                                  }).splice(0,12);
                $.each(selectedData, function (index, value) {
                     imgUrl = value.multimedia[4]; // using the large image files
                     storyUrl = value.url; 
                     headline = value.abstract;
                    $('.newsWrapper').append('<div class="contentArea contentItem'+index+'"><div class="textArea"><a href="'+storyUrl+'" target="_blank" class="newsText">'+headline+'</a></div></div>');
                    $('.contentItem'+index).css("background-image", "url('" + imgUrl.url + "')");
                }) // .each
              } // close else statement
            }) // done func
            .always(function() {
             $('#loading_area').hide();
            }) // always func
    }); // select on change
});// jQuery
