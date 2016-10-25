/* Функция-отклик на событие для открытия главного окна профиля с содержимым*/
/*$("#prof_icon").on('click', function(){
    $("#prof_info").toggle();   // открытие/скрывание главного окна профиля с содержимым
});*/

/* Функция для управления показом содержимого(в виде дочерних окон) внутри главного окна профиля */
/*function showItem(thisID, ID){  // параметры: (скрываемое окно, показываемое окно)
    $('#'+thisID).hide();   // скрыть "скрываемое окно"
    $('#'+ID).show();   // показать "показываемое окно"
}*/

/* параметр хранения состояния видимости меню с переключателями switch для SM и XS размеров экранов */
var switchVissible = false; // по умол. скрыто, из-за наличия hidden в html

/* Функция-отклик на событие нажатия кнопки для показа панели-меню с переключателями и профилем */
$(".switcher").on('click', function () {
    if (switchVissible) {    // если панель-меню показана выполняем...
        $(".switch_content").addClass("hidden");                // добавить класс, скрывающий панель-меню

        switchVissible = false;                                 // теперь когда сокрыли панель можно говорить, что она сокрыта
    }
    else {                  // если панель-меню скрыта выполняем...

        $(".switch_content").removeClass("hidden");             // удалить класс, скрывающий панель-меню, чтобы она отображалась
        switchVissible = true;                                  // теперь когда панель отобразили можно говорить, что она видна
    }

});

/* Функция-отклик на событие для открытия главного окна профиля с содержимым*/
$(".prof_icon").on('click', function () {
    console.log('.prof_icon click');
    if ($(".prof_info").is(":visible")) {
        $('#user_block_in_menu #prof_icon').css('color', '#fff');
        showItem('prof_other', 'prof_main');
        $(".prof_info").hide('fast');   // открытие/скрывание главного окна профиля с содержимым
        // убираем активный класс из кнопки личного меню
        $(".prof_icon").removeClass("active");
    }
    else {
        $('#user_block_in_menu #prof_icon').css('color', '#512c15');
        $(".prof_info").addClass("main-data-menu-opened");
        $(".prof_info").show('fast');   // открытие/скрывание главного окна профиля с содержимым 
        // добавляем активный класс к кнопке личного меню
        $(".prof_icon").addClass("active");
    }
});

console.log('.prof_icon');

/* Функция для управления показом содержимого(в виде дочерних окон) внутри главного окна профиля */
function showItem(thisCLASS, CLASS) {  // параметры: (скрываемое окно, показываемое окно)
    $('.' + thisCLASS).hide('fast');   // скрыть "скрываемое окно"
    $(".prof-main-punkt").hide('fast');
    $('.' + CLASS).show('fast');   // показать "показываемое окно"
    if (CLASS == 'prof_main') {  // если необходимо открыть первоначальное меню, добавляем ему класс, который делает его 100% ширины блока с кнопкой профиля
        $(".prof_info").addClass("main-data-menu-opened");
    }
    else {
        $(".prof_info").removeClass("main-data-menu-opened");
    }
}

// функция для окон бокового меню
function toggle_window(window) {
    if ($("." + window + "-window").is(":visible")) {     // если елемент показан на странице, скрываем и показываем панель поиска
        $("." + window + "-window").hide('fast');
        $(".search-window").show('fast');
    }
    else {  // если нет, скрываем все и показываем елемент
        $(".mobile-window").hide('fast');
        $("." + window + "-window").show('fast');
    }
}