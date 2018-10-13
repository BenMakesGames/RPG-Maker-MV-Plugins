/*:
 * @plugindesc Custom HUD for my game Suikomon.
 * @author Ben Hendel-Doying
 *
 * @help Shows stuff I happened to want for Suikomon.
 */

(function() {
    let originalSceneMapCreateAllWindows = Scene_Map.prototype.createAllWindows;

    Scene_Map.prototype.createAllWindows = function() {
        originalSceneMapCreateAllWindows.call(this);

        this.addChild(Window_SuikomonHUD.getInstance());
    };

    let originalGamePartyGainGold = Game_Party.prototype.gainGold;

    Game_Party.prototype.gainGold = function(amount) {
        originalGamePartyGainGold.call(this, amount);

        Window_SuikomonHUD.getInstance().refresh();
    };
})();

function Window_SuikomonHUD() {
    this.initialize.apply(this, arguments);
}

(function() {
    let singleton;

    Window_SuikomonHUD.getInstance = function() {
        if(!singleton)
            singleton = new Window_SuikomonHUD();

        return singleton;
    };
})();

Window_SuikomonHUD.prototype = Object.create(Window_Base.prototype);
Window_SuikomonHUD.prototype.constructor = Window_MapName;

Window_SuikomonHUD.prototype.initialize = function() {
    let wight = this.windowWidth();
    let height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, -5, 0, wight, height);
    this.opacity = 0;
    this.refresh();
};

Window_SuikomonHUD.prototype.windowWidth = function() {
    return 360;
};

Window_SuikomonHUD.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_SuikomonHUD.prototype.refresh = function() {
    this.contents.clear();

    if($gameParty.gold() > 0)
        this.drawTextEx('\\C[1]' + $gameParty.gold() + TextManager.currencyUnit, 5, 5);
};
