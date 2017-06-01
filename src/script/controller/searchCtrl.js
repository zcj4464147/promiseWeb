'use strict';
angular.module("app").controller('searchCtrl',['$http','$scope','$state',function($http,$scope,$state){
       if($state.params.name){
            $scope.salaryValue ="薪水";
            $scope.cityValue = "城市"; 
            $scope.amountValue ="规模";
       }
      console.log($state.params.name)
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
        $scope.cityData =["全国","北京","广州","南京","上海","苏州","天津","合肥","杭州","武汉","徐州","重庆","哈尔滨"]
        $scope.salaryData = ["不限","3000以下","3000~4999","5000~7999","8000~10000","10000~15000","15000~25000","25000以上"]
        $scope.amountData =["不限","少于50人","50~100人","100~500人","500人以上"];
        //城市
       
        $scope.cityShow = false;
        $scope.getData = "";
        $scope.cityClick = function (){
        	$scope.cityShow = true;
        	$scope.getData = $scope.cityData;
        	document.body.style.overflow='hidden';
        	
        }

         $scope.backgroundCity = function (){
         	document.body.style.overflow="auto";
        	$scope.cityShow = false;
        }
        $scope.selectCity = function (){
    		if($scope.getData == $scope.cityData){
    			$scope.cityValue  = this.value;
    		}else if($scope.getData ==$scope.salaryData){
    			$scope.salaryValue  = this.value;
    		}else{
    			$scope.amountValue  = this.value;	
    		}
        	$scope.cityShow = false;
            document.body.style.overflow="auto";
        }
        //薪水
         
         $scope.salaryClick = function (){
        	$scope.cityShow = true;
        	$scope.getData = $scope.salaryData;
        	document.body.style.overflow='hidden';
         }
         //规模
         
         $scope.amountClick = function (){
        	$scope.cityShow = true;
        	$scope.getData = $scope.amountData;
        	document.body.style.overflow='hidden';
         }
}]).filter("search",function(){
	return function(data,topSearch,city,salary,amount){
		var selectData;
		var cityData;
		var salaryData;
		var amountData;
        var topData;
        // top
        if(topSearch){
           topData = data.filter(function(item) {
                return item.cityname == topSearch || item.companyname==topSearch || item.industry==topSearch;
            });  
        }else{
            topData =data
        }
		//城市
		if(city=="城市" || city=="全国"){
			cityData = topData
		}else{
			cityData = topData.filter(function(item) {
				return item.cityname == city;
			});
		}
		//薪水
		if(salary=="不限"  || salary=="薪水"){
				salaryData = cityData
		}else{
			salaryData = cityData.filter(function(item) {
				return item.salary == salary;
			});
		}
		// 规模
		if(amount=="不限"  || amount=="规模"){
				amountData = salaryData
		}else{
			amountData = salaryData.filter(function(item) {
				return item.empnum == amount;
			});
		}
		return  amountData;
	}
})