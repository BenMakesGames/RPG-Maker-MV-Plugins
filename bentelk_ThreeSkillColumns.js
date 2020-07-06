/*:
 * @plugindesc Makes the skill-selection window have three columns, instead of two.
 * @author Ben Hendel-Doying
 *
 * @help That's it! Great when using modern 16:9 aspect ratios!
 */

Window_SkillList.prototype.maxCols = function() {
    return 3;
};
