//Botão Menu
function myFunction(y) {
    var x = document.getElementById("col-md-4");
    if (x.style.display === "block") {
    	y.classList.toggle("change");
        x.style.display = "none";
    } else {
    	y.classList.toggle("change");
        x.style.display = "block";
    }
}

//Carrossel
function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n==undefined){n = ++slideIndex}
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  let x= slides[slideIndex-1]
  if(x) {
  x.style.display= "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 3000);
}
} 

var slideIndex = 1;
var timer = null;

document.addEventListener('DOMContentLoaded', function() {
  //Loading gif
  let gif = document.getElementById('col-md-8')
  if(gif) {
    document.getElementById('col-md-8').style.display = "none";
    document.getElementById('footer').style.display = "none";
    setTimeout(function() {
      document.getElementById('loader').style.display = "none";
      document.getElementById('col-md-8').style.display = "block";
      document.getElementById('footer').style.display = "flex";

    }, 1200);

    let db = connect('https://codes-grupo2-p1.firebaseio.com/')
    let params = extract()
    let path = '/' + params['category'] + '/projetos/' + params['projeto']

  //Replacing data from firebase
   db.download(path, function(data) {
      replace('body', {
          'name': data['name'],
          'descricao': data['items']['Descrição do Projeto'],
          'habilidades': data['items']['Habilidades Desenvolvidas'],
          'imagem': data['items']['Imagens'],
      })
      replace('title', {
          'name': data['name'],
      })
    })

  }


//Carrossel
  showSlides(slideIndex);
})
