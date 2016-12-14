//ŚREDNI

var LICZBA_KAFELKOW = 12;
var KAFELKI_NA_RZAD = 4;
var kafelki = [];
var pobraneKafelki = [];
var moznaBrac = true;
var liczbaRuchow = 0;
var paryKafelkow = 0;
var obrazkiKafelkow = [
	'title_1.png',
    'title_2.png',
	'title_3.png',
	'test1.png',
	'test2.png',
	'test3.png',
	
    
];
 
function startGame() {
    kafelki = [];
    pobraneKafelki = [];
    moznaBrac = true;
    liczbaRuchow = 0;
    paryKafelkow = 0;
 
    var plansza = $('.plansza').empty();
 
    for (var i=0; i<LICZBA_KAFELKOW; i++) {
        kafelki.push(Math.floor(i/2));
    }
 
    for (i=LICZBA_KAFELKOW-1; i>0; i--) {
        var swap = Math.floor(Math.random()*i);
        var tmp = kafelki[i];
        kafelki[i] = kafelki[swap];
        kafelki[swap] = tmp;
    }
 
    for (i=0; i<LICZBA_KAFELKOW; i++) {
        var tile = $('<div class="kafelek"></div>');
        plansza.append(tile);
        tile.data('cardType',kafelki[i]);
        tile.data('index', i);
        tile.css({
            left : 5+(tile.width()+5)*(i%KAFELKI_NA_RZAD)
        });
        tile.css({
            top : 5+(tile.height()+5)*(Math.floor(i/KAFELKI_NA_RZAD))
        });
        tile.bind('click',function() {klikniecieKafelka($(this))});
    }
    $('.ruchy').html(liczbaRuchow);
}
 
function klikniecieKafelka(element) {
    if (moznaBrac) {
        //jeżeli jeszcze nie pobraliśmy 1 elementu
        //lub jeżeli index tego elementu nie istnieje w pobranych...
        if (!pobraneKafelki[0] || (pobraneKafelki[0].data('index') != element.data('index'))) {
            pobraneKafelki.push(element);
            element.css({'background-image' : 'url('+obrazkiKafelkow[element.data('cardType')]+')'})    
        }
 
        if (pobraneKafelki.length == 2) {
            moznaBrac = false;
			//                jeżeli      |            jest taki sam jak         | oznacza, że elementy są takie same
			         //  odpala się       V      wtedy funkcja "usunKafelki"     V     jeżeli nie są takie same włacza sie funkcja "zresetujKafelki"     
            if (pobraneKafelki[0].data('cardType') == pobraneKafelki[1].data('cardType')) {
                setTimeout('usunKafelki()', 1000);
            } else {
                setTimeout('zresetujKafelki()', 1000);
            }
 
            liczbaRuchow++;
            $('.ruchy').html(liczbaRuchow)
        }
    }
}
 
function usunKafelki() {
    pobraneKafelki[0].fadeOut(function() {
        $(this).remove();
    });
    pobraneKafelki[1].fadeOut(function() {
        $(this).remove();
 
        paryKafelkow++;
        if (paryKafelkow >= LICZBA_KAFELKOW / 2) {
            alert('Gratulacje!');
        }
        moznaBrac = true;
        pobraneKafelki = new Array();
    });
}
 //Jeżeli wybrane kafelki się różnią od siebie zostaną zakryte wybranym wcześniej obrazkiem
                                             //       |
											//        V
function zresetujKafelki() {
    pobraneKafelki[0].css({'background-image':'url(title.png)'})
    pobraneKafelki[1].css({'background-image':'url(title.png)'})
    pobraneKafelki = new Array();
    moznaBrac = true;
}
 
$(document).ready(function() {
 
    $('.startGame').click(function() {
        startGame();
    });
 
})