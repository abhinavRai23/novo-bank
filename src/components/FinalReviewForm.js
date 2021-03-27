import { addressArray, getName } from './utils';

const shouldFieldRender = (section, name, value, data) => {
	debugger;
	if (
		section === 'business' ||
		(section === 'card' && data?.['Same_As_Personal'])
	) {
		if (addressArray.includes(name)) return false;
	}
};

function FinalReviewForm({ Fields, completeData }) {
	return (
		<div className="section">
			<div className="title">Review Info</div>
			{Object.keys(Fields).map((section) => {
				const { title, fields } = Fields[section];
				return (
					<div className="section">
						<div className="title" style={{ textAlign: 'left' }}>
							{title}
						</div>
						<div className="form" style={{ width: '400px' }}>
							{fields.map((field) => {
								const name = getName(field.title);
								const value = completeData?.[section]?.[name];
								if (
									field.type !== 'checkbox'
									// ||
									// shouldFieldRender(
									// 	section,
									// 	name,
									// 	value,
									// 	completeData?.[section]
									// )
								)
									return (
										<div
											className="form-group"
											style={{ justifyContent: 'left' }}
										>
											<div style={{ width: '150px' }}>{field.title}</div>
											<div style={{ width: '250px' }}>{value}</div>
										</div>
									);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FinalReviewForm;
