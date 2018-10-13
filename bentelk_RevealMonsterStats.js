/*:
 * @plugindesc Add an easy JavaScript command to show a monster's stats during battle.
 * @author Ben Hendel-Doying
 *
 * @help
 * example usage, in a spell's Damage Formula:
 *
 *    b.showStatsMessage(); 0
 *
 * if you wanted a spell that shows stats AND deals damage, you could do:
 *
 *    b.showStatsMessage(); a.atk * 4 - b.def * 2
 *
 * feel free to modify this script, to customize the data shown.
 */

Game_Battler.prototype.showStatsMessage = function() {
    var enemy = $dataEnemies[this._enemyId];

    //console.log(enemy);

    // remove the "//" from the beginning of the previous line to show the
    // enemy data in the developer console. you can open this console in-game
    // by pressing F12. by looking at this data, you may find other properties
    // about the enemy that you'd like to display. customize the "report"
    // block, below, with whatever data you want to show.

    var report = [
        enemy.battlerName,
        'Max Health: ' + enemy.params[0],
        'Attack: ' + enemy.params[2],
        'Speed: ' + enemy.params[6],
    ];

    $gameMessage.add(report.join('\n'));
};
