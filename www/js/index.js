/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

log = function (m) {
    console.log(m);
}

var app = { // TODO: Any easier injection development strategies?
    // renderSplashView: function() {
    //     log("render splash view");
    //     var html = "<h1>Splash</h1>" +
    //     "<button id='splashToMainMenuBtn'>Go to main menu</button>";
    //     $('body').html(html);
    // },

    // renderMainMenuView: function() {
    //     log("render main menu view");
    //     var html = "<h1>Main Menu</h1>" +
    //         "<div id='mainMenuBtns'><button id='mainMenuToPlayBtn'>Play Game</button>" + 
    //         "<button id='mainMenuToHighScoresBtn'>High Scores</button>" + 
    //         "<button id='mainMenuToStoreBtn'>Store</button>" +
    //         "<button id='mainMenuToAboutBtn'>About</button><div>";
    //     $('body').html(html);
    // },

    // renderPlayGameView: function() {
    //     log("render play game view");
    //     var html = "<h1>Play Game</h1>";
    //     $('body').html(html);
    // },

    // renderHighScoresView: function() {
    //     log("render high scores view");
    //     var html = "<h1>High Scores</h1>";
    //     $('body').html(html);
    // },

    // renderStoreView: function() {
    //     log("render store view");
    //     var html = "<h1>Store</h1>";
    //     $('body').html(html);
    // },

    // renderAboutView: function() {
    //     log("render about view");
    //     var html = "<h1>About</h1>";
    //     $('body').html(html);
    // },

    // // Application Constructor
    // initialize: function() {
    //     log("initialize");
    //     this.renderSplashView();
    // },
    // // Bind Event Listeners
    // //
    // // Bind any events that are required on startup. Common events are:
    // // 'load', 'deviceready', 'offline', and 'online'.
    // bindEvents: function() {
    //     document.addEventListener('deviceready', this.onDeviceReady, false);
    // },
    // // deviceready Event Handler
    // //
    // // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // // function, we must explicitly call 'app.receivedEvent(...);'
    // onDeviceReady: function() {
    //     app.receivedEvent('deviceready');
    // },
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

// app.initialize();