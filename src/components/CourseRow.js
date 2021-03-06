import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseEditor from '../containers/CourseEditor';

export default class CourseRow
    extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modified: ''
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick = () => {
        if (window.confirm("Do you want to delete the module?")) {
            this.props.delete(this.props.course.id);
        }
    }

    setTimeFormat(date) {
        if (date === null) {
            return;
        }

        let d = new Date(date);
        let today = new Date();

        let month = d.getMonth();
        let day = d.getDay();
        let hours = d.getHours();
        let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

        if (month === today.getMonth() && day === today.getDay()) {
            if (hours == 12) {
                return hours + ':' + minutes + ' PM';
            }
            else if (hours > 12) {
                return (hours - 12) + ':' + minutes + ' PM';
            }
            return hours + ':' + minutes + ' AM';
        }
        else {
            return new Intl.DateTimeFormat('en-US').format(d);
        }
    }

    render() {
        return (
            <tr>
                <td className="text-center">
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td className="text-center">Me</td>
                <td className="text-center">{this.setTimeFormat(this.props.course.modified)}</td>
                <td className="text-center">
                    {/*<i className="fa fa-pencil col-sm-1"></i>*/}
                    <i className="fa fa-trash col-sm-1" onClick={this.onDeleteClick}></i>
                </td>
            </tr>
        );
    }
}