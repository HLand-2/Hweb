async function init() {
  const response = await fetch('config.json');
  const json = await response.json();
  const templateString = document.getElementById('main-template').innerHTML;
  
  document.body.innerHTML = _.template(templateString)({ 
    data: json, 
    date: new Date().toLocaleDateString('en-GB') 
  });

  const s = json['page-style'];
  document.getElementById("sl").textContent = `
    body { background-color: ${s['main-background-colour']}; color: ${s['main-text-colour']}; font-family: sans-serif; padding: 20px; line-height: 1.6; }
    h1 { background-color: ${s['title-background-colour']}; color: ${s['title-text-colour']}; padding: 15px; text-align: center; }
    h2 { background-color: ${s['subtitle-background-colour']}; color: ${s['subtitle-text-colour']}; padding: 10px; margin-top: 30px; scroll-margin-top: 20px; }
    
    #toc { background: ${s['title-background-colour']}; padding: 15px; border-radius: 8px; position: sticky; top: 10px; }
    #toc a { color: inherit; text-decoration: none; display: block; padding: 4px 0; }
    #toc a:hover, #toc a.active { color: ${s['subtitle-text-colour']}; font-weight: bold; }
    
    #back-to-top { 
      position: fixed; bottom: 20px; right: 20px; display: none;
      background: ${s['subtitle-background-colour']}; color: ${s['subtitle-text-colour']};
      border: none; padding: 10px 15px; cursor: pointer; border-radius: 50px;
    }

    @media print {
      body { background: white !important; color: black !important; }
      #toc, .controls, .icon, #back-to-top { display: none !important; }
      .content-text { display: block !important; border-left: 2px solid black; padding-left: 15px; }
    }
  `;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`#toc-list a[href="#${id}"]`);
      if (entry.isIntersecting && link) {
        document.querySelectorAll('#toc-list a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  document.querySelectorAll('h2, h3').forEach(el => observer.observe(el));

  window.onscroll = () => {
    const btn = document.getElementById("back-to-top");
    btn.style.display = (window.scrollY > window.innerHeight / 2) ? "block" : "none";
  };
}

window.toggle = (pId, iId) => {
  const p = document.getElementById(pId);
  const i = document.getElementById(iId);
  const isHidden = p.style.display === 'none';
  p.style.display = isHidden ? 'block' : 'none';
  i.innerText = isHidden ? '▾' : '▸';
};

window.onload = init;
