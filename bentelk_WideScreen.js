/*:
 * @plugindesc Makes some changes that are appropriate for 16:9 resolutions.
 * @author Ben Hendel-Doying
 *
 * @help
 * By default, assumes a resolution of 960x520. If you'd like to change this,
 * edit this plugin. The numbers are near the top, and clearly labeled.
 *
 * Don't forget to edit your game's "package.json" file to match!
 */

// don't forget to set the width and height properties of the project's package.json file to match!
SceneManager._screenWidth       = 960;
SceneManager._screenHeight      = 520;
SceneManager._boxWidth          = 960;
SceneManager._boxHeight         = 520;

(function() {
    const GAUGE_LABEL_MAX_WIDTH = 88;
    const CHARACTER_LEVEL_WIDTH = 120;

    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var x2 = x + 220; // bumped this up from 180 to 220 (on next line, too)
        var width2 = width - 220 - this.textPadding(); // also, got rid of Math.min here
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x, y + lineHeight * 1);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y);
        this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
        this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    };

    Window_Base.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, CHARACTER_LEVEL_WIDTH - 36);
        this.resetTextColor();
        this.drawText(actor.level, x + CHARACTER_LEVEL_WIDTH, y, 36, 'right');
    };

    Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, GAUGE_LABEL_MAX_WIDTH);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
            this.hpColor(actor), this.normalColor());
    };

    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, GAUGE_LABEL_MAX_WIDTH);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
            this.mpColor(actor), this.normalColor());
    };
})();
