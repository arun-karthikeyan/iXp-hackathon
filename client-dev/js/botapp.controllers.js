'use strict';

angular.module('botapp', [])
.controller("bot-controller", function($scope)  {
    $scope.currentFormText = '';
    $scope.messages = [{isTicky: true, isUser: false, text: 'Hi there, How may I help you today ?', time: new Date().getTime()}];
    $scope.tryTicky = function(){
      $('#tickey-desc').css('display','none');
      $('#tickey-chat').css('display','block');
    };
    var socket = window.io.connect("http://localhost:5000");
    socket.on("response", function(data)    {
        var newMessageObj = {isTicky: true, isUser: false, text: JSON.parse(data).text, time: new Date().getTime()};
        $scope.messages.push(newMessageObj);
        $scope.$apply();
    });
    $scope.sendUserMessage = function() {
      if($scope.currentFormText.trim().length!=0)
      {
      var newMessageObj = {isTicky: false, isUser: true, text: $scope.currentFormText, time: new Date().getTime()};
      $scope.messages.push(newMessageObj);
      socket.emit("message", $scope.currentFormText);
      $scope.currentFormText = '';
      }
    };
});
