import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        };
    }

    //Handle input onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    };

    //onSubmit click handler
    onSubmit = e => {
        e.preventDefault();
        let data = {
            name: this.state.name, email: this.state.email, password: this.state.password
        };
        axios.post('/api/register', data).then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('_id', res.data._id);
            axios.defaults.headers.common = { 'Authorization': res.data.token };
            this.props.history.push('/');
        })
            .catch(err => {
                this.setState({ error: err.response.data.message });
            });
    };

    // Message for inputs validation

    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className="column column-50 column-offset-25">
                <h4> إنشاء حساب جديد</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>الأسم</label>
                    <input type="text" value={this.state.name} name="name" onChange={this.onChangeHandler} />
                    <label>البريد الإلكتروني</label>
                    <input type="email" value={this.state.email} name="email" onChange={this.onChangeHandler} />
                    <label>كلمة المرور</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.onChangeHandler} />
                    <input className="button-primary" type="submit" value="التسجيل" />

                </form>
            </div>
        );
    }
}
export default Register