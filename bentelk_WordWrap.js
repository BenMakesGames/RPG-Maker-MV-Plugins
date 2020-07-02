/*:
 * @plugindesc Adds simple word wrap functionality.
 * @author Ben Hendel-Doying
 *
 * @help If you DON'T want everything YEP_MessageCore adds, but DO want basic word wrap,
 * then this plugin is for you.
 *
 * This plugin is NOT compatible with YEP_MessageCore; if you love YEP_MessageCore,
 * then just don't use this plugin :P
 */

const originalWindowBaseProcessNormalCharacter = Window_Base.prototype.processNormalCharacter;

Window_Base.prototype.processNormalCharacter = function(textState) {
    if (this.checkWordWrap(textState))
        return this.processNewLine(textState);

    originalWindowBaseProcessNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
    if (!textState)
        return false;

    if(this.calculatingTextWidth)
        return false;

    if (textState.text[textState.index] !== ' ')
        return false;

    var nextSpace = textState.text.indexOf(' ', textState.index + 1);
    var nextBreak = textState.text.indexOf('\n', textState.index + 1);
    if (nextSpace < 0) nextSpace = textState.text.length + 1;
    if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
    const word = textState.text.substring(textState.index, nextSpace);
    const size = this.textWidthExCheck(word);

    return size + textState.x > this.getWordWrapWidth();
};

Window_Base.prototype.textWidthExCheck = function(text) {
    var window = new Window_Base(-1000, 0, 1000, 50);

    window.calculatingTextWidth = true;

    return window.drawTextEx(text, 0, 0);
};

Window_Base.prototype.setWordWrapWidth = function(width) {
    this.wordWrapWidth = width;
};

Window_Base.prototype.resetWordWrapWidth = function() {
    this.wordWrapWidth = null;
};

Window_Base.prototype.getWordWrapWidth = function() {
    return this.wordWrapWidth ? this.wordWrapWidth : this.contents.width;
};
