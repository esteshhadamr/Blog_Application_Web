import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {

    // Handle Logout listener
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="navbar">
                    <ul>
                        <li><Link to="/">الرئيسية</Link></li>
                        <li><Link to="/post/create">إنشاء تدوينة</Link></li>
                        <li><a href="#logout" onClick={this.logout}>تسجيل الخروج</a></li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="navbar">
                <ul>
                    <li><Link to="/">الرئيسية</Link></li>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/register">التسجيل</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header)