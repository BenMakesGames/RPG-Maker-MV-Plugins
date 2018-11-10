/*:
 * @plugindesc Fixes a bug which prevents saving & loading for web-based deployments.
 * @author Ben Hendel-Doying
 *
 * @help
 * This plugin should be one of the very first loaded; before any other plugin
 * that deals with the save system. (If you have another plugin that says the
 * same thing, then this plugin will probably conflict with that one.)
 *
 * This plugin fixes a bug in RPG Maker MV's save and loading functions, which
 * prevented it from properly storing a "globalId" meant to identify saves. On
 * web deployments, this had the effect where the title menu would not believe
 * you had any saves, but you could see them while saving a game, but they
 * appeared strangely in that menu >_>
 *
 * This plugin also removes the requirement that the save's title match the
 * game's title, which allows you to write plugins that do things like name
 * the save after the first character in the party, or the town the party is
 * currently in, or whatever. (To be clear, this plugin does not itself let
 * you customize save game titles, it just enables that for other plugins,
 * including any little plugin you may write yourself for your own game.)
 *
 * Compatibility:
 *
 * * REPLACES DataManager isThisGameFile
 * * REPLACES DataManager makeSavefileInfo
 */

DataManager.isThisGameFile = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (globalInfo && globalInfo[savefileId]) {
        if (StorageManager.isLocalMode()) {
            return true;
        } else {
            var savefile = globalInfo[savefileId];
            return savefile.globalId === DataManager._globalId + '/' + $dataSystem.gameTitle; // this is the fixed line
        }
    } else {
        return false;
    }
};

DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = DataManager._globalId + '/' + $dataSystem.gameTitle; // this is the fixed line
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    return info;
};
