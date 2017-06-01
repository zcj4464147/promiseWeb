'use strict';
angular.module('app').controller('registCtrl', ['$http','$scope','$location','cathe',function($http,$scope,$location,cathe){
        // 登录验证
        var reg = /^1[34578]\d{9}$/;
        var reg2 = /^\d{6,10}$/;
        $scope.$watch('username',function(newValue){
            if(reg.test(newValue)){
                // 用户验证
                $scope.usernameMsg = "";
                  $scope.checkUsername = function (){
                     $http({
                        method:'GET',
                        params:{
                            username:$scope.username,
                            password:$scope.password
                        },
                        url:'http://192.168.1.8:8080/lgw/user/loadValidCode'
                    }).then(function success(res){
                        console.log(res.data.message);
                          res.data.message=="成功"?$scope.usernameMsg="":$scope.usernameMsg="用户已注册"  
                    },function error(response){
                        console.log('wrong');
                    })
                }
            }else{
                $scope.usernameMsg="请输入正确的手机号";
            }
        });
        $scope.$watch('password',function(newValue){
            reg2.test(newValue)?$scope.passwordMsg="":$scope.passwordMsg="长度6到10位的数字";
        });
       
        // 获取code
        $scope.codeMsg = "短信验证码";
        $scope.id = "";
        $scope.codeTesting = "";
        $scope.registTest = "";
        $scope.sendMsg = function (){
            $http({
                method:'GET',
                params:{
                    username:$scope.username,
                    password:$scope.password
                },
                url:'http://192.168.1.8:8080/lgw/user/loadValidCode'
            }).then(function success(res){
                console.log(res.data.data["code"]);
                    $scope.codeMsg = res.data.data["code"];
                    $scope.id = res.data.data["id"];
            },function error(response){
                console.log('wrong');
            })
        }
        //验证code
        $scope.codeTest = function (){
            $scope.codeInput==$scope.codeMsg?$scope.codeTesting="":$scope.codeTesting="验证输入错误";
        }
        // 注册验证
         $scope.personRegist = function (){
            if($scope.codeTesting=="" && $scope.usernameMsg=="" && $scope.passwordMsg==""){
                   $http({
                    method:'GET',
                    params:{
                        validcode:$scope.codeMsg,
                        id:$scope.id
                    },
                    url:'http://192.168.1.8:8080/lgw/user/regist'
                }).then(function success(res){
                    $location.url("login");
                },function error(response){
                   $scope.registTest = "请填写正确的注册信息" ;
                })
            }else{
                $scope.registTest = "请填写正确的注册信息" ;
            } 
        }
}]) 