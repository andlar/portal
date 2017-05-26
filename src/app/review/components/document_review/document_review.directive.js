(function () {
    'use strict';

    angular
        .module('portal.review')
        .directive('aiDocumentReview', aiDocumentReview);

    /** @ngInject */
    function aiDocumentReview($log) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/review/components/document_review/document_review.html',
            scope: {},
            controller: DocumentReviewController,
            controllerAs: 'vm',
            bindToController: {
                activeDocument: '=?'
            }
        };

        return directive;

        /** @ngInject */
        function DocumentReviewController($filter, $scope, commonService) {
            var vm = this;

            vm.cancel = cancel;
            vm.displayName = commonService.displayName;

            activate();

            ////////////////////////////////////////////////////////////////////

            function activate () {
                vm.transformedDocument = '';
                vm.displayType = 'xslt';
                vm.xslt = loadXMLDoc('assets/xslt/CDA_Style.xsl');
                $scope.$watch('vm.activeDocument', function (newDoc) {
                    if (newDoc) {
                        if (newDoc.data) {
                            vm.transformedDocument = $filter('xslt')(newDoc.data, vm.xslt);
                        } else {
                            vm.transformedDocument = $filter('xslt')(newDoc, vm.xslt);
                        }
                    }
                });
            }

            function cancel () {
                vm.activeDocument = undefined;
                vm.transformedDocument = '';
            }

            ////////////////////////////////////////////////////////////////////

            function loadXMLDoc (filename) {
                var xhttp;
//                if ($window.ActiveXObject) {
//                    xhttp = new $window.ActiveXObject('Msxml2.XMLHTTP');
//                } else {
                    xhttp = new XMLHttpRequest();
//                }
                xhttp.open('GET', filename, false);
                try { xhttp.responseType = 'msxml-document' } catch(err) { $log.debug(err) } // Helping IE11
                xhttp.send('');
                return xhttp.responseText;
            }

            ////////////////////////////////////////////////////////////////////
            // fake stuff; remove after CCD-A's validated
            ////////////////////////////////////////////////////////////////////

            vm.loadFakeXmlDocument = loadFakeXmlDocument;
            vm.viewAll = viewAll;
            vm.fakeDocuments = [
                {name: 'Brett.xml'},{name: 'Bruce.xml'},{name: 'CCDA_CCD_PulseDrillPt1.xml'},{name: 'CCDA_CCD_PulseDrillPt10.xml'},{name: 'CCDA_CCD_PulseDrillPt2.xml'},{name: 'CCDA_CCD_PulseDrillPt3.xml'},{name: 'CCDA_CCD_PulseDrillPt4.xml'},{name: 'CCDA_CCD_PulseDrillPt5.xml'},{name: 'CCDA_CCD_PulseDrillPt6.xml'},{name: 'CCDA_CCD_PulseDrillPt7.xml'},{name: 'CCDA_CCD_PulseDrillPt8.xml'},{name: 'CCDA_CCD_PulseDrillPt9.xml'},{name: 'Demo Zztestsfm.xml'},{name: 'Gamora Marvel.xml'},{name: 'Harley Quinn.xml'},{name: 'Iam Groot.xml'},{name: 'Jacen Solo.xml'},{name: 'Julie.xml'},{name: 'Mccchp.Tapanna.xml'},{name: 'Mccchp.Taptanner.xml'},{name: 'OCPRHIO PatientZero.xml'},{name: 'Rocket Raccoon.xml'},{name: 'Stevie.xml'},{name: 'Three Ccdtest.xml'},{name: 'Two Ccdtest.xml'},{name: 'Wonder Woman.xml'},{name: 'Zztest Gm.Daisy.xml'},{name: 'Zztest.Adult.xml'},{name: 'Zztest.Alana.xml'},{name: 'Zztest.Bobafett.xml'},{name: 'Zztest.Jennifer.xml'},{name: 'Zztest.Pamf Ppo.xml'},{name: 'Zztest.Ronnie.xml'},{name: 'Zztest.Viking - Copy.xml'},{name: 'Zztest.Viking.xml'},{name: 'tina.xml'},
            ];

            function loadFakeXmlDocument () {
                vm.activeDocument = loadXMLDoc('assets/xmls/' + vm.fakeDocument.name);
            }

            function viewAll () {
                vm.allFakeDocuments = [];
                for (var i = 0; i < vm.fakeDocuments.length; i++) {
                    var doc = loadXMLDoc('assets/xmls/' + vm.fakeDocuments[i].name);
                    vm.allFakeDocuments.push($filter('xslt')(doc, vm.xslt));
                }
            }
        }
    }
})();
