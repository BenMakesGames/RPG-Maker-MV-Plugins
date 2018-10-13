/*:
 * @plugindesc Gives greater control over the cursor blink.
 * @author Ben Hendel-Doying
 *
 * @help
 * It also uses a sine wave to control the opacity, rather than linearly
 * bouncing between its maximum and minimum opacity levels.
 *
 * Default settings create a slower pulse over a narrower range of opacity
 * levels.
 *
 * You can customize the speed of the pulse, and minimum and maximum levels of
 * opacity, by editing this plugin. Don't be afraid! It's easy! The values to
 * change are clearly labeled, and near the top of the file.
 */

Window.CURSOR_FRAME_COUNT = 60; // higher number = slower pulse
Window.CURSOR_MAX_OPACITY = 224;
Window.CURSOR_MIN_OPACITY = 96;
Window.CURSOR_INACTIVE_OPACITY = 160;

// edit only if you're adventurous and/or know JavaScript
Window.prototype._updateCursor = function()
{
    if (this.active)
    {
        let blinkCount = this._animationCount % Window.CURSOR_FRAME_COUNT;
        let wave = Math.cos(blinkCount * 2 * Math.PI / Window.CURSOR_FRAME_COUNT);
        let opacityRange = Window.CURSOR_MAX_OPACITY - Window.CURSOR_MIN_OPACITY;

        let cursorOpacity = Window.CURSOR_MAX_OPACITY - (wave + 1) / 2 * opacityRange;

        this._windowCursorSprite.alpha = cursorOpacity / 255;
    }
    else
    {
        this._windowCursorSprite.alpha = Window.CURSOR_INACTIVE_OPACITY / 255;
    }

    this._windowCursorSprite.visible = this.isOpen();
};
