function validation() {
	const name = document.getElementById("tenSP").value;
	const price = document.getElementById("giaSP").value;
	const screen = document.getElementById("loaiManHinh").value;
	const backCamera = document.getElementById("backCamera").value;
	const frontCamera = document.getElementById("frontCamera").value;
	const img = document.getElementById("hinhAnhSP").value;
	const desc = document.getElementById("moTaSP").value;
	const type = document.getElementById("hangDT").value;

	const product = new Product(
		null,
		name,
		price,
		screen,
		backCamera,
		frontCamera,
		img,
		desc,
		type
	);

	var isValid = true;
	// Kiểm tra input tên sản phẩm không để trống
	if (!isRequired(product.name)) {
		isValid = false;
		document.getElementById("tbTenSP").innerHTML =
			"Vui lòng nhập tên sản phẩm";
	} else {
		document.getElementById("tbTenSP").innerHTML = "";
	}

	// Kiểm tra input giá sản phẩm không để trống và phải là số
	const isNum = /^[0-9]+$/;
	if (!isRequired(product.price)) {
		isValid = false;
		document.getElementById("tbGiaSP").innerHTML =
			"Vui lòng nhập giá sản phẩm";
	} else if (!isNum.test(product.price)) {
		isValid = false;
		document.getElementById("tbGiaSP").innerHTML =
			"Giá sản phẩm phải là số";
	} else {
		document.getElementById("tbGiaSP").innerHTML = "";
	}

	// Kiểm tra input loại màn hình không để trống
	if (!isRequired(product.screen)) {
		isValid = false;
		document.getElementById("tbLoaiManHinh").innerHTML =
			"Vui lòng nhập thông tin màn hình";
	} else {
		document.getElementById("tbLoaiManHinh").innerHTML = "";
	}

	// Kiểm tra input camera sau không để trống
	if (!isRequired(product.backCamera)) {
		isValid = false;
		document.getElementById("tbBackCamera").innerHTML =
			"Vui lòng nhập thông tin";
	} else {
		document.getElementById("tbBackCamera").innerHTML = "";
	}

	// Kiểm tra input camera trước không để trống
	if (!isRequired(product.frontCamera)) {
		isValid = false;
		document.getElementById("tbFrontCamera").innerHTML =
			"Vui lòng nhập thông tin";
	} else {
		document.getElementById("tbFrontCamera").innerHTML = "";
	}

	// Kiểm tra input hình ảnh không để trống
	if (!isRequired(product.img)) {
		isValid = false;
		document.getElementById("tbHinhAnhSP").innerHTML =
			"Vui lòng nhập link hình ảnh";
	} else {
		document.getElementById("tbHinhAnhSP").innerHTML = "";
	}

	// Kiểm tra input hãng điện thoại phải chọn
	if (!isRequired(product.type)) {
		isValid = false;
		document.getElementById("tbHangDT").innerHTML =
			"Vui lòng chọn hãng điện thoại";
	} else {
		document.getElementById("tbHangDT").innerHTML = "";
	}

	// Kiểm tra input mô tả không để trống
	if (!checkLength(product.desc.length, 5, 80)) {
		isValid = false;
		document.getElementById("tbMoTaSP").innerHTML =
			"Độ dài mô tả từ 5 - 80 ký tự";
	} else {
		document.getElementById("tbMoTaSP").innerHTML = "";
	}

	return isValid;
}

// Kiểm tra input trống
function isRequired(value) {
	if (value) {
		return true;
	}
	return false;
}

// Kiểm tra độ dài value
function checkLength(value, min, max) {
	if (value >= min && value < max) {
		return true;
	}
	return false;
}
