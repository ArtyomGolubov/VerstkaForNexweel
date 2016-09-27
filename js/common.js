



(function () {
//------#menu-top-------------------------
var a = document.querySelector('#menu'), b = document.querySelector('#menu-top'), P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
window.addEventListener('scroll', Ascroll, false);
document.body.addEventListener('scroll', Ascroll, false);

// изменение меню при  прокрутке
function Ascroll() {

    ChangeMainMenu();

    var Ra = a.getBoundingClientRect(),
        R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
    var dropdown = $('.dropdown');
    if ((Ra.top - P) <= 0) {
        //if ((Ra.top - P) <= R) {
        //    console.log('granica');
        //    b.className = 'stop';
        //    //b.style.top = -R + 'px';
        //    b.style.display = "none";
        //} else {
            b.style.display = "block";
            //---dropdown menu-----             
            dropdown.css('position', 'fixed');
        //}
    } else {
        b.style.display = "none";
        dropdown.css('position', 'relative');
    }
    window.addEventListener('resize', function () {
        a.children[0].style.width = getComputedStyle(a, '').width
    }, false);
}

$(window).ready(function () {
    SizeMenuInit();
    Ascroll();
    CheckDropdownMenuBtn();
    ChangeMainMenu();
});

$(window).bind('orientationchange', function (e) {
    console.log('orientationchange');
    SizeMenuInit();
    Ascroll();
    CheckDropdownMenuBtn();
    ChangeMainMenu();
});


//---- #menu -------------------------------
function CheckDropdownMenuBtn() {
    if ($('#menu li:hidden').length > 0) {
        $('.dropdown').addClass('show');
    }
    else {
        $('.dropdown').removeClass('show');
    }
}

// изменение меню при изменении ширины экрана
function ChangeMainMenu() {
    var offsetMin = 60;
    var winWidth = $(this).width();
    var li = $('#menu li').each(function (index) {
        var left = $(this).offset().left;
        var offsetRight = winWidth - left - $(this).width();
        var text = $(this).text();

        if (offsetRight < offsetMin) {
            // перемещаем ссылку в дроп меню
            $('.dropdown-content a').each(function () {
                if ($.trim($(this).text()) == $.trim(text)) {
                    $(this).addClass('show');
                }
            });
            $(this).hide();
            return;
        }
        if ((offsetRight > (offsetMin + $(this).next('li').width())) && $(this).is(':visible')) {
            if ($(this).next('li').is(':hidden')) {
                text = $(this).next('li').text();
                $('.dropdown-content a').each(function () {
                    if ($.trim($(this).next('a').text()) == $.trim(text)) {
                        $(this).next('a').removeClass('show');
                    }
                });
                $(this).next('li').show();
            }
        }
    });

    var li = $('#menu-top li:visible').each(function (index) {
        var left = $(this).offset().left;
        var offsetRight = winWidth - left - $(this).width();

        if (offsetRight < offsetMin && ($(this).is(':visible'))) {
            $(this).hide();
            return;
        }
        if ((offsetRight > (offsetMin + $(this).next('li').width())) && $(this).is(':visible')) {
            if ($(this).next('li').is(':hidden')) {
                $(this).next('li').show();
            }
        }
    });
}

//---- REsize #menu -------------------------------
$(window).resize(function () {
    CheckDropdownMenuBtn();
    ChangeMainMenu();
});

//---------------------------------------

function SizeMenuInit() {
    var top = $('#menu li').eq(0).offset().top;

    $('#menu li').each(function (index) {
        if (top < $(this).offset().top) {
            // перемещаем ссылку в дроп меню
            $('.dropdown-content a').each(function (i) {
                if (index == i) {
                    $(this).addClass('show');
                }
            });
            $(this).hide();
            return;
        }
        else {
            if ($(this).next('li').is(':hidden')) {
                text = $(this).next('li').text();
                $('.dropdown-content a').each(function () {
                    if ($.trim($(this).next('a').text()) == $.trim(text)) {
                        $(this).next('a').removeClass('show');
                    }
                });
                $(this).next('li').show();
            }
        }
    });
}
})();


//----- DROPDOWN MENU ------------------
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// ------------ call me -----------------------
$(document).ready(function () { // вся мaгия пoсле зaгрузки стрaницы
    console.log('callme');
    $('#callback').click(function (event) { // лoвим клик пo ссылки с id="go"
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function () { // пoсле выпoлнения предъидущей aнимaции
		 	    $('#call_me')
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({ opacity: 1, top: '50%' }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		 	});
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#overlay').click(function () { // лoвим клик пo крестику или пoдлoжке
        $('#call_me')
			.animate({ opacity: 0, top: '45%' }, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function () { // пoсле aнимaции
				    $(this).css('display', 'none'); // делaем ему display: none;
				    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
    });
});

// gmap
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 16,
        center: { lat: 46.4821837, lng: 30.737634 },
        scrollwheel: false,
        draggable: false
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: 46.4821837, lng: 30.737634 }
    });
    //marker.addListener('click', toggleBounce);
    marker.setAnimation(google.maps.Animation.BOUNCE);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


////////------------ menu.html -------------------------------
$(window).ready(function () {
    console.log('112');
    $('.food_item').each(function () {
        var wb = $(this).find('.work_block');
        var min = 80;
        var max = 100;
        var width = Math.floor(Math.random() * (max - min + 1)) + min;
        wb.css('width', width + '%');

        min = 10;
        max = 80;
        var top = Math.floor(Math.random() * (max - min + 1)) + min;
        wb.css('top', top + '%');

        //$(this).mouseout(function () {
        //    $(this).find('.work_block').css('opacity', '1');
        //})
    })
})