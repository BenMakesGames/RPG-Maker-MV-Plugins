/*:
 * @plugindesc Completely customize experience requirements per level.
 * @author Ben Hendel-Doying
 *
 * @help By default, changes the experience requirement to:
 *    5 x level x (level - 1)
 * Edit this plugin to suit your needs.
 */

Game_Actor.prototype.expForLevel = function(level) {
    return 5 * level * (level - 1);
};
