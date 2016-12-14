var LICZBA_KAFELKOW = 80;     //80
var KAFELKI_NA_RZAD = 10;      //10
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
	'test4.png',
	'test5.png',
	'test6.png',
	'test7.png',
	'test8.png',
	'test9.png',
	'test10.png',
	'test11.png',
	'test12.png',
	'test13.png',
	'test14.png',
	'test15.png',
	'test16.png',
	'test17.png',
	'test18.png',
	'test19.png',
	'test20.png',
	'test21.png',
	'test22.png',
	'test23.png',
	'test24.png',
	'test25.png',
	'test26.png',
	'test27.png',
	'test28.png',
	'test29.png',
	'test30.png',
	'test31.png',
	'test32.png',
	'test33.png',
	'test34.png',
	'test35.png',
	'test36.png',
	'test37.png',  
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
        //je?eli jeszcze nie pobrali?my 1 elementu
        //lub je?eli index tego elementu nie istnieje w pobranych...
        if (!pobraneKafelki[0] || (pobraneKafelki[0].data('index') != element.data('index'))) {
            pobraneKafelki.push(element);
            element.css({'background-image' : 'url('+obrazkiKafelkow[element.data('cardType')]+')'})    
        }
 
        if (pobraneKafelki.length == 2) {
            moznaBrac = false;
			//                je?eli      |            jest taki sam jak         | oznacza, ?e elementy s? takie same
			         //  odpala si?       V      wtedy funkcja "usunKafelki"     V     je?eli nie s? takie same w?acza sie funkcja "zresetujKafelki"     
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
 //Je?eli wybrane kafelki si? ró?ni? od siebie zostan? zakryte wybranym wcze?niej obrazkiem
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