angular.module('myApp').controller('RoleCtrl', function($scope, RoleService, $location, $routeParams , $uibModal) {
    function int_data()
    {
       RoleService.getDada().success(function(response){
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

    $scope.roleModal = function(row)
    {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'roleModal.html',
            controller: 'roleModalCtrl',
            size: "md",
            resolve: {
                roleinfo: function() { return angular.copy(row); },
            }
        });
        
        modalInstance.result.then(function (response) {
            if (row) {
            	angular.forEach($scope.list, function(value,key,array){
            		if(value.id == response.data.id){
            			array[key] = response.data;
            		}
            	});
            	alert(response.msg);
            } else {
                $scope.list.unshift(response.data);
            }
        });
    }


    $scope.roleRemove = function(row)
    {
    	if(confirm("您确定要删除该角色名称吗？")){
            RoleService.role_remove(row).success(function (response) {
                angular.forEach($scope.list, function(value,key,array){
                    if(value.id == response.data.id) {
                        array.splice(key, 1);
                    }
                });
                alert("删除成功");
            });
        }
    }


}).service('RoleService', ['$http', function ($http) {
    var getDada = function (search,currentPage,itemsPerPage) {
        var url = '/api/admin/role_list';
        var data = {};
        return $http.post(url, data);
    };

    var role_add = function (roleinfo) {
        var url = '/api/admin/role_add';
        var data = {roleinfo:roleinfo};
        return $http.post(url, data);
    };

    var role_edit = function (roleinfo) {
        var url = '/api/admin/role_edit';
        var data = {roleinfo:roleinfo};
        return $http.post(url, data);
    };

    var role_remove = function (roleinfo) {
        var url = '/api/admin/role_remove';
        var data = {roleinfo:roleinfo};
        return $http.post(url, data);
    };

    return {
        getDada: function () {
            return getDada();
        },
        role_add: function (roleinfo) {
            return role_add(roleinfo);
        },
        role_edit: function (roleinfo) {
            return role_edit(roleinfo);
        },
        role_remove: function (roleinfo) {
            return role_remove(roleinfo);
        }
    };
}]);




//角色新增修改
angular.module('myApp').controller('roleModalCtrl', function ($scope, roleinfo, $uibModalInstance,RoleService) {

    if (roleinfo) {
        $scope.roleinfo = roleinfo;
    }

    $scope.btn_spinner_display = false;
    $scope.confirm = function () {
        $scope.btn_spinner_display = true;
        if(!$scope.roleinfo.id){
            RoleService.role_add($scope.roleinfo).success(function (response) {
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
        }else{
        	RoleService.role_edit($scope.roleinfo).success(function (response) {
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
        }
    };
    //cancel事件
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
