/*:
 * @plugindesc Requires YEP_RegionRestrictions & AltimitMovement. Makes the two plugins
 * play nice together... mostly.
 *
 * @author Ben Hendel-Doying
 *
 * @help
 * This plugin makes AltimitMovement respect YEP_RegionRestrictions, EXCEPT:
 * Event Restrict & Event Allow regions from YEP_RegionRestrictions are ignored.
 *
 * This plugin must be placed AFTER the other two.
 */
(function() {
    const originalGameMapIsPassable = Game_Map.prototype.isPassable;

    Game_Map.prototype.getRegionId = function(x, y, d) {
        switch (d) {
            case 1: return this.regionId(x - 1, y + 1);
            case 2: return this.regionId(x + 0, y + 1);
            case 3: return this.regionId(x + 1, y + 1);
            case 4: return this.regionId(x - 1, y + 0);
            case 5: return this.regionId(x + 0, y + 0);
            case 6: return this.regionId(x + 1, y + 0);
            case 7: return this.regionId(x - 1, y - 1);
            case 8: return this.regionId(x + 0, y - 1);
            case 9: return this.regionId(x + 1, y - 1);
            default: return this.regionId(x, y);
        }
    };

    Game_Map.prototype.isPassable = function(x, y, d) {
        var regionId = this.getRegionId(x, y, d);

        if (this.allowPlayerRegions().contains(regionId)) return true;
        if (this.restrictPlayerRegions().contains(regionId)) return false;

        return originalGameMapIsPassable.call(this, x, y, d);
    };
})();
