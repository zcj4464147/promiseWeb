'use strict';
angular.module('app').controller('companyRegistCtrl', ['$http','$scope','$location','cathe',function($http,$scope,$location,cathe){
	$scope.companyMsg = "";
	$scope.companyCode = "验证码";
	$scope.companyCodeMsg = "验证码";
	var reg = /^1[34578]\d{9}$/;
    var reg2 = /^\d{6,10}$/;
    // 注册验证
   $scope.$watch('companyName',function(newValue){
        reg.test(newValue)?$scope.usernameMsg = "":$scope.usernameMsg="请输入正确的手机号格式"
    });
    $scope.$watch('companyPassword',function(newValue){
        reg2.test(newValue)?$scope.passwordMsg="":$scope.passwordMsg="长度6到10位的数字";
    });
	$scope.$watch("company",function(){
		(/^[\u4e00-\u9fa5]{4,}$/).test($scope.company)?$scope.companyMsg="":$scope.companyMsg="四位以上汉字"
	});
	//获取注册码
	$scope.companySendMsg = function (){
		if($scope.usernameMsg=="" && $scope.passwordMsg=="" && $scope.companyMsg==""){
			$scope.promptMsg  = "";
			$http({
				method:"GET",
				params:{
					companyname:$scope.company,
					username:$scope.companyName,
					password:$scope.companyPassword,
					empnum:23
				},
				url:"http://192.168.1.8:8080/lgw/company/loadValidCode"
			}).then(function success(res){
				console.log(res.data.data)
				if(res.data.data){
					$scope.companyCode=res.data.data.code;
					$scope.companyCodeId =res.data.data.id
				}else{
					$scope.promptMsg="企业名或用户名重复"
				}
			},function  error(res){
				console.log("wrong")
			})
		}else{
			$scope.promptMsg = "请填写正确的注册信息"
		}
		
	}
	// 验证码判断
	$scope.companyCodeTest = function (){
		$scope.companyCodeInput == $scope.companyCode?$scope.companyCodePrompt="":$scope.companyCodePrompt="验证输入错误"
	}
	//点击注册按钮
	$scope.companyRegist = function (){
		$http({
			method:"GET",
			params:{
				validcode:$scope.companyCodeInput,
				id:$scope.companyCodeId
			},
			url:"http://192.168.1.8:8080/lgw/company/regist"
		}).then(function success(res){
			console.log(res.data.success)
			$location.url("login")
		},function  error(res){
			console.log("wrong")
		})
	}
	}]) 