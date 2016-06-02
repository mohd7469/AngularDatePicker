/**
 * Created by Awai  S on 5/20/2016.
 */
(function () {

    'use strict';


    angular
        .module('modalTest', [
            'ui.bootstrap',
            'dialogs.main'
        ])
        .controller('dialogTestCtrl', function ($scope, dialogs) {
            $scope.data = { dt: new Date() };
            $scope.launch = function () {
                var dlg = dialogs.create('/dialogs/custom.html', 'customDialogCtrl', $scope.data);
                dlg.result.then(function (data) {
                    $scope.data = data;
                });
            };
        })
        .controller('customDialogCtrl', function ($log, $scope, $modalInstance, data) {
            $scope.data = data;
            $scope.opened = false;
            $scope.$watch('data.dt', function (val, old) {
                $log.info('Date Changed: ' + val);
                $scope.opened = false;
            });
            $scope.setDate = function () {
                if (!angular.isDefined($scope.data.dt))
                    $scope.data.dt = new Date();
            };
            $scope.setDate();
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };
            $scope.done = function () {
                $modalInstance.close($scope.data);
            };
        })
        .config(function (dialogsProvider) {
            dialogsProvider.useBackdrop(true);
            dialogsProvider.useEscClose(true);
            dialogsProvider.useCopy(false);
            dialogsProvider.setSize('sm');
        })
        .run(function ($templateCache) {
            $templateCache.put('/dialogs/custom.html', '<div class="modal-header"><h4 class="modal-title">Date Picker Test</h4></div><div class="modal-body"><p class="input-group"><input type="text" class="form-control" datepicker-popup="dd-MMMM-yyyy" ng-model="data.dt" datepicker-mode="year" is-open="opened" show-button-bar="false" /><span class="input-group-btn"><button class="btn btn-default" ng-click="open($event)"><span class="glyphicon glyphicon-calendar"></span></button></span></p></div><div class="modal-footer"><button class="btn btn-default" ng-click="done()">Done</button></div>');
        });


})();