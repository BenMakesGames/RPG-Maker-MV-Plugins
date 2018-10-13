/*:
 * @plugindesc Allows you to script events which allow players to get off a vehicle into impassible terrain with Player Through ON.
 * @author Ben Hendel-Doying
 * @help
 * Ordinarily, the following event DOES NOT WORK if the player is in an airship
 * over impassable terrain (such as a mountain)
 *
 *   Set Movement Route: Player
 *                     : Through ON
 *   Get on/of Vehicle
 *   Set Movement Route: Player
 *                     : Through OFF
 *
 * By using this plugin, the above event WILL work. This can be useful for
 * scripting cutscenes that involve vehicles.
 */

(function() {
    GetOffWithMoveThrough_Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;

    Game_Vehicle.prototype.isLandOk = function(x, y, d) {
        if($gamePlayer._through)
            return true;
        else
            return GetOffWithMoveThrough_Game_Vehicle_isLandOk.call(this, x, y, d);
    };
}); 