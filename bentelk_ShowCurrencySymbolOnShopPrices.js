/*:
 * @plugindesc Shows the currency symbol in shops next to prices.
 * @author Ben Hendel-Doying
 *
 * @help That's it! (It's just good UI design!)
 */

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);

    this.drawText(
        this.price(item) + TextManager.currencyUnit, // <-- here is the change that adds the currency unit
        rect.x + rect.width - priceWidth,
        rect.y,
        priceWidth,
        'right'
    );

    this.changePaintOpacity(true);
};
