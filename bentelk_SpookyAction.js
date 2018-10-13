/*:
 * @plugindesc Allows certain events to trigger when you're adjacent to them (see help for more info).
 * @author Ben Hendel-Doying
 *
 * @help If the event's spritesheet's name contains the text "Aggro" anywhere, then it can be triggered from a tile
 * away. For example, if the event is triggered via touch, then it will be triggered by touching an adjacent tile.
 * The intention of this plugin was to allow for creatures that wander the map, and start fights simply by being near
 * you, but it may serve other purposes as well.
 */

Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) {
        this.startMapEvent(this.x, this.y, triggers, false);

        if (!$gameMap.isEventRunning()) {
            var events = $gameMap.eventsXy(this.x - 1, this.y)
                .concat($gameMap.eventsXy(this.x + 1, this.y))
                .concat($gameMap.eventsXy(this.x, this.y - 1))
                .concat($gameMap.eventsXy(this.x, this.y + 1))
            ;
            events.some(function(event) {
                if(event._characterName.contains('Aggro') && event.isTriggerIn(triggers)) {
                    event.start();
                    return true;
                }
                else
                    return false;
            });
        }
    }
};
