/*:
 * @plugindesc When renaming an Actor, a label can be shown above the name.
 *
 * @help By default, the text "Enter a name" will be shown. But you probably want to
 * show something cool, like, "A renowned knight" or "A spoony bard", etc.
 *
 * To do that, before invoking the name entry window, add a script block
 * containing, for example:
 *
 *    Window_NameEdit.setTitle("A renowned knight")
 *
 * You can use codes like \N[1], \{, etc, in this title, so the following will
 * also work:
 *
 *    Window_NameEdit.setTitle("\\N[1]'s faithful steed")
 *
 * (Note the double \\. This required by JavaScript. Sorry.)
 *
 * Compatibility:
 *
 * * REPLACES Window_NameEdit refresh
 * * REPLACES Window_NameEdit itemRect
 */

Window_NameEdit.TITLE = 'Enter a name';

Window_NameEdit.setTitle = function(title) {
    this.TITLE = title;
};

Window_NameEdit.prototype.refresh = function() {
    this.contents.clear();

    this.drawActorFace(this._actor, 0, 0);

    this.drawTextEx(Window_NameEdit.TITLE, this.left(), 0);

    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_NameEdit.prototype.itemRect = function(index) {
    return {
        x: this.left() + index * this.charWidth(),
        y: this.y + this.lineHeight() + 8,
        width: this.charWidth(),
        height: this.lineHeight()
    };
};
