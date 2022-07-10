let products = [];
main();
// Get data từ API
function main() {
	getProductsAPI().then(res => {
		products = res.data;
		for (let product of products) {
			product = new Product(
				product.id,
				product.name,
				product.price,
				product.screen,
				product.backCamera,
				product.frontCamera,
				product.img,
				product.desc,
				product.type
			);
		}
		display(products);
	});
}

// Hiển thị ra giao diện
function display(products) {
	const html = products.reduce((result, product) => {
		return (
			result +
			`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>$ ${Number(product.price).toLocaleString()}</td>
                    <td>
                        <img src="${product.img}" width="70px" height="70px">
                    </td>
                    <td>${product.desc}</td>
                    <td>
                        <button class="btn btn-gold" data-bs-toggle="modal" data-bs-target="#exampleModal" data-type="edit" data-id="${
							product.id
						}">Sửa</button>
                        <button class="btn btn-danger" data-type="delete" data-id="${
							product.id
						}">Xóa</button>
                    </td>
                </tr>
            `
		);
	}, "");
	document.getElementById("tbodySP").innerHTML = html;
}

// DOM value & tạo đối tượng
function domValue() {
	const id = document.getElementById("idSP").value;
	const name = document.getElementById("tenSP").value;
	const price = document.getElementById("giaSP").value;
	const screen = document.getElementById("loaiManHinh").value;
	const backCamera = document.getElementById("backCamera").value;
	const frontCamera = document.getElementById("frontCamera").value;
	const img = document.getElementById("hinhAnhSP").value;
	const desc = document.getElementById("moTaSP").value;
	const type = document.getElementById("hangDT").value;

	const product = new Product(
		id,
		name,
		price,
		screen,
		backCamera,
		frontCamera,
		img,
		desc,
		type
	);
	return product;
}

// Thêm sản phẩm
function addProduct() {
	const product = domValue();

	const isValid = validation();
	if (!isValid) {
		return;
	}

	addProductAPI(product)
		.then(res => {
			main();
			resetForm();
		})
		.catch(err => {
			console.log(err);
		});
}

// Xóa sản phẩm
function delProduct(idProduct) {
	deleteProductAPI(idProduct)
		.then(res => {
			main();
		})
		.catch(err => {
			console.log(err);
		});
}

// Sửa thông tin sản phẩm
function editProduct(idProduct) {
	// Khởi tạo 2 button cập nhật & đóng khi click button "Sửa"
	document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
	document.querySelector(".modal-footer").innerHTML = `
		<button class="btn btn-gold" data-type="update">Cập nhật</button>
		<button class="btn btn-secondary" data-bs-dismiss="modal" data-type="close">Đóng</button>
	`;

	getListDetailAPI(idProduct)
		.then(res => {
			let product = res.data;

			document.getElementById("idSP").value = product.id;
			document.getElementById("tenSP").value = product.name;
			document.getElementById("giaSP").value = product.price;
			document.getElementById("loaiManHinh").value = product.screen;
			document.getElementById("backCamera").value = product.backCamera;
			document.getElementById("frontCamera").value = product.frontCamera;
			document.getElementById("hinhAnhSP").value = product.img;
			document.getElementById("moTaSP").value = product.desc;
			document.getElementById("hangDT").value = product.type;
		})
		.catch(err => {
			console.log(err);
		});
}

// Cập nhật sản phẩm
function updateProduct() {
	const product = domValue();

	const isValid = validation();
	if (!isValid) {
		return;
	}

	updateProductAPI(product)
		.then(res => {
			main();
			resetForm();
		})
		.catch(err => {
			console.log(err);
		});
}

// Reset form
function resetForm() {
	document.getElementById("tenSP").value = "";
	document.getElementById("giaSP").value = "";
	document.getElementById("loaiManHinh").value = "";
	document.getElementById("backCamera").value = "";
	document.getElementById("frontCamera").value = "";
	document.getElementById("hinhAnhSP").value = "";
	document.getElementById("moTaSP").value = "";
	document.getElementById("hangDT").value = "";
}
function closeModal() {
	resetForm();
	document.getElementById("tbTenSP").innerHTML = "";
	document.getElementById("tbGiaSP").innerHTML = "";
	document.getElementById("tbLoaiManHinh").innerHTML = "";
	document.getElementById("tbBackCamera").innerHTML = "";
	document.getElementById("tbFrontCamera").innerHTML = "";
	document.getElementById("tbHinhAnhSP").innerHTML = "";
	document.getElementById("tbMoTaSP").innerHTML = "";
	document.getElementById("tbHangDT").innerHTML = "";
}

// DOM
// Khởi tạo 2 button thêm & hủy khi click button "Add Item"
document.getElementById("add-item").addEventListener("click", () => {
	document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
	document.querySelector(".modal-footer").innerHTML = `
		<button class="btn btn-gold" data-type="add">Thêm</button>
		<button class="btn btn-secondary" data-bs-dismiss="modal" data-type="close">Hủy</button>
	`;
});

// Lắng nghe sự kiện click tử button Thêm & Cập nhật
document.querySelector(".modal-footer").addEventListener("click", event => {
	const type = event.target.getAttribute("data-type");
	if (type === "add") {
		addProduct();
	}
	if (type === "update") {
		updateProduct();
	}
	if (type === "close") {
		closeModal();
	}
});

// Lắng nghe sự kiện click từ button xóa & sửa
document.getElementById("tbodySP").addEventListener("click", event => {
	const type = event.target.getAttribute("data-type");
	const id = event.target.getAttribute("data-id");
	if (type === "delete") {
		delProduct(id);
	}
	if (type === "edit") {
		editProduct(id);
	}
});

// Search
document.getElementById("txtSearch").addEventListener("keypress", event => {
	if (event.key !== "Enter") return;

	const value = event.target.value;
	getProductsAPI(value).then(res => {
		const newProducts = res.data;
		for (let product of newProducts) {
			product = new Product(
				product.id,
				product.name,
				product.price,
				product.screen,
				product.backCamera,
				product.frontCamera,
				product.img,
				product.desc,
				product.type
			);
		}
		display(newProducts);
	});
});
