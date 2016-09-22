console.log('111');

//$(window).scroll(function () {
//    var top = $('.nav_main li').offset().top,
//        sctop = $(this).scrollTop(),
//        winh = $(this).height(),
//        y = top - sctop - winh;
//    console.log(top);
//    if (y > 0 || -y > winh) {
//        $('p').text('Не видим');
//        console.log('Не видим');
//    }
//    else {
//        $('p').text('Видим');
//        console.log('Видим');
//    }
//});

//1
//(function () {
//    var a = document.querySelector('.nav_main'), b = null, P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
//    window.addEventListener('scroll', Ascroll, false);
//    document.body.addEventListener('scroll', Ascroll, false);
//    function Ascroll() {
//        if (b == null) {
//            var Sa = getComputedStyle(a, ''), s = '';
//            for (var i = 0; i < Sa.length; i++) {
//                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
//                    s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
//                }
//            }
//            b = document.createElement('div');
//            b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
//            a.insertBefore(b, a.firstChild);
//            var l = a.childNodes.length;
//            for (var i = 1; i < l; i++) {
//                b.appendChild(a.childNodes[1]);
//            }
//            //a.style.height = b.getBoundingClientRect().height + 'px';
//            a.style.padding = '0';
//            a.style.border = '0';
//        }
//        var Ra = a.getBoundingClientRect(),
//            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
//        if ((Ra.top - P) <= 0) {
//            if ((Ra.top - P) <= R) {
//                console.log('granica');
//                b.className = 'stop';
//                b.style.top = -R + 'px';
//            } else {
//                b.className = 'sticky';
//                b.style.top = P + 'px';
//                //b.style.marginLeft = '-100px';
//                //b.style.width = '1380px';
//            }
//        } else {
//            b.className = 'nav_main';
//            b.style.top = '';
//            b.style.marginLeft = '0px';
//            b.style.width = '1180px';
//        }
//        window.addEventListener('resize', function () {
//            a.children[0].style.width = getComputedStyle(a, '').width
//        }, false);
//    }
//})();

//2
(function () {
    var a = document.querySelector('#menu'), b = document.querySelector('#menu-top'), P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);
    function Ascroll() {
        //if (b == null) {
        //    var Sa = getComputedStyle(a, ''), s = '';
        //    for (var i = 0; i < Sa.length; i++) {
        //        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
        //            s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
        //        }
        //    }
        //    b = document.createElement('div');
        //    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
        //    a.insertBefore(b, a.firstChild);
        //    var l = a.childNodes.length;
        //    for (var i = 1; i < l; i++) {
        //        b.appendChild(a.childNodes[1]);
        //    }
        //    //a.style.height = b.getBoundingClientRect().height + 'px';
        //    a.style.padding = '0';
        //    a.style.border = '0';
        //}
        var Ra = a.getBoundingClientRect(),
            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
        if ((Ra.top - P) <= 0) {
            if ((Ra.top - P) <= R) {
                console.log('granica');
                b.className = 'stop';
                b.style.top = -R + 'px';
            } else {
                //b.className = 'sticky';
                //b.style.top = P + 'px';
                b.style.display = "block";

                //b.style.marginLeft = '-100px';
                //b.style.width = '1380px';
            }
        } else {
            //b.className = 'nav_main';
            //b.style.top = '';
            //b.style.marginLeft = '0px';
            //b.style.width = '1180px';
            b.style.display = "none";
        }
        window.addEventListener('resize', function () {
            a.children[0].style.width = getComputedStyle(a, '').width
        }, false);
    }
})();

$(window).resize(function () {
    var winWidth = $(this).width();
    var li = $('#menu li:visible').each(function (index) {
        var left = $(this).offset().left;

        var offsetRight = winWidth - left - $(this).width();

        if (offsetRight < 60 && ($(this).is(':visible'))) {
            $(this).hide();
            return;
        }
        if ((offsetRight > (60 + $(this).next('li').width())) && $(this).is(':visible')) {
            if ($(this).next('li').is(':hidden')) {
                $(this).next('li').show();
            }
        }
    });
});


//----- DROPDOWN MENU ------------------
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
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
//---------------------------------------