angular.module('myApp').controller('JurisdictionCtrl', function($scope, JurisdictionService, $location, $routeParams , $uibModal) {
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
        console.log($scope.usersinfo.role_id);
        JurisdictionService.role_select_jurisdiction($scope.usersinfo).success(function(response){
            if(response.ret == 999){
                window.location = "/admin/login.html";
            }else if(response.ret == 0){
                if(response.data.length != 0){
                    angular.forEach($scope.list, function(value,key,array){
                        angular.forEach(response.data, function(v,k,arr){
                            
                        });
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
      console.log(JSON.stringify($scope.selected));
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


    return {
        getDada: function () {
            return getDada();
        },
        role_list: function () {
            return role_list();
        },
        role_select_jurisdiction: function (usersinfo) {
            return role_select_jurisdiction(usersinfo);
        }
    
    };
}]);





