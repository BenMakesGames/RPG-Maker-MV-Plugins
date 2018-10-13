/*:
 * @plugindesc Extends RPGMV base objects in useful ways.
 * @author Ben Hendel-Doying
 *
 * @help
 * These extensions are intended to be used via the "Script" option, in
 * Conditional Branches especially. They can also be used in damage formulas,
 * your own extensions, or anywhere else JavaScript is allowed.
 *
 * Requires RPG Maker MV 1.6.1+ (due to use of ES6 functions and syntax).
 *
 * ===[  $gameSwitches.allOn(switches)  ]======================================
 *
 * give a list of switches (by number); if ALL switches are on, then the
 * condition passes. example:
 *
 *   $gameSwitches.allOn([ 1, 2, 3, 4, 5 ])
 *
 * that condition would pass if switches 1 through 5 are all ON.
 *
 * ===[  $gameSwitches.allOff(switches)  ]=====================================
 *
 * the opposite of allOn; if ALL switches are off, then the condition passes.
 * example:
 *
 *    $gameSwitches.allOff([ 8, 9, 12 ]);
 *
 * that condition would pass if switches 8, 9, and 12 are all OFF.
 *
 * ===[  $gameVariables.countOn(switches)  ]===================================
 *
 * give a list of switches (by number); returns a count of how many of those
 * switches are on. example:
 *
 *    $gameSwitches.countOn([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]) > 5
 *
 * that condition would pass if at least 5 of the switches 1 through 10 are ON.
 *
 * you could also store the result to a variable, using "Control Variables".
 *
 * another example: in a damage formula:
 *
 *    a.atk - $gameSwitches.countOn([ 1, 7, 12, 13 ])
 *
 * ===[  $gameSwitches.countOff(switches)  ]====================================
 *
 * give a list of switches (by number); returns a count of how many of those
 * switches are OFF. example:
 *
 *    $gameSwitches.countOff([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]) > 5
 *
 * that condition would pass if at least 5 of the switches 1 through 10 are OFF.
 *
 * see $gameSwitches.countOn for more examples.
 *
 * ===[  $gameVariables.total(variables)  ]====================================
 *
 * returns the sum total of the given variables.
 *
 * example use in a Conditional Branch:
 *
 *    $gameVariables.total([ 1, 2, 8 ]) > 125
 *
 * that condition would pass if variable 1 + variable 2 + variable 8 is greater
 * than 125.
 *
 * example setting a variable using the "Control Variables" command:
 *
 *    $gameVariables.total([ 5, 8, 13, 14 ])
 *
 * example in a damage calculation:
 *
 *    a.atk + $gameVariables.total([ 1, 2, 3, 4 ])
 *
 * the damage would be the total of the attacker's attack, and the values of
 * variables 1, 2, 3, and 4.
 *
 * ===[  $gameVariables.average(variables)  ]==================================
 *
 * like $gameVariables.total, but returns the AVERAGE of the indicated
 * variables.
 *
 * ===[  $gameParty.itemCount(itemId)  ]=======================================
 *
 * returns how many of item "itemId" your party is carrying. example use in a
 * Conditional Branch:
 *
 *    $gameParty.itemCount(3) >= 5
 *
 * that condition would pass if the party has 5 or more of item #3.
 *
 * ===[  $gameParty.armorCount(armorId)  ]=====================================
 *
 * returns how many of armor "armorId" your party is carrying. see
 * $gameParty.itemCount for example uses.
 *
 * ===[  $gameParty.weaponCount(weaponId)  ]===================================
 *
 * returns how many of weapon "weaponId" your party is carrying. see
 * $gameParty.itemCount for example uses.
 *
 */

Game_Switches.prototype.allOn = function(switches) {
    return switches.every(s => {
        return !!this._data[s];
    });
};

Game_Switches.prototype.allOff = function(switches) {
    return switches.every(s => {
        return !this._data[s];
    });
};

Game_Switches.prototype.countOn = function(switches) {
    return switches.reduce((a, b) => (!!this._data[s] ? 1 : 0) + b);
};

Game_Switches.prototype.countOff = function(switches) {
    return switches.reduce((a, b) => (!this._data[s] ? 1 : 0) + b);
};

Game_Variables.prototype.total = function(variables) {
    return variables.reduce((a, b) => this.value(a) + b);
};

Game_Variables.prototype.average = function(variables) {
    return this.total(variables) / variables.length;
};

Game_Party.prototype.itemCount = function(itemId)
{
    return this._items.hasOwnProperty(itemId) ? this._items[itemId] : 0;
};

Game_Party.prototype.armorCount = function(itemId)
{
    return this._armors.hasOwnProperty(itemId) ? this._armors[itemId] : 0;
};

Game_Party.prototype.weaponCount = function(itemId)
{
    return this._weapons.hasOwnProperty(itemId) ? this._weapons[itemId] : 0;
};