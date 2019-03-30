let StateMachine = function (definition) {
    this.definition = definition;
    this.currentState = null;
}

StateMachine.prototype.goto = function (state) {
    this.currentState = this.definition[state];
    this.currentState.in(this);
}

StateMachine.prototype.end = function (data) {
    this.currentState.out(this, data);
}

module.exports = StateMachine
