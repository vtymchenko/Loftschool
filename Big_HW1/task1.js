(function () {

    userFilteredData = [];
    allDataList = [] ;
    var userDataList = [] ;

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
                }
            else {
                    var allFriendsContainer = document.getElementById("allFriendsContainer");
                    var filteredFriendsContainer = document.getElementById("filteredFriendsContainer");
                    var saveBtn = document.getElementById("save");
                    var allSearch = document.querySelector(".allSearch");
                    var filteredSearch = document.querySelector(".filteredSearch");
                    var template;

                    allDataList = response.response;
                    userDataList = response.response;
                    var source = vkFriendsTemplate.innerHTML;
                    var templateFn = Handlebars.compile(source);

                    if (localStorage.getItem("filteredList")) {

                        userFilteredData = JSON.parse(localStorage.getItem("filteredList"));
                        for (var i = 0; i < userDataList.length; i++) {
                            for (var j = 0; j < userFilteredData.length; j++) {
                                if (userDataList[i].uid == userFilteredData[j].uid) {
                                    userDataList.splice(i, 1);
                                }
                            }
                        }
                        template = templateFn({list: userFilteredData});
                        filteredFriendsContainer.innerHTML = template;

                    }

                    userDataList.sort(function (objA, objB) {
                        if (objA.first_name > objB.first_name) {
                            return 1;
                        }

                        if (objA.first_name == objB.first_name) {
                            return 0;
                        }
                        return -1;
                    });

                    template = templateFn({list: userDataList});
                    allFriendsContainer.innerHTML = template;

                    filteredSearch.addEventListener("input", function (e) {
                        filterSearch(e, userFilteredData, filteredFriendsContainer)
                    });

                    allSearch.addEventListener("input", function (e) {
                        filterSearch(e, userDataList, allFriendsContainer)
                    });

                    function filterSearch(e, userData, container) {
                        var filteredArr = [];
                        var index = 0;
                        var target = e.target;
                        if (target.value) {
                            for (var i = 0; i < userData.length; i++) {
                                if (userData[i].first_name.toLowerCase().indexOf(target.value.toLowerCase()) !== -1) {
                                    filteredArr[index] = userData[i];
                                    index++;
                                    continue;
                                }
                            }

                            template = templateFn({list: filteredArr});
                            container.innerHTML = template;
                        } else {
                            template = templateFn({list: userData});
                            container.innerHTML = template;
                        }
                    }

                    allFriendsContainer.addEventListener("click", function (e) {
                        var target = e.target;
                        var element = target.closest("li");
                        if (target.classList.contains("add-favorite-pic")) {
                            element.setAttribute("draggable", "false");
                            for (var i = 0; i < userDataList.length; i++) {
                                if (userDataList[i].uid == element.id) {
                                    userFilteredData.push(userDataList[i]);
                                    userDataList.splice(i, 1);
                                }
                            }
                            filteredFriendsContainer.appendChild(element);
                        }
                    });


                    filteredFriendsContainer.addEventListener("click", function (e) {
                        var target = e.target;
                        var element = target.closest("li");
                        if (target.classList.contains("add-favorite-pic")) {
                            element.setAttribute("draggable", "true");
                            for (var i = 0; i < userFilteredData.length; i++) {
                                if (userFilteredData[i].uid == element.id) {
                                    userDataList.push(userFilteredData[i]);
                                    userFilteredData.splice(i, 1);
                                }
                            }
                            allFriendsContainer.appendChild(element);
                        }
                    });

                    saveBtn.addEventListener("click", function () {
                        if (userFilteredData) {
                            localStorage.clear();
                            localStorage.setItem("filteredList", JSON.stringify(userFilteredData));
                        }
                    });

                    resolve();
                }
                })
            })
        }).catch(function(e) {
                alert(`Ошибка: ${e.message}`);
            });
})();


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data) ;
    ev.target.appendChild(element);
    for (var i = 0; i < allDataList.length; i++) {
        if ( allDataList[i].uid == data) {
            userFilteredData.push(allDataList[i]);
        }
    }
}