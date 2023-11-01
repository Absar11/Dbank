import { dbank_backend } from "../../declarations/dbank_backend";
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");

window.addEventListener("load", async function () {
  //console.log("Finished Loading");
  update();
  // const currentAmount = await dbank_backend.checkBalance();
  // document.getElementById("value").innerText =
  //   Math.round(currentAmount * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  //console.log("Submmit Button Clicked");

  const button = e.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(
    document.getElementById("withdrawl-amount").value
  );

  //button.setAttribute("disabled", true);
  loader.classList.add("active");
  container.classList.add("active");
  button.disabled = true;

  //function to add amount
  if (document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(inputAmount);
  }

  //function for withdraw
  if (document.getElementById("withdrawl-amount").value.length != 0) {
    await dbank_backend.withdrawl(outputAmount);
  }

  //function for compund
  await dbank_backend.compound();
  update();

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText =
    Math.round(currentAmount * 100) / 100;

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawl-amount").value = "";

  button.disabled = false;
  loader.classList.remove("active");
  container.classList.remove("active");
  //button.setAttribute("disabled", "");
});

async function update() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText =
    Math.round(currentAmount * 100) / 100;
}
