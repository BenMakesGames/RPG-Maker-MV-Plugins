/*:
 * @plugindesc Prevents MOG_PartyHud's hud from hiding when dialog pops up.
 * @author Ben Hendel-Doying
 *
 * @help Just a super-simple mod to MOG_PartyHud.
 */

PartyHud.prototype.needHide = function() {
    return false;
};
