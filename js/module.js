var mymodule = angular.module("mymodule", ['ngRoute']);
mymodule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', { templateUrl: 'views/home.html' })
                  .when('/directory', { templateUrl: 'views/directory.html', controller: 'mycontroller' })
                  .otherwise({ redirectTo: '/home' });
}]);
var mycontroller = function ($scope,$http) {
    $scope.message = "This is my first Test";
    $scope.var = ['test1', 'test2', 'test3'];
    // The below array is replaced by the below $http.get method which read data from json file, instead here creating manually so manythings.
    
    // $scope.arr = [
    //     { name: "das", age: "29", salary: 33333, available: true },
    //     { name: "bandhu", age: "25", salary: 29999, available: true },
    //     { name: "braja", age: "30", salary: 20000, available: true },
    //     { name: "pap", age: "27", salary: 19999, available: false }
     
    // ]


    // The below line is used to convert the above array into json format and display in console, then copy those  json data and put in a .json file
    console.log(angular.toJson($scope.arr));
    // Removing an element from array.
    $scope.removeEle = function (loop2) {
        var val = $scope.arr.indexOf(loop2);
        $scope.arr.splice(val, 1);
    }
    // Adding new data into arrays
    $scope.addData = function () {
        $scope.arr.push({
            name: $scope.name,
            age: parseInt($scope.age),
            salary: parseInt($scope.salary),
            available: true
        }
        );
        // After adding an element makes below fields as empty in browser
        $scope.name = "";
        $scope.age = "";
        $scope.salary = "";


    }
$http.get('data/jsondata.json').success(function(data){
    $scope.arr=data;
});
}
mymodule.controller("mycontroller", mycontroller);
