let baseUrl = "https://629d56d03dda090f3c00c132.mockapi.io/api/Phones";

function getProductsAPI(search) {
	return axios({
		url: baseUrl,
		method: "GET",
		params: {
			name: search
		}
	});
}

function getListDetailAPI(idProduct) {
	return axios({
		url: `${baseUrl}/${idProduct}`,
		method: "GET"
	});
}

function addProductAPI(item) {
	return axios({
		url: baseUrl,
		data: item,
		method: "POST"
	});
}

function deleteProductAPI(idProduct) {
	return axios({
		url: `${baseUrl}/${idProduct}`,
		method: "DELETE"
	});
}

function updateProductAPI(item) {
	return axios({
		url: `${baseUrl}/${item.id}`,
		data: item,
		method: "PUT"
	});
}
