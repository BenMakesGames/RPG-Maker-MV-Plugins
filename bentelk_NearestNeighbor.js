/*:
 * @plugindesc Use nearest-neighbor when scaling the game up (ex: when in fullscreen)
 * @author Ben Hendel-Doying
 *
 * @help The following resources helped me develop this plugin:
 * https://forums.rpgmakerweb.com/index.php?threads/forcing-the-game-to-use-nearest-neighbor-filtering.55544/
 * https://stackoverflow.com/questions/15493965/define-global-css-classes-using-javascript-or-jquery
 *
 * Unfortunately, I've been unable to prevent smoothing of fonts. The best
 * solution I found involved using an SVG filter to drop all pixels with alpha
 * components, however this causes the browser to get angry, thinking the
 * canvas is "tainted", and refusing to draw it to the GPU.
 *
 * If you can solve this problem, or find some completely-different solution,
 * I'd love to know!
 */

(function() {

    // use nearest-neighbor when stretching the entire game window:
    let style = document.createElement('style');

    if(style.styleSheet)
        style.styleSheet.cssText='canvas { image-rendering: pixelated; }';
    else
        style.appendChild(document.createTextNode('canvas { image-rendering: pixelated; }'));

    document.getElementsByTagName('head')[0].appendChild(style);


    // disable image smoothing when stretching textures within the game window:
    let originalBitmapCreateCanvas = Bitmap.prototype._createCanvas;

    Bitmap.prototype._createCanvas = function(width, height) {
        originalBitmapCreateCanvas.call(this, width, height);

        this.__context.imageSmoothingEnabled = false;
    };
})();
