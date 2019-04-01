import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

class Lyrics extends Component {
	state = {
		track: {},
		lyrics: {}
	};
	componentDidMount() {
		const {REACT_APP_API_KEY, REACT_APP_BASE_URL} = process.env;
		const {id} = this.props.match.params;
		axios
			.get(
				`${REACT_APP_BASE_URL}track.lyric.get?track_id=${id}&apikey=${REACT_APP_API_KEY}`
			)
			.then(res => {
				console.log(res.data);
				this.setState({lyrics: res.data.message.body.lyrics});
				return axios
					.get(
						`${REACT_APP_BASE_URL}track.get?track_id=${id}&apikey=${REACT_APP_API_KEY}`
					)
					.then(res => {
						this.setState({track: res.data.message.body.track});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}
	render() {
		const {track, lyrics} = this.state;
		if (
			track === undefined ||
			lyrics === undefined ||
			Object.keys(track).length === 0 ||
			Object.keys(track).length === 0
		) {
			return <Spinner />;
		} else {
			return (
				<Fragment>
					<Link to="/" className="btn btn-dark btn-sm mb-4">
						Go Back
					</Link>
					<div className="card">
						<h5 className="card-header">
							{track.track_name}by{' '}
							<span className="text-secondary">{track.artist_name}</span>
						</h5>
						<div className="card-body">
							<p className="card">{lyrics.lyrics_body}</p>
						</div>
					</div>
					<ul className="list-group mt-3">
						<li className="list-group-item">
							<strong>Album ID</strong>:{track.album_id}
						</li>
						<li className="list-group-item">
							<strong>Song Genre</strong>:
							{track.primary_genres.music_genre_list.length !== 0
								? track.primary_genres.music_genre_list[0].music_genre
										.music_genre_name
								: 'N/A'}
						</li>
						<li className="list-group-item">
							<strong>Explicit Words</strong>
							{track.explicit === 0 ? 'No' : 'Yes'}
						</li>
						<li className="list-group-item">
							<strong>Release Day</strong>:
							{track.first_release_date
								.replace(/-/g, '/')
								.replace(/(T00:00:00Z)/g, '')}
						</li>
					</ul>
				</Fragment>
			);
		}
	}
}

export default Lyrics;
