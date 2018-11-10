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
    let table = [
        56,197,191,82,209,69,25,131,48,12,68,45,72,49,10,116,
        96,54,46,177,52,133,89,226,224,148,27,92,217,95,80,129,
        202,70,221,208,36,97,128,53,146,169,178,251,18,160,110,14,
        94,167,100,43,204,29,21,214,85,123,150,228,151,132,206,109,
        193,241,223,220,37,232,188,137,61,254,205,78,233,168,19,20,
        101,77,187,212,28,5,98,39,250,158,44,229,159,122,145,76,
        247,113,9,240,140,157,108,180,62,75,30,245,102,139,182,199,
        135,162,154,242,194,165,175,134,176,35,243,155,230,23,125,81,
        79,144,186,86,161,198,71,196,147,4,222,15,31,225,13,253,
        207,244,59,60,65,73,58,83,239,40,114,174,120,141,99,189,
        238,16,57,152,51,63,119,106,117,22,74,6,156,143,166,84,
        111,210,153,11,200,118,219,171,8,255,17,126,38,218,183,235,
        104,173,215,185,195,67,216,231,190,103,24,105,1,246,7,88,
        249,138,211,142,112,127,130,0,163,213,34,236,234,252,115,42,
        64,170,164,149,201,237,203,3,91,33,172,2,47,192,227,184,
        55,124,66,32,181,50,136,41,93,87,26,107,179,121,248,90
    ];

    let randomSeed = 0;

    function currentR()
    {
        return table[randomSeed];
    }

    Math.resetRandomSeed = function(seed)
    {
        if(!seed)
            seed = 0;

        randomSeed = seed % 256;
    };

    Math.incrementRandomSeed = function()
    {
        randomSeed = (randomSeed + 1) % 256;
    };

    // this is an RPG Maker function which RPG Maker uses a lot to generate random numbers.
    // here, we completely redefine how it works. this is the core of our bad RNG :P
    Math.randomInt = function(max)
    {
        let r = currentR();

        Math.incrementRandomSeed();

        return Math.floor(r * max / 256);
    };

    // this is the JavaScript native Math.random function! RPG Maker uses it a lot. (pixi.js even uses it a little.)
    // here, we completely redefine how it works to be based on our bad Math.randomInt!
    Math.random = function()
    {
        let r = currentR();

        Math.incrementRandomSeed();

        return r / 256;
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
