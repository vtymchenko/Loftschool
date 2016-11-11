/*
* ДЗ - 2

 Написать фукнцию 'isSomeTrue', которая принимает 2 параметра - 'source' и 'filterFn'

 'source' - массив

 'filterFn' - фильтрующая функция

 Если фильтрующая функция вернет 'true' хотя бы для одного элемента массива, то и сама 'isSomeTrue' вернет 'true'

 Если фильтрующая функция вернет 'false' для ВСЕХ элементов массива, то и сама 'isSomeTrue' вернет 'false'



 Всё должно быть реализовано с использованием чистого js (не используя сторонние библиотеки).

 Так же, нельзя использовать методы для работы с массивами.



 пример:

 console.log(isSomeTrue(allNumbers, isNumber)); //вернет true

 console.log(isSomeTrue(someNumbers, isNumber)); //вернет true

 console.log(isSomeTrue(noNumbers, isNumber)); //вернет false




 * */


function isSomeTrue(source, filterFn) {
    for (var i = 0; i < source.length; i++) {
        if (!filterFn(source[i])) {
            continue;
        } else {
            return true;
        }
    }
    return false;
}

function isNumber(val) {
    return typeof val === 'number';
}


var allNumbers = [1, 2, 4, 5, 6, 7, 8],
    empty = [],
    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    noNumbers = ['это', 'массив', 'без', 'чисел'];


console.log(isSomeTrue(allNumbers, isNumber)); //вернет true

console.log(isSomeTrue(someNumbers, isNumber)); //вернет true

console.log(isSomeTrue(noNumbers, isNumber)); //вернет false