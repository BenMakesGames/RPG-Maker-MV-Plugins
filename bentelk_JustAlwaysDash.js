/*:
 * @plugindesc The player always moves at dashing speed, because why wouldn't you?
 * @author Ben Hendel-Doying
 *
 * @help
 * The "always dash" option is removed from the options menu.
 *
 * It probably goes without saying, but this plugin is NOT compatible with
 * bentelk_DashyBoots.
 */

Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    this._dashing =  this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled();
};

Window_Options.prototype.addGeneralOptions = function() {
    //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    this.addCommand(TextManager.commandRemember, 'commandRemember');
};
