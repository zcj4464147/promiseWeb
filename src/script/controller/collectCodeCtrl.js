'use strict';
angular.module('app').controller('collectCodeCtrl', ['$http','$scope','$location','$timeout','cathe',function($http,$scope,$location,$timeout,cathe){
			$scope.imgName = "star-active.png";
			$scope.flag = false;
			$scope.idValue="";
			$scope.collectId = "";
			// 页面显示
			$http({
				method:'GET',
				url:'http://192.168.1.8:8080/lgw/col/loadData/'+cathe.get("userid")

			}).then(function  success(res){
				console.log(res.data);
				$scope.collectCode = res.data;
			},function error(res){
				console.log("wrong")
			})
			$scope.starClick = function (e,id){
				e.stopPropagation();
				$scope.flag = true;
				$scope.idValue = id;
				$scope.companyName ="";
				 $http({
			        method:'GET',
			        params:{
			            
			        },
			        url:'http://192.168.1.8:8080/lgw/advis/loadDetail/'+id+"/"+cathe.get("userid")
			    }).then(function success(res){
			    	console.log(res.data.data.companyname)
			        $scope.collectId = res.data.hasCol.id;
			        $scope.companyName = res.data.data.companyname;
			    },function  error(res){
			        console.log("wrong");
			    })
				$scope.deleteCollect = function (){
				// 取消收藏
				$timeout(function(){
					 $http({
		                method:'GET',
		                params:{
		                
		                },
		                url:'http://192.168.1.8:8080/lgw/col/delCol/'+$scope.collectId
		                }).then(function success(res){
		                        $scope.imgName= "star.png";
		                },function  error(res){
		                    console.log("wrong");
		             })
		                location.reload();   
		            },500)
				}
			}
}]) 