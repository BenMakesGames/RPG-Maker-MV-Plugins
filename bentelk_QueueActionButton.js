/*:
 * @plugindesc Allows players to press the action button while moving to a new tile.
 * @author Ben Hendel-Doying
 *
 * @help
 * Normally, if a player presses the action button WHILE moving to a new tile,
 * that press is completely ignored. If an unwitting player happens to press
 * the action button just a couple frames before arriving to the tile, they may
 * think that their action WAS received, and conclude that there's nothing to
 * do on the target tile, even though there totally may be!
 *
 * This plugin solves that problem by allowing a player to "queue" the action
 * button press. If it's pressed while the player is moving, the press will be
 * remembered and checked once the player has stopped moving.
 *
 * Happy side-effect 1: this also allows players to queue getting on or off a
 * vehicle while moving.
 *
 * Happy side-effect 2: speed-runners seem to like queueing button presses :P
 * This plugin gives speed-runners a way to activate events without wasting any
 * frames.
 *
 * Compatibility:
 * * This plugin completely replaces Game_Player triggerButtonAction
 * * This plugin extends Game_Player update
 */

(function() {
    let originalGamePlayerUpdate = Game_Player.prototype.update;

    Game_Player.prototype.update = function(sceneActive)
    {
        if(!$gameMap.isEventRunning())
            this.pressingOk = !!this.pressingOk || Input.isTriggered('ok');

        originalGamePlayerUpdate.call(this, sceneActive);
    };

    Game_Player.prototype.triggerButtonAction = function() {
        if (this.pressingOk) {
            this.pressingOk = false;

            if (this.getOnOffVehicle()) {
                return true;
            }
            this.checkEventTriggerHere([0]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
            this.checkEventTriggerThere([0,1,2]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
        }
        return false;
    };
})();
