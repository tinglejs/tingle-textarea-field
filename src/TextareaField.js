/**
 * Field Component for tingle
 * @auther zhangshun
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var Context = require('tingle-context');
var Field = require('tingle-field');
var classnames = require('classnames');

var autosize = require('autosize');

class TextareaField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineHeight: props.lineHeight
        };
    }

    render() {
        var t = this;
        let {
            placeholder, label, readOnly
        } = this.props;
        
        let style = {
            lineHeight: t.state.lineHeight + 'px',
            minHeight: t.state.lineHeight * t.props.minRows,
            maxHeight: t.state.lineHeight * t.props.maxRows
        };

        return (
            <Field  {...t.props}  className={classnames({
                    'tTextareaField': true,
                    'readOnly':readOnly,
                    [t.props.className]: !!t.props.className
                })}>
                    <textarea ref="textarea"
                    className="tTextareaFieldContent tFC9" 
                    style={style}
                    placeholder={placeholder}
                    value={t.props.value} 
                    readOnly={readOnly}
                    rows={t.props.minRows}
                    onChange={t.handleChange.bind(t)} 
                    onFocus={t.handleFocus.bind(t)}
                    onBlur={t.handleBlur.bind(t)}/>
            </Field>
        );
    }

    /**
     * 重新调整高度
     * @return {[type]} [description]
     */
    componentDidMount() {
        // 设置autosize
        var t = this;
        var textareaEl = React.findDOMNode(t.refs.textarea);
        autosize(textareaEl);
    }

    componentWillUnmount() {
        // 销毁
        autosize.destroy(React.findDOMNode(this.refs.textarea));
    }

    handleChange(e) {
        this.props.onChange(e.target.value, e);
    }

    handleFocus(e) {
        this.props.onFocus(e);
    }

    handleBlur(e) {
        this.props.onBlur(e);
    }

}

TextareaField.defaultProps = {
    value: "",
    placeholder: "",
    onChange: Context.noop,
    onFocus: Context.noop,
    onBlur: Context.noop,
    readOnly: false,
    minRows: 1,
    maxRows: 10,
    lineHeight: 22
}

// http://facebook.github.io/react/docs/reusable-components.html
TextareaField.propTypes = {
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    minRows: React.PropTypes.number,
    maxRows: React.PropTypes.number,
    lineHeight: React.PropTypes.number
}

module.exports = TextareaField;
