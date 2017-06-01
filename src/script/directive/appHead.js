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