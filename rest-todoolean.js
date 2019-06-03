$(document).ready(function(){

//stampo la mia lista iniziale di impegni
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

  //  inserisco opzione di modifica delle opzioni
  $('.modifica').click(function(){
    var nuovotesto = $('.testonuovo').val();
    var testodamodificare = $('.opzioni').val();
    $('.testonuovo').val('');
    console.log(nuovotesto);
    console.log(testodamodificare);

    $.ajax({
      'url': 'http://157.230.17.132:3003/todos/' + testodamodificare,
      'method':'PUT',
      'data':{
        'text': nuovotesto
      },
      'success': function(data){

        stampalista();

      },
      'error': function(res){
        alert('Errore');
      }
    })

  })

  //funzione per stampare la lista di impegni
  function stampalista(){
    $('.container').html('');
    $('.opzioni').html('');
    $.ajax({
      'url': 'http://157.230.17.132:3003/todos',
      'method':'GET',
      'success': function(data){

        console.log(data);
        for (var i = 0; i<data.length; i++) {
          $('.container').append('<li><span data-id="'+ data[i].id +'"><i class="far fa-window-close"></i></span> ' + data[i].text + '</li>');
          $('.opzioni').append('<option value="'+ data[i].id +'">' + data[i].text + '</option>');
        }

      },
      'error': function(res){
        alert('Errore');
      }
    })

  }


});
