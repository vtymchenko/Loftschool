/*
*
* Создать функцию `prepend`

 `prepend` имеет два параметра, в которые нужно передать элементы

 Задача функции - вставить второй элемент в начало первого. Например:

 `prepend(container, newElement)` - newElement должен быть добавлен в начало элемента container.
* */

function prepend(container, newElement ) {
    var createdElement = document.createElement(newElement) ;
    createdElement.innerHTML = "<p>New element</p>" ;
    var firstContainerElement = document.querySelector(container).firstElementChild;
    var parentElement = document.querySelector(container);
    parentElement.insertBefore(createdElement, firstContainerElement);
}