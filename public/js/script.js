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
