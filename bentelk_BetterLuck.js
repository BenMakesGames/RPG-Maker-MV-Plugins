/*:
 * @plugindesc Changes how Luck is used by the engine
 * @author Ben Hendel-Doying
 *
 * @help With this plugin enabled, luck no longer effects item uses; instead,
 * it provides a bonus (or penalty) to the gold earned at the end of each combat.
 * Every point of luck ABOVE 100 gives +1% gold; every point BELOW 100 gives -1%.
 * For example, a party member with 90 luck means you get -10% gold. A party
 * member with 163 luck means you get +63% gold. These add together, so if you
 * had both of the above members in your party, you'd get +53% gold. Finally:
 * if you have the "double gold" skill in your party, it adds +100% gold, so if
 * you had both of the above members in your party, and any (or both) of them
 * had "double gold", you would get +153% gold from battles.
 */

// === remove the existing lukEffectRate =====================================

Game_Action.prototype.lukEffectRate = function(target) {
    return 1;
};

// === every point of luck over 100 = +1% gold; every point blow = -1% =======

Game_Troop.prototype.goldTotal = function() {
    let baseGold = this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.gold();
    }, 0);

    let multiplier = this.goldRate();
    
    return Math.floor(baseGold * multiplier);
};

Game_Troop.prototype.goldRate = function() {
    let multiplier = 1;
    
    if($gameParty.hasGoldDouble())
        multiplier++;

    let percentIncrease = $gameParty.members().reduce(function(r, actor) {
        return r + (actor.luk - 100);
    }, 0);
    
    multiplier += percentIncrease / 100;
    
    if(multiplier < 0)
        multiplier = 0;
    
    return multiplier;
};
