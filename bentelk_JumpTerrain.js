/*:
 * @plugindesc Use regions to mark terrain that characters should hop on. Example use: for
 * stones in water that characters can walk on, a hop may look more convincing.
 *
 * @author Ben Hendel-Doying
 *
 * @param Jump Regions
 * @desc These region IDs will cause events to jump in and out of them.
 * To use multiple regions, separate them with spaces.
 * @default 0
 */

(function() {
    const parameters = PluginManager.parameters('bentelk_JumpTerrain');

    const jumpRegions = String(parameters['Jump Regions'])
        .split(' ')
        .map(s => s.trim())
        .map(s => parseInt(s))
        .filter(i => !isNaN(i))
    ;

    Game_CharacterBase.prototype.jumpIfOnJumpTerrain = function(d) {
        if(
            jumpRegions.indexOf(this.regionId()) > -1 ||
            jumpRegions.indexOf(this.getRegionId(this._x, this._y, this.reverseDir(d))) > -1
        )
        {
            this.jump(0, 0);
        }
    };

    const originalMoveStraight = Game_CharacterBase.prototype.moveStraight;
    const originalMoveDiagonally = Game_CharacterBase.prototype.moveDiagonally;

    Game_CharacterBase.prototype.moveStraight = function(d) {
        originalMoveStraight.call(this, d);

        if(this.isMovementSucceeded())
        {
            this.jumpIfOnJumpTerrain(d);
        }
    };

    Game_CharacterBase.prototype.moveDiagonally = function(d) {
        originalMoveDiagonally.call(this, d);

        if(this.isMovementSucceeded())
        {
            this.jumpIfOnJumpTerrain(d);
        }
    };
})();
