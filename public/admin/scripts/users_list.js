angular.module('myApp').controller('UsersCtrl', function($scope, UsersService, $location, $routeParams , $uibModal) {
    $scope.currentPage = 1;//当前页面
    $scope.itemsPerPage = 20;//每页显示条数

    function int_data()
    {
       UsersService.getDada($scope.search,$scope.currentPage,$scope.itemsPerPage).success(function(response){
            $scope.init_spinner_display = false;
            if(response.ret == 999){
                window.location = "/admin/login.html";
            }else if(response.ret == 0){
                $scope.list = response.data.data;
                $scope.currentPage = response.data.current_page;
                $scope.itemsPerPage = response.data.per_page;
                $scope.totalItems = response.data.total;
                $scope.numPages = response.data.last_page;
            }else{
                alert(response.msg);
            }
       });
    }
    int_data();
    $scope.pageChanged = function() 
    {
        int_data();
    };

    $scope.query_click = function()
    {   
        int_data();
    };


    $scope.usersModal = function(row)
    {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'usersModal.html',
            controller: 'usersModalCtrl',
            size: "md",
            resolve: {
                usersinfo: function() { return angular.copy(row); },
            }
        });
        
        modalInstance.result.then(function (response) {
            if (row) {
            } else {
                $scope.list.unshift(response);
            }
        });
    }

    $scope.usersRemoveModal = function(row)
    {
        if(confirm("您确定要删除该账号？")){
            UsersService.users_remove(row).success(function (response) {
                angular.forEach($scope.list, function(value,key,array){
                    if(value.id == response.data.id) {
                        array.splice(key, 1);
                    }
                });
                alert("删除成功");
            });
        }
    }


    $scope.usersPasswordModal = function(row)
    {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'usersPasswordModal.html',
            controller: 'usersPasswordModalCtrl',
            size: "md",
            resolve: {
                usersinfo: function() { return angular.copy(row); },
            }
        });
        
        modalInstance.result.then(function (response) {
            alert(response.msg);
        });
    }


}).service('UsersService', ['$http', function ($http) {
    var getDada = function (search,currentPage,itemsPerPage) {
        var url = '/api/admin/users_list';
        var data = {search:search,page:currentPage,itemsPerPage:itemsPerPage};
        return $http.post(url, data);
    };

   var users_add = function (usersinfo) {
        var url = '/api/admin/users_add';
        var data = {usersinfo:usersinfo};
        return $http.post(url, data);
    };

    var users_edit = function (usersinfo) {
        var url = '/api/admin/users_edit';
        var data = {usersinfo:usersinfo};
        return $http.post(url, data);
    };

    var users_remove = function(usersinfo)
    {
        var url = '/api/admin/users_remove';
        var data = {usersinfo:usersinfo};
        return $http.post(url, data);
    }

    var users_password = function(usersinfo,users)
    {
        var url = '/api/admin/users_password';
        var data = {usersinfo:usersinfo,users:users};
        return $http.post(url, data);
    }

    

    return {
        getDada: function (search,currentPage,itemsPerPage) {
            return getDada(search,currentPage,itemsPerPage);
        },
        users_add: function (usersinfo) {
            return users_add(usersinfo);
        },
        users_edit: function (usersinfo) {
            return users_edit(usersinfo);
        },
        users_remove: function (usersinfo) {
            return users_remove(usersinfo);
        },
        users_password: function (usersinfo,users) {
            return users_password(usersinfo,users);
        }
        
    };
}]);


//用户新增修改
angular.module('myApp').controller('usersModalCtrl', function ($scope, usersinfo, usersinfo, $uibModalInstance,UsersService) {

    if (usersinfo) {
        $scope.usersinfo = usersinfo;
    }

    $scope.btn_spinner_display = false;
    $scope.confirm = function () {
        $scope.btn_spinner_display = true;
        if(!$scope.usersinfo.id){
            UsersService.users_add($scope.usersinfo).success(function (response) {
                if(response.ret == 0) {
                    $scope.btn_spinner_display = false;
                    var res = {};
                    res = response.data;
                    $uibModalInstance.close(res);
                } else {
                    alert(response.msg);
                    $scope.btn_spinner_display = false;
                }
            });
        }
    };
    //cancel事件
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})



//密码修改
angular.module('myApp').controller('usersPasswordModalCtrl', function ($scope, usersinfo, usersinfo, $uibModalInstance,UsersService) {
    if (usersinfo) {
        $scope.usersinfo = usersinfo;
    }
    $scope.btn_spinner_display = false;
    $scope.confirm = function () {
        if($scope.users.password1 != $scope.users.password2){
            alert("密码输入不一致");
            return false;
        }
        $scope.btn_spinner_display = true;
        UsersService.users_password($scope.usersinfo,$scope.users).success(function (response) {
            if(response.ret == 0) {
                $scope.btn_spinner_display = false;
                var res = {};
                res = response;
                $uibModalInstance.close(res);
            } else {
                alert(response.msg);
                $scope.btn_spinner_display = false;
            }
        });
    };
    //cancel事件
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
