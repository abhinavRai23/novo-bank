import React from 'react';
import './SectionView.css';

const regex = {
	varchar: /^[a-zA-Z0-9s,'-/ ]*$/,
	text: /^[a-zA-z ]*$/
};

const getName = (title) => {
	return title.split(' ').join('_');
};

class SectionView extends React.Component {
	state = {
		data: {},
		isValidate: false
	};

	componentDidMount() {
		const { completeDate = {}, prefix } = this.props;
		this.setState({
			data: JSON.parse(JSON.stringify(completeDate[prefix] || {}))
		});
	}

	validateSection = () => {
		const { data } = this.state;
		const { Fields } = this.props;
		const map = {};
		Fields.map((field) => {
			const name = getName(field.title);
			const value = data[name];
			if (field.type !== 'radio') map[name] = false;
			if (
				field.type === 'text' &&
				value.length <= field.maxLen &&
				value.length >= field.minLen
			) {
				if (field.validationType && regex.varchar.test(value)) {
					map[field] = true;
				}
				if (!field.validationType && regex.text.test(value)) {
					map[field] = true;
				}
			} else if (
				field.type === 'number' &&
				value <= field.maxValue &&
				value >= field.minValue
			) {
				map[field] = true;
			}
		});
		this.setState({
			isValidate: !Object.keys(map).filter((bool) => bool === false).length
		});
	};

	updateValue = ({ target: { name, value } = {} }, field) => {
		const { data } = this.state;
		const updateData = (name, value) => {
			this.setState({
				data: {
					...data,
					[name]: value
				}
			});
		};
		if (field.type === 'text' && value.length <= field.maxLen) {
			if (field.validationType && regex.varchar.test(value)) {
				updateData(name, value);
			}
			if (!field.validationType && regex.text.test(value)) {
				updateData(name, value);
			}
		} else if (field.type === 'number' && value <= field.maxValue) {
			updateData(name, value);
		} else if (field.type === 'radio') {
			updateData(name, value);
		}
	};

	render() {
		const { data } = this.state;
		const {
			Fields: { title, fields },
			prefix
		} = this.props;
		return (
			<div className="section">
				<div className="title">{title}</div>
				<div className="form">
					{fields.map((field) => {
						const { title, type } = field;
						const name = getName(title, prefix);
						return (
							<div className="form-group" key={name}>
								<label>{title}</label>
								<input
									type={type}
									name={name}
									value={data[name] || ''}
									onChange={(e) => this.updateValue(e, field)}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default SectionView;
