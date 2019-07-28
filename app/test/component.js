(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(module, exports) :
        typeof define === 'function' && define.amd ? define(['module', 'exports'], factory) :
        (factory(global, global.exports = global.exports || {}));
}(this, (function(module, exports) {

    /* append style */


    (function() {
        var style = document.createElement('style');
        style.innerText = 'input {    border-radius: 12px;}label {    font-size: 24px;}';
        document.querySelector('head').appendChild(style);
    })();



    /* get render function */
    var _module1 = {
        exports: {}
    };
    (function(module, exports) {


        module.exports = {
            render: function() {
                var _vm = this;
                var _h = _vm.$createElement;
                var _c = _vm._self._c || _h;
                return _c('div', [_c('input', {
                    attrs: {
                        "type": "button",
                        "value": "Increment"
                    },
                    on: {
                        "click": function($event) {
                            _vm.Increment()
                        }
                    }
                }), _vm._v(" "), _c('label', [_vm._v(" count: " + _vm._s(_vm.count) + " ")])])
            },
            staticRenderFns: [

            ]
        };


    })(_module1, _module1.exports);

    /* get script output data */
    var _module2 = {
        exports: {}
    };
    (function(module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            data: function data() {
                return {
                    count: 0
                };
            },

            methods: {
                Increment: function Increment() {
                    this.count++;
                }
            }
        };
    })(_module2, _module2.exports);

    var obj = _module2.exports.default || _module2.exports;
    obj.render = _module1.exports.render;
    obj.staticRenderFns = _module1.exports.staticRenderFns;

    module.exports = obj;
})));