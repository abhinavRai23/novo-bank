import React from 'react';
import { addressArray, getName, regex } from '../utils';
import './SectionView.css';

class SectionView extends React.Component {
	state = {
		data: {},
		addressDisable: false,
		errorFields: []
	};

	componentDidMount() {
		const { completeDate = {}, prefix } = this.props;
		this.setState({
			data: JSON.parse(JSON.stringify(completeDate[prefix] || {}))
		});
	}

	validateSection = () => {
		const { data } = this.state;
		const {
			Fields: { fields },
			prefix,
			handler
		} = this.props;
		const map = {};
		fields.forEach((field) => {
			const name = getName(field.title);
			const value = data[name] || '';
			if (field.type !== 'radio' && field.type !== 'checkbox')
				map[name] = false;
			if (
				field.type === 'text' &&
				value.length <= field.maxLen &&
				value.length >= field.minLen
			) {
				if (field.validationType && regex.varchar.test(value)) {
					map[name] = true;
				}
				if (!field.validationType && regex.text.test(value)) {
					map[name] = true;
				}
			} else if (
				field.type === 'number' &&
				value <= field.maxValue &&
				value >= field.minValue
			) {
				map[name] = true;
			}
		});
		const errorFields = Object.keys(map).filter(
			(field) => map[field] === false
		);
		let isValid = !errorFields.length;
		if (isValid) {
			handler(prefix, this.state.data);
		}
		this.setState({
			errorFields
		});
		return isValid;
	};

	updateValue = ({ target: { name, value } = {} }, field) => {
		const { data } = this.state;
		const updateData = (name, value) => {
			this.setState(
				{
					data: {
						...data,
						[name]: value
					}
				},
				this.validateSection
			);
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

	handleRadio = ({ target: { name } = {} }, field) => {
		const { completeDate = {} } = this.props;
		const { onTrueAction: { copyFrom } = {} } = field;
		const { data } = this.state;
		const updateInfo = {};
		if (!data[name]) {
			addressArray.forEach((field) => {
				updateInfo[field] = completeDate?.[copyFrom.split('.')[0]]?.[field];
			});
			updateInfo[name] = name;
		} else {
			updateInfo[name] = '';
		}
		this.setState(
			{
				data: {
					...data,
					...updateInfo
				},
				addressDisable: !data[name]
			},
			this.validateSection
		);
	};

	render() {
		const { data, addressDisable, errorFields } = this.state;
		const {
			Fields: { title, fields }
		} = this.props;
		return (
			<div className="section">
				<div className="title">{title}</div>
				<div className="form">
					{!!errorFields.length && (
						<div style={{ color: 'red' }}>
							Error in: {errorFields.join(', ')}
						</div>
					)}
					{fields.map((field) => {
						const { title, type } = field;
						const name = getName(title);
						if (type === 'radio' || type === 'checkbox') {
							return (
								<div
									key={name}
									className="radio-group"
									style={{
										width: '200px',
										display: 'inline-block'
									}}
								>
									<input
										type={type}
										name={name}
										id={name}
										checked={!!data[name]}
										onChange={(e) => this.handleRadio(e, field)}
									/>
									<label>{title}</label>
								</div>
							);
						}
						return (
							<div className="form-group" key={name}>
								<label>{title}</label>
								<input
									type={type}
									name={name}
									disabled={addressArray.includes(name) && addressDisable}
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
