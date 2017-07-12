/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  // Chapter 5 Using Your Data
  function usingYourData() {
    var dataset = [ 5, 10, 15, 20, 25 ];

    d3.select("body").selectAll("p")
      .data(dataset)
      .enter()
      .append("p")
      .text( function(d) { 
        return d 
      });
  }

  // Chapter 5 Setting Styles
  function settingStyles() {
    var dataset = [ 5, 10, 15, 20, 25 ];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar-05")
      .style('height', function(d) {
        return (d * 5) + 'px';
      });
  }

  function randomData() {
    var dataset = [];                         //Initialize empty array
    for (var i = 0; i < 25; i++) {            //Loop 25 times
        var newNumber = Math.random() * 30;   //New random number (0-30)
        dataset.push(newNumber);              //Add new number to array
    }

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar-05")
      .style('height', function(d) {
        return (d * 5) + 'px';
      });
  }

  function dataDrivenShapes() {
    const w = 500;
    const h = 50;
    const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
    const dataset = [ 5, 10, 15, 20, 25 ];
    
    const circles = svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

    circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
       .attr("cy", h/2)
       .attr("r", function(d) {
            return d;
       });
  }

  function newBarChart() {
    const w = 500;
    const h = 200;
    const p = 1;
    const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
    
    const dataset = []; //Initialize empty array
    for (var i = 0; i < 25; i++) { //Loop 25 times
        var newNumber = Math.random() * 30; //New random number (0-30)
        dataset.push(newNumber); //Add new number to array
    }

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * (w / dataset.length); 
      })
      .attr('y', function(d) {
        return h - (d * 4);
      })
      .attr('width', (w / dataset.length - p))
      .attr('height', function(d) {
        return d * 4;
      })
      .attr('fill', 'teal');
  }

  // usingYourData();
  // settingStyles();
  // randomData();
  // dataDrivenShapes();
  // newBarChart();

})();
