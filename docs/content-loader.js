document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('content.yaml');
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);

    // 1. Update simple text/html elements by data-key
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-key');
      const value = getNestedValue(content, key);
      if (value) {
        if (el.tagName === 'A' && key.endsWith('.text')) {
             // For links, we might have separate href keys, but here we just update text
             el.textContent = value;
        } else {
             el.innerHTML = value; // Using innerHTML to allow <br> tags
        }
      }
    });

    // 2. Render Research Pillars
    const researchGrid = document.getElementById('research-pillars-grid');
    if (researchGrid && content.research.pillars) {
      researchGrid.innerHTML = content.research.pillars.map((pillar, index) => `
        <article 
          class="rounded-xl bg-slate-900/50 border border-slate-800 p-5 hover:bg-slate-800/50 transition duration-300"
          data-aos="fade-up"
          data-aos-delay="${index * 50}"
        >
          <div class="text-3xl mb-4">${pillar.icon}</div>
          <h3 class="text-sm font-bold text-slate-100 mb-2">${pillar.title}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${pillar.description}
          </p>
        </article>
      `).join('');
    }

    // 2.5. Render Flywheel Steps
    const flywheelGrid = document.getElementById('flywheel-grid');
    if (flywheelGrid && content.flywheel && content.flywheel.steps) {
      flywheelGrid.innerHTML = content.flywheel.steps.map((step, index) => `
        <article 
          class="rounded-xl bg-slate-900/40 border border-slate-800 p-5 hover:border-amber-500/40 transition duration-300 flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="text-4xl mb-3">${step.icon}</div>
          <h3 class="text-sm font-bold text-amber-100 mb-2">${step.title}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${step.description}
          </p>
        </article>
      `).join('');
    }

    // 3. Render Consulting Flagship Lists
    const col1List = document.getElementById('consulting-flagship-col1');
    if (col1List && content.consulting.flagship.col1_items) {
      col1List.innerHTML = content.consulting.flagship.col1_items.map(item => `<li>${item}</li>`).join('');
    }

    const col2List = document.getElementById('consulting-flagship-col2');
    if (col2List && content.consulting.flagship.col2_items) {
      col2List.innerHTML = content.consulting.flagship.col2_items.map(item => `<li>${item}</li>`).join('');
    }

    // 4. Render Consulting Pillars
    const consultingGrid = document.getElementById('consulting-pillars-grid');
    if (consultingGrid && content.consulting.pillars) {
      consultingGrid.innerHTML = content.consulting.pillars.map((pillar, index) => `
        <article 
          class="rounded-xl bg-slate-900/80 border border-slate-700 p-6 shadow-lg transition duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="text-3xl mb-4">${pillar.icon}</div>
          <h3 class="text-base font-bold text-slate-100 mb-2">${pillar.title}</h3>
          <p class="text-sm text-slate-300">
            ${pillar.description}
          </p>
        </article>
      `).join('');
    }

    // 5. Render Team Members (Shuffled)
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && content.team.members) {
      const members = [...content.team.members];
      shuffleArray(members);
      
      teamGrid.innerHTML = members.map((member, index) => `
        <article class="p-4 flex flex-col items-start" data-aos="fade-up" data-aos-delay="${index * 50}">
          <div class="mb-4 w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 shadow-sm">
            <img 
              src="${member.photo}" 
              alt="${member.name}" 
              class="w-full h-full object-cover"
              onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random'"
            >
          </div>
          <h3 class="text-sm font-bold text-amber-100">${member.name}</h3>
          <p class="text-xs text-amber-400 mb-2">${member.role}</p>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${member.description}
          </p>
        </article>
      `).join('');
    }

    // Refresh AOS to account for new DOM elements
    setTimeout(() => {
        AOS.refresh();
    }, 100);

  } catch (e) {
    console.error('Error loading content:', e);
  }
});

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
