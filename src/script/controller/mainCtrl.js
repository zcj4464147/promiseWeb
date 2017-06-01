'use strict';
angular.module('app').controller('mainCtrl', ['$http','$scope','cathe',function($http,$scope,cathe){
        // cathe.get("name")?$scope.flag =false:$scope.flag=true;
        // cathe.get("companyname")?$scope.flag =false:$scope.flag=true;
        if(cathe.get("companyname")){
            $scope.flag =false;
            $scope.titleMsg = cathe.get("companyname");
            $scope.back = true;
        }else if(cathe.get("name")){
             $scope.flag =false;
             $scope.titleMsg = cathe.get("name");
             $scope.back = true;
        }else{
            $scope.flag=true;
            $scope.titleMsg=""
        };
        $http({
            method: 'GET',
            params: {
            },
            url: 'http://192.168.1.8:8080/lgw/advis/query',
        }).then(function successCallback(res) {
            	$scope.list2 = res.data.data;
        }, function errorCallback(response) {
            console.log('wrong');

        });

}]) 