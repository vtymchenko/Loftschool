/**
 * ДЗ 1: переделать предыдущее ДЗ с загрузкой списка городов по AJAX.
 После загрузки страницы, происходит загрузка городов через AJAX.
 Города сортируются по имени и выводятся на странице при помощи шаблонизатора Handlebars.
 При вводе значений в текстовое поле,
 должны скрываться те города, в названии которых нет подстроки, указанной в текстовом поле.*/

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

var alert = document.querySelector(".alert-danger");
var incomeArr = [];
var filteredArr = [];

document.addEventListener("DOMContentLoaded", function () {
    getCities("https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json")
        .then(function (response) {

            incomeArr = JSON.parse(response.response);

            incomeArr.sort(function (cityObjA, cityObjB) {
                return    cityObjA.name <   cityObjB.name  ?  -1: 1    ;
            });

            var source = cityTemplate.innerHTML;
            var templateFn = Handlebars.compile(source);
            var template  = templateFn({list:   incomeArr });
            results.innerHTML = template;

            inputField.addEventListener("input", function ( ) {
                index = 0;
                filteredArr = [];
                for (var i = 0; i < incomeArr.length; i++) {
                    if (incomeArr[i].name.indexOf(inputField.value) !== -1) {
                        //console.log(i);
                        //console.log(cityList.hasChildNodes(incomeArr[0])  );
                        filteredArr[index] = incomeArr[i];
                        index++;
                        continue;
                    }
                }
                template  = templateFn({list: filteredArr });
                results.innerHTML = template;

            })
        })
        .catch(function () {
            alert.textContent = "Error occuring while trying download the content.";
        });
});