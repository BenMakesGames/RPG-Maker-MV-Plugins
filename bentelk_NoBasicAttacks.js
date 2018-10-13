/*:
 * @plugindesc Removes "Attack" and "Guard" options from combat.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 */

Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    //this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    //this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this.addWindow(this._actorCommandWindow);
};

Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        //this.addAttackCommand();
        this.addSkillCommands();
        //this.addGuardCommand();
        this.addItemCommand();
    }
};
