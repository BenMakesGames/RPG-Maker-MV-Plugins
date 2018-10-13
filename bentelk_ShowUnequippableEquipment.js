/*:
 * @plugindesc Shows unequippable equipment in the equip screen.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

(function() {
    let oldWindowEquipItemIncludes = Window_EquipItem.prototype.includes;

    Window_EquipItem.prototype.includes = function(item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
            return false;
        }
        return true;
    };

    Window_EquipItem.prototype.isEnabled = function(item) {
        return oldWindowEquipItemIncludes.call(this, item);
    };
})();
