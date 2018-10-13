/*:
 * @plugindesc Shows MP/TP units on ability cost (ex: "3" becomes "3MP")
 * @author Ben Hendel-Doying
 *
 * @help
 * Also, don't worry: if you configured your game to display MP as something
 * else ("Mana", "Vitae", "EP", etc), that will be respected.
 *
 * If you'd like to customize the labels further, feel free to edit this plugin.
 * It's quite simple, and there are instructions inside on how to make changes.
 */

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {

    if (this._actor.skillTpCost(skill) > 0)
    {
        this.changeTextColor(this.tpCostColor());

        // TextManager.tpA contains the "TP (abbr)" value from the "Terms" screen in RPG Maker
        this.drawText(this._actor.skillTpCost(skill) + TextManager.tpA, x, y, width, 'right');

        /* if you'd rather use something else, alter the above this.drawText line, for example:

           this.drawText(this._actor.skillTpCost(skill) + "Mana", x, y, width, 'right');
           this.drawText(this._actor.skillTpCost(skill) + " Mana", x, y, width, 'right');
           this.drawText(this._actor.skillTpCost(skill) + "EP", x, y, width, 'right');
        */
    }
    else if (this._actor.skillMpCost(skill) > 0)
    {
        this.changeTextColor(this.mpCostColor());

        // similarly, TextManager.mpA contains the "MP (abbr)" value; replace it with whatever you want:
        this.drawText(this._actor.skillMpCost(skill) + TextManager.mpA, x, y, width, 'right');
    }
};
