const regex = {
	varchar: /^[a-zA-Z0-9s,'-/ ]*$/,
	text: /^[a-zA-z ]*$/
};

const getName = (title) => {
	return title.split(' ').join('_');
};

const addressArray = ['Address', 'City', 'State', 'Zip_Code'];

export { getName, addressArray, regex };
