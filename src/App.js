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
	ref = {
		personal: React.createRef(),
		business: React.createRef(),
		card: React.createRef()
	};

	handler = (type, sectionData) => {
		const { data } = this.state;
		this.setState({
			data: {
				...data,
				[type]: JSON.parse(JSON.stringify(sectionData || {}))
			}
		});
	};

	navHandler = (type) => {
		const { currentScreen } = this.state;
		if (type === 'next') {
			if (currentScreen === 1 && this.ref.personal.current.validateSection()) {
				this.setState({ currentScreen: currentScreen + 1 });
			}
			if (
				currentScreen === 2 &&
				this.ref.business.current.validateSection() &&
				this.ref.card.current.validateSection()
			) {
				this.setState({ currentScreen: currentScreen + 1 });
			}
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
				<MultiStepForm
					currentScreen={currentScreen}
					data={data}
					handler={this.handler}
					ref={this.ref}
				/>
				<div className="button-group">
					<NavigationButtons
						currentScreen={currentScreen}
						handler={this.navHandler}
						totalScreens={totalScreens}
					/>
				</div>
			</div>
		);
	}
}

export default App;
