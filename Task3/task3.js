/*
 *
 * ДЗ 3 (делать не обязательно, но очень желательно)

 Написать функцию 'calculator', которая имеет один параметр - 'firstNumber'

 'firstNumber' - это число, с которым будут производиться действия

 Функция 'calculator' должна возвращать объект, у которого должно быть несколько методов.

 Каждая из этих функций принимает неограниченное количество аргументов и производит какие-то арифметические операции с этими аргументами и тем числом, которое было передано в 'calculator' и возвращает результат:

 - 'sum' - складывает 'firstNumber' с переданным аргументами

 - 'dif' - вычитает из 'firstNumber' переданные аргументы

 - 'div' - делит 'firstNumber' на первый переданный аргумент. Результат этой операции делится на второй переданный аргумент (если он есть) и так далее

 - 'mul' - умножает 'firstNumber' на первый переданный аргумент. Результат этой операции умножается на второй переданный аргумент (если он есть) и так далее.

 Предусмотреть исключительные ситуации, для функции 'div', когда делитель равен нулю



 пример:

 var myCalculator = calculator(100);



 console.log(myCalculator.sum(1, 2, 3)); //вернет 106

 console.log(myCalculator.dif(10, 20)); //вернет 70

 console.log(myCalculator.div(2, 2)); //вернет 25

 console.log(myCalculator.mul(2, 2)); //вернет 400
 *
 * */


var calculator = function (firstNumber) {
    return {
        sum: function () {
            result = 0;
            for (var i = 0; i < arguments.length; i++) {
                result += arguments[i];
            }
            return firstNumber + result;
        },

        dif: function () {
            sum = 0;
            for (var i = 0; i < arguments.length; i++) {
                sum += arguments[i];
            }
            return firstNumber - sum;
        },

        div: function () {
            result = firstNumber;
            try {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] === 0) {
                        throw new Error("The divided argument can't be zero");
                    } else {
                        result /= arguments[i];
                    }
                }
                return result;

            } catch (e) {
                return e.message;
            }
        },

        mul: function () {
            result = firstNumber;
            for (var i = 0; i < arguments.length; i++) {
                result *= arguments[i];
            }
            return result;
        },
    };
}
