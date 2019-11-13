//////////////////////////////////////////
////////////// UNNECESSARY ///////////////
//////////////////////////////////////////

/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau, app */

/* exported moreoption */

/* jshint unused: vars */

/**
 * moreoptions.js is used for moreoption winset implementation in TAU.
 * you can customize this file for custom moreoption implementation.
 */
var moreoption = (function() {
    var moreoption = {},
        page = document.querySelector("#music_player_page"),
        popup = page.querySelector("#moreoptionsPopup"),
        handler = page.querySelector(".ui-more"),
        popupCircle = page.querySelector("#moreoptionsPopupCircle"),
        elSelector = page.querySelector("#selector"),
        selector,
        clickHandlerBound;

    /**
     * Handles click event.
     * It opens the moreoption pop-up.
     * If the shape of target or emulator is circle, open the pop-up of circle shape.
     * @private
     * @param {Object} event
     */
    function clickHandler(event) {
        if (tau.support.shape.circle) {
            tau.openPopup(popupCircle);
            app.setGlobalPage("moreoption");
        } else {
            tau.openPopup(popup);
        }
    }

    /**
     * The function is executed before the moreoption page is shown.
     * Sets selector's radius in this function.
     * It handles click event about more option button.
     * So when the more option button is clicked, call the callback function(clickHandlerBound).
     * then, clickHandlerBound call clickHandler.
     * @private
     */
    function moreOptionpageBeforeShow()
    {
        var radius = window.innerHeight / 2 * 0.8;

        clickHandlerBound = clickHandler.bind(null);
        handler.addEventListener("click", clickHandlerBound);
        if (tau.support.shape.circle) {
            selector = tau.widget.Selector(elSelector, {
                itemRadius: radius
            });
        }
    }

    /**
     * The function is executed before the moreoption page is hidden.
     * @private
     */
    function moreOptionpageBeforeHide(){
        handler.removeEventListener("click", clickHandlerBound);
        if (tau.support.shape.circle) {
            selector.destroy();
        }
    }

    /**
     * When user click the indicator of Selector, drawer will close.
     * @private
     * @param {Object} event
     */
    function clickSelector(event){
        var target = event.target,
            title;

        // If classes(device-gear, device-mobile) is clicked, call setDeviceStatus function of app.js.
        if(target.classList.contains("device-gear") || target.classList.contains("device-mobile")) {
            title = target.getAttribute("data-title");
            app.setDeviceStatus(title, target);
        }

        if (tau.support.shape.circle) {

            // 'ui-selector-indicator' is default indicator class name of Selector component
            if (target.classList.contains("ui-selector-indicator")) {
                app.setGlobalPage("main");
                tau.closePopup(popupCircle);
            }
        }
    }

    /**
     * Binds events related to more option page.
     * @private
     */
    function bindEvents() {
        page.addEventListener("pagebeforeshow", moreOptionpageBeforeShow);
        page.addEventListener("pagebeforehide", moreOptionpageBeforeHide);
        elSelector.addEventListener("click", clickSelector);
    }

    window.onload = bindEvents();

    console.log("moreoptions!");
    
    return moreoption;
}());