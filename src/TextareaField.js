/**
 * Field Component for tingle
 * @author zhangshun
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

// 参考://https://github.com/LingyuCoder/react-as-textarea/blob/publish/0.0.7/src/lib/Textarea.jsx

const Context = require('tingle-context');
const Field = require('tingle-field');
const classnames = require('classnames');
const calculateHeight = require('./calculateHeight')

class TextareaField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: null
        };
    }

    render() {
        let t = this;
        let {
            placeholder, label, readOnly
            } = t.props;

        let style = {
            height: t.state.height
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
        this._resize();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this._resize();
        }
    }

    _resize() {
        this.setState(calculateHeight(React.findDOMNode(this.refs.textarea), this.props.minRows || this.props.rows, this.props.maxRows));
    }

    handleChange(e) {
        this._resize();
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
    maxRows: 10
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
    maxRows: React.PropTypes.number
};

TextareaField.displayName = 'TextareaField';

module.exports = TextareaField;