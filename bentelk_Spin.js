/*:
 * @plugindesc Allows you to cause the player to start/stop spinning in place (even while walking). See "help"...
 * @author Ben Hendel-Doying
 * @help
 * To cause the player to start spinning, run this script (either via an event,
 * or your own JS script)
 *
 *   $gamePlayer.startSpinning(10);
 *
 * You can replace the 10 with any number from 1 to 60. A higher number means a
 * greater speed of rotation. (Technically, this is the number of 90 degree
 * turns per second; there are 60 frames per second, so...)
 *
 * To STOP the player spinning, call:
 *
 *   $gamePlayer.stopSpinning();
 *
 * You may also start the player spinning in such a way that they will
 * automatically stop spinning after some number of frames:
 *
 * $gamePlayer.startSpinning(20, 60);
 *
 * The above will cause the player to rotate 20 times per second; they will
 * stop spinning after 60 frames (1 second).
 *
 * @help
 * COMPATIBILITY:
 * * ALIASES Game_Player..update
 * * ALIASES Game_Player..initialize
 * * ADDS Game_Player..startSpinning
 * * ADDS Game_Player..stopSpinning
 */

(function() {
    Spin_Game_Player_update = Game_Player.prototype.update;

    Game_Player.prototype.update = function(sceneActive) {
        if(typeof this._spinDuration != 'undefined')
        {
            if(this._spinDuration > 0)
                this._spinDuration--;
            else
                this.stopSpinning();
        }

        if (this._spinning) {
            this._spinStep = (this._spinStep + 1) % 60;
            if(this._spinStep % (60 / this._spinTurnsPerSecond) == 0) {
                this._directionFix = false;
                this.turnRight90();
                this._directionFix = true;
            }
        }

        Spin_Game_Player_update.call(this, sceneActive);
    };

    Spin_Game_Player_initialize = Game_Player.prototype.initialize;

    Game_Player.prototype.initialize = function() {
        Spin_Game_Player_initialize.call(this);
        this._spinning = false;
        this._spinStep = 0;
        this._spinDuration = undefined;
    };

    Game_Player.prototype.startSpinning = function(turnsPerSecond, duration) {
        if(!this._spinning)
            this._beforeSpinDirectionFix = this._directionFix;

        this._spinning = true;
        this._spinTurnsPerSecond = turnsPerSecond;
        this._directionFix = true;
        this._spinDuration = duration;
    };

    Game_Player.prototype.stopSpinning = function() {
        this._spinning = false;
        this._spinStep = 0;
        this._directionFix = this._beforeSpinDirectionFix;
        this._spinDuration = undefined;
    };
})();
