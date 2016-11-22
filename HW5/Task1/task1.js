/*
 * Дз 1:

 Переделать тестовое задание (аккордеон) с применением делегирования.
 *
 * */


(function () {
    var current;
    var container = document.querySelector(".accordion-container");

    container.addEventListener("click", function (e) {
        var target = e.target;

        if (!target.classList.contains("item")) {
            return;
        }

        if (target.classList.contains("show")) {
            current = null;
            target.classList.toggle("show");
            target.firstChild.classList.toggle("show");
            target.nextElementSibling.classList.toggle("show");
        } else {
            if (current) {
                current.classList.toggle("show");
                current.firstChild.classList.toggle("show");
                current.nextElementSibling.classList.toggle("show");
            }
            current = target;
            current.classList.toggle("show");
            current.firstChild.classList.toggle("show");
            current.nextElementSibling.classList.toggle("show");
        }
    });

})();



