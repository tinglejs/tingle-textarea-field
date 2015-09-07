/**
 * TextareaField Component Demo for tingle
 * @author zhangshun
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
const GroupList = require('tingle-group-list');
const classnames = require('classnames');

const TextareaField = require('../src');

class Demo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            t1: ''
        }
    }

    handleChange(value, e) {
        this.setState({
            t1: value
        });
    }

    render() {
        var t = this;
        return (
            <div>
                <GroupList title="Label文字长度测试">
                    <TextareaField label="俩字" minRows={2} placeholder="设置2个行高"
                     value={t.state.t1}
                     onChange={t.handleChange.bind(t)}/>
                    <TextareaField label="三个字" minRows={2} maxRows={5} placeholder="3个行高 最大5个行高"
                     value={t.state.t1}
                     onChange={t.handleChange.bind(t)}/>
                    <TextareaField label="最多四个" placeholder="请输入"
                     value={t.state.t1}
                     onChange={t.handleChange.bind(t)}/>
                    <TextareaField  placeholder="请输入"
                     value={t.state.t1}
                     rows={3}/>
                </GroupList>
                
                <GroupList title="不可修改">
                    <TextareaField label="只读"
                     value="不能更改" readOnly={true}/>
                </GroupList>
            </div>
        );
    }
};

module.exports = Demo;
