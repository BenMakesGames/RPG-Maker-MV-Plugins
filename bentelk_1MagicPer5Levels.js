Game_Actor.prototype.paramBase = function(paramId) {
    let base = this.currentClass().params[paramId][this._level];

    if(paramId === 1)
        base += Math.floor(this._level / 5);

    return base;
};
