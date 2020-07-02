/*:
 * @plugindesc Replaces the main menu with a super-simple adventure-game style menu.
 * @author Ben Hendel-Doying
 *
 * @help Requires bentelk_SaveSlots.js.
 *
 * Hey, listen!
 * With this plugin enabled, pressing escape no longer pulls up the normal menu
 * where you can manage your party, your inventory, etc. This plugin does NOT add
 * any other way to access that menu; if you want that menu to be accessible some
 * other way, then you'll need to script it, yourself!
 */

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_PauseMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};


function Scene_PauseMenu() {
    this.initialize.apply(this, arguments);
}

Scene_PauseMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PauseMenu.prototype.constructor = Scene_PauseMenu;

Scene_PauseMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_PauseMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
};

Scene_PauseMenu.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_PauseMenu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_PauseMenu();
    this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    this._commandWindow.setHandler('saveAndQuit',  this.commandSaveAndQuit.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_PauseMenu.prototype.commandSaveAndQuit = function() {
    $gameSystem.onBeforeSave();

    if(DataManager.saveCurrentGame())
    {
        SoundManager.playSave();
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
    }
    else
    {
        SoundManager.playBuzzer();
    }
};

Scene_PauseMenu.prototype.commandOptions = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Options);
};


function Window_PauseMenu() {
    this.initialize.apply(this, arguments);
}

Window_PauseMenu.prototype = Object.create(Window_Command.prototype);
Window_PauseMenu.prototype.constructor = Window_PauseMenu;

Window_PauseMenu.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
};

Window_PauseMenu.prototype.windowWidth = function() {
    return 240;
};

Window_PauseMenu.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_PauseMenu.prototype.makeCommandList = function() {
    this.addCommand('Resume',  'cancel');
    this.addCommand('Options', 'options');
    this.addCommand('Save & Quit', 'saveAndQuit');
};
