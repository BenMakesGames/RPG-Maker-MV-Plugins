/*:
 * @plugindesc Helpers for doing flashback gameplay and/or cutscenes
 * @author Ben Hendel-Doying
 *
 * @help
 * ===[ What Problem Does This Plugin Solve? ]==================================
 *
 * So you meet an NPC, and he's like: "I don't know why the vampire let us get
 * away... we had broken into his castle; he had caught us... we should have
 * died that day..." and rather than have the NPC dump more exposition than they
 * already have...
 *
 * ~flaaaaaaaashbaaaaaack~
 *
 * In order to have a flashback, however, you need to solve a couple problems:
 *
 * 1. You need a new party. Whoever is in your party now should be removed for
 *    the flashback, and re-added after it's over. If your game has a very fixed
 *    party, this is easy, however if you allow the player some control over
 *    who's in their party (I'm going to say "Like FF3/6, or Suikoden" revealing
 *    how old I am >_>) then this is harder! How do you remove all the party
 *    members, and perfectly restore them after the cutscene?
 * 2. You probably don't want the flashback characters to be able to change your
 *    inventory!
 *
 * This plugin perfectly addresses issue 1, and gives you tools to help "work
 * around" issue 2 by simply forbidding the player from interacting with your
 * inventory (preventing them from SEEING that the same inventory really is
 * there).
 *
 * If you want to let players manage items and have battles in their flashback,
 * this plugin may NOT be enough for you!
 *
 * ===[ How to Use This Plugin ]================================================
 *
 * $gameParty.stash();
 *
 * Running this (using a "Script" block in your event) will remove all of the
 * current party members, and remember who those party members were. CAREFUL:
 * this plugin only remembers one party at a time; running $gameParty.stash(); a
 * second time will cause the first party to be forgotten! (No flashbacks within
 * flashbacks, please! :P)
 *
 *
 * $gameParty.recall();
 *
 * This must be run after $gameParty.stash(); Running it removes everyone
 * currently in the party, and adds in everyone remembered by the most-recent
 * $gameParty.stash(); call.
 *
 *
 * $gameParty.hideInventory = true;
 *
 * This causes the game to hide various inventory options from the main menu.
 *
 *
 * $gameParty.hideInventory = false;
 *
 * This causes the game to stop hiding the inventory.
 *
 * ===[ Example ]===============================================================
 *
 * When starting a flashback sequence:
 *
 *     Fadeout Screen
 *     Script : $gameParty.stash();
 *            : $gameParty.hideInventory = true;
 *     Change Party Member : Add ACTOR FOR FLASHBACK
 *     Change Party Member : Add SOME OTHER ACTOR FOR FLASHBACK
 *     Transfer Player : FLASHBACK LOCATION
 *     Fadein Screen
 *
 * When the flashback is over:
 *
 *     Fadeout Screen
 *     Script : $gameParty.recall();
 *              $gameParty.hideInventory = false;
 *     Transfer Player : ORIGINAL LOCATION
 *     Fadein Screen
 */

Game_Party.prototype.stash = function() {
    this.remembered = [];

    for(let i = this._actors.length - 1; i >= 0; i--)
    {
        this.remembered.push(this._actors[i]);
        this.removeActor(this._actors[i]);
    }
};

Game_Party.prototype.recall = function() {
    if(!this.remembered)
        throw 'Party must be stashed before it can be recalled.';

    for(let i = this._actors.length - 1; i >= 0; i--)
        this.removeActor(this._actors[i]);

    // the order we restore the party members in is important!
    for(let i = this.remembered.length - 1; i >= 0; i--)
        this.addActor(this.remembered[i]);
};

(function() {
    let originalMenuCommandNeedsCommand = Window_MenuCommand.prototype.needsCommand;

    Window_MenuCommand.prototype.needsCommand = function(name) {
        if($gameParty.hideInventory && (name === 'item' || name === 'equip'))
            return false;

        return originalMenuCommandNeedsCommand.call(this, name);
    };
}());
