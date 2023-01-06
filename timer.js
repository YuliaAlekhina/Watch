/*-------Таймер---------------------*/

//Часы, минуты, секунды
const hourElement = document.querySelector('.hour-display')
const minuteElement = document.querySelector('.minute-display')
const secondElement = document.querySelector('.second-display')

let hours = 00;
let minutes = 00;
let seconds = 00;
let countdown;  // (англ. Обратный отсчет)
let endTime = document.querySelector('.end-time')          //Время окончания
let displayTime = document.querySelector('.display-time')  //Время таймера


//Форма (часы, минуты, секунды)
const hourForm = document.querySelector('.form-hours')
const minuteForm = document.querySelector('.form-minutes')
const secondForm = document.querySelector('.form-seconds')


//Кнопки
const buttonStart = document.querySelector('.button-time')
const buttonClear = document.querySelector('.clear')
let buttonPause = document.querySelector('.pause')
let buttonContinue = document.querySelector('.continue')

//Listeners (Слушатели)
//кнопка старт
buttonStart.addEventListener('click', () => {
    clearInterval(hourForm);
    countdown = setInterval(timer)
})

//кнопка очистить
buttonClear.addEventListener('click', () => {
    clearInterval(countdown);
    displayTime.textContent = '00:00:00';
    endTime.textContent = '';
    hourElement.textContent = '';
    minuteElement.textContent = '';
    secondElement.textContent = '';
})

// кнопка пауза
buttonPause.addEventListener('click', () => {
    clearTimeout(countdown)
})

//кнопка продолжить
// buttonContinue.addEventListener('click', () => {
    
// })







//Создаем функцию timer, которая принмает в качестве аргумента значения временного интервала в секундах

function timer(seconds) {
    //очищаем все существующие таймеры
    clearInterval(countdown);

    //метод для получения текущего времени
    let nowTime = Date.now();

    //создаем переменную then (тогда), которая покажет нам время после того, как пройдет
    //заданный временной интервал
    let then = nowTime + seconds * 1000; //умножаем на 1000, для того чтобы перевести миллисек. в секунды

    //эти 2 функции нужны, чтобы вывести результат данной функции на экран (их пишем ниже)
    displayTimeLeft(seconds);  // Функция обратного отсчета
    displayTimeEnd(then);     // Функция, для информации о том, до какого времени будет идти таймер

    countdown = setInterval(() => {
        //выясним сколько времени осталось до наступления момента времени then, т.е. до времени окончания
        //и округлим его
        let secondLeft = Math.round((then - Date.now()) / 1000);
        
        //Если secondLeft (секунд осталось) меньше 0, то функция останавливается
        if (secondLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondLeft)
    }, 1000);

}



//Функция обратного отсчета
function displayTimeLeft(seconds) {
    let minutess = Math.floor(seconds / 60)
    let hourss = Math.floor(minutess / 60)

    let remainderHours = hourss;  // remainderHours (Остаток часов)
    let remainderMinutes = minutess % 60;  //Знак % - остаток от деления
    let remainderSeconds = seconds % 60;
    let display = `${remainderHours < 10 ? '0' : ''}${remainderHours}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    displayTime.textContent = display;
}


//Функция, для вывода информации во сколько закончится отсчет // timestamp - Отметка времени
function displayTimeEnd(timestamp) {
    let end = new Date(timestamp)
    let hours = end.getHours();   // Получаем часы
    let adjustedHours = hours > 24 ? hours - 24 : hours;  //adjustedHours - Скоректированный час
    let minutes = end.getMinutes();  // Получаем минуты
    endTime.textContent = `Таймер закончится в ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
}






//Поле ввода для времени отсчета
//Для поля ввода мы находим формы в документе document.customFormHour и навешиваем слушатель событий
//'submit', который запускает аннонимную функцию function(e)
//Метод события preventDefault() (англ. Предотвратить дефолт) - отмена события по умолчанию
//Затем мы назначаем переменную hourTimer равную this.hours.value
//       this - является элементом формы
//       hours - имя поля ввода в HTML
//       value - значение, которое внесет пользователь

document.customFormHour.addEventListener('submit', function(e) {
    e.preventDefault();
    let hours = this.hours.value;
    timer(hours * 3600);  //Число преобразуем в часы
    this.reset();     //reset - (англ. Перезагрузка)
})

document.customFormMin.addEventListener('submit', function(e) {
    e.preventDefault();
    let minutes = this.minutes.value;
    timer(minutes * 60);   //Число преобразуем в минуты
    this.reset();
})

document.customFormSec.addEventListener('submit', function(e) {
    e.preventDefault();
    let seconds = this.seconds.value;
    timer(seconds);
    this.reset();
})