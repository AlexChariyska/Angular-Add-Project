app.controller('AdminController', function AdminController($scope, $http, adsData, $route, $rootScope) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	 adsData.getAdminAds(
	        function (data, status, headers, config) {
	            $scope.ads = data.ads;
	            $scope.filteredAds = [],
	                $scope.currentPage = 1,
	                $scope.numPerPage = 4,
	                $scope.maxSize = 5,
	                $scope.bigTotalItems = data.numItems;

	            $scope.numPages = function () {
	                return Math.ceil($scope.ads.length / $scope.numPerPage);
	            };

	            $scope.$watch('currentPage + numPerPage', function () {
	                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	                    , end = begin + $scope.numPerPage;

	                $scope.filteredAds = $scope.ads.slice(begin, end);

	            });
	        },
	        function (error, status, headers, config) {
	            notyError();
	        }
	    );

	$scope.approve = function(id){
		adsData.approveAd(id, 
				function (data, status, headers, config) {
		           notySuccess('approved the ad!');
		           $route.reload();
		        },
		        function (error, status, headers, config) {
		            notyError()
		        });
	}

	$scope.reject = function(id){
	adsData.rejectAd(id, 
			function (data, status, headers, config) {
	           notySuccess('rejected the ad!');
	           $route.reload(); 
	        },
	        function (error, status, headers, config) {
	            notyError()
	        });
	}

function notyError(){
         noty({
               text: 'Something went wrong, try again!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'error',
               timeout:2000
            });
    };

function notySuccess(message){
 noty({
       text: 'Well done, you have successfully ' + message,
       layout: 'topCenter',
       closeWith: ['click', 'hover'],
       type: 'success',
       timeout:2000
    });
	};
});