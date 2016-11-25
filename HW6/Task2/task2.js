// ДЗ 2:
//
//Загрузить города при помощи AJAX из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json (сервер поддерживает AJAX CORS)
//
//    Отсортировать города по алфавиту и вывести на странице.
//
//    Использование промисов обязательно.
//
//    Запрещено использование любых библиотек (включая jQuery) и фреймворков.

function getCities(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();

        xhr.addEventListener("load", function () {
            resolve(xhr);
        });

        xhr.addEventListener("error", function () {
            reject();
        })
    })
}

var loadButton = document.querySelector("#load");
var listContainer = document.querySelector(".city-list");
var incomeArr = [];
var sortedArr = [];
loadButton.addEventListener("click", function () {
    getCities("https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json")
        .then(function (response) {
            incomeArr = JSON.parse(response.responseText);
            for (var i = 0; i < incomeArr.length; i++) {
                sortedArr[i] = incomeArr[i].name;
            }
            sortedArr.sort();
            listContainer.textContent = sortedArr.join(", \n");
        })

        .catch(function () {
            listContainer.style.color = "#FF0000";
            listContainer.textContent = "Error occuring while trying download the content.";
        });
});