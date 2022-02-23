/*:
 * @plugindesc Requires bentelk_DashyBoots and SAN_AnalogMove. Makes the two plugins
 * play nice together.
 *
 * @help
 * This plugin makes bentelk_DashyBoots work with SAN_AnalogMove. You only
 * need this plugin if you're using both of those plugins.
 *
 * This plugin must be placed AFTER the other two.
 *
 * @param Dashy Boots Speed
 * @type number
 * @decimals 2
 * @desc Additional movement speed with Dashy Boots.
 * @default 0.75
*/

(function() {
    let dashyBootsItemId = Number(PluginManager.parameters('bentelk_DashyBoots')['Dashy Boots Item']);
    let dashyBootsSpeed = Number(PluginManager.parameters('bentelk_DashyBoots_SAN_AnalogMove')['Dashy Boots Speed']);

    Game_Player.prototype.updateAnalogDashing = function() {
        this._dashing = (
            this.canMove() &&
            !this.isInVehicle() &&
            !$gameMap.isDashDisabled() &&
            $gameParty.hasItem($dataItems[dashyBootsItemId]) &&
            !this.isDashButtonPressed()
        );
    };

    Game_CharacterBase.prototype.realMoveSpeed = function() {
        return this._moveSpeed + (this.isDashing() ? dashyBootsSpeed : 0);
    };
})();
