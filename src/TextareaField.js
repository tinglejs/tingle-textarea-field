/**
 * Field Component for tingle
 * @author zhangshun
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const Context = require('tingle-context');
const Field = require('tingle-field');
const classnames = require('classnames');
const autosize = require('autosize');


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
            } = t.props;

        let style = {
            lineHeight: t.state.lineHeight + 'px',
            minHeight: t.state.lineHeight * t.props.minRows + 'px',
            maxHeight: t.state.lineHeight * t.props.maxRows + 'px'
        };

        return (
            <Field {...t.props} multiLine={true}  className={classnames({
                'tTextareaField': true,
                'readOnly': readOnly,
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

    componentDidMount() {
        let t = this;
        // 设置autosize
        let textareaEl = React.findDOMNode(t.refs.textarea);
        autosize(textareaEl);
    }

    // 销毁
    componentWillUnmount() {
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
    lineHeight: 24
};

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
};

TextareaField.displayName = 'TextareaField';

module.exports = TextareaField;
