$(document).ready(function(){

var source = $('#entry-template').html();
var template = Handlebars.compile(source);

  $.ajax({
    'url': 'http://157.230.17.132:3003/todos',
    'method':'GET',
    'success': function(res){

      console.log(res);
      for (var i = 0; i<res.length; i++) {
        console.log(res[i].text);
        $('.container').append('<br>' + '<i class="far fa-window-close"></i> ' + res[i].text + '</br>');
      }

    },
    'error': function(res){
      alert('Errore');
    }
  })




});
