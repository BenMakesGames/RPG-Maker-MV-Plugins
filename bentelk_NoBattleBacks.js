/*:
 * @plugindesc Universally disable battle backgrounds.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

Spriteset_Battle.prototype.battleback1Bitmap = function() {
    return ImageManager.loadEmptyBitmap();
};

Spriteset_Battle.prototype.battleback2Bitmap = function() {
    return ImageManager.loadEmptyBitmap();
};
