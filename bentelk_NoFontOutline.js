/*:
 * @plugindesc Disables outlines on fonts.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

var _Window_Base_ResetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_ResetFontSettings.call( this );
    this.contents.outlineWidth = 0;
};
