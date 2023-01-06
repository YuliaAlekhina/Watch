/*------------Часы----------------------*/

window.onload = function() {  // Функция, которая будет открываться при запуске страницы
    // Для того, чтобы наша функция вызывалась регулярно, мы используем функцию setInterval
    window.setInterval(function() {
        let date = new Date();  // создали экземпляр класса Date

        //создаем 3 переменные, которые будут хранить часы, минуты и секунды
        let hour = date.getHours();     // функция getHours возвращает часы указанной даты
        let minute = date.getMinutes();
        let second = date.getSeconds();

        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;

        //Вызываем наши переменные (часы, минуты, секунды)
        let clock = document.getElementById('clock')
        clock.innerHTML = hour + ':' + minute + ':' + second



        //создаем 3 перемнные, которые будут хранить число, месяц и год
        let dates = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        if (dates < 10) dates = '0' + dates;
        if (month < 10) {
            month++
            month = '0' + month;
        }

        let nowDate = document.getElementById('now-date')
        nowDate.innerHTML = dates + '.' + month + '.' + year
    })
}












/*-------Секундомер---------------------*/

//Создаем переменные, где хранятся часы, минуты, секунды и миллисекунды
const hoursElement = document.querySelector('.hour-item')
const minutesElement = document.querySelector('.minute-item')
const secondsElement = document.querySelector('.second-item')
const millisecondsElement = document.querySelector('.millisecond-item')

const hourResult = document.querySelector('.results-hour')
const minuteResult = document.querySelector('.results-minute')
const secondResult = document.querySelector('.results-second')
const millisecondResult = document.querySelector('.results-millisecond')

let hour = 00;
let minute = 00;
let second = 00;
let millisecond = 00;
let interval;
let newHour;
let counter = 0  //(англ. Счетчик)



//Кнопки
const startButton = document.querySelector('.button-start')
const pauseButton = document.querySelector('.button-pause')
const stopButton = document.querySelector('.button-stop')
const newButton = document.querySelector('.button-new')
const resultButton = document.querySelector('.results-button')

//Listeners (слушатели)
//Кнопка старт
startButton.addEventListener('click', () => {
    clearInterval(interval)
    interval = setInterval(startTimer, 10)
})

//Кнопка паузы
pauseButton.addEventListener('click', () => {
    clearInterval(interval)
})

//Кнопка стоп
stopButton.addEventListener('click', () => {
    clearInterval(interval)
    hour = 00
    minute = 00
    second = 00
    millisecond = 00
    hoursElement.textContent = '00'
    minutesElement.textContent = '00'
    secondsElement.textContent = '00'
    millisecondsElement.textContent = '00'
})

//Кнопка новый результат
newButton.addEventListener('click', () => {
    clearInterval(interval)
    counter++
    const result = document.querySelector('.result')
    const block = document.createElement('div')
    block.innerHTML = `Result ${counter}: ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}:${millisecond < 10 ? '0' : ''}${millisecond}`
    result.append(block);
})

//Кнопка очистить результат
resultButton.addEventListener('click', () => {
    clResult()
    counter = 00
})
//Функция очистить результат
function clResult() {
    document.querySelector('.result').innerHTML = ''
}





// Создадим функцию, которая будет отвечать за наш таймер.
// Вначале мы увеличиваем миллисекунды.
// Когда миллисекунды дорходят до определенного значения (до 99), нам нужно увеличить секунды и сбросить миллисек.
// Также, когда секунды доходят до определенного значения (до 99), нам нужно увеличить минуты и сбросить секунды

function startTimer() {
    millisecond++

    //Миллисекунды
    if (millisecond < 9) {
        millisecondsElement.innerText = '0' + millisecond
    }
    if (millisecond > 9) {
        millisecondsElement.innerText = millisecond
    }
    if (millisecond > 99) {
        second++
        secondsElement.innerText = '0' + second
        millisecond = 00
    }

    //Секунды
    if (second < 9) {
        secondsElement.innerText = '0' + second
    }
    if (second > 9) {
        secondsElement.innerText = second
    }
    if (second > 59) {
        minute++
        minutesElement.innerText = '0' + minute
        second = 00
    }

    //Минуты
    if (minute < 9) {
        minutesElement.innerText = '0' + minute
    }
    if (minute > 9) {
        minutesElement.innerText = minute
    }
    if (minute > 59) {
        hour++
        hoursElement.innerText = '0' + hour
        minute = 00
    }

    //Часы
    if (hour < 9) {
        hoursElement.innerText = '0' + hour
    }
    if (hour > 9) {
        hoursElement.innerText = hour
    }
}






