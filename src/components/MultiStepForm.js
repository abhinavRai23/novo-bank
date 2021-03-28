import React from 'react';
import FinalReviewForm from './FinalReviewForm';
import FormFields from './formFields';
import SectionView from './SectionView/index';

const MultiStepForm = React.forwardRef(
	({ currentScreen, data = {}, handler }, ref) => {
		if (currentScreen === 1)
			return (
				<SectionView
					Fields={FormFields.personal}
					prefix="personal"
					completeData={data}
					handler={handler}
					ref={ref.personal}
					key={currentScreen}
				/>
			);
		if (currentScreen === 2)
			return (
				<div key={currentScreen}>
					<SectionView
						Fields={FormFields.business}
						prefix="business"
						completeData={data}
						handler={handler}
						ref={ref.business}
					/>
					<SectionView
						Fields={FormFields.card}
						prefix="card"
						completeData={data}
						handler={handler}
						ref={ref.card}
					/>
				</div>
			);
		return <FinalReviewForm Fields={FormFields} completeData={data} />;
	}
);

export default MultiStepForm;
