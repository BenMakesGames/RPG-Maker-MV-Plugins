/*:
 * @plugindesc Draws all events which are marked "Walking" up a few pixels.
 *
 * @author Ben Hendel-Doying
 *
 * @param Y Offset
 * @desc The number of pixels to pull up Walking events (includes players).
 * @default 22
 */

(function() {
    const parameters = PluginManager.parameters('bentelk_RecenterCharacterFeet');

    const walkerYOffset = parseInt(String(parameters['Y Offset']));

    const originalShiftY = Game_CharacterBase.prototype.shiftY;

    Game_CharacterBase.prototype.shiftY = function() {

        if(this.hasWalkAnime())
            return walkerYOffset;

        return originalShiftY.call(this);
    };
})();
