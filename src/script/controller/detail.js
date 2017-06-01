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