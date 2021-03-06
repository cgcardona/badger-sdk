"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import classes
var Web4Bch = require("web4bch");
var Button = /** @class */ (function () {
    function Button(config) {
        var restURL;
        if (config && config.restURL && config.restURL !== "") {
            this.restURL = config.restURL;
        }
        else {
            // config.restURL = "https://rest.bitcoin.com/v2/"
            this.restURL = "https://rest.bitcoin.com/v2/";
        }
        var web4bch;
        if (config && config.id && config.id !== "") {
            var badgerButton = document.getElementById(config.id);
            // let win: Window = window
            badgerButton.addEventListener("click", function (event) {
                var _this = this;
                if (typeof web4bch !== "undefined") {
                    web4bch = new Web4Bch(web4bch.currentProvider);
                    console.log("web4bch: ", web4bch);
                    var txParams = {
                        to: config.to ? config.to : this.getAttribute("data-to"),
                        from: web4bch.bch.defaultAccount,
                        value: config.satoshis
                            ? config.satoshis
                            : this.getAttribute("data-satoshis"),
                        opreturn: undefined
                    };
                    if (config.opreturn) {
                        txParams.opreturn = config.opreturn;
                    }
                    else if (this.getAttribute("data-opreturn")) {
                        txParams.opreturn = this.getAttribute("data-opreturn");
                    }
                    web4bch.bch.sendTransaction(txParams, function (err, res) {
                        if (err)
                            return;
                        var paywallId;
                        if (config.paywallId) {
                            paywallId = config.paywallId;
                        }
                        else if (_this.getAttribute("data-paywall-id")) {
                            paywallId = _this.getAttribute("data-paywall-id");
                        }
                        if (paywallId) {
                            var paywall = document.getElementById("paywall");
                            paywall.style.display = "block";
                        }
                        var successCallback;
                        if (config.callback) {
                            successCallback = config.callback;
                        }
                        else if (_this.getAttribute("data-callback")) {
                            successCallback = _this.getAttribute("data-callback");
                        }
                        if (successCallback) {
                            window[successCallback](res);
                        }
                    });
                }
                else {
                    window.open("https://badger.bitcoin.com");
                }
            });
        }
    }
    return Button;
}());
exports.default = Button;
