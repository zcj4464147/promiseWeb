'use strict';
angular.module('app').controller('loginCtrl', ['$http','$scope','$location','cathe',function($http,$scope,$location,cathe){
    $scope.loginMsg = "";
    // 个人登录
        $scope.personLogin = function(){
             if($scope.username!="" && $scope.password!=""){
                      $http({
                        method: 'GET',
                        params: {
                            username:$scope.username,
                            password:$scope.password
                        },
                        url: 'http://192.168.1.8:8080/lgw/user/login'
                    }).then(function successCallback(res) {
                        if(res.data.success){
                            $location.url('my');
                            cathe.put("name",$scope.username);
                            cathe.put("userid",res.data.data.id);
                        }else{
                            $scope.loginMsg=res.data.message;
                        }
                    }, function errorCallback(response) {
                        console.log('wrong');
                    });
            }
        }
    //企业登录
     $scope.companyLogin = function(){
             if($scope.username!="" && $scope.password!=""){
                      $http({
                        method: 'GET',
                        params: {
                            username:$scope.username,
                            password:$scope.password
                        },
                        url: 'http://192.168.1.8:8080/lgw/company/login'
                    }).then(function successCallback(res) {
                        if(res.data.success){
                            $location.url('my');
                            cathe.put("companyname",$scope.username);
                            cathe.put("companyid",res.data.data.id);
                        }else{
                            $scope.loginMsg=res.data.message;
                        }
                    }, function errorCallback(response) {
                        console.log('wrong');
                    });
            }
        }
}]) 