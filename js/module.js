var mymodule = angular.module('mymodule', ['ngRoute']);

mymodule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', { templateUrl: 'views/home.html',controller:'mycontroller'})
        .when('/directory', { templateUrl: 'views/directory.html', controller: 'mycontroller' })
        .when('/contact', { templateUrl: 'views/contact.html'})
        .otherwise({ redirectTo: '/home' });
}]);
// for custom directive tag (random-dir)--here directive name is without - and 2nd character start with capital ..see below
mymodule.directive('randomDir', [function () {
    return {
        // defines where to use the tag like as element(E),as Attribute(A) or both (EA)..etc
        restrict: 'E',
        // defines what are the attributes in my custom tag.
        scope: {
            myarr: '=',
            title: '='

        },  
        // everything works fine but while inspecting ,my custome tag will replace with the outermost tag(div,section...etc whatever) defined in the redirect page/templateURL(random.html)
        replace:true,
        // transclude used to active/work inside inner tag of our custome tag
        transclude:true,
        // this defines where my view page
        //template    : '<img ng-srs="image/Das.png">',
         templateUrl   : 'views/random.html',
        //  use the controller as per the request or as per the page(which uses this custom tag)linked with controller. 
        //does some $scope.messa...initialization or any operations
        controller: function ($scope) {

        }

    };


}]);
var mycontroller = function ($scope, $http) {
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
    // Reading data from json file
    $http.get('data/jsondata.json').success(function (data) {
        $scope.arr = data;
    }
    
    );
}
// Registering controller into module
mymodule.controller("mycontroller", mycontroller);
