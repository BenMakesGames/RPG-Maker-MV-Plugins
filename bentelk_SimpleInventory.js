/*:
 * @plugindesc Removes item categories from various screens (see description)
 * @author Ben Hendel-Doying
 *
 * @help
 * When managing your inventory, all items are in one group. This completely
 * removes the category-selection step of inventory management. Window sizes
 * are adjusted accordingly.
 *
 * The same is applied to shops: no inventory categories.
 */

// === Party Inventory =======================================================

// no category window
Scene_Item.prototype.createCategoryWindow = function() {
};

// item window's position is based on the help window, and not the category
// window
Scene_Item.prototype.createItemWindow = function() {
    var wy = this._helpWindow.y + this._helpWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);

    // start with this window active
    this._itemWindow.refresh();
    this._itemWindow.resetScroll();
    this._itemWindow.activate();
    this._itemWindow.select(0);
};

// backing out of the item window pops the scene
Scene_Item.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this.popScene();
};

// the item list can contain ANY item
Window_ItemList.prototype.includes = function(item) {
    return true;
};

// === Selling Inventory at a Shop ===========================================

// again: no category window
Scene_Shop.prototype.createCategoryWindow = function() {
};

// again: item window's position is based on the help window, and not the
// category window...
Scene_Shop.prototype.createSellWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this.addWindow(this._sellWindow);
};

// don't show the category window when choosing to sell
Scene_Shop.prototype.commandSell = function() {
    this._dummyWindow.hide();
    this._sellWindow.refresh();
    this._sellWindow.show();
    this._sellWindow.activate();
    this._sellWindow.select(0);
};

// when cancelling selling, back out to the main shop menu
Scene_Shop.prototype.onSellCancel = function() {
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    this._sellWindow.deselect();
    this._sellWindow.hide();
    this._commandWindow.activate();
    this._dummyWindow.show();
};

// replace "Cancel" option in store with "Leave"
Window_ShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy,    'buy');
    this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
    this.addCommand('Leave', 'cancel');
};

Scene_Shop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    //this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    this._statusWindow.setItem(this._item);
    this._statusWindow.show();
};

Scene_Shop.prototype.activateSellWindow = function() {
    //this._categoryWindow.show();
    this._sellWindow.refresh();
    this._sellWindow.show();
    this._sellWindow.activate();
    this._statusWindow.hide();
};
