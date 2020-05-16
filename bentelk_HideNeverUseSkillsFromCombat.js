/*:
 * @plugindesc Hides "Never" and "Menu Screen" Occasion skills from skill selection during combat.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

(function() {
    var SKILL_OCCASION_MENU = 2;
    var SKILL_OCCASION_NEVER = 3;

    var originalIncludesMethod = Window_SkillList.prototype.includes;

    Window_SkillList.prototype.includes = function(item) {
        if($gameParty._inBattle && (item.occasion === SKILL_OCCASION_MENU || item.occasion === SKILL_OCCASION_NEVER))
            return false;

        return originalIncludesMethod.call(this, item);
    };
})();
