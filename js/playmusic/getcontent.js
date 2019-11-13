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

/* exported getcontent */

/**
 * Getcontent.js file handles audio file.
 * It get audio file information and save them.
 */
var getcontent = (function() {
    var getcontent = {},
        refreshed = false,                     // Refresh status variable about find content.

        // AttributeFilter(DOMString attributeName, optional FilterMatchFlag? matchFlag, optional any matchValue);
        filter = new tizen.AttributeFilter(
            'type',
            'EXACTLY',
            'AUDIO'
        ),

        // SortMode(DOMString attributeName, optional SortModeOrder? order);
        sortMode = new tizen.SortMode(
            'title',
            'ASC'
        ),
        musicPlayList = [];                    // Sets musicPlayList array to music informations.

    /**
     * If the item(audio file information) is searched, this function executes.
     * @private
     * @param {Object} items
     */
    function contentFindSuccess(items) {
        var length = items.length,    // item's length.
            i = 0,
            item = null;

        // Fill musicPlayList array with new audio file's information.
        for (i = 0; i < length; i += 1) {
            item = items[i];

            // Push musicPlayList array this information.
            musicPlayList.push({
                'albumName' : item.album,                      // music album name.
                'artistName' : item.artists,                   // music artist name.
                'titleName' : item.title,                      // music title name.
                'fileName' : item.name,                        // music file name (except for the extension).
                'duration' : item.duration,                    // music total play time.
                'musicFilePath' : item.contentURI,             // music file path.
                'thumbnailFilePath' : item.thumbnailURIs[0]    // music thumbnail path.
            });
        }
        refreshed = true;
    }

    /**
     * If there is an error while finding the audio file, display warn message.
     * @private
     * @param {Object} event
     */
    function contentFindError(event) {
        console.warn('Content API find() failed!', event);
    }

    /**
     * Returns musicPlayList object.
     * @public
     * @return {Object} musicPlayList has each music informations.(title name, artist and so on)
     */
    getcontent.getMusicPlayList = function getMusicPlayList() {
        return musicPlayList;
    };

    /**
     * Returns refreshed variable.
     * @public
     * @return {Boolean} refreshed - true for find content
     */
    getcontent.getRefreshed = function getRefreshed() {
        return refreshed;
    };

    /**
     * Finds music content using content api using Success and Error callback function, filter and sortMode.
     * @public
     */
    getcontent.refreshMusics = function refreshMusics() {
        refreshed = false;
        try {
            tizen.content.find(
                contentFindSuccess,
                contentFindError,
                null,
                filter,
                sortMode
            );
        } catch (error) {
            console.error("Content Find ERROR: ", error.message);
        }
    };

    console.log("getcontent!");
    
    return getcontent;
}());
