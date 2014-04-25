'use strict';


//fix ie console
if (typeof console==="undefined"|| typeof console.log === "undefined") {
	console = {}
	console.log = function(){};
}

angular.module('tetris', ['ng','ngCookies']).config(['$routeProvider',
function($routeProvider) {

	$routeProvider.when('/game/:id', {
		templateUrl : 'partials/game.html',
		controller : GameCtrl
	})
	.when('/', {templateUrl: 'partials/index.html', controller : IndexCtrl})
	//.when('/avoir/:id', {templateUrl : 'partials/detailAvoir.html', controller: AvoirDetailCtrl})
	.otherwise({
		redirectTo : '/'
	});
}])
//on application start
.run(['$rootScope', '$cookies',function($rootScope, $cookies) {

	$cookies.nickname = $cookies.nickname || "Anonymous"+Math.floor(Math.random()*9999);
	$rootScope.nickname =  $cookies.nickname;

	$(document).ready(function() {


		$rootScope.mode = "game";


		$("#message").blur(function() {
			$rootScope.mode = "game";
			$("#game").focus();
			$rootScope.$apply();
		});

		$("body").keydown(function(e) {
			//console.log(e.keyCode);

			if (e.keyCode==9) {
				e.preventDefault();
				console.log($rootScope);
				if ($rootScope.mode === "game") {
					$rootScope.mode = "chat";
					$("#message").removeAttr("disabled");
					
					$("#message").focus();
					$("#message").click();

				} else {
					$rootScope.mode = "game";
					$("#message").attr("disabled","disabled");
					$("#game").focus();
					$("#game").click();
				}

				$rootScope.$apply();
			}

			if ($rootScope.mode === "game") {
				if (e.keyCode==38) {
					return $rootScope.$broadcast('gameEvent', tetris.GameEventEnum.UP);
				}
				if (e.keyCode==40) {
					return $rootScope.$broadcast('gameEvent', tetris.GameEventEnum.DOWN);
				}
				if (e.keyCode==37) {
					return $rootScope.$broadcast('gameEvent', tetris.GameEventEnum.LEFT);
				}
				if (e.keyCode==39) {
					return $rootScope.$broadcast('gameEvent', tetris.GameEventEnum.RIGHT);
				}
				if (e.keyCode==32) {
					return $rootScope.$broadcast('gameEvent', tetris.GameEventEnum.DROP);
				}
			}
		});
	})
}]);

