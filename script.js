const name = "{{YOURNAME}}"
const topics = [
    "{{TOPIC 1}}",
    "{{TOPIC 2}}",
    "{{TOPIC 3}}",
    "{{TOPIC 4}}"
]
const data = [
    "{{PARAGRAPH 1}}",
    "{{PARAGRAPH 2}}",
    "{{PARAGRAPH 3}}",
    "{{PARAGRAPH 4}}"
]
const style = {
    mdbc: "Main background colour",
    mdtc: "Main text colour",
    mtbc: "Title background colour",
    mttc: "Title text colour",
    stbc: "Subtitle background colour",
    sttc: "Subtitle text colour"
}
const styles = `
body {
    background-color: ${style[mdbc]};
    color: ${style[mdtc]};
}

h1 {
    background-color: ${style[mtbc]};
    color: ${style[mttc]};
}
h2 {
    background-color: ${style[stbc]};
    color: ${style[sttc]};
}
`
document.getElementById("t1").innerText = topics[0];
document.getElementById("t11").innerText = data[0]

document.getElementById("t2").innerText = topics[1];
document.getElementById("t22").innerText = data[1]

document.getElementById("t3").innerText = topics[2];
document.getElementById("t33").innerText = data[2]

document.getElementById("t4").innerText = topics[3];
document.getElementById("t44").innerText = data[3]

document.getElementById("sl").innerText = styles;
document.getElementsByClassName("t").innerText = `All about ${name}`;
