const CompleteFormFields = {
	personal: {
		title: 'Personal Info',
		fields: [
			{
				title: 'Name',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'SSN',
				type: 'number',
				minValue: 111_111_111,
				maxValue: 999_999_999
			},
			{
				title: 'Address',
				type: 'text',
				validationType: 'varchar',
				maxLen: 100,
				minLen: 2
			},
			{
				title: 'City',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'State',
				type: 'text',
				maxLen: 2,
				minLen: 2
			},
			{
				title: 'Zip Code',
				type: 'number',
				maxValue: 99_999,
				minValue: 11_111
			}
		]
	},
	business: {
		title: 'Business Info',
		fields: [
			{
				title: 'Business Name',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'State Registered',
				type: 'text',
				maxLen: 2,
				minLen: 2
			},
			{
				title: 'Address',
				type: 'text',
				validationType: 'varchar',
				maxLen: 100,
				minLen: 2
			},
			{
				title: 'Same As Personal',
				type: 'radio',
				onTrueAction: {
					copyFrom: 'personal.Address',
					copyTo: 'business.Address'
				}
			},
			{
				title: 'City',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'State',
				type: 'text',
				maxLen: 2,
				minLen: 2
			},
			{
				title: 'Zip Code',
				type: 'number',
				maxValue: 99_999,
				minValue: 11_111
			}
		]
	},
	card: {
		title: 'Debit Card Info',
		fields: [
			{
				title: 'Business Name',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'Address',
				type: 'text',
				validationType: 'varchar',
				maxLen: 100,
				minLen: 2
			},
			{
				title: 'Same As Personal',
				type: 'radio',
				onTrueAction: {
					copyFrom: 'personal.Address',
					copyTo: 'card.Address'
				}
			},
			{
				title: 'Same As Bussiness',
				type: 'radio',
				onTrueAction: {
					copyFrom: 'business.Address',
					copyTo: 'card.Address'
				}
			},
			{
				title: 'City',
				type: 'text',
				maxLen: 30,
				minLen: 2
			},
			{
				title: 'State',
				type: 'text',
				maxLen: 2,
				minLen: 2
			},
			{
				title: 'Zip Code',
				type: 'number',
				maxValue: 99_999,
				minValue: 11_111
			}
		]
	}
};

export default CompleteFormFields;
