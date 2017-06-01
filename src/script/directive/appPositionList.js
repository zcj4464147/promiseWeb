var app = angular.module("app");
app.directive("appPositionList",function(){
	return {
		scope:{
			list:"@data"
		},
		templateUrl:"view/template/content.html"
	}
})