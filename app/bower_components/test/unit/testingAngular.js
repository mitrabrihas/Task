describe('controllers',function () {

  beforeEach(module('tweetTimeLine'));

describe('listControl',function () {
  var $controller,shareUserDataService;

  beforeEach(inject(function (_shareUserDataService_) {
    shareUserDataService=_shareUserDataService_;
  }));

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_)
    $controller = _$controller_;
  }));

  it('will test listControl options field',function () {
  var $scope={};
  var controller=$controller('listControl', { $scope: $scope });

    $scope.options=['mitrabrihas', 'ESPNcricinfo', 'SproutSocial'];
    expect($scope.options).toEqual(['mitrabrihas', 'ESPNcricinfo', 'SproutSocial']);

  });

  it('will test the setUserInService of the controller ',function () {
    var $scope={};
    var controller=$controller('listControl', { $scope: $scope });
    $scope.setUserInService('ESPNcricinfo');
    expect($scope.user.username).toEqual('ESPNcricinfo');
  });

});

describe('userControl',function () {
  var $controller,shareUserDataService,tweetsService,sortTweetsFilter;

  beforeEach(inject(function (_$controller_) {
      $controller=_$controller_;
  }));

  beforeEach(inject(function (_shareUserDataService_,_tweetsService_) {
    shareUserDataService=_shareUserDataService_;
    tweetsService=_tweetsService_;
  }));

  it('will test controller variables',function () {
    var $scope={};
    var controller=$controller('userControl',{$scope:$scope});
    tweetsService.getTweets('ESPNcricinfo');
    expect($scope.tweets).toBeUndefined();
  });
});

});
