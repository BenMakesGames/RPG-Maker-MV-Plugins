/*:
 * @plugindesc When the player presses the action button, check all adjacent tiles.
 * @author Ben Hendel-Doying
 *
 * @help
 * ============================================================================
 * What This Plugin Does
 * ----------------------------------------------------------------------------
 * This plugin allows players to activate adjacent events without necessarily
 * facing them. It activates events in this order of preference:
 *
 *   1. The event in the tile the player is facing
 *   2. The event to the left of the player
 *   3. The event to the right of the player
 *   4. The event behind the player
 *
 * If an event is activated during any of these steps, the player will turn to
 * face that event, and no further adjacent events will be checked. So if
 * if there's an event to the left AND right of the player, and they press the
 * action, button, the player will face left and trigger that event only.
 *
 * P.S. Countertops ARE respected by this plugin! :) Ex: if the only adjacent
 * event is across a counter to the right, it WILL be activated when the player
 * presses the action button.
 *
 * ============================================================================
 * Why This Plugin Does What It Does
 * ----------------------------------------------------------------------------
 * While play-testing my game, I had a player who was not interacting with
 * several objects. It took me a while to figure it out, but I finally realized
 * the problem: they WERE pressing the action button while next to
 * interactable events, but were NOT directly facing them! As a result, this
 * player would press the button, see that nothing happened, and concluded that
 * the object could not be interacted with (or at least not yet).
 *
 * As I thought about it, this did not seem unreasonable on the part of the
 * player. Of course, anyone who's familiar with RPG Maker games (or classic
 * JRPGs) wouldn't think twice about this; WE know to face the objects we want
 * to interact with. But that's just the problem: RPG Maker leans so heavily on
 * the old JRPG aesthetic, that it forgets that most of the world isn't
 * actually familiar with its rules. (The menu UI, for example, is frankly
 * terrible. One example: why can't you equip items from the item screen?
 * Answer: because that's not how FF6 did it >_> NOT GOOD ENOUGH.)
 *
 * So: this plugin attempts to modernize the interface by NOT REQUIRING players
 * to face events in order to activate them.
 *
 * ============================================================================
 * Plugin Compatibility
 * ----------------------------------------------------------------------------
 * * This plugin completely replaces Game_Player checkEventTriggerThere
 * * This plugin adds Game_Player checkEventTriggerInDirection
 */

// TODO: pull these out into a separate plugin?
function BenTelk_Direction() { }

BenTelk_Direction.turnLeft90 = function(direction)
{
    switch(direction)
    {
        case 2: return 6;
        case 4: return 2;
        case 6: return 8;
        case 8: return 4;
    }

    throw 'Unknown direction ' + direction;
};

BenTelk_Direction.turnRight90 = function(direction)
{
    switch(direction)
    {
        case 2: return 4;
        case 4: return 8;
        case 6: return 2;
        case 8: return 6;
    }

    throw 'Unknown direction ' + direction;
};

BenTelk_Direction.turn180 = function(direction)
{
    return 10 - direction;
};

// okay, here's the actual change: a replacement of the built-in checkEventTriggerThere
Game_Player.prototype.checkEventTriggerThere = function(triggers)
{
    if(this.checkEventTriggerInDirection(triggers, this.direction()))
        ; // no need to turn the player: they're already facing the event
    else if(this.checkEventTriggerInDirection(triggers, BenTelk_Direction.turnLeft90(this.direction())))
        this.turnLeft90();
    else if(this.checkEventTriggerInDirection(triggers, BenTelk_Direction.turnRight90(this.direction())))
        this.turnRight90();
    else if(this.checkEventTriggerInDirection(triggers, BenTelk_Direction.turn180(this.direction())))
        this.turn180();
};

// here's a new helper method for Game_Players: checkEventTriggerInDirection
Game_Player.prototype.checkEventTriggerInDirection = function(triggers, direction)
{
    if (this.canStartLocalEvents()) {
        const x1 = this.x;
        const y1 = this.y;
        const x2 = $gameMap.roundXWithDirection(x1, direction);
        const y2 = $gameMap.roundYWithDirection(y1, direction);

        this.startMapEvent(x2, y2, triggers, true);

        if($gameMap.isAnyEventStarting())
            return true;

        if ($gameMap.isCounter(x2, y2)) {
            const x3 = $gameMap.roundXWithDirection(x2, direction);
            const y3 = $gameMap.roundYWithDirection(y2, direction);

            this.startMapEvent(x3, y3, triggers, true);

            if($gameMap.isAnyEventStarting())
                return true;
        }
    }

    return false;
};
