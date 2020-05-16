/*:
 * @plugindesc Fixes YEP_MessageCore, by making the name window (when using \n<x>) disappear immediately, instead of after a few frames.
 * @author Ben Hendel-Doying
 *
 * @help Must be included AFTER YEP_MessageCore, of course.
 *
 * Without the fix, if you start a battle immediately after a message box that used \n<x>, the name may remain on-screen
 * throughout the combat (definitely happens if you don't have a battle background; not sure about other cases.)
 */

(function() {
    const originalYEPMessageWindowTerminateMessage = Yanfly.Message.Window_Message_terminateMessage;

    Window_Message.prototype.terminateMessage = function() {
        this._nameWindow.hide();
        originalYEPMessageWindowTerminateMessage.call(this);
    };
})();
