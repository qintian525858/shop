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





}).service('UsersService', ['$http', function ($http) {
    var getDada = function (search,currentPage,itemsPerPage) {
        var url = '/api/admin/users_list';
        var data = {search:search,page:currentPage,itemsPerPage:itemsPerPage};
        return $http.post(url, data);
    };

   

    return {
        getDada: function (search,currentPage,itemsPerPage) {
            return getDada(search,currentPage,itemsPerPage);
        }
        
    };
}]);


