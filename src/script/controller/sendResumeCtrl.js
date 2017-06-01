'use strict';
angular.module("app").controller("sendResumeCtrl",["$http","$scope","cathe","$location",function($http,$scope,cathe,$location){
		
		$scope.companyRegist = function (){
			$http({
				method:"GET",
				params:{
					companyname:$scope.companyName,
					cityname:$scope.companyLocation,
					industry:$scope.companyPosition,
					salary:$scope.positionSalary,
					empnum:$scope.companyPerson,
					companyId:cathe.get("companyid")
				},
				url:"http://192.168.1.8:8080/lgw/advis/add"
			}).then(function success(res){
				console.log(res)
				$location.url("my")
			},function error(res){
				console.log("wrong")
			})
		}
		
}])