/*:
 * @plugindesc Disables weapon-crafting related portions of Yanfly's ItemSynthesis plugin.
 * @author Ben Hendel-Doying
 *
 * @help
 * I happened to be making a game where I wanted crafting, but never weapon
 * crafting (since weapons followed totally different rules).
 *
 * (Must be included AFTER YEP_ItemSynthesis, of course.)
 */

Window_SynthesisCommand.prototype.addItemCommands = function() {
    if (Scene_Synthesis.availableItems().length > 0) {
        this.addCommand(Yanfly.Param.ISItemCmd, 'item', true);
    }
    // don't add weapon option
    if (Scene_Synthesis.availableArmors().length > 0) {
        this.addCommand(Yanfly.Param.ISArmorCmd, 'armor', true);
    }
};

Window_SynthesisStatus.prototype.refresh = function() {
    this.contents.clear();
    var dy = 0;
    dy = this.drawCollectedRecipes(dy);
    dy = this.drawCraftedItems(dy);
    // don't draw crafted weapons
    dy = this.drawCraftedArmors(dy);
};
