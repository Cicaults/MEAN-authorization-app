// Проверка, что пришли заполненные поля дынных
module.exports = function(dataToValidate){
	if (dataToValidate === undefined || dataToValidate === null) {
		return false;
	}

	if (typeof(dataToValidate) === "string" && dataToValidate.trim().length == 0) {
		return false;
	}

	if (typeof(dataToValidate) === "object" && !validateObject(dataToValidate)) {
		return false;
	}

	return true;
}

function validateObject(container) {
	for(let i in container){
		let item = container[i];
		if (item === undefined || item === null) {
			return false;
		}
		if (typeof(item) === "string" && item.trim().length == 0) {
			return false;
		}
	}

	return true;
}

