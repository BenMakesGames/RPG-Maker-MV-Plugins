/*:
 * @plugindesc Face positions are screwed up for me on a shorter height window; this fixes that
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

Window_MenuStatus.prototype.drawItemImage = function(index) {
    let actor = $gameParty.members()[index];
    let rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x, rect.y + rect.height - 1 - Window_Base._faceHeight, Window_Base._faceWidth, Window_Base._faceHeight);
    this.changePaintOpacity(true);
};
