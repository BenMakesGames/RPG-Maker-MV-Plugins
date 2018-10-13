/*:
 * @plugindesc Removes the "Optimize" and "Clear" options when changing equipment.
 * @author Ben Hendel-Doying
 *
 * @help Simplifies the equipping process by removing a step.
 */

Scene_Equip.prototype.createCommandWindow = function() {
    // do nothing
};

// switch to the _slotWindow (instead of _commandWindow, which we removed)
Scene_Equip.prototype.onActorChange = function() {
    this.refreshActor();
    this._slotWindow.activate();
    this._slotWindow.select(0);
};

// the slot window's position cannot be based on the command window anymore
Scene_Equip.prototype.createSlotWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._statusWindow.y;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = this._statusWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.popScene.bind(this)); // popScene
    this.addWindow(this._slotWindow);

    // don't know why this setTimeout is necessary. without it, the stats of the first
    // equipment are not shown until you move the cursor. if you can find a better way,
    // let me know!
    setTimeout(() => {
        this._slotWindow.activate();
        this._slotWindow.select(0);
    }, 0);
};
