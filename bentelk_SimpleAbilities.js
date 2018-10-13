/*:
 * @plugindesc Removes ability categories from menus (see description)
 * @author Ben Hendel-Doying
 *
 * @help
 * When viewing a character's abilities in the game menu, abilities are no
 * longer grouped by type; they are all shown in one window. This completely
 * removes the ability category selection window. Other windows are resized
 * and repositioned accordingly.
 */

(function()
{
    let originalSceneSkillCreate = Scene_Skill.prototype.create;

    Scene_Skill.prototype.create = function()
    {
        originalSceneSkillCreate.call(this);

        // start with the item window active. (don't know WHY this needs to
        // be in a setTimeout... if I don't do it, though, then the help
        // dialog is not set when you first enter the scene! if you know a
        // better way to make this work, let me know...)
        setTimeout(() => {
            this._itemWindow.setStypeId(1);
            this._itemWindow.refresh();
            this._itemWindow.resetScroll();
            this._itemWindow.activate();
            this._itemWindow.select(0);
        }, 0);
    };

    Scene_Skill.prototype.createSkillTypeWindow = function()
    {
        // don't actually do this...
    };


    Scene_Skill.prototype.createStatusWindow = function()
    {
        // everything is different here:
        this._statusWindow = new Window_SkillStatus(0, this._helpWindow.height, Graphics.boxWidth, 144 + this._helpWindow.padding * 2);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };

    Scene_Skill.prototype.createItemWindow = function()
    {
        let wx = 0;
        let wy = this._statusWindow.y + this._statusWindow.height;
        let ww = Graphics.boxWidth;
        let wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.popScene.bind(this)); // popscene
        //this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    Scene_Skill.prototype.refreshActor = function()
    {
        let actor = this.actor();
        //this._skillTypeWindow.setActor(actor);
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };
})();
