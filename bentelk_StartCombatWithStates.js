/*:
 * @plugindesc Starts enemies and/or players with the status effects of your choice
 * @author Ben Hendel-Doying
 *
 * @param Enemy Starting States
 * @desc A comma-separated list of state ids to apply to all enemies at the start of every combat.
 * @default
 *
 * @param Player Starting States
 * @desc A comma-separated list of state ids to apply to all player characters at the start of every combat.
 * @default
 */

(function() {
    var parameters = PluginManager.parameters('bentelk_StartCombatWithStates');

    const enemyStartingStates = createSetFromCommaSeparatedList(String(parameters['Enemy Starting States']));
    const playerStartingStats = createSetFromCommaSeparatedList(String(parameters['Player Starting States']));

    function createSetFromCommaSeparatedList(s)
    {
        return new Set(s
            .split(/,/g)
            .filter(s => s.trim().length > 0)
            .map(s => Number(s))
        );
    }

    const originalBattleManangerSetup = BattleManager.setup;

    BattleManager.setup = function(troopId, canEscape, canLose) {
        originalBattleManangerSetup.call(this, troopId, canEscape, canLose);

        // apply initial states to enemies
        $gameTroop.members().forEach(e => {
            enemyStartingStates.forEach(s => {
                e.addState(s);
            });
        });

        // apply initial states to player characters
        $gameParty.allMembers().forEach(m => {
            playerStartingStats.forEach(s => {
                m.addState(s);
            });
        });
    };

})();
