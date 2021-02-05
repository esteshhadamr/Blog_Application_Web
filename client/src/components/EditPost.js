import React from 'react';
import axios from 'axios';

//EditPost Component
class EditPost extends React.Component {

    constructor(props) {
        super(props);
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        this.state = {
            title: '',
            content: '',
            authorId: '',
            isLoading: true,
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
        axios.put('/api/posts/' + this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    //get post details
    componentDidMount() {
        axios.get('/api/posts/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    content: res.data.content,
                    authorId: res.data.author._id,
                    isLoading: false
                })
            })
    }

    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        if (this.state.isLoading) {
            return (<h4>الرجاء الإنتظار</h4>);
        }
        if (localStorage.getItem('_id') !== this.state.authorId) {
            return (<blockquote>خطأ 403</blockquote>);
        }
        return (
            <div className="column column-50 column-offset-25">
                <h4>تعديل تدوينة</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>العنوان</label>
                    <input type="text" value={this.state.title} name="title" onChange={this.onChangeHandler} />
                    <label>المحتوى</label>
                    <textarea value={this.state.content} name="content" onChange={this.onChangeHandler}></textarea>
                    <input className="button-primary" type="submit" value="تعديل التدوينة" />
                </form>
            </div>
        );
    }
}

export default EditPost