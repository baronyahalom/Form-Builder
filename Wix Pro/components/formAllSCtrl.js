angular.module('formBuildApp')
    .controller('formAllSCtrl', ['$rootScope','$routeParams', '$scope', '$route', '$location', '$http', function ($rootScope,$routeParams, $scope, $route, $location, $http) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'
       

        self.getFormbyID = function () {
            var id = $routeParams.id;
            $http.get(serverUrl + "formSub/" + id)
                .then(function (response) {
                   $scope.fullFeilds = response.data.values;
                   $scope.feildsRow = response.data.fields;             
                   console.log($scope.feildsRow)
                  
                }, function (response) {
                });
        };


        self.getFormName = function (id) {
            $http.get(serverUrl + "forms/name/" + id)
                .then(function (response) {
                    //First function handles success
                    $rootScope.formName  = response.data[0].formName;             
                   console.log($scope.formName)
                }, function (response) {
                });
        };

        self.submit = function () {
            $scope.formDataTwo = {};
            $scope.formDataTwo = $scope.fullFeilds;
            var fulFi = "";
            for(var i=0; i<$scope.formDataTwo.length ; i++)
            {
                fulFi = fulFi + `'` +$scope.formDataTwo[i].inputName +`'`+ ','
            }
            fulFi = fulFi.substring(0,fulFi.length-1);
            var data = {
                formName:  $rootScope.formName,
                feilds :  fulFi
            }
            $http.post("http://localhost:3000/forms/addUser", data)
                .then(function (response) {
                    console.log(response)
                    if (response.data === "successfully added form") {
                        alert( "was succefully added!")
                        $location.path('/home')
                        return
                    }
                }, function (response) {
                    //Second function handles error
                    alert("Something went wrong");
                    return
                });
        };




    }]);
