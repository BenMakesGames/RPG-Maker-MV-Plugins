/*:
 * @plugindesc Customizes message window skins the way I happen to want them.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

Window.prototype._refreshFrame = function() {
    let w = this._width;
    let h = this._height;
    let m = 24;
    let bitmap = new Bitmap(w, h);

    this._windowFrameSprite.bitmap = bitmap;
    this._windowFrameSprite.setFrame(0, 0, w, h);

    if (w > 0 && h > 0 && this._windowskin) {
        let skin = this._windowskin;
        let p = 96;
        let q = 96;
        bitmap.blt(skin, p+m, 0, p-m*2, m, m, 0, w-m*2, m);
        bitmap.blt(skin, p+m, q-m, p-m*2, m, m, h-m, w-m*2, m);
        bitmap.blt(skin, p, m, m, p-m*2, 0, m, m, h-m*2);
        bitmap.blt(skin, p+q-m, m, m, p-m*2, w-m, m, m, h-m*2);
        bitmap.blt(skin, p, 0, m, m, 0, 0, m, m);
        bitmap.blt(skin, p+q-m, 0, m, m, w-m, 0, m, m);
        bitmap.blt(skin, p, q-m, m, m, 0, h-m, m, m);
        bitmap.blt(skin, p+q-m, q-m, m, m, w-m, h-m, m, m);

        // filling
        bitmap.blt(skin,
            p + m, m,               // source x, y
            m * 2, m * 2,           // source width, height
            m, m,                   // destination x, y
            w - m * 2, h - m * 2    // destination width, height
        );
    }
};


Window.prototype._refreshBack = function() {
    // do nothing
};
