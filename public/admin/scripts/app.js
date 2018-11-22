(function(angular) {
    'use strict';

    //路由
    angular.module('myApp', ['ngRoute', 'oc.lazyLoad', 'commonDirectives','rt.select2','ui.bootstrap', 'ngSanitize', 'ngCookies',"dndLists", "ngCsv"])
        .config(function($routeProvider, $locationProvider) {
            var version = 20180416;
            $routeProvider.when('/users_list', {
                templateUrl: 'views/users_list.html',
                controller: 'UsersCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/users_list.js",
                                       //"../vendor/angular-selector/angular-selector.min.js",
                                       //"../vendor/angular-selector/angular-selector.min.css"
                                      ])
                    }]
                }
            }).
            when('/jurisdiction_list', {
                templateUrl: 'views/jurisdiction_list.html',
                controller: 'JurisdictionCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/jurisdiction_list.js"])
                    }]
                }
            }).

            when('/role_list', {
                templateUrl: 'views/role_list.html',
                controller: 'RoleCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/role_list.js"])
                    }]
                }
            }).

            when('/password', {
                templateUrl: 'views/password.html',
                controller: 'PasswordCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/password.js"])
                    }]
                }
            }).

            when('/push_msg', {
                templateUrl: 'views/push_msg.html',
                controller: 'PushmsgCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/push_msg.js"])
                    }]
                }
            }).

            when('/chat_room', {
                templateUrl: 'views/chat_room.html',
                controller: 'ChatroomCtrl',
                resolve: {
                    deps: ["$ocLazyLoad", function (a) {
                        return a.load(["scripts/chat_room.js"])
                    }]
                }
            }).

            otherwise({redirectTo: '/msg'});
        }
    ).controller("indexCtr", function($scope, $http, $filter, $cookieStore, $interval, indexService) {

        if ($cookieStore.get("username") == undefined) {
            window.location = "/admin/login.html";
            return;
        }
        // $scope.$on('$viewContentLoaded', function(){
            angular.element("#mainSideMenu li ul li").on('click',function (el) {
                $("#mainSideMenu li ul li").removeClass("active");
                $("#mainSideMenu li ul").removeClass("in");
                $("#mainSideMenu li div").removeClass("active");
                $(this).addClass('active');
                $(this).parent().addClass('in');
                $(this).parent().prev().addClass('active');
            });
        //});


        
   
        indexService.check_login().success(function (data) {
            if (data.ret == 999) {
                window.location = "/admin/login.html";
                return;
            } else if (data.ret == 0) {
                $scope.menuslist = data.menuslist;
            } else {

            }
        });
        
        
    }).service('indexService', ['$http', function ($http) {
        var check_login = function () {
            var url = '/api/users/check_login';
            var data = {};
            return $http.get(url, data);
        };

        return {
            check_login: function () {
                return check_login();
            }
        };
        
    }]);


    //公共的directive
    angular.module('commonDirectives', []).
        directive('appUsername', ['$cookieStore', function($cookieStore) {
            return function(scope, elm, attrs) {
                elm.text($cookieStore.get("username"));
            };
        }]).
        directive('myAccess', [ 'removeElement', '$cookieStore', '$window', function (removeElement, $cookieStore, $window) {
            return{
                restrict: 'A',
                link: function (scope, element, attributes) {
                    var hasAccess = false;
                    
                    angular.forEach(JSON.parse($window.localStorage["access"] || '[]'), function (permission) {
                        if(attributes.myAccess == permission) {
                            hasAccess = true;
                        }
                    });

                    if (!hasAccess) {
                        angular.forEach(element.children(), function (child) {
                            removeElement(child);
                        });
                        removeElement(element);
                    }
                }
            }
        }]).
        directive('myDrop', [ 'removeElement', '$cookieStore', '$window', function (removeElement, $cookieStore, $window) {
            return{
                restrict: 'A',
                link: function (scope, element, attributes) {
                    var hasDrop = false;
                    angular.forEach(JSON.parse($window.localStorage["permissions"] || '[]'), function (permission) {
                        if(attributes.myDrop == permission) {
                            hasDrop = true;
                        }
                    });

                    if (hasDrop) {
                        angular.forEach(element.children(), function (child) {
                            removeElement(child);
                        });
                        removeElement(element);
                    }
                }
            }
        }]).
        directive('paraSection', ['$cookieStore', function($cookieStore) {
            return{
                restrict: 'A',
                link: function (scope, element, attributes) {
                    console.debug(element)
                }
            }
        }]).constant('removeElement', function(element){
            element && element.remove && element.remove();
        }).
        
        directive('myLaydate', function() {
        　　return {
        　　　　require: '?ngModel',
        　　　　restrict: 'A',
        　　　　scope: {
        　　　　　　ngModel: '='　
        　　　　},
        　　　　link: function(scope, element, attr, ngModel) {
        　　　　　　var _date = null,_config={};
        　　　　　　_config = {
        　　　　　　　　lang: 'ch',
        　　　　　　　　elem: element[0],
        　　　　　　　　btns:['clear','confirm'],
        　　　　　　　　format: !!attr.format ? attr.format : 'yyyy-MM-dd HH:mm:ss',
        　　　　　　　　range: attr.range,
                      type:'datetime',
        　　　　　　　　done: function(value, date, endDate) {
                          console.log(JSON.stringify(value));
        　　　　　　　　　　ngModel.$setViewValue(value);
        　　　　　　　　}
        　　　　　　};
        　　　　　　!!attr.typeDate && (_config.type = attr.typeDate);

        　　　　　　 _date = laydate.render(_config);
        　　　
        　　　　　　ngModel.$render = function() {
        　　　　　　　　element.val(ngModel.$viewValue || '');
        　　　　　　};
        　　　　}
        　　}
        });
})(window.angular);
