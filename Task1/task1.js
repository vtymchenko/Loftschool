
/*
 * ДЗ - 1:

 написать аналоги методов для работы с массивами:

 forEach, filter, map, slice, reduce, splice  пример:



 let array = [1, 2, 3, 4, 5, 6];

 forEach(array, item => console.log(item));

 let greaterThan4 = filter(array, item => item > 4);

 let sqare = map(array, item => item*item);



 Описание того, как работают эти методы, есть на Mozilla Developer Network и в бесплатных видеоуроках LoftBlog/LoftSchool.



 Реализация функции splice является задачей со звездочкой.

 Ее выполнение не обязательно, но желательно.



 Внимание:

 в данном задании запрещено использовать встроенные методы для работы с массивами! Разрешено использовать стандартные

 операторы 'for/for-in/while/if`' (и т.д.) и свойство 'length'
 * */



//ForEach implementation

let arrayEach = [1, 2, 3, 4, 5, 6];
customForEach(arrayEach, item => console.log(item));


function customForEach (arr, callback) {
    for (var i = 0; i < arr.length ; i ++ ) {
        callback(arr[i], i, arr);
    }
}

//Filter implementation
let arrayFilter = [1, 2, 3, 4, 5, 6];
let greaterThan4 = customFilter(arrayFilter, item => item >4);
console.log(greaterThan4);

function customFilter (arr, condition) {
    var result = [];
    var resultIndex = 0;
    for (var i = 0; i < arr.length ; i ++ ) {
        if ( !condition(arr[i]) ) {
            continue;
        } else {
            result[resultIndex]= arr[i];
            resultIndex++;
        }
    }
    return result ;
}


//Map implementation
let arrayMap = [1, 2, 3, 4, 5, 6];
let sqare = customMap( arrayMap, item => item*item);
console.log(sqare);

function customMap (arr, inputFunction) {
    result = [];
    for (var i = 0; i < arr.length ; i ++ ) {
        result[i] = inputFunction(arr[i]) ;
    }
    return result;
}

//Slice implementation
var fruits = ['Банан', 'Апельсин', 'Лимон', 'Яблоко', 'Манго'];
var citrus = customSlice(fruits, 1);
console.log(citrus);

function customSlice (arr, startIndex, endIndex) {
    result = [];
    indexResult = 0;
    if (arguments.length === 1 ) {
        return arr;
    }
    else if (arguments.length === 2 ) {
        for (var i = startIndex; i < arr.length ; i ++ ) {
            result[indexResult] = arr[i] ;
            indexResult++ ;
        }
    } else {
        for (var i = indexStart; i < endIndex ; i ++ ) {
            result[indexResult] = arr[i] ;
            indexResult++ ;
        }
    }
    return result;
}



//Reduce implementation

var reduceArr = [10, 11, 12  ] ;
//var arr = ["aaaa", 'bbbb', 'ccccc'];

var reduce = customReduce(reduceArr, function (previousValue, currentValue) {
    return previousValue - currentValue;
});
console.log("Reduce: " + reduce);


function customReduce(array, callback) {
    var array = arguments[0];
    var index = 1;
    while (index <= array.length) {
        var currentValue = function () {
            return callback(array[index - 1], array[index]);
        }
        var eachResult = currentValue();
        index++;
        var result = callback(eachResult, array[index]);

        return result;
    }
}



//Splice implementation
var fruits = ['Банан', 'Апельсин', 'Лимон', 'Яблоко', 'Манго'];
var newArray = customSplice(fruits, 1, "aa");
console.log("newArray2 : " + newArray);

function customSplice(arr, startIndex, countRemove) {
    var newArr = [];
    var actual = arguments[0];
    var index = 0;

    if (arguments.length <= 3) {
        return arguments[0];
    }

    if (startIndex > actual.length) {
        return arguments[0];
    }
    if (countRemove == 0) {
        return arguments[0];
    }

    for (var i = 0; i < actual.length; i++) {
        if (startIndex == i) {
            while (countRemove) {
                i++;
                countRemove--;
            }
            if (arguments[3] != undefined) {
                for (var j = 3; j < arguments.length; j++) {
                    newArr[index] = arguments[j];
                    index++;
                }
            }
        }
        newArr[index] = actual[i];
        index++;
    }
    return newArr;
}
