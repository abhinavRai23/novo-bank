import React from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import NavigationButtons from './components/NavigationButtons';
const totalScreens = 3;

class App extends React.Component {
	state = {
		currentScreen: 1,
		data: {}
	};

	handler = (type) => {
		const { currentScreen } = this.state;
		if (type === 'next') {
			this.setState({ currentScreen: currentScreen + 1 });
		} else if (type === 'back') {
			this.setState({ currentScreen: currentScreen - 1 });
		} else {
			this.setState({ currentScreen: 1 });
		}
	};

	render() {
		const { currentScreen, data } = this.state;
		return (
			<div className="App">
				<MultiStepForm currentScreen={currentScreen} data={data} />
				<NavigationButtons
					currentScreen={currentScreen}
					handler={this.handler}
					totalScreens={totalScreens}
				/>
			</div>
		);
	}
}

export default App;
