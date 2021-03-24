import React from 'react';
import FormFields from './formFields';

function MultiStepForm({ currentScreen }) {
	if (currentScreen === 1) return <div>Personal Info</div>;
	if (currentScreen === 2) return <div>Business Info + Card Info</div>;
	return <div>Final Review</div>;
}

export default MultiStepForm;
