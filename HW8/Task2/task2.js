/*
 *
 * ДЗ 2:
 Создать приложение для ВКонтакте, которое загружает список ваших друзей и выводит
 их на страницу в следующем формате: Фото, ФИО, Возраст, Дата рождения.
 Друзья должны быть отсортированы по дате рождения в порядке убывания.
 То есть на самом верху списка расположен друг с ближайший датой рождения.
 Использование шаблонизатора приветствуется.
 * */

new Promise(function(resolve) {
    if (document.readyState == 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function() {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5756964
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 8);
        });
    }).then(function() {
        return new Promise(function(resolve, reject) {

            VK.api('friends.get', {'fields':'bdate,photo_100'}, response => {
                if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {

            var  userData =  response.response;

             for (var item of userData ) {
                if( item.hasOwnProperty("bdate") ){
                   var  accountBDate = item.bdate.split(".");
                    if (accountBDate[2]){
                       item.age = new Date().getFullYear()  - accountBDate[2];
                          if( new Date().getMonth()+1  <= accountBDate[1] && new Date().getDate() < accountBDate[0] ) {
                             item.age -=1 ;
                          }
                    }
                }
             }

                var withoutBdate=[] ;
                var withDateArr=[] ;

             for (var account of userData) {
                if (account.hasOwnProperty("bdate")) {
                   withDateArr.push(account);
                } else {
                    withoutBdate.push(account);
                }
             }

             var bdateHasPassed = [];
             var bdateIsComing = [];
             var today = new Date();

             for (var i=0 ; i< withDateArr.length; i++){

                var bdateA  = withDateArr[i].bdate.split(".");
                var bdate = new Date(2016, bdateA[1]-1,bdateA[0]);
                   if(today.getTime() > bdate.getTime()) {
                      bdateHasPassed.push(withDateArr[i]);
                   } else {
                        bdateIsComing.push(withDateArr[i]);
                   }
             }

             var sortFunc = function (objA,objB) {
                 var currentBDateA = objA.bdate.split(".") ;
                 var currentBDateB = objB.bdate.split(".") ;
                    if (currentBDateA[1]-1 > currentBDateB[1]-1){
                       return 1;
                    }

                    if (currentBDateA[1]-1  === currentBDateB[1]-1){
                       return 0;
                    }
                 return -1;
              }

             bdateHasPassed.sort(sortFunc) ;
             bdateIsComing.sort(sortFunc);

             var parsedResult =  bdateIsComing.concat(bdateHasPassed,withoutBdate);

             var source = vkFriendsTemplate.innerHTML;
             var templateFn = Handlebars.compile(source);
             var template  = templateFn({parsedArr: parsedResult });
             results.innerHTML = template;

             resolve();
            }
        })
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});
