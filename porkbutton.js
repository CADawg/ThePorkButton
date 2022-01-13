function parseBool(string="") {
    return string.toLowerCase() === "true";
}

// if fails, do a manual search -> https://porkbun.com/tld/3dom?q=ewse


window.addEventListener("load", async function (e) {
    const q$ = (selector) => document.querySelectorAll(selector);

    let porkButtons = q$(".porkbutton");

    let pbCount = 0;
    for (const porkButtonRef in porkButtons) {
        if (porkButtons.hasOwnProperty(porkButtonRef)) {
            pbCount++;
            let porkButton = porkButtons[porkButtonRef];
            const tld = porkButton.dataset.tld;
            const newTab = parseBool(porkButton.dataset.newtab || "false");
            let exampleText = porkButton.dataset.exampletext || "";
            if (exampleText === "") exampleText = "example";

            const textBox = document.createElement("input");
            const button = document.createElement("button");
            const searchBarDiv = document.createElement("div");
            const creditDiv = document.createElement("div");
            const credit = document.createElement("label");

            textBox.type = "text";
            textBox.className = "porkbutton-textbox";
            textBox.placeholder = exampleText + "." + tld;
            button.className = "porkbutton-button";
            button.innerText = "Search!";
            searchBarDiv.className = "porkbutton-searchbar";
            credit.innerHTML = "The PorkButton by <a href='https://kodomains.net' class='porkbutton-link' target='_blank' rel='noreferrer noopener'>KODomains</a>";
            credit.className = "porkbutton-credit";
            creditDiv.className = "porkbutton-credit-div";

            if (pbCount === 1) {
                const styles = document.createElement("style");
                styles.innerText = ".porkbutton{font-family:Arial,sans-serif;}.porkbutton-searchbar{display:flex;}.porkbutton * {box-sizing:border-box;} .porkbutton-textbox:focus{outline:none;} .porkbutton-textbox {flex-grow: 1; padding: 0 10px; border: 1px solid #EF7878; border-right: 0px; height: 55px;font-size: 20px;}" +
                    ".porkbutton-button{height:55px;background-color:#EF7878; border: 0; color: white; font-size: 20px;}.porkbutton-link{color:#EF7878}.porkbutton-credit{font-size:12px;margin-top: 3px;margin-left:auto;}" +
                    ".porkbutton-credit-div{display: flex;}.porkbun-credit-div div {flex-grow: 1;}.porkbutton-button:hover{background-color:#DC6070;}";

                porkButton.appendChild(styles);
            }

            searchBarDiv.appendChild(textBox);
            searchBarDiv.appendChild(button);
            porkButton.appendChild(searchBarDiv);
            creditDiv.appendChild(credit);
            creditDiv.appendChild(document.createElement("div"));
            if (!parseBool(porkButton.dataset.disablecredit)) porkButton.appendChild(creditDiv);

            button.removeEventListener("click", null);

            textBox.addEventListener("keypress", function (e) {
                if (e.key.toLowerCase() !== "enter") return;
                button.click();
            });

            button.addEventListener("click", function (e) {
                e.preventDefault();
                const textBox = q$(".porkbutton-textbox")[porkButtonRef];
                const url = "https://porkbun.com/tld/" + tld + "?q=" + encodeURIComponent(textBox.value);
                if (newTab) {
                    window.open(url);
                } else {
                    window.location.href = url;
                }
            }.bind(null, e, tld, newTab));
        }
    }
});