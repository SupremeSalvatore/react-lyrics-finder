import React, {Component} from 'react';
import axios from 'axios';
import {Consumer} from '../../context';
class Search extends Component {
	state = {
		trackTitle: ''
	};
	onChange = e => {
		e.preventDefault();
		this.setState({[e.target.name]: e.target.value});
	};
	findTrack = (dispatch, e) => {
		e.preventDefault();
		const {REACT_APP_API_KEY, REACT_APP_BASE_URL} = process.env;
		axios
			.get(
				`${REACT_APP_BASE_URL}track.search?q_track=${
					this.state.trackTitle
				}&page_size=3&page=1&s_track_rating=desc&apikey=${REACT_APP_API_KEY}`
			)
			.then(res => {
				dispatch({
					type: 'SEARCH_TRACKS',
					payload: res.data.message.body.track_list
				});
				this.setState({trackTitle: ''});
			})
			.catch(err => console.log(err));
	};
	render() {
		return (
			<Consumer>
				{value => {
					const {dispatch} = value;
					return (
						<div className="card card-body mb-4 p-4">
							<h1 className="display-4 text-center">
								<i className="fas fa-music" />
								Search For A Song
							</h1>
							<p className="lead text-center">Get the lyrics for any song</p>
							<form onSubmit={this.findTrack.bind(this, dispatch)}>
								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Song title..."
										name="trackTitle"
										value={this.state.trackTitle}
										onChange={this.onChange}
									/>
								</div>
								<button
									className="btn btn-primary btn-lg btn-block"
									type="submit"
								>
									Get Track Lyrics
								</button>
							</form>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default Search;
