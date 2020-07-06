/*:
 * @plugindesc The player always moves at dashing speed, because why wouldn't you?
 * @author Ben Hendel-Doying
 *
 * @help Disabling dashing via map settings still works. Additionally, this plugin allows
 * you to disable/enable dashing via Script instructions. To disable:
 *
 *   $gamePlayer.disableDashing();
 *
 * Dashing will remain disabled until enabled again:
 *
 *   $gamePlayer.enableDashing();
 *
 * (enableDashing does NOT override map settings.)
 *
 * The "always dash" option is removed from the options menu.
 *
 * It probably goes without saying, but this plugin is NOT compatible with
 * bentelk_DashyBoots.
 *
 * Compatibility:
 * * REPLACES Game_Player updateDashing
 * * REPLACES Window_Options addGeneralOptions
 * * ADDS Game_Player enableDashing
 * * ADDS Game_Player disableDashing
 */

Game_Player.prototype.enableDashing = function() {
    this._dashingDisabled = false;
};

Game_Player.prototype.disableDashing = function() {
    this._dashingDisabled = true;
};

Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    this._dashing = !this._dashingDisabled && this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled();
};

Window_Options.prototype.addGeneralOptions = function() {
    //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    this.addCommand(TextManager.commandRemember, 'commandRemember');
};
