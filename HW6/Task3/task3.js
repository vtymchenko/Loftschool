//ДЗ 3 (не обязательное):
//
//Создать страничку с текстовым полем.
//
//    После загрузки странички, загрузить список городов при помощи AJAX.
//
//    При вводе текста в тестовое поле, выводить под текстовым полем список тех городов, в названиях которых есть введенный текст.
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

var inputField = document.querySelector("#inputField");
var listContainer = document.querySelector(".city-list");
var incomeArr = [];
var filteredArr = [];
var index = 0;

document.addEventListener("DOMContentLoaded", function () {
    getCities("https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json")
        .then(function (response) {
            incomeArr = JSON.parse(response.responseText);

            inputField.addEventListener("input", function () {

                if (inputField.value) {
                    for (var i = 0; i < incomeArr.length; i++) {
                        if (incomeArr[i].name.indexOf(inputField.value) !== -1) {
                            filteredArr[index] = incomeArr[i].name;
                            index++;
                            continue;
                        }
                    }
                }
                listContainer.textContent = filteredArr.join(", \n");
                index = 0;
                filteredArr = [];
            })
        })
        .catch(function () {
            listContainer.style.color = "#FF0000";
            listContainer.textContent = "Error occuring while trying download the content.";
        });
});