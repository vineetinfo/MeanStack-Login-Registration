angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout, $location,$rootScope){
	var app = this;

	app.loadme= false;

	$rootScope.$on('$routeChangeStart',function(){
		if(Auth.isLoggedIn()){
		// console.log('Success : User is Logged  In');
		app.isLoggedIn =true;
		Auth.getUser().then(function(data){
			// console.log(data.data.username);
			app.username  = data.data.username;
			app.useremail = data.data.email;
			app.loaadme   = true;
		})
	}
	else{
		// console.log('Failure : User is Not Logged In');
		app.isLoggedIn = false;
		app.username = '';
		app.loadme  = true;
	}	
	})

	

	this.doLogin = function(loginData){
		app.loading  = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading = false;

				app.successMsg = data.data.message + 'Redirecting...';

				$timeout(function(){
					$location.path('/about');

					app.loginData = '';
					app.successMsg = false;	
				},2000);
			}
			else{
				app.loading =false;
				app.errorMsg = data.data.message;
			}
		})
	}

	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);
	}
})
