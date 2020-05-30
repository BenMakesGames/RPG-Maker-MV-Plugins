/*:
 * @plugindesc Allows the addition of an additional fixed picture between the parallax and tilemap
 * @author Ben Hendel-Doying
 *
 * @help
 * Example use:
 *
 *   $gameMap.setFixedPictureBelowMap('image-name-here');
 *
 * The named image must exist in your game's img/pictures directory.
 *
 * You can also set a hue, position, and/or size. If any values are not
 * specified, a default is used (described below).
 *
 *   $gameMap.setFixedPictureBelowMap('image-name-here', {
 *     hue: 180,
 *     x: 40,
 *     y: 20,
 *     width: 64,
 *     height: 64
 *   });
 *
 * Option   Default             Description
 * ------------------------------------------------------------------------------------
 * hue      0                   number of degrees from 0 to 360
 * x        0                   position on the screen to place the image
 * y        0                   ^
 * width    width of screen     width of the image; if larger than the image, it tiles
 * height   height of screen    height of the image; ^
 *
 * Finally, to clear the picture (which will persist from map to map):
 *
 *   $gameMap.clearFixedPictureBelowMap();
 */

(function() {

    let originalSpritesetMapCreateParallax = Spriteset_Map.prototype.createParallax;

    Spriteset_Map.prototype.createParallax = function() {
        originalSpritesetMapCreateParallax.call(this);

        this._fixedPictureBelowMapSprite = new TilingSprite();
        this._fixedPictureBelowMapSprite.move(0, 0, Screen.width, Screen.height);

        this._baseSprite.addChild(this._fixedPictureBelowMapSprite);
    };

    let originalSpritesetMapUpdateParallax = Spriteset_Map.prototype.updateParallax;

    Spriteset_Map.prototype.updateParallax = function() {
        originalSpritesetMapUpdateParallax.call(this);

        if (this._fixedPictureBelowMap !== $gameMap._fixedPictureBelowMap)
        {
            this._fixedPictureBelowMap = $gameMap._fixedPictureBelowMap;

            if(this._fixedPictureBelowMap)
            {
                this._fixedPictureBelowMapSprite.bitmap = ImageManager.loadPicture(this._fixedPictureBelowMap.filename, this._fixedPictureBelowMap.hue);

                this._fixedPictureBelowMapSprite.move(
                    this._fixedPictureBelowMap.x,
                    this._fixedPictureBelowMap.y,
                    this._fixedPictureBelowMap.width,
                    this._fixedPictureBelowMap.height
                );
            }
            else
                this._fixedPictureBelowMapSprite.bitmap = null;
        }
    };

    Game_Map.prototype.setFixedPictureBelowMap = function(filename, options) {
        options = options || {};

        this._fixedPictureBelowMap = {
            filename: filename,
            hue: options.hue || 0,
            x: options.x || 0,
            y: options.y || 0,
            width: options.width || Graphics.width,
            height: options.height || Graphics.height
        };
    };

    Game_Map.prototype.clearFixedPictureBelowMap = function() {
        this._fixedPictureBelowMap = null;
    };

})();
