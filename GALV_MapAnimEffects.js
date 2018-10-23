//-----------------------------------------------------------------------------
//  Galv's Map Animation Effects
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MapAnimEffects.js
//-----------------------------------------------------------------------------
//  2018-10-23 - Version Alt 2.0 - Ben Hendel-Doying changed a bunch of stuff,
//                                 fixed a couple bugs, allowed random position
//                                 offsets for animations, and replaced calling
//                                 common events with calling JS functions.
//  2016-04-28 - Version 1.4 - fixed a crash when testing an event
//  2016-02-04 - Version 1.3 - compatibility with Tsukihime's Party
//                           - added ability to use event page comments
//  2016-01-06 - Version 1.2 - fixed help file error
//  2015-12-17 - Version 1.1 - fixed to work with diagonal movement
//  2015-11-20 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapAnimEffects = true;

var Galv = Galv || {};
Galv.MAE = Galv.MAE || {};

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Enhance the usability of animations and use them to create effects when characters stand on regions.
 *
 * @author Galv - galvs-scripts.com & Ben Hendel-Doying
 *
 * @param Region Effects
 * @desc Must be set up in a certain way - see help file for details.
 * @default 7,10,a-fly,200 | 2,9,a+fly | 5,11,a
 *
 * @param Followers
 * @desc true or false if region effects appear for follower steps.
 * @default true
 *
 * @help
 *   Galv's Map Animation Effects, with modifications by Ben Hendel-Doying
 * ----------------------------------------------------------------------------
 * NOTE: This is not a simple 'plug and play' plugin. Not recommended for
 *       those that are looking for such.
 * If using with a Diagonal Movement plugin, place this one BELOW in the
 * plugin list.
 * ----------------------------------------------------------------------------
 * This plugin adds a few things to do with map effects using animations.
 *
 * 1. Animation settings
 *    Set individual animations to play at certain locations (including pixel
 *    offsets, optionally randomized) and not follow the target's movement as
 *    the animation plays. Also enables you to change their z value to appear
 *    over or under map objects and characters.
 *    These effects are done using a tag in the animation name (in database).
 *
 * 2. Region animation effects
 *    Plugin settings allow you to set up regions to play an animation and/or
 *    a custom JS function when the player stands on them, with an optional
 *    delay (in milliseconds).
 *
 * 3. Events work too
 *    You can choose if each region effect animation will also play when an
 *    event stands on it. You can also choose if you want each region effect
 *    to run only on events with a certain note tag OR run on all events
 *    except for those with a certain notetag.
 *
 * ADVISORY: As this is using animations to play effects, I don't advise using
 * this heavily. I have tested using many events on my high performance PC and
 * there was little noticable issue, but I can imagine if you are planning to
 * release to mobile devices and the like - this might not be a good idea.
 *
 * ----------------------------------------------------------------------------
 *   REGION SETUP
 * ----------------------------------------------------------------------------
 * The "Region Effects" setting allows you to specify certain regions and an
 * animation that plays on the character (player or event) that steps on those
 * regions. The layout of these settings are as follows:
 *
 *    rId,aId,key,maxDelay,jsFunction | rId,aId,key,maxDelay,jsFunction | ...
 *
 * Each region data is separated by pipes (|) and the data inside is separated
 * by commas.
 *
 * Region Data Explaination:
 * rId  = Region Id - the region number the effect takes place when stepped on
 * aId  = Animation Id - the animation number you want to play from database
 *                     - Make this 0 to not play an animation
 * key  = Restrict key - used to restrict the region to certain things:
 *                  a         - affects all
 *                  p         - the player only
 *                  e         - events only
 *                  a+Word    - player and events with <w:Word> in its note
 *                  a-Word    - player and events without <w:Word> in its note
 *                  e+Word    - only events with <word> tag in its note
 *                  e-Word    - only events without <word> tag in its note
 * maxDelay = maximum number of milliseconds to delay animation. optional.
 * jsFunction = name of a JS function to call - a JS function to call when
 *              the animation is triggered. this parameter is optional. the
 *              function will be passed the region ID, tileX, and tileY, as the
 *              first, second, and third parameters, respectively.
 *
 * EXAMPLE:
 * 7,10,a-fly | 2,9,e+fly,200 | 5,11,p,0,myJsFunc
 * The above setup contains 3 region effects.
 * - region 7, plays animation 10 for ALL except events with <fly> note/comment
 *   the animation plays instantly
 * - region 2, plays animation 9 for only events with <fly> note/comment
 *   the animation is delayed by anywhere from 0 to 200 ms
 * - region 5, plays animation 11 and calls myJsFunc(rid,x,y) only for player
 *   the animation plays instantly
 *
 * ----------------------------------------------------------------------------
 *   ANIMATION NAMES
 * ----------------------------------------------------------------------------
 * Settings for animations can be added using a tag in each Animation's name in
 * the database. The tag and settings are below:
 *
 *   <z,x,y,x2,y2> // The tag used to specify z, x and y values of an animation
 *                 // z - default animations are 8 (above all)
 *                 // x,y - the x,y position the animation will play at.
 *                 //       Leave these out to follow the target as normal.
 *                 //       x,y can be:
 *                 //                   X, Y numbers indicating pixel position
 *                 //                   vID, vID  to use variables
 *                 // x2,y2 - optional. if included, then the animation is
 *                 // positioned in a random pixel from x to x2, and y to y2
 *                 // ex: <1,-2,-10,2,4> would place the animation on z = 1,
 *                 // x = a random value from -2 to 2, and y = a random value
 *                 // from -10 to 4. x2 and y2 MUST be larger than x and y.
 *                 // like x and y, x2 and y2 can be variable references.
 *
 * EXAMPLES
 * <1>             // animation plays normally at z value of 1
 * <4,20,-15>      // animation plays at z value 4, +20 x and -15 y from the
 *                 // triggering event's position
 * <3,v1,v2>       // animation plays at z value 3 and at x,y offset stored in
 *                 // variables 1 and 2 respectively.
 * <1,-2,-10,2,4>  // animation plays at z = 1, with x offset from -2 to 2 and
 *                 // y offset from -10 to 4.
 *
 * Note: You can still name your animations and use the tag in them. eg:
 * Fire 2<4,20,-15>
 * ----------------------------------------------------------------------------
 * Again, use this sparingly and test a lot if you plan to release you game 
 * to slower devices such as cellphones.
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

    Galv.MAE.globalSettingTxt = PluginManager.parameters('Galv_MapAnimEffects')['Region Effects'];
    Galv.MAE.followers = PluginManager.parameters('Galv_MapAnimEffects')['Followers'] === 'true';

    Galv.MAE.eRegions = {  // regions for EVENTS
        allow: [],         // Regions set to trigger region effect
        requireWords: {},  // keywords for event names that CAN trigger. region: ['word','word'],
        denyWords: {},     // keywords for event names that CANNOT trigger. region: ['word','word'],
    };


    Galv.MAE.pRegions = {  // regions for PLAYER
        allow: [],         // Regions set to trigger region effect
    };

    Galv.MAE.regionAnims = {};

    Galv.MAE.setRegions = function() {  // Setup Global Region restrictions
        let setup = Galv.MAE.globalSettingTxt.split("|");

        setup.forEach(s => {
            let a = s.split(',');

            if(a.length < 3)
                throw 'MapAnimEffects "' + s + '" must have at LEAST three parameters.';

            let region = Number(a[0]);
            let key = a[2].trim();

            // Set animation id to region id
            Galv.MAE.regionAnims[region] = { animation: Number(a[1]), maxDelay: 0, callback: null };
            Galv.MAE.eRegions.requireWords[region] = Galv.MAE.eRegions.requireWords[region] || [];
            Galv.MAE.eRegions.denyWords[region] = Galv.MAE.eRegions.denyWords[region] || [];

            if(key[0] === 'p' || key[0] === 'a')
                Galv.MAE.pRegions.allow.push(region);

            if(key[0] === 'e' || key[0] === 'a')
                Galv.MAE.eRegions.allow.push(region);

            if (key[1] === "+")
                Galv.MAE.eRegions.requireWords[region].push(key.substring(2));
            else if (key[1] === "-")
                Galv.MAE.eRegions.denyWords[region].push(key.substring(2));

            if(a.length >= 4)
                Galv.MAE.regionAnims[region].maxDelay = Number(a[3]);

            if(a.length >= 5)
                Galv.MAE.regionAnims[region].callback = a[4].trim();
        });
    };

    Galv.MAE.setRegions();  // Set global map anim settings


    Galv.MAE.num = function(txt) {
        if (txt[0] === "v")
            return $gameVariables.value(Number(txt.substr(1)));
        else
            return Number(txt);
    };

    Galv.MAE.anSet = {};

    //-----------------------------------------------------------------------------
    //   ANIMATION CHANGES
    //-----------------------------------------------------------------------------

    // Change animation based on settings
    let Galv_Sprite_Animation_loadBitmaps = Sprite_Animation.prototype.loadBitmaps;
    Sprite_Animation.prototype.loadBitmaps = function() {

        if (!Galv.MAE.anSet[this._animation.id])
        {
            let settings = this._animation.name.match(/<(.*)>/);

            if (settings)
                Galv.MAE.anSet[this._animation.id] = settings[1].split(",");
            else
                Galv.MAE.anSet[this._animation.id] = true;
        }

        if (Galv.MAE.anSet[this._animation.id] !== true)
        {
            // Do settings
            this.stationary = true;
            //this.updatePosition();
            let settings = Galv.MAE.anSet[this._animation.id];
            this.z = Galv.MAE.num(settings[0]);

            if (settings[1] && settings[2] && settings[3] && settings[4])
            {
                let minX = Galv.MAE.num(settings[1]);
                let minY = Galv.MAE.num(settings[2]);
                let maxX = Galv.MAE.num(settings[3]);
                let maxY = Galv.MAE.num(settings[4]);

                this.x = this._target.x + Math.randomInt(maxX - minX + 1) + minX + $gameMap.displayX() * $gameMap.tileWidth();
                this.y = this._target.y + Math.randomInt(maxY - minY + 1) + minY + $gameMap.displayY() * $gameMap.tileHeight();
                this._ex = this.x;
                this._ey = this.y;
            }
            else if (settings[1] && settings[2])
            {
                this.stationary = true;

                this.x = this._target.x + Galv.MAE.num(settings[1]) + $gameMap.displayX() * $gameMap.tileWidth();
                this.y = this._target.y + Galv.MAE.num(settings[2]) + $gameMap.displayY() * $gameMap.tileHeight();
                this._ex = this.x;
                this._ey = this.y;
            }
        } else {
            // normalize
            this.z = 8;
            this.stationary = false;
        }
        Galv_Sprite_Animation_loadBitmaps.call(this);
    };


    let Galv_Sprite_Animation_updatePosition = Sprite_Animation.prototype.updatePosition;
    Sprite_Animation.prototype.updatePosition = function() {
        if (this.stationary) {
            this.x = this._ex - $gameMap.displayX() * $gameMap.tileWidth();
            this.y = this._ey - $gameMap.displayY() * $gameMap.tileHeight();
        } else {
            Galv_Sprite_Animation_updatePosition.call(this);
        }
    };



    //-----------------------------------------------------------------------------
    //  REGION STEPPING - CHARACTERS
    //-----------------------------------------------------------------------------

    /* FOR FOLLOWERS BUT CAUSES PLAYER TO JITTER AT TIMES */
    if (Galv.MAE.followers) {
        let Game_Follower_updateStop = Game_Follower.prototype.updateStop;
        Game_Follower.prototype.updateStop = function() {
            Game_Follower_updateStop.call(this);

            if (this.prepMapEffect && this._characterName !== '')
                this.updateNonmovingEffect();
        };
    }


    // CHARACTER BASE
    let Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        Game_CharacterBase_moveStraight.call(this,d);
        if (this.isMovementSucceeded()) this.prepMapEffect = true;
    };

    let Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
        Game_CharacterBase_moveDiagonally.call(this, horz, vert);
        if (this.isMovementSucceeded()) this.prepMapEffect = true;
    };

    Game_CharacterBase.prototype.updateNonmovingEffect = function() {
        this.prepMapEffect = false;
        this.doMapEffect();
    };


    Game_CharacterBase.prototype.mapEffectWords = function() {
        let words = [];

        if(this._mapEffectWords)
        {
            if(this._mapEffectWords.hasOwnProperty('page' + this._pageIndex))
                words.push(...this._mapEffectWords['page' + this._pageIndex]);

            if(this._mapEffectWords.note)
                words.push(this._mapEffectWords.note);
        }

        return words;
    };


    Game_CharacterBase.prototype.doMapEffect = function()
    {
        let rId = this.regionId();

        if(!Galv.MAE.regionAnims.hasOwnProperty(rId))
            return;

        if(!Galv.MAE.eRegions.allow.includes(rId))
            return;

        let denyWords = Galv.MAE.eRegions.denyWords[rId];
        let requireWords = Galv.MAE.eRegions.requireWords[rId];

        if (denyWords.some(w => this.mapEffectWords().includes(w)))
            return;

        if (requireWords.length > 0 && !requireWords.some(w => this.mapEffectWords().includes(w)))
            return;

        this.mapTriggerEffect(rId);
    };

    function executeFunctionByName(functionName, context) {
        let args = Array.prototype.slice.call(arguments, 2);
        let namespaces = functionName.split(".");
        let func = namespaces.pop();
        for(let i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }

    Game_CharacterBase.prototype.mapTriggerEffect = function(rId) {
        let delay = Galv.MAE.regionAnims[rId].maxDelay;

        delay = delay > 0 ? Math.randomInt(delay) : 0;

        setTimeout(() => {
            if(Galv.MAE.regionAnims[rId].callback)
                executeFunctionByName(Galv.MAE.regionAnims[rId].callback, window, rId, this.x, this.y);

            this.requestAnimation(Galv.MAE.regionAnims[rId].animation);
        }, delay);
    };


    // EVENT

    let Galv_Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        Galv_Game_Event_initialize.call(this,mapId,eventId);
        this.setupMapEffectWord();
    };

    // SETUP Allow and Deny words
    Game_Event.prototype.setupMapEffectWord = function()
    {
        this._mapEffectWords = {};

        // Event Notes
        let word = this.event().note ? this.event().note.match(/<w:(.*)>/i) : null;
        word = word ? word[1].trim() : "";
        this._mapEffectWords = { note: word };

        // Event Page Comment
        let pages = this.event().pages;

        for (let i = 0; i < pages.length; i++)
        {
            let page = pages[i];

            page.list.forEach(line => {
                if (line.code === 108)
                {
                    let word = line.parameters[0].match(/<w:(.*)>/i);

                    if (word)
                    {
                        if(!this._mapEffectWords.hasOwnProperty('page' + i))
                            this._mapEffectWords['page' + i] = [];

                        this._mapEffectWords['page' + i].push(word[1].trim());
                    }
                }
            });
        }
    };

    let Game_Event_updateStop = Game_Event.prototype.updateStop;

    Game_Event.prototype.updateStop = function()
    {
        if (this.prepMapEffect)
            this.updateNonmovingEffect();

        Game_Event_updateStop.call(this);
    };


    // PLAYER

    let Game_Player_update = Game_Player.prototype.update;

    Game_Player.prototype.update = function(sceneActive)
    {
        Game_Player_update.call(this,sceneActive);

        if (this.prepMapEffect && !this.isMoving())
            this.updateNonmovingEffect();
    };

    Game_Player.prototype.doMapEffect = function()
    {
        let rId = this.regionId();

        if(Galv.MAE.pRegions.allow.includes(rId))
            this.mapTriggerEffect(rId);
    };

    Game_Player.prototype.mapTriggerEffect = function(rId)
    {
        if (this.vehicle() && !this.vehicle().isAirship())
            this.vehicle().mapTriggerEffect(rId);
        else
            Game_CharacterBase.prototype.mapTriggerEffect.call(this,rId);
    };

})();