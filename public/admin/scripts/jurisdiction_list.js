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




}).service('JurisdictionService', ['$http', function ($http) {
    var getDada = function (search,currentPage,itemsPerPage) {
        var url = '/api/admin/jurisdiction_list';
        var data = {};
        return $http.post(url, data);
    };

   

    return {
        getDada: function () {
            return getDada();
        }
        
    };
}]);


