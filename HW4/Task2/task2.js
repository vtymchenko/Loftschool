/*
*
*ДЗ - 2

 Создать функцию `deleteTextNodes`

 Эта функция принимает на вход элемент и должна удалить все текстовые узлы внутри указанного элемента.

 Функция может работать не рекурсивно, то есть не заходить внутрь дочерних элементов контейнера.
*
* */




 function deleteTextNodes(element){
   var elements = document.querySelector(element).childNodes;
      for (var itemNode of elements) {
         if (itemNode.nodeType == 3){
           itemNode.remove();
         }
      }
 }