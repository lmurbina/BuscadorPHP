/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  // Comentamos todo lo relacionado al video de fondo por falta del archivo
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
      // video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
       // video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      //video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();


$(document).ready(function(){

  // Obtener y rellenar todas las ciudades
  getAllCities(() => {
    $('#selectCiudad').material_select();
  })

  // Obtener y rellenar todos los typos
  getAllTypes(() => {
    $('#selectTipo').material_select();
  })

  // Definir evento para el boto mostrar todo
  $('#mostrarTodos').on('click', () => {
    getAllDatos();
  })

  // Definir evento para el formulario de busqueda
  $('#formulario').submit(submitSearch);

});

function getAllCities(callback){
  $.ajax({
    url: "./lib/library.php",
    dataType: "json",
    type: 'GET',
    data:{action:'getAllCities'},
    success: function(response){
      $.map(response, function(city){
        var option = `<option value='${city}'>${city}</option>`
        $('#selectCiudad').append(option);
      })
      callback();
    },
    error: function(err){
      console.log(err);
    }
  })
}

function getAllTypes(callback){
  $.ajax({
    url: "./lib/library.php",
    dataType: "json",
    type: 'GET',
    data:{action:'getAllTypes'},
    success: function(response){
      $.map(response, function(type){
        var option =`<option value='${type}'>${type}</option>`        
        $('#selectTipo').append(option);
      })
      callback();
    },
    error: function(err){
      console.log(err);
    }
  })
}

function getAllDatos(){
  $.ajax({
    url: './lib/buscador.php',
    dataType: 'JSON',
    type: 'GET',
    data: { action: 'getAllDatos'},
    success: function(datos){
      if (datos) {
        // Borramos cualquier busqueda y limpiamos la pantalla
        $('.itemMostrado').remove();

        $.map(datos, function(realState, index){
          let template =`<div class='itemMostrado card'>
                           <img src='img/home.jpg' alt=''>
                           <div class='card-stacked'>
                             <div class='card-content'>
                               <div><b>Dirección: </b>${realState['Direccion']}</div>
                               <div><b>Ciudad: </b>${realState['Ciudad']}</div>
                               <div><b>Telefono: </b>${realState['Telefono']}</div>
                               <div><b>Codigo postal: </b>${realState['Codigo_Postal']}</div>
                               <div><b>Precio: </b><span class='precioTexto'>${realState['Precio']}</span></div>
                               <div><b>Tipo: </b>${realState['Tipo']}</div>
                             </div>
                             <div class='card-action right-align'><a href='#'>Ver mas.</a></div>
                           </div>
                         </div>`

          $('.colContenido').append(template)
        })
      }
    },
    error: function(err){
      console.log(err);
    }
  })
}

function submitSearch(event){
  event.preventDefault()
  var precio = $('#rangoPrecio').val(),
      precioFrom = precio.split(";")[0],
      precioTo = precio.split(";")[1]

  var tipo = $('#selectTipo').val(),
      ciudad = $('#selectCiudad').val()

  $.ajax({
    url: './lib/buscador.php',
    dataType: "json",
    type: 'GET',
    data:{action:'filterResults', precioFrom:precioFrom, precioTo:precioTo, tipo:tipo, ciudad:ciudad},
    success: function(datos){
      if (datos) {
        // Borramos cualquier busqueda y limpiamos la pantalla
        $('.itemMostrado').remove();

        $.map(datos, function(realState, index){
          let template =`<div class='itemMostrado card'>
                           <img src='img/home.jpg' alt=''>
                           <div class='card-stacked'>
                             <div class='card-content'>
                               <div><b>Dirección: </b>${realState['Direccion']}</div>
                               <div><b>Ciudad: </b>${realState['Ciudad']}</div>
                               <div><b>Telefono: </b>${realState['Telefono']}</div>
                               <div><b>Codigo postal: </b>${realState['Codigo_Postal']}</div>
                               <div><b>Precio: </b><span class='precioTexto'>${realState['Precio']}</span></div>
                               <div><b>Tipo: </b>${realState['Tipo']}</div>
                             </div>
                             <div class='card-action right-align'><a href='#'>Ver mas.</a></div>
                           </div>
                         </div>`

          $('.colContenido').append(template)
        })
      }
    },
    error: function(err){
      console.log(err);
    }
  })
}