/*:
 * @plugindesc Disables the blur effect when menus are opened.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

SceneManager.snapForBackground = function() {
    this._backgroundBitmap = this.snap();

    // this is what the game usually does:
    //this._backgroundBitmap.blur();

    // if you want to replace this with something else (a dimming effect? something more-exotic?) this is the place to do it.
};
