/*
 * Дз 1:

 Переделать тестовое задание (аккордеон) с применением делегирования.
 *
 * */


(function () {
    var container = document.querySelector(".accordion-container");

    container.addEventListener("click", function (e) {
        var target = e.target, current;

        if (!target.classList.contains("item")) {
            return;
        }

        if (!target.classList.contains("show")) {
            current = document.querySelector(".show");
            if (current) {
                current.classList.toggle("show");
                current.firstChild.classList.toggle("show");
                current.nextElementSibling.classList.toggle("show");
            }
        }
        target.classList.toggle("show");
        target.firstChild.classList.toggle("show");
        target.nextElementSibling.classList.toggle("show");
    });
})();


