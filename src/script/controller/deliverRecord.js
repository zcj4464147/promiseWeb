'use strict';
angular.module('app').controller('deliverRecordCtrl', ['$http','$scope','$location','cathe',function($http,$scope,$location,cathe){
	$http({
		method:"GET",
		url:'http://192.168.1.8:8080/lgw/apply/loadData/'+cathe.get("userid")+"/all"
	}).then(function success(res){
		console.log(res.data.data);
		$scope.msg = res.data.data;
	},function  error(res){
		console.log("wrong")
	})
	var spanElement = document.querySelectorAll(".deliver_state span");
	spanElement[0].style.borderBottom="5px red solid";
	spanElement[0].style.color="red";
	$scope.allRecord = function (e){
		spanElement.forEach(function(item,index,array){
				item.style = {
					borderBottom:"0",
					color:"#000"
				}
		})
		e.target.style.borderBottom="5px red solid";
		e.target.style.color="red";
	};
	$scope.passRecord = function (e){
		spanElement.forEach(function(item,index,array){
				item.style = {
					borderBottom:"0",
					color:"#000"
				}
		})
		e.target.style.borderBottom="5px red solid";
		e.target.style.color="red";
	}
	$scope.refuseRecord = function (e){
		spanElement.forEach(function(item,index,array){
				item.style = {
					borderBottom:"0",
					color:"#000"
				}
		})
		e.target.style.borderBottom="5px red solid";
		e.target.style.color="red";
	};
	$scope.uncheckRecord = function (e){
		spanElement.forEach(function(item,index,array){
				item.style = {
					borderBottom:"0",
					color:"#000"
				}
		})
		e.target.style.borderBottom="5px red solid";
		e.target.style.color="red";
	}






	}]) 