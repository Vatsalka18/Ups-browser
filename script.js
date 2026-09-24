document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    });
  });

  // Buy products are grouped into clear product categories for faster browsing.
  const solutionSection = document.querySelector('.solutions#solutions');
  const solutionGrid = solutionSection?.querySelector('.solution-grid');
  if (!solutionSection || !solutionGrid) return;

  const products = [
    {
      category: 'ups',
      number: '01',
      icon: 'battery-charging',
      title: 'UPS systems',
      description: 'Reliable uninterruptible power supplies for homes, offices, and critical equipment.',
      items: 'Online, line-interactive, and standby UPS options'
    },
    {
      category: 'pcbs',
      number: '02',
      icon: 'circuit-board',
      title: 'PCBs',
      description: 'Replacement and control boards to keep your power equipment performing at its best.',
      items: 'Main, control, charger, and inverter boards'
    },
    {
      category: 'sockets',
      number: '03',
      icon: 'plug-zap',
      title: 'Sockets',
      description: 'Safe, durable sockets and connectors for dependable power distribution.',
      items: 'Wall, industrial, modular, and replacement sockets'
    }
  ];

  solutionSection.querySelector('.eyebrow').textContent = '01 / Buy products';
  solutionSection.querySelector('h2').innerHTML = 'Shop by<br><span>product category.</span>';
  solutionSection.querySelector('.section-intro').textContent = 'Find the right power hardware quickly. Browse our UPS, PCB, and socket categories, then contact us for availability and expert guidance.';

  const filters = document.createElement('div');
  filters.className = 'product-filters';
  filters.setAttribute('role', 'tablist');
  filters.setAttribute('aria-label', 'Product categories');
  filters.innerHTML = [
    ['all', 'All products'],
    ['ups', 'UPS'],
    ['pcbs', 'PCBs'],
    ['sockets', 'Sockets']
  ].map(([value, label], index) => `<button class="product-filter${index === 0 ? ' is-active' : ''}" type="button" data-category="${value}" role="tab" aria-selected="${index === 0}">${label}</button>`).join('');

  solutionGrid.innerHTML = products.map((product) => `
    <article class="solution-card product-card" data-product-category="${product.category}">
      <div class="card-number">${product.number}</div>
      <i class="card-icon" data-lucide="${product.icon}"></i>
      <p class="product-category">${product.category}</p>
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <small>${product.items}</small>
      <a href="#contact" aria-label="Enquire about ${product.title}"><i data-lucide="arrow-up-right"></i></a>
    </article>
  `).join('');

  solutionGrid.parentNode.insertBefore(filters, solutionGrid);
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.product-filter');
    if (!button) return;
    const category = button.dataset.category;
    filters.querySelectorAll('.product-filter').forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-selected', String(active));
    });
    solutionGrid.querySelectorAll('[data-product-category]').forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.productCategory !== category;
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    .product-filters{display:flex;flex-wrap:wrap;gap:.65rem;margin:2rem 0 1.5rem}
    .product-filter{border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:999px;padding:.7rem 1.15rem;font:inherit;font-weight:600;cursor:pointer;transition:.2s ease}
    .product-filter:hover,.product-filter.is-active{background:var(--ink);border-color:var(--ink);color:var(--lime)}
    .product-card{position:relative}
    .product-card[hidden]{display:none}
    .product-category{color:var(--muted);font-size:.72rem!important;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin:1.1rem 0 .35rem!important}
    .product-card small{display:block;color:var(--muted);line-height:1.5;margin-top:1rem;max-width:18rem}
  `;
  document.head.appendChild(style);
  if (window.lucide) lucide.createIcons();
});
