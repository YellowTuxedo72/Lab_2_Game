
// Функция для анимации спрайтов
function sprite_animation(start, end, speed, class_name, url, functions_after_end) {
    let sprite = start
    let animation_sprite = setInterval(function () {
        if (start < end) {
            sprite++
        }
        else {
            sprite--
        }
        if (sprite == end) {
            clearInterval(animation_sprite)
            animation_sprite = null
            functions_after_end()
        }
        document.querySelector(`.${class_name}`).setAttribute('src',
            `${url}${(sprite < 10 ? '000' + sprite : sprite < 100 ? '00' + sprite : '0' + sprite)}.png `);
    }, speed);
}

//Функция отображение блоков
function view_div(class_name) {
    if (document.querySelector(`.${class_name}`).style.display == "flex") {
        document.querySelector(`.${class_name}`).style.display = "none";
    }
    else {
        document.querySelector(`.${class_name}`).style.display = "flex"
    }
}

// Функция для отображения текстового блока 
function message_box(text, speed, functions_after_end) {
    view_div('MessageBox')
    document.querySelector('.MessageBox').textContent = ""
    var length_ = text.length;
    var start = 0;
    var text_write = setInterval(function () {
        document.querySelector('.MessageBox').textContent = text.substring(0, start)
        // При нажатии мыши, печать текста прекратится и сразу появится весь текст
        document.addEventListener('mousedown', function () {
            document.querySelector('.MessageBox').textContent = text
            clearInterval(text_write)
            functions_after_end()
        }, {once: true})
        if (start == length_) {
            clearInterval(text_write)
            functions_after_end()
        }
        start++
    }, speed)
}

// ЗАПУСК МЕНЮ
view_div('MenuBlock')
menu(205, 244)


// Функция, которая зацикливает отбражения MenuBackground
function menu(start, end) {
    sprite_animation(start, end, 50, 'MenuBackground', 'images/menu/', 
    function () {menu(205, 244)})}

// Кнопка старт
document.querySelector(`.ButtonStart`).onclick = function () {
    view_div('MenuBlock')
    view_div('HouseBlock')
    script_1()
}

// Скрипт 1 - Пробуждение 
function script_1() {
    sprite_animation(1, 40, 50, 'HouseBackground', 'images/house_background/getting_out_of_bed/', 
    function () {
        message_box("Вы проснулись от резкого стука в окно", 30, 
            function () {
                document.addEventListener('mousedown', script_2, {once: true})
            }
        )
    });
}

// Скрипт 2 - Переход к основному положению
function script_2() {
    view_div('MessageBox')
    sprite_animation(40, 50, 50,'HouseBackground', 'images/house_background/getting_out_of_bed/', function () {
    view_div('btm_got_to_tv');
    view_div('btm_got_to_window');
    })
}






// ПОДСВЕТКА ОБЪЕКТОВ КОМНАТЫ
// Подсвета окна при наведении/нет
document.querySelector(`.btm_got_to_window`).onmouseover = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/objects_of_interaction/0050_window.png')
}

document.querySelector(`.btm_got_to_window`).onmouseout = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/getting_out_of_bed/0050.png')
}
// Подсвета тв при наведении/нет
document.querySelector(`.btm_got_to_tv`).onmouseover = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/objects_of_interaction/0050_tv.png')
}

document.querySelector(`.btm_got_to_tv`).onmouseout = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/getting_out_of_bed/0050.png')
}

// Подсветка штор при наведении/нет
document.querySelector(`.btn_close_window`).onmouseover = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/objects_of_interaction/0084_close_window.png')
}

document.querySelector(`.btn_close_window`).onmouseout = function () {
    document.querySelector(`.HouseBackground`).setAttribute('src', 'images/house_background/open_window/0084.png')
}




// ВЗАИМОДЕЙСТВИЕ С ОБЪЕКТАМИ КОМАНТЫ


// КНОПКА - Подойти к окну
document.querySelector(`.btm_got_to_window`).onclick = function () {
    sprite_animation(50, 75, 50,'HouseBackground', 'images/house_background/move_to_window/', function () {
        view_div('btm_open_window');
        view_div('btn_move_away_from_window');
    })
    view_div('btm_got_to_window')
    view_div('btm_got_to_tv')
}


var bool_script = true;


// КНПОКА - Открыть окно
document.querySelector('.btm_open_window').onclick = function () {
    sprite_animation(76, 84, 50, 'HouseBackground', 'images/house_background/open_window/', function () {
        view_div('btn_close_window')
    })
    view_div('btm_open_window')
    view_div('btn_move_away_from_window')
    if  (bool_script) {
        view_div('btn_close_window')
        bool_script = false
        script_3()
    }
    else if (bool_script == false) {
        view_div('btn_flashlight')
    }
}

// КНОПКА - Посветить в окно
document.querySelector(`.btn_flashlight`).addEventListener("mousedown", function () {
    if (step == 6) {
        sprite_animation(238, 240, 50, 'OutsideBlock', 'images/outside_environment/flashlight_screamer/', function () { 
            step = 0
        })
    }
    else {
        sprite_animation(238, 240, 50, 'OutsideBlock', 'images/outside_environment/flashlight/', function () { })
    }
})
document.querySelector(`.btn_flashlight`).addEventListener("mouseup", function () {
    sprite_animation(240, 238, 50, 'OutsideBlock', 'images/outside_environment/flashlight/', function () { })
})
document.querySelector(`.btn_flashlight`).addEventListener("mouseout", function () {
    sprite_animation(240, 238, 50, 'OutsideBlock', 'images/outside_environment/flashlight/', function () { })
})


