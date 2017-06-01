"use strict";angular.module("app",["ui.router","ngCookies"]),function(t,e){var o=t.documentElement,a="orientationchange"in window?"orientationchange":"resize",n=function(){var t=o.clientWidth;t&&(o.style.fontSize=t<=320?"50px":t>=640?"100px":t/640*100+"px")};t.addEventListener&&(e.addEventListener(a,n,!1),t.addEventListener("DOMContentLoaded",n,!1))}(document,window),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("search",{url:"/search/:name",templateUrl:"view/search.html",controller:"searchCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("personRegist",{url:"/personRegist",templateUrl:"view/personRegist.html",controller:"registCtrl"}).state("detail",{url:"/detail/:id",templateUrl:"view/template/detail.html",controller:"detailCtrl"}).state("collectCode",{url:"/collectCode",templateUrl:"view/template/collectCode.html",controller:"collectCodeCtrl"}).state("deliverRecord",{url:"/deliverRecord",templateUrl:"view/template/deliverRecord.html",controller:"deliverRecordCtrl"}).state("companyRegist",{url:"/companyRegist",templateUrl:"view/template/companyRegist.html",controller:"companyRegistCtrl"}).state("companyGetRecord",{url:"/companyGetRecord",templateUrl:"view/template/companyGetRecord.html",controller:"companyGetRecordCtrl"}).state("sendResume",{url:"/sendResume",templateUrl:"view/template/sendResume.html",controller:"sendResumeCtrl"}),e.otherwise("main")}]),angular.module("app").controller("collectCodeCtrl",["$http","$scope","$location","$timeout","cathe",function(t,e,o,a,n){e.imgName="star-active.png",e.flag=!1,e.idValue="",e.collectId="",t({method:"GET",url:"http://192.168.1.8:8080/lgw/col/loadData/"+n.get("userid")}).then(function(t){console.log(t.data),e.collectCode=t.data},function(t){console.log("wrong")}),e.starClick=function(o,l){o.stopPropagation(),e.flag=!0,e.idValue=l,e.companyName="",t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/advis/loadDetail/"+l+"/"+n.get("userid")}).then(function(t){console.log(t.data.data.companyname),e.collectId=t.data.hasCol.id,e.companyName=t.data.data.companyname},function(t){console.log("wrong")}),e.deleteCollect=function(){a(function(){t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/col/delCol/"+e.collectId}).then(function(t){e.imgName="star.png"},function(t){console.log("wrong")}),location.reload()},500)}}}]),angular.module("app").controller("companyGetRecordCtrl",["$http","$scope","$location","cathe",function(t,e,o,a){t({method:"GET",url:"http://192.168.1.8:8080/lgw/apply/load/"+a.get("companyid")+"/new"}).then(function(t){console.log(t),e.msg=t.data.data},function(t){console.log("wrong")});var n=document.querySelectorAll(".deliver_state span");n[0].style.borderBottom="5px red solid",n[0].style.color="red",e.allRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.passRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.refuseRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.uncheckRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"}}]),angular.module("app").controller("companyRegistCtrl",["$http","$scope","$location","cathe",function(t,e,o,a){e.companyMsg="",e.companyCode="验证码",e.companyCodeMsg="验证码";var n=/^1[34578]\d{9}$/,l=/^\d{6,10}$/;e.$watch("companyName",function(t){n.test(t)?e.usernameMsg="":e.usernameMsg="请输入正确的手机号格式"}),e.$watch("companyPassword",function(t){l.test(t)?e.passwordMsg="":e.passwordMsg="长度6到10位的数字"}),e.$watch("company",function(){/^[\u4e00-\u9fa5]{4,}$/.test(e.company)?e.companyMsg="":e.companyMsg="四位以上汉字"}),e.companySendMsg=function(){""==e.usernameMsg&&""==e.passwordMsg&&""==e.companyMsg?(e.promptMsg="",t({method:"GET",params:{companyname:e.company,username:e.companyName,password:e.companyPassword,empnum:23},url:"http://192.168.1.8:8080/lgw/company/loadValidCode"}).then(function(t){console.log(t.data.data),t.data.data?(e.companyCode=t.data.data.code,e.companyCodeId=t.data.data.id):e.promptMsg="企业名或用户名重复"},function(t){console.log("wrong")})):e.promptMsg="请填写正确的注册信息"},e.companyCodeTest=function(){e.companyCodeInput==e.companyCode?e.companyCodePrompt="":e.companyCodePrompt="验证输入错误"},e.companyRegist=function(){t({method:"GET",params:{validcode:e.companyCodeInput,id:e.companyCodeId},url:"http://192.168.1.8:8080/lgw/company/regist"}).then(function(t){console.log(t.data.success),o.url("login")},function(t){console.log("wrong")})}}]),angular.module("app").controller("deliverRecordCtrl",["$http","$scope","$location","cathe",function(t,e,o,a){t({method:"GET",url:"http://192.168.1.8:8080/lgw/apply/loadData/"+a.get("userid")+"/all"}).then(function(t){console.log(t.data.data),e.msg=t.data.data},function(t){console.log("wrong")});var n=document.querySelectorAll(".deliver_state span");n[0].style.borderBottom="5px red solid",n[0].style.color="red",e.allRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.passRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.refuseRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"},e.uncheckRecord=function(t){n.forEach(function(t,e,o){t.style={borderBottom:"0",color:"#000"}}),t.target.style.borderBottom="5px red solid",t.target.style.color="red"}}]),angular.module("app").controller("detailCtrl",["$http","$scope","$location","cathe","$state",function(t,e,o,a,n){e.deliver="投个简历",e.btnState=!1,e.imgName="star.png",e.companyLogin=!1;var l=a.get("userid")?a.get("userid"):"23";t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/advis/loadDetail/"+n.params.id+"/"+l}).then(function(t){e.msg=t.data.data,t.data.hasCol?e.imgName="star-active.png":e.imgName="star.png",e.hasCol=t.data.hasCol,e.collectId=t.data.hasCol?t.data.hasCol.id:0},function(t){console.log("wrong")}),a.get("name")?e.flag=!1:e.flag=!0,a.get("companyname")?e.companyLogin=!0:(e.companyLogin=!1,e.deliverResume=function(o){t({method:"GET",params:{userid:a.get("userid"),advertiesid:n.params.id},url:"http://192.168.1.8:8080/lgw/apply/add"}).then(function(t){e.deliver="已投递,无需再投",e.btnState=!0},function(t){console.log("wrong")})}),e.collect=function(){a.get("name")?e.hasCol?t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/col/delCol/"+e.collectId}).then(function(t){e.imgName="star.png",e.hasCol=null},function(t){console.log("wrong")}):t({method:"GET",params:{userid:a.get("userid"),advertiesid:n.params.id},url:"http://192.168.1.8:8080/lgw/col/add"}).then(function(t){e.imgName="star-active.png",e.hasCol="1"},function(t){console.log("wrong")}):alert("只有登录过才可以收藏")}}]),angular.module("app").controller("loginCtrl",["$http","$scope","$location","cathe",function(t,e,o,a){e.loginMsg="",e.personLogin=function(){""!=e.username&&""!=e.password&&t({method:"GET",params:{username:e.username,password:e.password},url:"http://192.168.1.8:8080/lgw/user/login"}).then(function(t){t.data.success?(o.url("my"),a.put("name",e.username),a.put("userid",t.data.data.id)):e.loginMsg=t.data.message},function(t){console.log("wrong")})},e.companyLogin=function(){""!=e.username&&""!=e.password&&t({method:"GET",params:{username:e.username,password:e.password},url:"http://192.168.1.8:8080/lgw/company/login"}).then(function(t){t.data.success?(o.url("my"),a.put("companyname",e.username),a.put("companyid",t.data.data.id)):e.loginMsg=t.data.message},function(t){console.log("wrong")})}}]),angular.module("app").controller("mainCtrl",["$http","$scope","cathe",function(t,e,o){o.get("companyname")?(e.flag=!1,e.titleMsg=o.get("companyname"),e.back=!0):o.get("name")?(e.flag=!1,e.titleMsg=o.get("name"),e.back=!0):(e.flag=!0,e.titleMsg=""),t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/advis/query"}).then(function(t){e.list2=t.data.data},function(t){console.log("wrong")})}]),angular.module("app").controller("myCtrl",["$http","$scope","cathe","$location",function(t,e,o,a){o.get("name")?e.pageShow=!1:e.pageShow=!0,o.get("companyname")?e.companyShow=!1:e.companyShow=!0,e.cookieMsg=o.get("name"),e.companyCookieMsg=o.get("companyname"),e.endLogin=function(){e.pageShow=!0,e.companyShow=!0,o.remove("name"),o.remove("userid"),o.remove("companyname"),o.remove("companyid")}}]),angular.module("app").controller("registCtrl",["$http","$scope","$location","cathe",function(t,e,o,a){var n=/^1[34578]\d{9}$/,l=/^\d{6,10}$/;e.$watch("username",function(o){n.test(o)?(e.usernameMsg="",e.checkUsername=function(){t({method:"GET",params:{username:e.username,password:e.password},url:"http://192.168.1.8:8080/lgw/user/loadValidCode"}).then(function(t){console.log(t.data.message),"成功"==t.data.message?e.usernameMsg="":e.usernameMsg="用户已注册"},function(t){console.log("wrong")})}):e.usernameMsg="请输入正确的手机号"}),e.$watch("password",function(t){l.test(t)?e.passwordMsg="":e.passwordMsg="长度6到10位的数字"}),e.codeMsg="短信验证码",e.id="",e.codeTesting="",e.registTest="",e.sendMsg=function(){t({method:"GET",params:{username:e.username,password:e.password},url:"http://192.168.1.8:8080/lgw/user/loadValidCode"}).then(function(t){console.log(t.data.data.code),e.codeMsg=t.data.data.code,e.id=t.data.data.id},function(t){console.log("wrong")})},e.codeTest=function(){e.codeInput==e.codeMsg?e.codeTesting="":e.codeTesting="验证输入错误"},e.personRegist=function(){""==e.codeTesting&&""==e.usernameMsg&&""==e.passwordMsg?t({method:"GET",params:{validcode:e.codeMsg,id:e.id},url:"http://192.168.1.8:8080/lgw/user/regist"}).then(function(t){o.url("login")},function(t){e.registTest="请填写正确的注册信息"}):e.registTest="请填写正确的注册信息"}}]),angular.module("app").controller("searchCtrl",["$http","$scope","$state",function(t,e,o){o.params.name&&(e.salaryValue="薪水",e.cityValue="城市",e.amountValue="规模"),console.log(o.params.name),t({method:"GET",params:{},url:"http://192.168.1.8:8080/lgw/advis/query"}).then(function(t){e.list2=t.data.data},function(t){console.log("wrong")}),e.cityData=["全国","北京","广州","南京","上海","苏州","天津","合肥","杭州","武汉","徐州","重庆","哈尔滨"],e.salaryData=["不限","3000以下","3000~4999","5000~7999","8000~10000","10000~15000","15000~25000","25000以上"],e.amountData=["不限","少于50人","50~100人","100~500人","500人以上"],e.cityShow=!1,e.getData="",e.cityClick=function(){e.cityShow=!0,e.getData=e.cityData,document.body.style.overflow="hidden"},e.backgroundCity=function(){document.body.style.overflow="auto",e.cityShow=!1},e.selectCity=function(){e.getData==e.cityData?e.cityValue=this.value:e.getData==e.salaryData?e.salaryValue=this.value:e.amountValue=this.value,e.cityShow=!1,document.body.style.overflow="auto"},e.salaryClick=function(){e.cityShow=!0,e.getData=e.salaryData,document.body.style.overflow="hidden"},e.amountClick=function(){e.cityShow=!0,e.getData=e.amountData,document.body.style.overflow="hidden"}}]).filter("search",function(){return function(t,e,o,a,n){var l,r,c;return c=e?t.filter(function(t){return t.cityname==e||t.companyname==e||t.industry==e}):t,l="城市"==o||"全国"==o?c:c.filter(function(t){return t.cityname==o}),r="不限"==a||"薪水"==a?l:l.filter(function(t){return t.salary==a}),"不限"==n||"规模"==n?r:r.filter(function(t){return t.empnum==n})}}),angular.module("app").controller("sendResumeCtrl",["$http","$scope","cathe","$location",function(t,e,o,a){e.companyRegist=function(){t({method:"GET",params:{companyname:e.companyName,cityname:e.companyLocation,industry:e.companyPosition,salary:e.positionSalary,empnum:e.companyPerson,companyId:o.get("companyid")},url:"http://192.168.1.8:8080/lgw/advis/add"}).then(function(t){console.log(t),a.url("my")},function(t){console.log("wrong")})}}]),angular.module("app").directive("appFoot",function(){return{scope:{},templateUrl:"view/template/foot.html"}}),angular.module("app").directive("appHead",function(){return{scope:{title:"@",flag:"@",regist:"@"},templateUrl:"view/template/top.html"}});var app=angular.module("app");app.directive("appPositionList",function(){return{scope:{list:"@data"},templateUrl:"view/template/content.html"}}),angular.module("app").directive("appTopTwo",function(){return{scope:{title:"@",flag:"@",regist:"@",back:"@"},templateUrl:"view/template/topTwo.html"}}),angular.module("app").service("cathe",["$cookies",function(t){this.put=function(e,o){t.put(e,o)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);