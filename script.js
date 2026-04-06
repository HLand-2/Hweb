async function init() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    renderPage(data);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

function renderPage(data) {
  const container = document.getElementById("content-container");
  const toc = document.getElementById("toc");
  const today = new Date().toLocaleDateString();

  // 1. Update Titles
  document.querySelectorAll(".t").forEach(el => el.innerText = `All about ${data.name}`);

  // 2. Clear & Build Content/ToC
  container.innerHTML = "";
  toc.innerHTML = `<input type="text" id="toc-search" placeholder="Search..." onkeyup="filterToC()"><ul id="toc-list"></ul>`;
  const tocList = document.getElementById("toc-list");

  data.content.forEach((topicObj, i) => {
    const tIdx = i + 1;
    const section = document.createElement("section");
    section.innerHTML = `<h2 id="t${tIdx}">${topicObj.topic}</h2>`;
    
    const tocItem = document.createElement("li");
    tocItem.innerHTML = `<a href="#t${tIdx}">${topicObj.topic}</a>`;
    const subList = document.createElement("ul");

    topicObj.points.forEach((pObj, j) => {
      const pIdx = j + 1;
      const pId = `t${tIdx}${pIdx}`;
      subList.innerHTML += `<li><a href="#${pId}">${pObj.title}</a></li>`;

      const h3 = document.createElement("h3");
      h3.style.cursor = "pointer";
      h3.id = pId;
      h3.innerHTML = `<span class="icon">▸</span> ${pObj.title}`;
      
      const p = document.createElement("p");
      p.className = "content-text";
      p.innerText = pObj.text;
      p.style.display = "none";

      h3.onclick = () => {
        const hidden = p.style.display === "none";
        p.style.display = hidden ? "block" : "none";
        h3.querySelector(".icon").innerText = hidden ? "▾" : "▸";
      };

      section.appendChild(h3);
      section.appendChild(p);
    });

    tocItem.appendChild(subList);
    tocList.appendChild(tocItem);
    container.appendChild(section);
  });

  // 3. Inject Print Footer
  const footer = document.createElement("div");
  footer.id = "print-footer";
  footer.innerText = `CONFIDENTIAL - Generated on ${today}`;
  document.body.appendChild(footer);

  // 4. Final CSS with Print Features
  const s = data.style;
  document.getElementById("sl").textContent = `
    body { background-color: ${s.mainBackgroundColor}; color: ${s.mainTextColor}; font-family: sans-serif; padding-bottom: 50px; }
    h1 { background-color: ${s.titleBackgroundColor}; color: ${s.titleTextColor}; padding: 15px; }
    h2 { background-color: ${s.subtitleBackgroundColor}; color: ${s.subtitleTextColor}; padding: 10px; }
    #toc { background: ${s.titleBackgroundColor}; padding: 10px; border-radius: 5px; margin: 20px 0; }
    #print-footer { display: none; }

    @media print {
      body { background: white !important; color: black !important; }
      #toc, button, #toc-search, .icon { display: none !important; }
      .content-text { display: block !important; border-left: 1px solid #ccc; padding-left: 10px; }
      
      /* Watermark */
      body::before {
        content: "DRAFT"; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 80pt; color: rgba(0,0,0,0.05); z-index: -1;
      }

      /* Confidential Footer */
      #print-footer { 
        display: block !important; position: fixed; bottom: 0; left: 0; width: 100%;
        text-align: center; font-size: 9pt; color: #666; border-top: 1px solid #eee; padding-top: 5px;
      }
      
      section { page-break-inside: avoid; margin-bottom: 20px; }
    }
  `;
}

function filterToC() {
  const q = document.getElementById("toc-search").value.toLowerCase();
  document.querySelectorAll("#toc-list li").forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function collapseAll() {
  document.querySelectorAll(".content-text").forEach(p => p.style.display = "none");
  document.querySelectorAll(".icon").forEach(i => i.innerText = "▸");
}

window.onload = init;
