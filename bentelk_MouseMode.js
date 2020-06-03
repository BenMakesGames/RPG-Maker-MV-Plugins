/*:
 * @plugindesc Allows the party to change between tiny, and normal-sized.
 *
 * @param Mouse-mode Spritesheet Name
 * @desc Name of spritesheet to use for all party members on the map.
 * Default: $MouseMode
 * @default $MouseMode
 *
 * @param Mouse-mode Spritesheet Index
 * @desc Index into spritesheet to use for all party members on the map.
 * Default: 0
 * @default 0
 *
 * @param Mouse-mode-only Region
 * @desc Region # that can be crossed only when mouse-mode is enabled. Multiple region #s can be specified, separated by commans and/or spaces.
 * Default: 6
 * @default 6
 *
 * @param Mouse-mode-excluded Region
 * @desc Region # that can NOT be crossed when mouse-mode is enabled. Multiple region #s can be specified, separated by commans and/or spaces.
 * Default: 7
 * @default 7
 *
 * @author Ben Hendel-Doying
 *
 * @help To make the party small, run the following JavaScript:
 *
 *   $gameParty.enableMouseMode();
 *
 * To make the party normal-sized, run the following JavaScript:
 *
 *   $gameParty.disableMouseMode();
 *
 * To toggle between small and normal without checking first:
 *
 *   $gameParty.toggleMouseMode();
 *
 */
(function() {
    const params = PluginManager.parameters('bentelk_MouseMode');

    const mouseModeOnlyRegions = params['Mouse-mode-only Region']
        .split(/[, \t\r\n]+/)
        .filter(r => r !== '')
        .map(r => Number(r))
    ;

    const mouseModeExcludedRegions = params['Mouse-mode-excluded Region']
        .split(/[, \t\r\n]+/)
        .filter(r => r !== '')
        .map(r => Number(r))
    ;

    const mouseModeSpriteSheetName = params['Mouse-mode Spritesheet Name'];
    const mouseModeSpriteSheetIndex = Number(params['Mouse-mode Spritesheet Index']);

    Game_Party.prototype.enableMouseMode = function() {
        this.mouseMode = true;
        $gamePlayer.refresh();
    };

    Game_Party.prototype.disableMouseMode = function() {
        this.mouseMode = false;
        $gamePlayer.refresh();
    };

    Game_Party.prototype.toggleMouseMode = function() {
        this.mouseMode = !this.mouseMode;
        $gamePlayer.refresh();
    };

    const originalGameActorBaseCharacterName = Game_Actor.prototype.characterName;

    Game_Actor.prototype.characterName = function() {
        if($gameParty.mouseMode)
            return mouseModeSpriteSheetName;
        else
            return originalGameActorBaseCharacterName.call(this);
    };

    const originalGameActorBaseCharacterIndex = Game_Actor.prototype.characterIndex;

    Game_Actor.prototype.characterIndex = function() {
        if($gameParty.mouseMode)
            return mouseModeSpriteSheetIndex;
        else
            return originalGameActorBaseCharacterIndex.call(this);
    };

    const originalGameCharacterBaseIsMapPassable =  Game_CharacterBase.prototype.isMapPassable;

    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        const regionId = this.getRegionId(x, y, d);

        if($gameParty.mouseMode && mouseModeExcludedRegions.indexOf(regionId) >= 0)
            return false;

        if(!$gameParty.mouseMode && mouseModeOnlyRegions.indexOf(regionId) >= 0)
            return false;

        return originalGameCharacterBaseIsMapPassable.call(this, x, y, d);
    };

    Game_CharacterBase.prototype.isMouseModeExcludedRegion = function() {
        return mouseModeExcludedRegions.indexOf(this.getRegionId(this._x, this._y)) >= 0;
    };

    Game_CharacterBase.prototype.isMouseModeOnlyRegion = function() {
        return mouseModeOnlyRegions.indexOf(this.getRegionId(this._x, this._y)) >= 0;
    };
})();
