"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Radium = require("radium");
var React = require("react");
var css = require("./css_eb_valueslider");
var Icons_1 = require("../Icons/Icons");
var ValueSlider = (function (_super) {
    __extends(ValueSlider, _super);
    function ValueSlider(props) {
        var _this = _super.call(this) || this;
        var max = props.maxValue;
        var min = props.minValue;
        _this.state = {
            isDisabled: !!props.disabled,
            title: props.title,
            currentValue: !isNaN(props.currentValue) ? props.currentValue : (min + max) / 2,
            mouseMoveReady: false,
            currentXPos: 0,
            isEditBoxMounted: false,
            tmpValue: "",
            input_id: String(Math.random()),
            shiftPressed: false,
        };
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.mountEditValueBox = _this.mountEditValueBox.bind(_this);
        _this.unmountEditValueBoxSave = _this.unmountEditValueBoxSave.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleInputKeyPress = _this.handleInputKeyPress.bind(_this);
        _this.handleIconClick = _this.handleIconClick.bind(_this);
        _this.focusInput = _this.focusInput.bind(_this);
        _this.outsideEditValueBoxClick = _this.outsideEditValueBoxClick.bind(_this);
        return _this;
    }
    ValueSlider.prototype.render = function () {
        var mainBase = this.props.sizeH ? [css.MainBase, { width: this.props.sizeH + "px" }] : [css.MainBase];
        var noEditBoxSlider = (React.createElement("span", { style: [css.Draggable], onMouseDown: this.onMouseDown, onMouseMove: this.onMouseMove, onDoubleClick: this.mountEditValueBox, onMouseUp: this.onMouseUp, tabIndex: 0 }, this.state.currentValue));
        var EditBoxSlider = (React.createElement("span", { style: [css.Draggable] },
            React.createElement("input", { id: this.state.input_id, style: [css.InputField], value: this.state.tmpValue, ref: this.focusInput, onChange: this.handleInputChange, onKeyPress: this.handleInputKeyPress, onFocus: this.selectTextIfFocused, className: "extraui-valueslider__input" })));
        var IconComponentOpt = this.props.icon ? React.createElement(Icons_1.default, { type: this.props.icon }) : false;
        var IconComponentWithClick = this.props.icon && this.props.iconClick ?
            (React.createElement("span", { style: { cursor: "pointer" }, onClick: this.handleIconClick }, IconComponentOpt))
            : { IconComponentOpt: IconComponentOpt };
        return (React.createElement("div", null,
            React.createElement(Radium.StyleRoot, null,
                React.createElement("div", { style: mainBase },
                    React.createElement("span", { style: [css.Title] }, this.state.title),
                    IconComponentWithClick && IconComponentOpt ? IconComponentWithClick : null,
                    !this.state.isEditBoxMounted ? noEditBoxSlider : EditBoxSlider))));
    };
    ValueSlider.prototype.selectTextIfFocused = function (e) {
        e.target.select();
    };
    ValueSlider.prototype.focusInput = function (input) {
        return input && input.focus();
    };
    ValueSlider.prototype._updateStateAndNotify = function (currentValue) {
        var _this = this;
        if (!this.state.isDisabled) {
            if (this.props.minValue > currentValue) {
                currentValue = this.props.minValue;
            }
            if (this.props.maxValue < currentValue) {
                currentValue = this.props.maxValue;
            }
            if (this.props.notifyOnChange) {
                this.setState({ currentValue: currentValue }, function () {
                    _this.props.notifyOnChange(currentValue);
                });
            }
            else {
                this.setState({ currentValue: currentValue });
            }
        }
    };
    ValueSlider.prototype.onMouseDown = function (mouseEvent) {
        var max = this.props.maxValue;
        var min = this.props.minValue;
        this.setState({
            mouseMoveReady: true,
            initialXPos: mouseEvent.pageX,
            initialSliderValue: !isNaN(this.state.currentValue) ? this.state.currentValue : (min + max) / 2,
        });
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);
    };
    ValueSlider.prototype.onMouseMove = function (mouseEvent) {
        if (this.state.mouseMoveReady) {
            var initialValue = this.state.initialSliderValue;
            var initialX = this.state.initialXPos;
            var currX = mouseEvent.pageX;
            var modifier = this.state.shiftPressed ? 10 : 1;
            var currValue = initialValue + modifier * (currX - initialX);
            this._updateStateAndNotify(currValue);
        }
    };
    ValueSlider.prototype.onMouseUp = function (mouseEvent) {
        this.setState({
            mouseMoveReady: false,
        });
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
        if (this.props.slideDidEnd) {
            this.props.slideDidEnd();
        }
    };
    ValueSlider.prototype.mountEditValueBox = function () {
        var isEditBoxMounted = !this.state.isEditBoxMounted;
        this.setState({ isEditBoxMounted: isEditBoxMounted, tmpValue: this.state.currentValue });
        window.addEventListener("click", this.outsideEditValueBoxClick);
    };
    ValueSlider.prototype.unmountEditValueBoxSave = function () {
        var _this = this;
        var intValue = Number(this.state.tmpValue);
        if (!isNaN(intValue)) {
            this.setState({ currentValue: intValue }, function () {
                _this._updateStateAndNotify(intValue);
            });
        }
        var isEditBoxMounted = !this.state.isEditBoxMounted;
        this.setState({ isEditBoxMounted: isEditBoxMounted });
        window.removeEventListener("click", this.outsideEditValueBoxClick);
    };
    ValueSlider.prototype.outsideEditValueBoxClick = function (mouseEvent) {
        var targetId = mouseEvent.target.id;
        if (targetId !== this.state.input_id) {
            this.unmountEditValueBoxSave();
        }
    };
    ValueSlider.prototype.handleInputChange = function (e) {
        this.setState({ tmpValue: e.target.value });
    };
    ValueSlider.prototype.handleInputKeyPress = function (e) {
        if (e.key === "Enter") {
            this.unmountEditValueBoxSave();
        }
    };
    ValueSlider.prototype.handleIconClick = function (mouseEvent) {
        this.props.iconClick(mouseEvent);
    };
    return ValueSlider;
}(React.Component));
ValueSlider = __decorate([
    Radium
], ValueSlider);
exports.default = ValueSlider;
//# sourceMappingURL=ValueSlider.js.map