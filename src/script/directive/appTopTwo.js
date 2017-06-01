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