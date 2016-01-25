function LexicalError(what, where) {
    this.error = {what, where};
}

LexicalError.prototype.throw = function () {
    console.warn(`[ MathScript ] LEXICAL ERROR: ${this.error.what} at ${this.error.where+1}`);
};

module.exports = {
    LexicalError: LexicalError
};