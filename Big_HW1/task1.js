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

         VK.api('friends.get', {'fields':'bdate,photo_50'}, response => {
                if (response.error) {
                reject(new Error(response.error.error_msg));
            } else
            {
                var userFilteredData =[];
                var userDataList = response.response;
                var filteredDataList = [] ;


                var source = vkFriendsTemplate.innerHTML;
                var templateFn = Handlebars.compile(source);
                var template = templateFn({list: userDataList});
                allFriendsContainer.innerHTML = template;

                var allSearch = document.querySelector(".allSearch");

        allSearch.addEventListener("input", function (e) {
            var filteredArr = [];
            var index = 0 ;
            var target = e.target  ;
            if (target.value) {
                for (var i = 0; i < userDataList.length; i++) {
                    if (userDataList[i].first_name.toLowerCase().indexOf(target.value.toLowerCase()) !== -1) {
                        filteredArr[index] = userDataList[i];
                        index++;
                        continue;
                    }
                }

                var template = templateFn({list: filteredArr});
                allFriendsContainer.innerHTML = template;
             } else {
                var template = templateFn({list: userDataList});
                allFriendsContainer.innerHTML = template;
            }
        });

                allFriendsContainer.addEventListener("click", function (e) {
                    var target = e.target ;

                    if(target.classList.contains("add-favorite-pic")){
                        var newEl = document.body.appendChild(target.closest("li")) ;
                        newEl.setAttribute("draggable", "false");
                        filteredFriendsContainer.appendChild(newEl);
                     }
                });

                filteredFriendsContainer.addEventListener("click", function (e) {
                    var target = e.target ;
                    if(target.classList.contains("add-favorite-pic")){
                        var removedEl = document.body.appendChild(target.closest("li")) ;
                        removedEl.setAttribute("draggable", "true");
                        allFriends.appendChild(removedEl);
                    }
                })

                resolve();
            }
            })
        });

    }).catch(function(e) {
        alert(`Ошибка: ${e.message}`);
    });

function allowDrop(ev) {
     ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



