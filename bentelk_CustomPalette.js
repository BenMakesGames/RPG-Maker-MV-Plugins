/*:
 * @plugindesc Customizes some default colors to what I happen to want them to be :P
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

(function() {
    // bitmap init

    let originalBitmapInitialize = Bitmap.prototype.initialize;

    Bitmap.prototype.initialize = function(width, height) {
        originalBitmapInitialize.call(this, width, height);

        this.textColor = '#DEEED6';
        this.outlineColor = '#140C1C';

    };

    // reset font settings

    let originalWindowBaseResetFontSettings = Window_Base.prototype.resetFontSettings;

    Window_Base.prototype.resetFontSettings = function() {
        originalWindowBaseResetFontSettings.call(this);
        this.contents.outlineColor = '#140C1C';
    };
})();

Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(15);
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(6);
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(6);
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(3);
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(3);
};

Window_Base.prototype.mpCostColor = function() {
    return this.textColor(3);
};
