/*:
 * @plugindesc Replaces dashing with an item that increases your move speed.
 * @author Ben Hendel-Doying
 *
 * @help
 * The ALWAYS DASH option is removed from the game, and dashing by holding
 * SHIFT is no longer possible.
 *
 * If the party's inventory contains the "Dashy Boots" item, then the party
 * dashes UNLESS they hold SHIFT.
 *
 * @param Dashy Boots Item
 * @type item
 * @desc The item which enables dashing.
 * @default 38
 */

(function() {
    let dashyBootsItemId = Number(PluginManager.parameters('bentelk_DashyBoots')['Dashy Boots Item']);

    Game_Player.prototype.updateDashing = function() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = $gameParty.hasItem($dataItems[dashyBootsItemId]) && !this.isDashButtonPressed();
        } else {
            this._dashing = false;
        }
    };

    Game_Player.prototype.isDashButtonPressed = function() {
        return Input.isPressed('shift');
    };


    Window_Options.prototype.addGeneralOptions = function() {
        //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
        this.addCommand(TextManager.commandRemember, 'commandRemember');
    };
})();
