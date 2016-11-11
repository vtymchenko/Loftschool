/*
*
* Написать функцию 'isAllTrue', которая принимает 2 параметра - 'source' и 'filterFn'

 source - массив

 'filterFn' - фильтрующая функция

 Если фильтрующая функция вернет 'true' для ВСЕХ элементов массива, то и сама 'isAllTrue' вернет 'true'

 Если фильтрующая функция вернет 'false' хотя бы для одного элемента массива, то и сама 'isAllTrue' вернет 'false'


 * */


function isAllTrue(source, filterFn) {
    try {
        if (source.length === 0) {
            throw new Error("Array is empty");
        }
        for (var i = 0; i < source.length; i++) {
            if (filterFn(source[i])) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    } catch (e) {
        return e.message;
    }
}

function isNumber(val) {
    return typeof val === 'number';
}


var allNumbers = [1, 2, 4, 5, 6, 7, 8],
    empty = [],
    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    noNumbers = ['это', 'массив', 'без', 'чисел'];

console.log(isAllTrue(allNumbers, isNumber)); //вернет true

console.log(isAllTrue(someNumbers, isNumber)); //вернет false

console.log(isAllTrue(noNumbers, isNumber)); //вернет false

