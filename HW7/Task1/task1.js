/*
 *
 * ДЗ 1:
 Создать страницу, которая выводит все имеющиеся cookie в виде таблицы (имя, значение).
 Для каждой cookie в таблице, необходимо добавить кнопку "удалить", При нажатии на "удалить",
 на экран должен быть выведен confirm с текстом "Удалить cookie с именем …?".
 Вместо … необходимо подставить имя удаляемой cookie. Если пользователь ответил положительно,
 то соответствующая cookie должна быть удалена.
 *
 * */

(function () {

    var cookies = {};

    document.addEventListener("DOMContentLoaded", function () {
        createCookiesTable();
        deleteCookieAndRow();
    });


    function givenCookies() {
        document.cookie = "cookie1=test1; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/";
        document.cookie = "cookie2=test2; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/";
        document.cookie = "cookie3=test3; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/";
    }

    function createCookiesTable() {
        givenCookies();
        var cookiesTable = document.createElement("table");
        cookiesTable.className = "cookie-table";
        cookiesTable.style.width = "300px";

        var actualCookies = document.cookie.split(";");

        for (var i = 0; i < actualCookies.length; i++) {

            var res = actualCookies[i].trim().split("=");

            cookies[res[0]] = res[1];
            currentRow = cookiesTable.insertRow(i);

            var cookieNameCell = currentRow.insertCell(0);
            var cookieValueCell = currentRow.insertCell(1);
            var deleteButtonCell = currentRow.insertCell(2);

            deleteButton = document.createElement("button");
            deleteButton.className = res[0];
            var deleteTextButton = document.createTextNode("Удалить");

            deleteButton.appendChild(deleteTextButton);
            deleteButtonCell.appendChild(deleteButton);

            cookieNameCell.innerHTML = res[0];
            cookieValueCell.innerHTML = res[1];
        }
        document.body.appendChild(cookiesTable);
        cookiesTable.setAttribute("border", "1");
    }

    function deleteCookieAndRow() {
        var table = document.querySelector(".cookie-table");
        table.addEventListener("click", function (e) {

            if (cookies.hasOwnProperty(e.target.className)) {
                var res = confirm("Удалить cookie с именем " + e.target.className + " ?");
                if (res) {
                    deleteCookie(e.target.className);
                    e.target.parentElement.parentElement.remove();
                    if (!table.rows.length) {
                        table.setAttribute("border", "0");
                    }
                }
            }
        });
    }

    function deleteCookie(cookieName) {
        var date = new Date;
        date.setDate(date.getDate() - 1);
        if (!cookies.hasOwnProperty(cookieName)) {
            return;
        }
        document.cookie = cookieName + "=" + cookies[cookieName] + "; " + "expires=" + date;
    }

})();