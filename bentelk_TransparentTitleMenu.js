/*:
 * @plugindesc Makes the title menu window transparent, and allows you to position it.
 * @author Ben Hendel-Doying
 *
 * @help
 * This is great if you want your menu to be integrated with the title screen
 * somehow, for example maybe your title screen places full-size portraits of
 * your main characters, and it fades to some starry background on the right,
 * where you'd like the menu options to sit, without a window border, directly
 * inside the circle of a planet among the stars. You get the idea :P
 *
 * By default, this plugin leaves the menu centered, but hides the window
 * border and background. To customize the positioning of the window, modify
 * this plugin. The values to change are near the top.
 *
 * The default code is:
 *
 *   this.x = Graphics.width / 2 - this.windowWidth() / 2;
 *   this.y = Graphics.height * 2 / 3 - this.windowHeight() / 2;
 *
 * Graphics.width and Graphics.height refer to the dimensions of the game.
 * this.windowWidth() and this.windowHeight() refer to the dimensions of the
 *
 * Which places the command window just below the the middle of the screen. You
 * can change this in a couple ways: you can change the math, if you want to
 * scale to some unknown screen size, or you could hard-code the values. Since
 * you probably know the resolution your game plays at, hard-coding values is
 * probably easiest:
 *
 *   this.x = 400;
 *   this.y = 200;
 *
 * The above places the upper-left corner of the menu 400 pixels from the left,
 * and 200 pixels from the top.
 */

Window_TitleCommand.prototype.updatePlacement = function() {

    // customize this:
    this.x = Graphics.width / 2 - this.windowWidth() / 2;
    this.y = Graphics.height * 2 / 3 - this.windowHeight() / 2;

};

(function() {
    let originalWindowTitleCommandInitialize = Window_TitleCommand.prototype.initialize;

    Window_TitleCommand.prototype.initialize = function()
    {
        originalWindowTitleCommandInitialize.call(this);

        // remove this line if you still want the menu to animate open when the game starts up:
        this.openness = 255; // start fully-open

        // if you want the menu to have a background, but no border, use "1" instead of "2":
        this.setBackgroundType(2); // no window border & no background
    };
})();