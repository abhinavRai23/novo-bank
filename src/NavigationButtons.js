import React from 'react';

function NavigationButtons({ currentScreen, handler, totalScreens }) {
	if (currentScreen === 1)
		return <button onClick={() => handler('next')}>Next</button>;
	if (currentScreen === totalScreens)
		return (
			<>
				<button onClick={() => handler('back')}>Back</button>
				<button onClick={() => handler('submit')}>Submit</button>
			</>
		);
	return (
		<>
			<button onClick={() => handler('back')}>Back</button>
			<button onClick={() => handler('next')}>Next</button>
		</>
	);
}

export default NavigationButtons;
