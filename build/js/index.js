'use strict';

angular.module('app',['ui.router','ngCookies']);


// 监听浏览器,针对不同分辨率计算font-size
// 然后根据设计稿比如尺寸是640尺寸 rem = 设计稿的字体大小 / 100 ; 16px —> 0.16rem


(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth<=320){
                docEl.style.fontSize = '50px';
            }
            else if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }
            else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);




'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	}).state('search',{ 
		url:'/search/:name',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	}).state('my',{ 
		url:'/my',
		templateUrl:'view/my.html',
		controller:'myCtrl'
	}).state('login',{ 
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	}).state('personRegist',{ 
		url:'/personRegist',
		templateUrl:'view/personRegist.html',
		controller:'registCtrl'
	}).state('detail',{ 
		url:'/detail/:id',
		templateUrl:'view/template/detail.html',
		controller:'detailCtrl'
	}).state('collectCode',{ 
		url:'/collectCode',
		templateUrl:'view/template/collectCode.html',
		controller:'collectCodeCtrl'
	}).state('deliverRecord',{ 
		url:'/deliverRecord',
		templateUrl:'view/template/deliverRecord.html',
		controller:'deliverRecordCtrl'
	}).state('companyRegist',{ 
		url:'/companyRegist',
		templateUrl:'view/template/companyRegist.html',
		controller:'companyRegistCtrl'
	}).state('companyGetRecord',{ 
		url:'/companyGetRecord',
		templateUrl:'view/template/companyGetRecord.html',
		controller:'companyGetRecordCtrl'
	}).state('sendResume',{ 
		url:'/sendResume',
		templateUrl:'view/template/sendResume.html',
		controller:'sendResumeCtrl'
	});
	$urlRouterProvider.otherwise('main');	
}])
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
'use strict';
angular.module('app').controller('companyGetRecordCtrl', ['$http','$scope','$location','cathe',function($http,$scope,$location,cathe){
	$http({
		method:"GET",
		url:'http://192.168.1.8:8080/lgw/apply/load/'+cathe.get("companyid")+"/new"
	}).then(function success(res){
		console.log(res);
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
angular.module('app').controller('detailCtrl', ['$http','$scope','$location','cathe','$state',function($http,$scope,$location,cathe,$state){
    $scope.deliver = "投个简历";
    $scope.btnState = false;
    $scope.imgName= "star.png";
    $scope.companyLogin = false;
    var useridExit = cathe.get("userid")?cathe.get("userid"):"23"
    //获取数据
    $http({
        method:'GET',
        params:{
            
        },
        url:'http://192.168.1.8:8080/lgw/advis/loadDetail/'+$state.params.id+"/"+useridExit
    }).then(function success(res){
        $scope.msg = res.data.data
        res.data.hasCol?$scope.imgName= "star-active.png":$scope.imgName= "star.png"
        $scope.hasCol = res.data.hasCol;
        $scope.collectId = res.data.hasCol?res.data.hasCol.id:0;
    },function  error(res){
        console.log("wrong");
    })
    cathe.get("name")?$scope.flag=false:$scope.flag=true;
    //简历投递
    if(cathe.get("companyname")){
        $scope.companyLogin = true;
    }else{
         $scope.companyLogin =false;
           $scope.deliverResume = function (companyid){
                 $http({
                    method:'GET',
                    params:{
                        userid:cathe.get("userid"),
                        advertiesid:$state.params.id
                    },
                    url:'http://192.168.1.8:8080/lgw/apply/add'
                }).then(function success(res){
                    $scope.deliver = "已投递,无需再投";
                     $scope.btnState = true;
                },function  error(res){
                    console.log("wrong");
                })
            } 
    }
 
    //收藏
    $scope.collect = function (){
        if(cathe.get("name")){
              if(!$scope.hasCol){
                    // 收藏
                     $http({
                        method:'GET',
                        params:{
                             userid:cathe.get("userid"),
                             advertiesid:$state.params.id
                        },
                        url:'http://192.168.1.8:8080/lgw/col/add'
                    }).then(function success(res){
                        $scope.imgName= "star-active.png";
                        $scope.hasCol = "1";
                    },function  error(res){
                        console.log("wrong");
                    })
                }else{
                    // 取消收藏
                      $http({
                        method:'GET',
                        params:{
                        
                        },
                        url:'http://192.168.1.8:8080/lgw/col/delCol/'+$scope.collectId
                        }).then(function success(res){
                            $scope.imgName= "star.png";
                            $scope.hasCol = null;
                        },function  error(res){
                            console.log("wrong");
                        })
                }
            }else{
                alert("只有登录过才可以收藏")
            }
      
       
    }          
}]) 
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
angular.module("app").directive("appFoot",function(){
	return {
		scope:{
			
		},
		templateUrl:"view/template/foot.html"
	}
})
angular.module("app").directive("appHead",function(){
	return {
		scope:{
			title:"@",
			flag:"@",
			regist:"@"
		},
		templateUrl:"view/template/top.html"
	}
})
var app = angular.module("app");
app.directive("appPositionList",function(){
	return {
		scope:{
			list:"@data"
		},
		templateUrl:"view/template/content.html"
	}
})
angular.module("app").directive("appTopTwo",function(){
	return {
		scope:{
			title:"@",
			flag:"@",
			regist:"@",
			back:"@"
		},
		templateUrl:"view/template/topTwo.html"
	}
})
'use strict';
angular.module('app').service("cathe",['$cookies',function($cookies){
	this.put = function(key,value){
		$cookies.put(key,value);
	};
	this.get = function(key){
		return $cookies.get(key);
	};
	this.remove = function(key){
		$cookies.remove(key);
	}
}])