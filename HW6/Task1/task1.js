
/*
 *
 * ДЗ 1:

 Создать функцию `timer`.

 Функция `timer` должна возвращать новый промис.

 Функция `timer` принимает 1 аргумент - количество миллисекунд, через которые промис должен перейти в состояние `fulfilled`.

 Пример использования:

 timer(3000).then(() => console.log('я вывелась через 3 секунды'))


 Запрещено использование любых библиотек (включая jQuery) и фреймворков.
 * */


function timer(miliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve(), miliseconds);
    });
}

timer(3000).then(() => console.log('я вывелась через 3 секунды')) ;
