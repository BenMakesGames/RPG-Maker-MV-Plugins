/*:
 * @plugindesc Lets you give items colors.
 * @author Ben Hendel-Doying
 *
 * @help To color an item, put the following text in that item's notes:
 *
 *   <color: 1>
 *
 * You can replace the 1 with any number you want, from 0 to 31. this uses the
 * colors in the game's palette; the same colors you get from using the \C
 * code in messages.
 *
 * This plugin replaces the Window "drawItemName" method; it may not be
 * compatible with other plugins that modify that method. If you encounter a
 * conflict with another plugin, placing THIS plugin closer to the top of your
 * plugin list MAY help.
 */

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;

        if (item.meta.color)
            this.changeTextColor(this.textColor(Number.parseInt(item.meta.color)));
        else
            this.resetTextColor();

        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};
