/*:
 * @plugindesc When starting a new game, the player will choose a save slot. The game will always save to that slot. Also adds auto-save.
 * @author Ben Hendel-Doying
 *
 * @help
 * ============================================================================
 * Description
 * ----------------------------------------------------------------------------
 *
 * This plugin entirely changes up how the save system works.
 *
 * The default RPG Maker method is something like Skyrim, or Civilization,
 * where you start a new game, and then may make as many saves for that game as
 * you like.
 *
 * This plugin changes things to be more like the classic Zelda games: upon
 * starting a new game, you will be required to choose a save slot, and all
 * saves will go to that single save slot.
 *
 * This game also adds two auto-saves:
 * 1. When the player quits, the game is automatically saved.
 * 2. When the player moves from one map to another, the game is saved.
 *
 * Map-switch auto-saves can be disabled and enabled via a Script call (more on
 * this, below). If you do not want to auto-save when the player quits, you
 * will need to modify this plugin. Instructions are within.
 *
 * ============================================================================
 * Usage
 * ----------------------------------------------------------------------------
 *
 * To enable and disable auto-save features, make the following Script calls:
 *
 *     DataManager.enableMapAutosave();
 *
 *     DataManager.disableMapAutosave();
 *
 * Autosave is automatically enabled whenever a game is started or loaded.
 *
 * If for some reason you'd like to disable autosave by default, a simple
 * modification can be made to this plugin to accomplish that. Open up a decent
 * text editor; instructions are inside the plugin.
 *
 * To immediately save of the current game, make the following Script call:
 *
 *     DataManager.saveCurrentGame();
 *
 * ============================================================================
 * Compatibility
 * ----------------------------------------------------------------------------
 *
 * This plugin REPLACES a couple built-in functions. For this reason, it must
 * be placed BEFORE any other plugins that EXTEND these same functions.
 *
 * If two plugins replace the same function, they are probably incompatible.
 *
 * * Replaces Window_TitleCommand makeCommandList
 * * Replaces Scene_Load onSavefileOk
 * * Replaces Scene_Menu commandSave
 * * Extends Scene_Map start
 * * Extends Scene_GameEnd commandToTitle
 * * Adds DataManager saveCurrentGame
 * * Adds DataManager enableMapAutosave
 * * Adds DataManager disableMapAutosave
 */

(function() {

    Window_TitleCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.continue_, 'continue');
        this.addCommand(TextManager.options,   'options');
    };

    Scene_Load.prototype.onSavefileOk = function() {
        let savefileId = this.savefileId();

        if(DataManager.isThisGameFile(savefileId))
        {
            if(DataManager.loadGame(savefileId))
            {
                this.onLoadSuccess();
                DataManager.enableMapAutosave();
                DataManager.currentSavefileId = savefileId;
            }
            else
            {
                this.onLoadFailure();
            }
        }
        else
        {
            DataManager.setupNewGame();
            DataManager.enableMapAutosave();
            DataManager.currentSavefileId = savefileId;
            SoundManager.playLoad();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
        }
    };

    Scene_Menu.prototype.commandSave = function() {
        if(DataManager.saveCurrentGame())
        {
            SoundManager.playSave();
            this.popScene();
        }
        else
        {
            SoundManager.playBuzzer();
            this._commandWindow.activate();
        }
    };

    // auto-save when loading a new map
    let originalSceneMapStart = Scene_Map.prototype.start;

    Scene_Map.prototype.start = function() {
        originalSceneMapStart.call(this);

        if(DataManager.autoSaveOnMapSwitch)
            DataManager.saveCurrentGame();
    };

    // auto-save on quit; to permanently disable this feature, remove the following seven lines:
    let originalSceneGameEndCommandToTitle = Scene_GameEnd.prototype.commandToTitle;

    Scene_GameEnd.prototype.commandToTitle = function() {
        DataManager.saveCurrentGame();

        originalSceneGameEndCommandToTitle.call(this);
    };

})();

DataManager.saveCurrentGame = function()
{
    $gameSystem.onBeforeSave();

    if(DataManager.saveGame(DataManager.currentSavefileId))
    {
        StorageManager.cleanBackup(DataManager.currentSavefileId);
        return true;
    }
    else
    {
        return false;
    }
};

DataManager.enableMapAutosave = function() {
    DataManager.autoSaveOnMapSwitch = true;
};

DataManager.disableMapAutosave = function() {
    DataManager.autoSaveOnMapSwitch = false;
};

