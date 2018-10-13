/*:
 * @plugindesc Shows the stats I happen to be interested in on the Status and Equip screens.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 *
 * Requires RPG Maker MV 1.6.1+ (due to use of ES6 functions and syntax).
 */

(function() {
    // attack, speed, luck
    const relevantParameters = [ 2, 6, 7 ];
    const relevantXParameters = [ 1, 2, 6, 7 ];

    const xParameterLabels = [
        'Hit',
        'Dodge',
        'Crit Hit',
        'Crit Dodge',
        'Magic Dodge',
        'Magic Reflect',
        'Counterattack',
        'Health Regen',
        'Magic Regen',
        'Rage Regen',
    ];

    Window_Status.prototype.drawParameters = function(x, y) {
        const lineHeight = this.lineHeight();

        let i = 0;

        relevantParameters.forEach((paramId) => {
            let y2 = y + lineHeight * i;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(paramId), x, y2, 160);
            this.resetTextColor();
            this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
            i++;
        });

        relevantXParameters.forEach(xParamId => {
            let y2 = y + lineHeight * i;
            this.changeTextColor(this.systemColor());
            this.drawText(xParameterLabels[xParamId], x, y2, 160);
            this.resetTextColor();
            this.drawText((this._actor.xparam(xParamId) * 100).toFixed(0) + '%', x + 160, y2, 60, 'right');
            i++;
        });
    };


    Window_EquipStatus.prototype.refresh = function() {
        let lineHeight = this.lineHeight();
        this.contents.clear();
        if (this._actor) {
            this.drawActorName(this._actor, this.textPadding(), 0);

            this.drawItem(0, lineHeight * 1, 'Health', function() { return this.mhp; });
            this.drawItem(0, lineHeight * 2, 'Magic', function() { return this.mmp; });

            let i = 3;
            let _this = this;
            relevantParameters.forEach(function(paramId) { // want scope for paramId
                _this.drawItem(0, lineHeight * i, TextManager.param(paramId), function() { return this.param(paramId); });
                i++;
            });
        }
    };

    Window_EquipStatus.prototype.numVisibleRows = function() {
        return relevantParameters.length + 3;
    };

    Window_EquipStatus.prototype.drawItem = function(x, y, label, getter) {
        this.changeTextColor(this.systemColor());
        this.drawText(label, x + this.textPadding(), y, 120);

        let oldValue = getter.call(this._actor);

        if (this._actor) {
            this.drawCurrentParam(x + 140, y, oldValue);
        }

        this.drawRightArrow(x + 188, y);

        if (this._tempActor) {
            this.drawNewParam(x + 222, y, oldValue, getter.call(this._tempActor));
        }
    };

    Window_EquipStatus.prototype.drawCurrentParam = function(x, y, value) {
        this.resetTextColor();
        this.drawText(value, x, y, 48, 'right');
    };

    Window_EquipStatus.prototype.drawNewParam = function(x, y, oldValue, newValue) {
        let diffvalue = newValue - oldValue;
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, 'right');
    };

})();