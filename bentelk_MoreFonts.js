/*:
 * @plugindesc Loads additional fonts from the /fonts/ dir, and lets you change a message's font.
 * @author Ben Hendel-Doying
 *
 * @help To load additional fonts, modify this plugin (instructions are inside).
 *
 * To change the font face used by message windows, make the following Script call:
 *
 *    Window_Message.FONT_FACE = 'SomeOtherFont';
 *
 * To reset back to the system default:
 *
 *    Window_Message.FONT_FACE = null;
 *
 * You can customize the default font size as well, for example:
 *
 *    Window_Message.FONT_SIZE = 14;
 *
 * And, again, you can reset it by setting FONT_SIZE to null.
 *
 * Compatibility:
 *
 * * EXTENDS Graphics _createGameFontLoader
 * * ADDS Window_Message standardFontFace
 * * ADDS Window_Message FONT_FACE
 * * ADDS Window_Message FONT_SIZE
 */

// edit this list to load more fonts:
const ADDITIONAL_FONTS = [
    'MapFont',
];

(function() {

    const originalGraphicsCreateGameFontLoader = Graphics._createGameFontLoader;

    Graphics._createGameFontLoader = function() {
        originalGraphicsCreateGameFontLoader.call(this);

        ADDITIONAL_FONTS.forEach(font => {
            this._createFontLoader(font);
        });
    };

    Window_Message.FONT_FACE = null;
    Window_Message.FONT_SIZE = null;

    Window_Message.prototype.standardFontFace = function() {
        if(Window_Message.FONT_FACE)
            return Window_Message.FONT_FACE;
        else
            return Window_Base.prototype.standardFontFace();
    };

    Window_Message.prototype.standardFontSize = function() {
        if(Window_Message.FONT_SIZE)
            return Window_Message.FONT_SIZE;
        else
            return Window_Base.prototype.standardFontSize();
    };
})();
