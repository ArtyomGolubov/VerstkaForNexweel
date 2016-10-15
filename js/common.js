
$(window).on('load', function () {

    console.log('screen = ' + $(window).width());

    var preloader = $('#page-preloader'),
        loader = preloader.find('.loader');
    loader.fadeOut();
    preloader.delay(350).fadeOut('slow');
    $('#content').show();
});


//(function () {


// изменение меню при  прокрутке
function Ascroll() {

    if (document.documentElement.clientWidth > 768) {
        var a = document.querySelector('#menu'), b = document.querySelector('#menu-top'), P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
        ChangeMainMenu();

        var Ra = a.getBoundingClientRect(),
            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
        var dropdown = $('.dropdown');
        if ((Ra.top - P) <= 0) {
            // кусок для  остановки фиксированного меню перед футером.
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
    }
    //window.addEventListener('resize', function () {
    //    console.log('111');
    //    a.children[0].style.width = getComputedStyle(a, '').width
    //}, false);
}

$(window).ready(function () {
        // здесь блокирую установку курсора в инпут с количеством на странице блюда
        $("input[name^='touchspin']").attr("readonly", true);

        // Добавляем обработчик, в котором узнаем: делать фиксированное навигационное меню или нет.
        window.addEventListener('scroll', Ascroll, false);

        Ascroll();
        // перемещаем пункты меню в выпадающее меню, если они угли вниз.
        SizeMenuInit();
        // перемещаем пункты меню в выпадающий список, если они рядом с правой границей монитора.
        ChangeMainMenu();
        // Проверяем нужно ли показывать кнопку выпадающего списка.
        CheckDropdownMenuBtn();       
});

$(window).bind('orientationchange', function (e) {
    $(window).ready(function () {
        Ascroll();
        SizeMenuInit();
        ChangeMainMenu();
        CheckDropdownMenuBtn();
    });
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
    ChangeMainMenu();
    //console.log('resize = ' + $('#menu li:hidden').length);
    CheckDropdownMenuBtn();
});

//---------------------------------------
// если пункты меню ушли вниз, то перемещаем их в выпадающий список.
function SizeMenuInit() {
    var top = $('#menu li').eq(0).offset().top;

    $('#menu li').each(function (index) {
        if (top < $(this).offset().top) {
            //console.log('orientationchange = ' + $(this).text());
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
//})();


//----- DROPDOWN MENU ------------------
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
    if ($('#myDropdown').is('.show')) {
        //console.log('border');
        $('.nav_main').css('border-radius', '5px 5px 0 5px');
    }
    else {
        $('.nav_main').css('border-radius', '5px');
    }
}

// Close the dropdown if the user clicks outside of it
$(window).ready(function () {
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
            $('.nav_main').css('border-radius', '5px');
        }
    }
});


// ------------ call me -----------------------
$(document).ready(function () { // вся мaгия пoсле зaгрузки стрaницы
    $('#callback').click(function (event) { // лoвим клик пo ссылки с id="go"
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(200, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function () { // пoсле выпoлнения предъидущей aнимaции
		 	    $('#call_me')
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({ opacity: 1 }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		 	});
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#overlay').click(function () { // лoвим клик пo крестику или пoдлoжке
        $('#call_me')
			.animate({ opacity: 0 }, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function () { // пoсле aнимaции
				    $(this).css('display', 'none'); // делaем ему display: none;
				    $('#overlay').fadeOut(200); // скрывaем пoдлoжку
				}
			);
    });
});

// gmap
// Здесь настраивваем карту
function initMap() {
    var marker;

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

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    //Обработка нажатия на кнопку "Вверх"
    $("#toTop").click(function () {
        //Необходимо прокрутить в начало страницы
        var curPos = $(document).scrollTop();
        var scrollTime = curPos / 1.73;
        $("body,html").animate({ "scrollTop": 0 }, scrollTime);
    });
});

function MobMenuToggle() {
    var menu = $('.mobile-menu');
    var body = $('body');
    console.log('MobMenuToggle() = ' + menu.css('left'));
 
    if (menu.css('left') == '0px') {
        menu.css('left', '-100%');
        body.css('overflow', 'auto');
    }
    else {
        menu.css('left', '0px');
        body.css('overflow', 'hidden');
    }
}

