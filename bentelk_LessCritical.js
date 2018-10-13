/*:
 * @plugindesc Customizes the multiplier of critical hits.
 * @author Ben Hendel-Doying
 *
 * @help By default, changes critical hits to deal +50% damage,
 * instead of TRIPLE damage! Feel free to edit this plugin to
 * change the multiplier to whatever you want.
 */

Game_Action.prototype.applyCritical = function(damage) {
    return Math.floor(damage * 1.5);
};
