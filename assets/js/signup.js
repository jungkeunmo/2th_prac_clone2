let agg1 = false;
let agg2 = false;

const btn = document.getElementById("signupBtn-js");
const chk1 = document.getElementById("chk1-js");
const chk2 = document.getElementById("chk2-js");

const signupInit = () => {
    btn.style.pointerEvents = "none";
};

signupInit();

const checkBox1ClickHandler = (event) => {
    agg1 = event.target.checked;

    if (agg1 && agg2) {
        btn.style.pointerEvents = "auto";
    } else {
        btn.style.pointerEvents = "none";
    };
};

const checkBox2ClickHandler = (event) => {
    agg2 = event.target.checked;

    if (agg1 && agg2) {
        btn.style.pointerEvents = "auto";
    } else {
        btn.style.pointerEvents = "none";
    };
};

chk1.addEventListener("change", checkBox1ClickHandler);
chk2.addEventListener("change", checkBox2ClickHandler);