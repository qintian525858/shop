angular.module('myApp').controller('JurisdictionCtrl', function($scope, JurisdictionService, $location, $routeParams , $uibModal) {
    $scope.usersinfo = {};
    $scope.usersinfo.role_id = 0;
    function int_data()
    {
       JurisdictionService.getDada().success(function(response){
            $scope.init_spinner_display = false;
            if(response.ret == 999){
                window.location = "/admin/login.html";
            }else if(response.ret == 0){
                $scope.list = response.data;
            }else{
                alert(response.msg);
            }
       });
    }
    int_data();


    //获取角色列表
    $scope.role_list = function()
    {
        JurisdictionService.role_list().success(function (response) {
            $scope.roleList = response.data;
        });
    }
    $scope.role_list();


    //根据角色获取权限
    $scope.role_select_jurisdiction = function()
    {
        $scope.jurisdiction_map = [];
        if($scope.usersinfo.role_id == null){
            angular.forEach($scope.list, function(value,key,array){
                $scope['selectOne_'+value.id] = false;
            });
            return false;
        }
        JurisdictionService.role_select_jurisdiction($scope.usersinfo).success(function(response){
            if(response.ret == 999){
                window.location = "/admin/login.html";
            }else if(response.ret == 0){
                if(response.data.length != 0){
                    angular.forEach($scope.list, function(value,key,array){
                        $scope['selectOne_'+value.id] = false;
                    });
                    angular.forEach(response.data, function(v,k,arr){
                        $scope['selectOne_'+v.jurisdiction_id] = true;
                    });
                }
            }else{
                alert(response.msg);
            }
       });
    }


    //全选和反选
    //$scope['init_spinner_display'+$scope.tab_active] = false;
    $scope.all = function()
    {
        console.log($scope.selectAll);
        if($scope.selectAll){
            angular.forEach($scope.list, function (value,key,array) {
                $scope['selectOne_'+value.id] = true;
            })
        }else{
            angular.forEach($scope.list, function (value,key,array) {
                $scope['selectOne_'+value.id] = false;
            })
        }
    }

    $scope.only = function(val)
    {
        if($scope['selectOne_'+val.id]){
            $scope['selectOne_'+val.id] = false;
        }else{
            $scope['selectOne_'+val.id] = true;
        }
    }

    $scope.confirm = function()
    {
        $scope.selected = []
        angular.forEach($scope.list, function (value,key,array) {
            if($scope['selectOne_'+value.id]){
                $scope.selected.push(value.id);
            }
        })
        console.log(JSON.stringify($scope.usersinfo.role_id));
        if($scope.selected.length == 0 || $scope.usersinfo.role_id == 0){
            alert("请选择权限和管理员角色");
            return false;
        }

        JurisdictionService.role_add_jurisdiction($scope.usersinfo,$scope.selected).success(function(response){
            if(response.ret == 999){
                window.location = "/admin/login.html";
            }else if(response.ret == 0){
    
            }else{
                alert(response.msg);
            }
       });

    }

}).service('JurisdictionService', ['$http', function ($http) {
    var getDada = function () {
        var url = '/api/admin/jurisdiction_list';
        var data = {};
        return $http.post(url, data);
    };

    var role_list = function () {
        var url = '/api/admin/role_list';
        var data = {};
        return $http.post(url, data);
    };

    var role_select_jurisdiction = function (usersinfo) {
        var url = '/api/admin/role_select_jurisdiction';
        var data = {usersinfo:usersinfo};
        return $http.post(url, data);
    };

    var role_add_jurisdiction = function(usersinfo,selected){
        var url = '/api/admin/role_add_jurisdiction';
        var data = {usersinfo:usersinfo,selected:selected};
        return $http.post(url, data);
    };


    return {
        getDada: function () {
            return getDada();
        },
        role_list: function () {
            return role_list();
        },
        role_select_jurisdiction: function (usersinfo) {
            return role_select_jurisdiction(usersinfo);
        },
        role_add_jurisdiction: function (usersinfo,selected) {
            return role_add_jurisdiction(usersinfo,selected);
        }
    
    };
}]);





