/*
 *
 * ДЗ 2:
 К страничке из предыдущего задания необходимо добавить форму с текстовыми полями и кнопкой "добавить".
 Список текстовых полей:
 - имя
 - значение
 - срок годности (количество дней)

 После нажатия на кнопку "добавить" должна быть создана (и добавлена в таблицу) новая cookie с указанными параметрами.
 Обратите внимание, что в поле "срок годности" указывается количество дней (начиная с текущего), на протяжении которых будет доступна cookie.

 После добавление cookie, значения текстовых полей формы должны быть очищены.
 Если какое-то из полей формы не заполнено, то, при нажатии на кнопку "добавить", cookie не должна быть создана,
 а на экран должен быть выведен alert с предупреждением "Заполните все поля формы".
 Так же заметьте, что при работе с формой и таблицей, не должно быть перезагрузок страницы
 * **/

(function () {

    var cookies = {};

    document.addEventListener("DOMContentLoaded", function () {

        addFormCookieCreation();

        var cookiesTable = document.createElement("table");
        cookiesTable.className = "cookie-table";
        cookiesTable.style.width = "300px";

        if (document.cookie) {
            createCookiesTable(cookiesTable);
        }

        cookiesTable.addEventListener("click", function (e) {
            var item = e.target;
            deleteCookieAndRow(cookiesTable, item);
        });


        var createBtnCookie = document.querySelector("#create-cookie");
        createBtnCookie.addEventListener("click", function () {
            var cookieName = document.querySelector("#cookie-name");
            var cookieValue = document.querySelector("#cookie-value");
            var cookieDuration = document.querySelector("#cookie-duration");


            addRow(cookiesTable, ".cookie-table tr", cookieName.value, cookieValue.value, cookieDuration.value);
            clearFields([cookieName, cookieValue, cookieDuration]);
        });
    });


    function addRow(cookieTable, lastRowElement, itemName, itemValue, durationDays) {

        if (cookies.hasOwnProperty(itemName)) {
            return "Already exists";
        }

        if (durationDays < 0) {
            return alert("Срок годности не может быть меньше 0");
        }

        if (itemName === "" || itemValue === "" || durationDays === "") {
            return alert("Заполните все поля формы");
        }

        var futureDays = new Date().getTime() + durationDays * 24 * 60 * 60 * 1000;
        cookies[itemName] = itemValue;

        document.cookie = itemName + "=" + itemValue + "; " + "expires=" + new Date(futureDays).toUTCString();
        var rowSize = document.querySelectorAll(lastRowElement).length;
        currentRow = cookieTable.insertRow(rowSize);

        var cookieNameCell = currentRow.insertCell(0);
        var cookieValueCell = currentRow.insertCell(1);
        var deleteButtonCell = currentRow.insertCell(2);


        deleteButton = document.createElement("button");
        deleteButton.className = itemName;
        var deleteTextButton = document.createTextNode("Удалить");

        deleteButton.appendChild(deleteTextButton);
        deleteButtonCell.appendChild(deleteButton);
        deleteButton.appendChild(deleteTextButton);
        deleteButtonCell.appendChild(deleteButton);

        cookieNameCell.innerHTML = itemName;
        cookieValueCell.innerHTML = itemValue;

        document.body.appendChild(cookieTable);
    }

    function clearFields(inputs) {
        for (var input of
        inputs
    )
        {
            input.value = "";
        }
    }

    function addFormCookieCreation() {

        var cookieCreationContainer = document.createElement("div");
        var br = document.createElement("br");
        cookieCreationContainer.setAttribute("id", "cookie-creation-container");


        var cookieName = document.createElement("input");
        var cookieNameLabel = document.createElement("label");
        cookieNameLabel.innerHTML = "Имя";
        cookieName.setAttribute("id", "cookie-name");
        cookieName.setAttribute("type", "text");

        var cookieValue = document.createElement("input");
        var cookieValueLabel = document.createElement("label");
        cookieValueLabel.innerHTML = "Значение";

        cookieValue.setAttribute("id", "cookie-value");
        cookieValue.setAttribute("type", "text");


        var cookieDaysDuration = document.createElement("input");
        var cookieDaysLabel = document.createElement("label");
        cookieDaysLabel.innerHTML = "Срок Годности";
        cookieDaysDuration.setAttribute("id", "cookie-duration");
        cookieDaysDuration.setAttribute("type", "text");


        var createCookie = document.createElement("button");
        createCookie.setAttribute("id", "create-cookie");
        var addButtonText = document.createTextNode("Добавить");
        createCookie.appendChild(addButtonText);

        cookieCreationContainer.appendChild(cookieNameLabel);
        cookieCreationContainer.appendChild(cookieName);
        cookieCreationContainer.appendChild(br);

        cookieCreationContainer.appendChild(cookieValueLabel);
        cookieCreationContainer.appendChild(cookieValue);
        cookieCreationContainer.appendChild(br);

        cookieCreationContainer.appendChild(cookieDaysLabel);
        cookieCreationContainer.appendChild(cookieDaysDuration);
        cookieCreationContainer.appendChild(br);


        cookieCreationContainer.appendChild(createCookie);
        cookieCreationContainer.appendChild(br);


        document.body.appendChild(cookieCreationContainer);
    }

    function createCookiesTable(cookiesTable) {

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
    }

    function deleteCookieAndRow(table, item) {

        if (cookies.hasOwnProperty(item.className)) {
            var res = confirm("Удалить cookie с именем " + item.className + " ?");
            if (res) {
                deleteCookie(item.className);
                item.parentElement.parentElement.remove();
            }
        }
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