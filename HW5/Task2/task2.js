/*
 *
 * Дз 2:

 Создать страницу с кнопкой. При клике на кнопку, на странице должен создаваться div произвольных размеров, в произвольном месте.

 Цвет фона div'а должен быть каждый раз случайным.

 Созданные div'ы можно перетаскивать мышкой (drag & drop)
 *
 * */

(function () {

    var button = document.querySelector("#div-creator");

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomPosition() {
        return Math.floor(Math.random() * 100) + "px";
    }

    function getRandomeSize() {
        return Math.floor((Math.random() * 150) + 100) + "px";
    }


    function createDiv() {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "newDiv");
        newDiv.style.left = newDiv.style.left + getRandomPosition();
        newDiv.style.top = newDiv.style.top + getRandomPosition();

        document.body.appendChild(newDiv);
        newDiv.innerHTML = "";
        newDiv.style.height = getRandomeSize();
        newDiv.style.width = getRandomeSize();
        newDiv.style.position = "absolute";
        newDiv.style.background = getRandomColor();
    }

    button.addEventListener("click", function () {
        createDiv();
    });

    document.body.addEventListener("mousedown", function (e) {
        var newDiv = e.target;

        function mouseMoving(e) {
            if (newDiv.classList.contains("newDiv")) {
                moveAt(e, newDiv);
            }
        }

        newDiv.addEventListener("mousemove", mouseMoving);

        newDiv.addEventListener("mouseup", function () {
            newDiv.removeEventListener("mousemove", mouseMoving);
            newDiv.removeEventListener("mousedown", this);
        });
    });

    function moveAt(e, el) {
        el.style.left = e.pageX - el.offsetWidth / 2 + "px";
        el.style.top = e.pageY - el.offsetWidth / 2 + "px";
    }

})();