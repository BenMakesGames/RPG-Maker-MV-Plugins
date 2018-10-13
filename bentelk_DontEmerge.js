/*:
 * @plugindesc Gets rid of the "X emerge!" text at the start of battle, because fuck that noise.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */


BattleManager.displayStartMessages = function() {
    /*$gameTroop.enemyNames().forEach(function(name) {
        $gameMessage.add(TextManager.emerge.format(name));
    });*/
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};
