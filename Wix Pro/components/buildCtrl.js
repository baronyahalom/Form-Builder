angular.module('formBuildApp',)
    .controller('buildCtrl', [ '$uibModal','$scope','$route','$http','$rootScope',  '$location', function ( $uibModal,$scope,$route, $http,$rootScope, $location) {
        let self = this;
        var feildNew ="";
        var typeNew="";
        var nameNew = "";
        $rootScope.form="";
        
       
        $scope.fullFeilds = [];
        self.name = [];
        self.feild = [];
        self.type=[];

        self.types = ["text", "color", "date", "email", "tel", "number"];

        $scope.changeFeild=function () {
            feildNew=self.fieldLbl;
        }
        $scope.changeName=function () {
            nameNew=self.nameIn;
        }
        $scope.changeType=function () {
            typeNew=self.typeIn;
        }
       
        $scope.addF = function() {
            if (feildNew=="" || nameNew =="" || typeNew=="")
            {
                alert("Missing Data")
                return;
            }
            self.feild.push(self.fieldLbl)
            self.name.push(self.nameIn)
            self.type.push(self.typeIn)
            let data={
                feild:feildNew,
                name: nameNew,
                type: typeNew
            }
            
            $scope.fullFeilds.push(data);
            
            self.fieldLbl = null
            self.nameIn = null
            self.typeIn = null        
        };



        $scope.save = function () {
            let formBuild = {
                form : $rootScope.form,
                name : self.name,
                field : self.feild,
                type : self.type

            }
            $http.post("http://localhost:3000/forms/add", formBuild)
                .then(function (response) {
                    console.log(response)
                    if (response.data === "successfully added form") {
                        alert( "was succefully added!")
                        feildNew ="";
                        typeNew="";
                        nameNew = "";
                        $rootScope.form="";
                        $scope.fullFeilds = [];
                        self.name = [];
                        self.feild = [];
                        self.type=[];
                        return
                    }
                    if (response.data === "table exist") {
                        alert( "sorry, this name is taken! please choose other")
                        $rootScope.form="";
                        return
                    }
                }, function (response) {
                    //Second function handles error
                    alert("Something went wrong");
                    return
                });
        }

        ////////////////////////////
        $scope.open = function () {

            $uibModal.open({
                templateUrl: 'myModalContent.html', // loads the template
                backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
                windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
                controller: function ($rootScope,$scope, $modalInstance, user) {
                    $scope.user = user;
                    var formNameNew = "";
                    $scope.saveName = function () {
                        if($scope.formName==""){
                            alert("you need to add name")
                            return
                        }
                        $rootScope.form = $scope.formName;
                        $scope.formName=="";
                        $modalInstance.close(); 
                    };
                    $scope.cancel = function () {
                        $rootScope.form = "";
                        
                        $modalInstance.close(); 
                    };
                    $scope.changeformName=function () {
                        formNameNew=$scope.formName;
                        console.log(formNameNew)
                    };
                },
                resolve: {
                    user: function () {
                        return $scope.user;
                    }
                }
            });//end of modal.open
        }; // end of scope.open function



        


    }])
  