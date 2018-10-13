/*:
 * @plugindesc Intended to be used with MrTS_PartyManager. Prevents the addition of new party members from putting you over 4.
 * @author Ben Hendel-Doying
 * @help
 * tl;dr: with this plugin, and MrTS_PartyManager, you can use Change Party Member / Add, and if you have less than 4
 * party members, that character will be added to your party as normal, BUT: if you already have 4, the character will
 * NOT be added, but can later be added by the player by using MrTS_PartyManager's party manager menu.
 *
 * Technical explanation: this plugin hooks into the "Change Party Member / Add" logic, and immediately removes a party
 * member if your party size is over 4 after that member has been added. The reason for working this way, is that by
 * allowing the character to be briefly added, the MrTS_PartyManager plugin sees that character as being available to
 * your party.
 *
 * A function has also been added which may be useful in Conditional Branches: $gameParty.hasRecruited(actorId).
 * If the given actorId is either in your party, or can be added to your party, then this function returns true, and
 * the Conditional Branch using this Script will pass. For example:
 *
 *    $gameParty.hasRecruited(3)
 *
 * The above will be true if actor id 3 is in your party, or available to add in your party via the party manager.
 */

(function() {
    let originalGamePartyAddActor = Game_Party.prototype.addActor;

    Game_Party.prototype.addActor = function(actorId) {
        originalGamePartyAddActor.call(this, actorId);

        // constrain the party size (except in the PartyManager scene, where the code sometimes
        // bumps the party size over limit when doing party member swaps)
        if(this._actors.length > 4 && !(SceneManager._scene instanceof Scene_PartyManager))
        {
            this.removeActor(actorId);
        }
    };

    Game_Party.prototype.hasRecruited = function(actorId) {
        // check current party members:
        if(this._actors.indexOf(actorId) >= 0) return true;

        // check party manager members:
        if(this.getPartyManagerMembers().findIndex(m => m.ID === actorId) >= 0) return true;

        // not in either? alright, then:
        return false;
    };
})();
