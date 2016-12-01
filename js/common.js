
$(window).on('load', function () {

    setMenuItemsWidth();

    // Добавляем обработчик, в котором узнаем: делать фиксированное навигационное меню или нет.
    window.addEventListener('scroll', Ascroll, false);

    Ascroll();
    // перемещаем пункты меню в выпадающее меню, если они ушли вниз.
    SizeMenuInit();
    CheckDropdownMenuBtn();

    var preloader = $('#page-preloader'),
        loader = preloader.find('.loader');
    loader.fadeOut('slow');
    preloader.delay(500).fadeOut('slow', function () {
        //$('#content').show('fast', function () {
        // здесь блокирую установку курсора в инпут с количеством на странице блюда
        $("input[name^='touchspin']").attr("readonly", true);
    });
});


//(function () {


// изменение меню при  прокрутке
function Ascroll() {

    if (document.documentElement.clientWidth > 768) {
        var a = document.querySelector('#menu'), b = document.querySelector('#menu-top'), P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
        //ChangeMainMenu();
        SizeMenuInit();

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
}

$(window).bind('orientationchange', function (e) {
    $(window).ready(function () {
        setMenuItemsWidth();

        // закрываем боковое меню.
        if ($('.mobile-menu').css('left') == '0px') {
            $('.mobile-menu').css('left', '-100%');
            $('body').css('overflow', 'auto');

            $('#nav-icon1').removeClass('open');
        }

        Ascroll();
        SizeMenuInit();
        //ChangeMainMenu();
        CheckDropdownMenuBtn();
    });
});



//---- #menu -------------------------------
// Проверяем нужно ли показывать кнопку выпадающего списка.
function CheckDropdownMenuBtn() {
    if ($('#menu li:hidden').length > 0) {
        $('.dropdown').addClass('show');
    }
    else {
        $('.dropdown').removeClass('show');
    }
}

// регулировка ширины пунктов меню (.nav_main li)
function setMenuItemsWidth() {
    // минимальнодопустимая ширина пунктов меню
    var minWidthLi = 180;

    var widthBody = $('body').css('width');
    //console.log('widthBody', widthBody);

    var countLi = $('#menu li').length;
    //console.log('#menu li count = ', countLi);

    var dolya = (((parseInt(widthBody) / 10) * 9) / countLi);
    //console.log('dolya = ', dolya);

    if (dolya < minWidthLi) {
        $('.nav_main li').css('width', minWidthLi + 'px');
    }
    else {
        $('.nav_main li').css('width', dolya + 'px');
    }
}

// изменение меню при изменении ширины экрана (сейчас нигде не вызывается)
function ChangeMainMenu() {
    //console.log('ChangeMainMenu()');
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
    setMenuItemsWidth();
    SizeMenuInit();

    //console.log('resize = ' + $('#menu li:hidden').length);
    CheckDropdownMenuBtn();
});

//---------------------------------------
// если пункты меню ушли вниз, то скрываем их в  #menu и #menu-top 
// и открываем эти пункты в выпадающем списке (.dropdown-content).
function SizeMenuInit() {
    //console.log('SizeMenuInit()');
    var text = '';
    //#menu
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
            text = $(this).text();
            //console.log($.trim(text));
            $(this).hide();
            $('#menu-top li').each(function (i) {
                if (index == i) {
                    //console.log(text + ' bingo 1');
                    $(this).hide();
                }
            });
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
                $('#menu-top li').each(function (i) {
                    if (index == i) {
                        //console.log(text + ' bingo 2');
                        $(this).show();
                    }
                });
            }
        }
    });
}


//----- DROPDOWN MENU ------------------
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownMenu() {
    //document.getElementById("myDropdown").classList.toggle("show");
    if ($('#myDropdown').is(':visible')) {
        $('#myDropdown').hide('fast');
        $('.nav_main').css('border-radius', '5px');
        $('.dropbtn').blur();
    }
    else {
        $('#myDropdown').show('fast');
        $('.nav_main').css('border-radius', '5px 5px 0 5px');
    }
}


$(window).ready(function () {
    window.onclick = function (event) {
        // Close the dropdown if the user clicks outside of it
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = $('.dropdown-content');
            dropdowns.each(function () {
                if (dropdowns.is(':visible')) {
                    dropdowns.hide('fast');
                }
            });
            $('.nav_main').css('border-radius', '5px');
        }

        /* Закрываем главное окно профиля с содержимым при клике в другую область*/
        if (!event.target.matches('.prof *, #prof_info *')) {
            if ($(".prof_info").is(":visible")) {
                $('#user_block_in_menu #prof_icon').css('color', '#fff');
                showItem('prof_other', 'prof_main');
                $(".prof_info").slideUp('fast');   // открытие/скрывание главного окна профиля с содержимым
                // убираем активный класс из кнопки личного меню
                $(".prof_icon").removeClass("active");
            }
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
    //console.log('MobMenuToggle() = ' + menu.css('left'));
 
    if (menu.css('left') == '0px') {
        menu.css('left', '-100%');
        body.css('overflow', 'auto');
    }
    else {
        menu.css('left', '0px');
        body.css('overflow', 'hidden');
    }
}

//Menu "Hamburger" Icon Animations
$(document).ready(function () {
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });
});