function script_3() {
    sprite_animation(75, 95, 50, "OutsideBlock", "images/outside_environment/stranger_script_1/",
    function () {
        message_box("О-о-о-о!", function () {})
        document.addEventListener('mousedown', function () {
            script_4()
        }, {once: true})
    }
    )
}

function script_4() {
    view_div("MessageBox")
    sprite_animation(95, 130, 50, "OutsideBlock", "images/outside_environment/stranger_script_1/", function () {
       script_5(130, 200) 
    })
    message_box(" Хмм.. так вот ты какой - новый сторож", 20)
    document.addEventListener('mousedown', function () {
        view_div("MessageBox")
        message_box("Ээээ, я советую тебе смотреть в монитор и светить фонариком в окно", 20)
        script_6()
        }, {once: true})

}
// Изменить 135 на 204
function script_5(start, end) {
    if (start < end) {
      sprite_animation(130, 135, 50, "OutsideBlock", "images/outside_environment/stranger_script_1/", function() {script_5(204, 130)}) 
    }
}

function script_6() {
    document.addEventListener('mousedown', function () 
    {
        view_div("MessageBox")
        message_box("Ээээ, ну мне пора бежать", 20)
        sprite_animation(204, 237, 50, "OutsideBlock", "images/outside_environment/stranger_script_1/", function () {
            view_div("MessageBox")
            view_div("btn_flashlight")
            view_div('btn_close_window')
            monster_moving_script_()
        })
    }, {once:true})
}

// КНПОКА - Закрыть окно
document.querySelector('.btn_close_window').onclick = function () {
    sprite_animation(84, 76, 50, 'HouseBackground', 'images/house_background/open_window/', function () {
        view_div('btm_open_window');
        view_div('btn_move_away_from_window')
        if (bool_script) {
        }
        else {
            view_div('btn_flashlight')
        }
    })
    view_div('btn_close_window')
}

// КНОПКА -  Отойти от окна 
document.querySelector('.btn_move_away_from_window').onclick = function () {
    sprite_animation(75, 50, 50, 'HouseBackground', 'images/house_background/move_to_window/', function () {
        view_div('btm_got_to_window');
        view_div('btm_got_to_tv');
    })
    view_div('btm_open_window')
    view_div('btn_move_away_from_window')
}



// КНОПКА - Подойти к ТВ
document.querySelector(`.btm_got_to_tv`).onclick = function () {
    sprite_animation(76, 95, 50, 'HouseBackground', 'images/house_background/move_to_tv/', function() {
        view_div('btn_move_away_from_tv')
        view_div('btn_switch_channel')
    })
    view_div('btm_got_to_window')
    view_div('btm_got_to_tv')
    view_div('TvBlock')
}

var change_camera_sprite_btn = null

function change_camera_sprite (step_, camera) {
    change_camera_sprite_btn = setInterval (function () {
        if (step == step_) {
            document.querySelector(`.TvBlockBackground`).setAttribute('src', `images/camera/0${camera}_1.png`)   
        }
        else {
            document.querySelector(`.TvBlockBackground`).setAttribute('src', `images/camera/0${camera}_0.png`)  
        }
    }, 20)
}

function close_camera () {
    clearInterval(change_camera_sprite_btn)
    change_camera_sprite_btn = null
}

function UpdateCamera() {
    if (step === NowCamera) {
        document.querySelector(`.TvBlockBackground`).setAttribute('src', `images/camera/0${NowCamera}_1.png`);
    } else {
        document.querySelector(`.TvBlockBackground`).setAttribute('src', `images/camera/0${NowCamera}_0.png`);
    }
}

let NowCamera = 1;
// КНОПКИ - Переключатели камер
document.querySelector(`.btn_tv_1`).onclick = function () {
    NowCamera = 1;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_1.png')
    
}

document.querySelector(`.btn_tv_2`).onclick = function () {
    NowCamera = 2;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_2.png')
}
document.querySelector(`.btn_tv_3`).onclick = function () {
    NowCamera = 3;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_3.png')
}
document.querySelector(`.btn_tv_4`).onclick = function () {
    NowCamera = 4;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_4.png')
}
document.querySelector(`.btn_tv_5`).onclick = function () {
    NowCamera = 5;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_5.png')
}
document.querySelector(`.btn_tv_6`).onclick = function () {
    NowCamera = 6;
    UpdateCamera();
    document.querySelector('.HouseBackground').setAttribute('src', 'images/house_background/btns_tv/btn_6.png')
}



// КНОПКА - Отойти от ТВ
document.querySelector('.btn_move_away_from_tv').onclick = function () {
    sprite_animation(95, 76, 50, 'HouseBackground', 'images/house_background/move_to_tv/', function () {
        view_div('btm_got_to_window');
        view_div('btm_got_to_tv');
        view_div('TvBlock')
        
    })
    view_div('btn_move_away_from_tv')
    view_div('btn_switch_channel')
    document.querySelector(`.TvBlockBackground`).setAttribute('src', '')

}

// Кнопка рестарта 
document.querySelector(`.ButtonStart_2`).onclick = function () {
    clear_all()
    bool_script = true
    step = 0
}

function clear_all() {
    document.querySelector(`.`).style.display = "none"
}

// Перемещение монстра
var step = 0 
function monster_moving_script_() {
    var random_step = [9,8,8,8,8,8];
    var monster_moving = setInterval(function () {

        if (step == 7) {
            view_div("Screamer")
            sprite_animation(245,250, 50, "Screamer", "images/screamer/", function() {
            view_div('LooserBlock')

            })
            clearInterval(monster_moving)

        }
        if (getRandomInt(1, 10) <= random_step[step]) {
            step++;
        }
        else {
            if (step != 0) {
                step = step - 1;
            }
        }
        UpdateCamera();
        console.log(step);
        if (step == 6) {
            console.log('Монстр у окна');
            step++;


        }
    }, 1000)
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}