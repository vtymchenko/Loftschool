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
                    if( item.bdate === undefined){
                        item.birthDate  = "2,1,1900" ;
                    } else {
                        var  accountBDate = item.bdate.split(".");
                        if( accountBDate[2] === undefined ) {
                            accountBDate[2] = new Date().getFullYear()-150;
                            item.birthDate =  (accountBDate[1]) +"."+ accountBDate[0] +"." + accountBDate[2];
                        }else{
                            item.birthDate =  (accountBDate[1]) +"."+ accountBDate[0] +"." + accountBDate[2];
                            item.age = new Date().getFullYear()  - accountBDate[2];
                            if(  new Date().getMonth()+1  <= accountBDate[1] && new Date().getDate() < accountBDate[0] ) {
                                item.age -=1 ;
                            }
                        }
                    }
                }

                userData.sort(function (accountObjA, accountObjB) {
                    return  new Date( accountObjB.birthDate).getTime() -  new Date(accountObjA.birthDate).getTime() ;
                });

                var source = vkFriendsTemplate.innerHTML;
                var templateFn = Handlebars.compile(source);
                var template  = templateFn({userData: userData });
                results.innerHTML = template;

                resolve();
            }
        })
    });
}).catch(function(e) {
    alert(`Ошибка: ${e.message}`);
});
