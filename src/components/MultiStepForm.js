import React from 'react';
import FormFields from './formFields';
import SectionView from './SectionView/index';

function MultiStepForm({ currentScreen, data = {}, handler }) {
	if (currentScreen === 1)
		return (
			<SectionView
				Fields={FormFields.personal}
				prefix="personal"
				completeDate={data}
				handler={handler}
			/>
		);
	if (currentScreen === 2)
		return (
			<div>
				<SectionView
					Fields={FormFields.business}
					prefix="business"
					completeDate={data}
					handler={handler}
				/>
				<SectionView
					Fields={FormFields.card}
					prefix="card"
					completeDate={data}
					handler={handler}
				/>
			</div>
		);
	return <div>Final Review</div>;
}

export default MultiStepForm;
