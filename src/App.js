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

	componentDidMount() {
		const appData = localStorage.getItem('appData');
		if (appData) {
			const { data, currentScreen } = JSON.parse(appData);
			this.setState({
				data,
				currentScreen
			});
		}
	}

	handler = (type, sectionData) => {
		const { data } = this.state;
		this.setState({
			data: {
				...data,
				[type]: JSON.parse(JSON.stringify(sectionData || {}))
			}
		});
	};

	saveData = () => {
		const { data, currentScreen } = this.state;
		localStorage.setItem('appData', JSON.stringify({ data, currentScreen }));
	};

	navHandler = (type) => {
		const { currentScreen } = this.state;
		const updateData = (obj) => {
			this.setState(obj, () => this.saveData());
		};
		if (type === 'next') {
			if (currentScreen === 1 && this.ref.personal.current.saveInfo()) {
				updateData({ currentScreen: currentScreen + 1 });
			}
			if (
				currentScreen === 2 &&
				this.ref.business.current.saveInfo() &&
				this.ref.card.current.saveInfo()
			) {
				updateData({ currentScreen: currentScreen + 1 });
			}
		} else if (type === 'back') {
			updateData({ currentScreen: currentScreen - 1 });
		} else {
			localStorage.removeItem('appData');
			updateData({ currentScreen: 1, data: {} });
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
