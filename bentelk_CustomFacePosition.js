/*:
 * @plugindesc Places message box faces where I happen to want them.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

function BenTelk_Custom_Face() {
    this.initialize.apply(this, arguments);
    this.setBackgroundType(2);
}

BenTelk_Custom_Face.prototype = Object.create(Window_Base.prototype);
BenTelk_Custom_Face.prototype.constructor = BenTelk_Custom_Face;

BenTelk_Custom_Face.prototype.initialize = function(messageWindow) {
    Window_Base.prototype.initialize.call(this, 0, messageWindow.y - 141, 180, 180);
    this.padding = 0;
};

BenTelk_Custom_Face.prototype.drawMessageFace = function() {
    this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
};

(function() {
    Window_Message.prototype.drawMessageFace = function() {
        this._customFace.drawMessageFace();
        ImageManager.releaseReservation(this._imageReservationId);
    };

    Window_Message.prototype.newLineX = function() {
        return 0;
    };

    let oldCreateSubWindows = Window_Message.prototype.createSubWindows;

    Window_Message.prototype.createSubWindows = function() {
        oldCreateSubWindows.call(this);
        this._customFace = new BenTelk_Custom_Face(this);
        this.addChild(this._customFace);
    };

    let oldTerminateMessage = Window_Message.prototype.terminateMessage;

    Window_Message.prototype.terminateMessage = function() {
        oldTerminateMessage.call(this);
        this._customFace.contents.clear();
        this.close();
        this._goldWindow.close();
        $gameMessage.clear();
    };

})();
