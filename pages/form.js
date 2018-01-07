app.directive('inputDataForm', function ($http) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {

        },
        templateUrl: 'pages/form.html',
        link: function (scope, element, attrs) {
        	scope.formObject = {};

          /*$http.get('http://localhost:4000/tasks').then(function(success){
            console.log(success);
          }).then(function(error){
            console.log(error);
          })*/
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        	scope.submitForm = function(){
        		var object = scope.formObject;
            $http.post('http://localhost:4000/tasks', object, config).then(function(success){
              alert(success);
            }).then(function(error){
              alert(error);
            });
        	}

        } //DOM manipulation
}});
