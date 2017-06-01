'use strict';
angular.module('app').controller('myCtrl', ['$http','$scope','cathe','$location',function($http,$scope,cathe,$location){
    cathe.get("name")?$scope.pageShow=false:$scope.pageShow=true;
    cathe.get("companyname")?$scope.companyShow=false:$scope.companyShow=true;
    $scope.cookieMsg =cathe.get("name");
    $scope.companyCookieMsg =cathe.get("companyname");
    $scope.endLogin = function (){
        $scope.pageShow =true;
        $scope.companyShow =true;
        cathe.remove("name");
        cathe.remove("userid");
         cathe.remove("companyname");
        cathe.remove("companyid");
    }

}]) 