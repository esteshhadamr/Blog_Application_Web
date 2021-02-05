import React from 'react';
import axios from 'axios';

// CreatePost Component
class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        this.state = {
            title: '',
            content: '',
            error: ''
        };
    }

    // Handle inputs onChange
    onChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    };

    // On Submit click listener.
    onSubmit = e => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            content: this.state.content
        };
        axios.post('/api/posts', data)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    // Message for inputs validation
    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className="column column-50 column-offset-25">
                <h4>إنشاء تدوينة</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>العنوان</label>
                    <input type="text" value={this.state.title} name="title" onChange={this.onChangeHandler} />
                    <label>المحتوى</label>
                    <textarea value={this.state.content} name="content" onChange={this.onChangeHandler}></textarea>
                    <input className="button-primary" type="submit" value="إنشاء التدوينة" />
                </form>
            </div>
        );
    }
}

export default CreatePost