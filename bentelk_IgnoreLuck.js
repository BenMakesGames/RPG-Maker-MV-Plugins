/*:
 * @plugindesc Ignores the LUK attribute.
 * @author Ben Hendel-Doying
 *
 * @help By default, LUK makes it possible for characters to avoid status effects.
 * If you don't like that, use this plugin :P
 *
 * Compatibility:
 * * REPLACES Game_Action lukEffectRate
 */

// === remove the existing lukEffectRate =====================================

Game_Action.prototype.lukEffectRate = function(target) {
    return 1;
};
