$(document).ready(function(){

var source = $('#entry-template').html();
var template = Handlebars.compile(source);

  stampalista();


  // intercetto il click sul pulsante per creare un nuovo impegno in lista
  $('.inserisci').click(function(){
    var nuovo_impegno = $('.nuovoimpegno').val()
    $('.nuovoimpegno').val('');

    $.ajax({
      'url': 'http://157.230.17.132:3003/todos',
      'method':'POST',
      'data': {
        'text': nuovo_impegno
      },
      'success': function(){

        stampalista();

      },
      'error': function(res){
        alert('Errore');
      }
    })

  })

  // intercetto il click sulla x di un impegno in lista per cancellarlo

  $('.container').on('click', 'span', function(){
    var id_da_cancellare = $(this).attr("data-id");

    $.ajax({
      'url': 'http://157.230.17.132:3003/todos/' + id_da_cancellare,
      'method':'DELETE',
      'success': function(){

        stampalista();

      },
      'error': function(res){
        alert('Errore');
      }
    })

  });

  //funzione per stampare la lista di impegni

  function stampalista(){
    $('.container').html('');
    $.ajax({
      'url': 'http://157.230.17.132:3003/todos',
      'method':'GET',
      'success': function(data){

        console.log(data);
        for (var i = 0; i<data.length; i++) {
          // console.log(data[i].text);
          $('.container').append('<li><span data-id="'+ data[i].id +'"><i class="far fa-window-close"></i></span> ' + data[i].text + '</li>');
        }

      },
      'error': function(res){
        alert('Errore');
      }
    })

  }




});
