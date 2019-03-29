let StateMachine = function (definition) {
    this.definition = definition;
    this.currentState = null;
}

StateMachine.prototype.goto = function (start) {
    this.currentState = this.definition[start];
    this.currentState.in(this);
}

StateMachine.prototype.end = function (data) {
    this.currentState.out(this, data);
}

module.exports = StateMachine
