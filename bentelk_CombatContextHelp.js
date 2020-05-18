/*:
 * @plugindesc Adds a small, context-sensitive help window during combat.
 * @author Ben Hendel-Doying
 *
 * @help There's nothing to configure.
 *
 * When in combat, a small window is shown above the character selection which
 * contains text like "What will X do?" or "Choose a target." to make it crystal
 * clear what you're doing in the moment.
 *
 * I added this because I observed players who are not familiar with RPG Maker were
 * sometimes getting confused with input selection; it was not always clear to them
 * what they were selecting.
 */

(function() {
    const originalSceneBattleCreateAllWindows = Scene_Battle.prototype.createAllWindows;

    Scene_Battle.prototype.createAllWindows = function() {
        originalSceneBattleCreateAllWindows.call(this);

        this.createContextHelpWindow();
    };

    Scene_Battle.prototype.createContextHelpWindow = function()
    {
        this._contextHelpWindow = new Window_Help(1);
        this._contextHelpWindow.move(this._actorWindow.x, this._actorWindow.y - this._contextHelpWindow.height, 360, this._contextHelpWindow.height);
        this._contextHelpWindow.setText('...');
        this.addWindow(this._contextHelpWindow);
        this._contextHelpWindow.hide();
    };

    // choosing what an ally will do

    const originalSceneBattleStartActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;

    Scene_Battle.prototype.startActorCommandSelection = function() {
        originalSceneBattleStartActorCommandSelection.call(this);

        this._contextHelpWindow.setText('What will ' + BattleManager.actor().name() + ' do?');
        this._contextHelpWindow.show();
    };

    const originalSceneBattleStartPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;

    Scene_Battle.prototype.startPartyCommandSelection = function() {
        originalSceneBattleStartPartyCommandSelection.call(this);

        this._contextHelpWindow.hide();
    };

    const originalSceneBattleEndCommandSelection = Scene_Battle.prototype.endCommandSelection;

    Scene_Battle.prototype.endCommandSelection = function() {
        originalSceneBattleEndCommandSelection.call(this);

        this._contextHelpWindow.hide();
    };

    // choosing a skill

    const originalSceneBattleCommandSkill = Scene_Battle.prototype.commandSkill;

    Scene_Battle.prototype.commandSkill = function() {
        originalSceneBattleCommandSkill.call(this);

        this._contextHelpWindow.hide();
    };

    const originalSceneBattleOnSkillCancel = Scene_Battle.prototype.onSkillCancel;

    Scene_Battle.prototype.onSkillCancel = function() {
        originalSceneBattleOnSkillCancel.call(this);

        this._contextHelpWindow.show();
    };

    // choosing an item

    const originalSceneBattleCommandItem = Scene_Battle.prototype.commandItem;

    Scene_Battle.prototype.commandItem = function() {
        originalSceneBattleCommandItem.call(this);

        this._contextHelpWindow.hide();
    };

    const originalSceneBattleOnItemCancel = Scene_Battle.prototype.onItemCancel;

    Scene_Battle.prototype.onItemCancel = function() {
        originalSceneBattleOnItemCancel.call(this);

        this._contextHelpWindow.show();
    };

    // choosing a target enemy

    const originalSceneSelectEnemySelection = Scene_Battle.prototype.selectEnemySelection;

    Scene_Battle.prototype.selectEnemySelection = function() {
        originalSceneSelectEnemySelection.call(this);

        this._contextHelpWindow.setText('Choose a target.');
        this._contextHelpWindow.show();
    };

    const originalSceneBattleOnEnemyCancel = Scene_Battle.prototype.onEnemyCancel;

    Scene_Battle.prototype.onEnemyCancel = function() {
        originalSceneBattleOnEnemyCancel.call(this);

        this._contextHelpWindow.hide();
    };

    // choosing a target ally

    const originalSceneSelectActorSelection = Scene_Battle.prototype.selectActorSelection;

    Scene_Battle.prototype.selectActorSelection = function() {
        originalSceneSelectActorSelection.call(this);

        this._contextHelpWindow.setText('Choose a target.');
        this._contextHelpWindow.show();
    };

    const originalSceneBattleOnActorCancel = Scene_Battle.prototype.onActorCancel;

    Scene_Battle.prototype.onActorCancel = function() {
        originalSceneBattleOnActorCancel.call(this);

        this._contextHelpWindow.hide();
    };

})();
