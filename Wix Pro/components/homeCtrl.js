angular.module('formBuildApp')    
.controller('homeCtrl', ['$rootScope','$scope', '$http', '$location', function ($rootScope,$scope, $http, $location,someData) {

        var self = this; 
        let serverUrl = 'http://localhost:3000/'
        self.allForms= "";

        self.getForms=function(){
            $http.get(serverUrl + "forms").then(function (response) {
            if(response.data!="there is no tables yet"){
            console.log(response.data)
           self.allForms = response.data
                }
        }, function (response) {
            
        }
          );
        }



        self.goTo=function(id){
            console.log(id)
            $location.path('/form/'+id)
        }  

        self.goTo2=function(id){
            console.log(id)
            $location.path('/formSub/'+id)
        }  

        self.goTo3=function(id){
            
            $location.path('/builder')
        }  
        
        self.getNum=function(formName){
            self.number = formName
        }  

       

       
    }]);

