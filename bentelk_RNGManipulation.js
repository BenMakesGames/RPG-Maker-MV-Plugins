/*:
 * @plugindesc Replaces the built-in RNG with an intentionally-weaker & player-manipulable one.
 * @author Ben Hendel-Doying
 *
 * @help That's it!
 *
 * The RNG can be manipulated by the player in the following ways:
 * * Moving the cursor in menus increments the RNG seed
 * * When the party takes a step, the RNG seed is incremented
 * * When a game is loaded or started, the RNG seed is reset
 *
 * If you'd like any Events to manipulate the RNG, you can add Script actions
 * with either of the following:
 *
 *   Math.resetRandomSeed();
 *
 * or:
 *
 *   Math.resetRandomSeed(219); // use any number you want here
 *
 * or:
 *
 *   Math.incrementRandomSeed();
 */

(function()
{
    // these two constants define the behavior of our RNG. (it's important we define them in this anonymous function,
    // so that they not be altered from the outside...)
    let R1 = 4547;
    let R2 = 5081;

    let randomSeed = 0;

    function currentR()
    {
        return randomSeed * R1 + R2;
    }

    Math.resetRandomSeed = function(seed)
    {
        if(!seed)
            seed = 0;

        randomSeed = seed;
    };

    Math.incrementRandomSeed = function()
    {
        randomSeed++;
    };

    // this is an RPG Maker function which RPG Maker uses a lot to generate random numbers.
    // here, we completely redefine how it works. this is the core of our bad RNG :P
    Math.randomInt = function(max)
    {
        let r = currentR();

        if(isNaN(r))
        {
            Math.resetRandomSeed();

            r = currentR();
        }

        Math.incrementRandomSeed();

        return r % max;
    };

    // this is the JavaScript native Math.random function! RPG Maker uses it a lot. (pixi.js even uses it a little.)
    // here, we completely redefine how it works to be based on our bad Math.randomInt!
    Math.random = function()
    {
        return Math.randomInt(1000) / 1000;
    };



    // increment random seed when changing a menu selection:

    let windowSelectableSelect = Window_Selectable.prototype.select;

    Window_Selectable.prototype.select = function(index) {
        windowSelectableSelect.call(this, index);
        Math.incrementRandomSeed();
    };

    // increment random seed when taking a step:

    let gameCharacterBaseIncreaseSteps = Game_CharacterBase.prototype.increaseSteps;

    Game_CharacterBase.prototype.increaseSteps = function() {
        gameCharacterBaseIncreaseSteps.call(this);
        Math.incrementRandomSeed();
    };

    // reset random seed when starting/loading a game:

    let dataManagerCreateGameObjects = DataManager.createGameObjects;

    DataManager.createGameObjects = function() {
        dataManagerCreateGameObjects.call(this);

        Math.resetRandomSeed();
    };
})();
