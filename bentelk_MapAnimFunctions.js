/*:
 * @plugindesc Custom functions for use with my modified GALV_MapAnimEffects
 * @author Ben Hendel-Doying
 *
 * @help Adds some methods I happen to find useful for my modified version of
 * Galv's "Map Animation Effects" plugin. It doesn't get much more specific to
 * my particular use case than this >_>
 */

function BenTelk_SplishSplash()
{
    const soundNames = [
        '204018__duckduckpony__footsteps-water-light-003',
        '204033__duckduckpony__footsteps-water-light-006',
        '204034__duckduckpony__footsteps-water-light-007',
        '204035__duckduckpony__footsteps-water-light-008'
    ];

    if(typeof this.index === 'undefined')
        this.index = 0;

    AudioManager.playSe({
        name: soundNames[this.index],
        volume: Math.randomInt(20) + 10,
        pitch: Math.randomInt(20) + 90,
        pan: 50,
    });

    // RPG Maker doesn't like to play the same SE twice; by iterating through the splash sounds
    // in order, we reduce the chances that RPG Maker doesn't play a sound. the random volume and
    // pitch shifts (above) help ensure that the effects do not sound repetitive, even though
    // they are being played in a consistent/repetitive order.
    this.index = (this.index + 1) % 4;
}