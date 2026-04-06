// Move your JSON data directly into the script
const config = {
  "your-name": "Alex Smith",
  "page-content": [
    { 
      "topic-title": "Web Development",
      "sub-points": [
        { "point-title": "JavaScript", "point-text": "The logic layer of the web." },
        { "point-title": "React", "point-text": "A component-based library for building UIs." }
      ]
    }
  ],
  "page-style": {
    "main-background-colour": "#121212",
    "main-text-colour": "#e0e0e0",
    "title-background-colour": "#1f1f1f",
    "title-text-colour": "#bb86fc",
    "subtitle-background-colour": "#2c2c2c",
    "subtitle-text-colour": "#03dac6"
  }
};

function init() {
  const templateString = document.getElementById('main-template').innerHTML;
  
  // Render using Underscore
  document.body.innerHTML = _.template(templateString)({ 
    data: config, 
    date: new Date().toLocaleDateString('en-GB') 
  });

  const s = config['page-style'];
  document.getElementById("sl").textContent = `
    body { background-color: ${s['main-background-colour']}; color: ${s['main-text-colour']}; font-family: sans-serif; padding: 20px; line-height: 1.6; }
    h1 { background-color: ${s['title-background-colour']}; color: ${s['title-text-colour']}; padding: 15px; text-align: center; }
    h2 { background-color: ${s['subtitle-background-colour']}; color: ${s['subtitle-text-colour']}; padding: 10px; margin-top: 30px; scroll-margin-top: 20px; }
    #toc { background: ${s['title-background-colour']}; padding: 15px; border-radius: 8px; position: sticky; top: 10px; }
    #toc a { color: inherit; text-decoration: none; display: block; padding: 4px 0; }
    #toc a:hover, #toc a.active { color: ${s['subtitle-text-colour']}; font-weight: bold; }
    @media print {
      body { background: white !important; color: black !important; }
      #toc, .controls, .icon { display: none !important; }
      .content-text { display: block !important; border-left: 2px solid black; padding-left: 15px; }
    }
  `;
}

// Global UI helpers
window.toggle = (pId, iId) => {
  const p = document.getElementById(pId);
  const i = document.getElementById(iId);
  const isHidden = p.style.display === 'none';
  p.style.display = isHidden ? 'block' : 'none';
  i.innerText = isHidden ? '▾' : '▸';
};

window.onload = init;
