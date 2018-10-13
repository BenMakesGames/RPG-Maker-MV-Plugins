/*:
 * @plugindesc Adds a "Full Screen" option to the Options window
 * @author Ben Hendel-Doying
 *
 * @help That's it! (It's actually a surprising amount of work, but you don't have to
 * worry about that :P)
 */

(function() {
    // built-in method for detecting full-screen is whack; this fixes that:
    Graphics._isFullScreen = function() {
        return !!(
            (document.fullScreenElement && document.fullScreenElement !== null) ||
            document.mozFullScreen ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    };

    // add "Full Screen" option to options menu
    Object.defineProperty(ConfigManager, 'fullscreen', {
        get: function() {
            return Graphics._isFullScreen();
        },
        set: function(value) {
            if(value)
                Graphics._requestFullScreen();
            else
                Graphics._cancelFullScreen();
        },
        configurable: true
    });

    let originalWindowOptionsInitialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function()
    {
        originalWindowOptionsInitialize.call(this);

        // when the call is made to go fullscreen, or leave fullscreen, it isn't made instantly: SOME environments
        // give us a Promise to work with; some apparently don't?? so we use event listeners instead. we attach them
        // here (stupid browser prefixes...), and unattach them in Window_Options.close (below).
        document.body.addEventListener('fullscreenchange', () => { this.fullScreenChangeHandler(); });
        document.body.addEventListener('mozfullscreenchange', () => { this.fullScreenChangeHandler(); });
        document.body.addEventListener('webkitfullscreenchange', () => { this.fullScreenChangeHandler(); });
        document.body.addEventListener('msfullscreenchange', () => { this.fullScreenChangeHandler(); });
    };

    Window_Options.prototype.fullScreenChangeHandler = function() {
        // redraw all the items (done in response to a fullscreen change, so that we can correctly update the ON/OFF
        // label for fullscreenedness
        let topIndex = this.topIndex();
        for (let i = 0; i < this.maxPageItems(); i++) {
            let index = topIndex + i;
            if (index < this.maxItems()) {
                this.redrawItem(index);
            }
        }
    };

    Window_Options.prototype.close = function()
    {
        Window_Base.prototype.close.call(this);

        // remove all the full screen event listeners when we leave
        document.body.removeEventListener('fullscreenchange');
        document.body.removeEventListener('mozfullscreenchange');
        document.body.removeEventListener('webkitfullscreenchange');
        document.body.removeEventListener('msfullscreenchange');
    };

    let originalMakeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        let config = originalMakeData.call(this);

        config.fullscreen = this.fullscreen;

        return config;
    };

    let originalApplyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        originalApplyData.call(this, config);
        this.fullscreen = this.readFullscreen(config, 'fullscreen');
    };

    // default value of true
    ConfigManager.readFullscreen = function(config, name) {
        return config.hasOwnProperty(name) ? !!config[name] : true;
    };

    let originalMakeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        this.addCommand('Full Screen', 'fullscreen');
        originalMakeCommandList.call(this);
    };

    if(ConfigManager.fullscreen)
        Graphics._requestFullScreen();
})();
