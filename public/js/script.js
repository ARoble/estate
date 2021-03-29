console.log("hi");
document.getElementById("ptypes").addEventListener("change", function () {
  //document.getElementById("yeah").style.display = "none";
  console.log("You selected: ", this.value);
  if (this.value === "House") {
    document.getElementById("bed").style.display = "block";
    document.getElementById("bath").style.display = "block";
  } else if (this.value === "Office") {
    document.getElementById("bed").style.display = "none";
    document.getElementById("bath").style.display = "none";
  } else if (this.value === "Land") {
    document.getElementById("bed").style.display = "none";
    document.getElementById("bath").style.display = "none";
  }
});

// function validateForm(this) {
//   console.log("validate");
//   var title = document.getElementById("title").value;
//   var pType = document.getElementById("ptypes").value;
//   var status = document.getElementById("status").value;
//   var price = document.getElementById("price").value;
//   var area = document.getElementById("area").value;
//   var bedrooms = document.getElementById("bedrooms").value;
//   var bathrooms = document.getElementById("bathrooms").value;
//   // var imageCover = document.getElementById("imageCover").value;
//   // var images = document.getElementById("images").value;
//   var address = document.getElementById("address").value;
//   var neighbourhood = document.getElementById("neighbourhood").value;
//   var city = document.getElementById("city").value;
//   var description = document.getElementById("description").value;

//   const values = [
//     title,
//     pType,
//     status,
//     area,
//     address,
//     neighbourhood,
//     city,
//     description,
//   ];
//   console.log(values);
//   const errorMessages = [];
//   values.forEach(function (el) {
//     if (el === "") {
//       document.documentElement.scrollTop = 0;
//       document.getElementById("alert-box").style.display = "block";
//       console.log("gone");
//       return false;
//     }
//   });
// if (
//   title == "" ||
//   pType == "" ||
//   status == "" ||
//   area == "" ||
//   imageCover == "" ||
//   address == "" ||
//   neighbourhood == "" ||
//   city == "" ||
//   description == ""
// ) {
//   document.documentElement.scrollTop = 0;
//   document.getElementById("alert-box").style.display = "block";
//   return false;
// }

// if (pType === "House") {
//   document.getElementById("required-bath").style.display = "block";
//   document.getElementById("required-bed").style.display = "block";
//   return false;
// }
// var x = document.forms["myForm"]["title"].value;
// var y = document.forms["myForm"]["description"].value;
// var message;
// if (x == "") {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
//   alert("User mane");
//   return false;
// }
// }

function changedFile(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("image-cover");
    output.src = reader.result;
    console.log("image output" + output.src);
  };
  const image = reader.readAsDataURL(event.target.files[0]);
}

function changedFootage(event) {
  // var reader = new FileReader();
  // reader.onload = function () {
  //   var output = document.getElementById("drone-footage");
  //   output.src = reader.result;
  //   console.log("drone input" + output.src);
  // };
  // const image = reader.readAsDataURL(event.target.files[0]);
  document.getElementById("image-cover").src = "dsadasda";
}

function removeImage(imgNo) {
  document.getElementById(`display-image-${imgNo}`).style.display = "none";
  console.log("this is the event " + imgNo);

  return "<h1>Hello World!</h1>";
}

function addFile(event) {
  const value = document.getElementById("file-cover");
  console.log(value);
  console.log(value.files.length);
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("add-image");
    output.src = reader.result;
  };
  const image = reader.readAsDataURL(event.target.files[0]);

  var img = document.createElement("img");
  img.className = "img-fluid";
  img.src = "/public/img/imageCover-1616414155479.png";
  img.style.height = "500px";
  img.style.width = "500px";
  document.getElementById("manlike").appendChild(img);

  var div = document.createElement("div");
  div.className = "inlineDiv";
  div.style.backgroundColor = "blue";
  div.style.height = "500px";
  div.style.width = "500px";
  document.getElementById("manlike").appendChild(div);
}

const form = document.getElementById("property-form");

form.addEventListener("submit", (e) => {
  let messages = [];
  var title = document.getElementById("title").value;
  var pType = document.getElementById("ptypes").value;
  var status = document.getElementById("status").value;
  var price = document.getElementById("price").value;
  var area = document.getElementById("area").value;
  var bedrooms = document.getElementById("bedrooms").value;
  var bathrooms = document.getElementById("bathrooms").value;
  var imageCover = document.getElementById("imageCover").value;
  // var images = document.getElementById("images").value;
  var address = document.getElementById("address").value;
  var neighbourhood = document.getElementById("neighbourhood").value;
  var city = document.getElementById("city").value;
  var description = document.getElementById("description").value;

  const values = [
    title,
    pType,
    status,
    price,
    area,
    imageCover,
    address,
    neighbourhood,
    city,
    description,
  ];

  values.forEach(function (el) {
    if (el === "" || el == null) {
      messages.push("this is required");
    }
  });

  if (messages.length > 0) {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
    document.getElementById("alert-box").style.display = "block";
  }
});

const editForm = document.getElementById("property-form-edit");

editForm.addEventListener("submit", (e) => {
  let messages = [];
  var title = document.getElementById("title").value;
  var pType = document.getElementById("ptypes").value;
  var status = document.getElementById("status").value;
  var price = document.getElementById("price").value;
  var area = document.getElementById("area").value;

  var address = document.getElementById("address").value;
  var neighbourhood = document.getElementById("neighbourhood").value;
  var city = document.getElementById("city").value;
  var description = document.getElementById("description").value;

  const values = [
    title,
    pType,
    status,
    price,
    area,
    address,
    neighbourhood,
    city,
    description,
  ];

  values.forEach(function (el) {
    if (el === "" || el == null) {
      messages.push("this is required");
    }
  });

  if (messages.length > 0) {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
    document.getElementById("alert-box").style.display = "block";
  }
});
