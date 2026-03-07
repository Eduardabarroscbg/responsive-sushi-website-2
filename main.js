const header = document.getElementById('header');
      const scrollUp = document.getElementById('scrollUp');
      window.addEventListener('scroll', () => {
         header.classList.toggle('scrolled', scrollY > 50);
         scrollUp.classList.toggle('show', scrollY > 300);
      });
      scrollUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      const navToggle = document.getElementById('navToggle');
      const navDrawer = document.getElementById('navDrawer');
      const navDrawerClose = document.getElementById('navDrawerClose');
      const navOverlay = document.getElementById('navOverlay');

      function openDrawer() { navDrawer.classList.add('open'); navOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
      function closeDrawer() { navDrawer.classList.remove('open'); navOverlay.classList.remove('open'); document.body.style.overflow = ''; }

      navToggle.addEventListener('click', openDrawer);
      navDrawerClose.addEventListener('click', closeDrawer);
      navOverlay.addEventListener('click', closeDrawer);

      document.querySelectorAll('.nav__drawer-link').forEach(link => {
         link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            closeDrawer();
            setTimeout(() => {
               const target = document.querySelector(href);
               if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
         });
      });

      function handleSubscribe() {
         const input = document.getElementById('emailInput');
         const msg = document.getElementById('emailMsg');
         const val = input.value.trim();
         const show = (text, ok) => {
            msg.style.display = 'block';
            msg.style.background = ok ? '#edfaf1' : '#fff0f0';
            msg.style.color = ok ? '#1a7a3e' : '#c1273a';
            msg.style.border = ok ? '1px solid #a8e6be' : '1px solid #f5b8be';
            msg.innerHTML = (ok ? '✅ ' : '⚠️ ') + text;
         };
         if (!val) { show('Por favor, digite seu e-mail antes de assinar.', false); input.focus(); return; }
         if (!val.includes('@')) { show('E-mail inválido: falta o símbolo @. Ex: nome@email.com', false); input.focus(); return; }
         const parts = val.split('@');
         if (parts[0].length === 0) { show('E-mail inválido: insira um nome antes do @.', false); input.focus(); return; }
         if (!parts[1] || !parts[1].includes('.')) { show('E-mail inválido: o domínio precisa ter um ponto. Ex: nome@gmail.com', false); input.focus(); return; }
         if (parts[1].split('.').pop().length < 2) { show('E-mail inválido: extensão muito curta. Ex: .com, .br, .net', false); input.focus(); return; }
         const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
         if (!re.test(val)) { show('Formato de e-mail inválido. Verifique e tente novamente.', false); input.focus(); return; }
         show('Obrigado! Seu e-mail <strong>' + val + '</strong> foi cadastrado com sucesso. 🎉', true);
         input.value = '';
         input.disabled = true;
         document.getElementById('subBtn').disabled = true;
         document.getElementById('subBtn').style.opacity = '0.5';
         setTimeout(() => {
            input.disabled = false;
            document.getElementById('subBtn').disabled = false;
            document.getElementById('subBtn').style.opacity = '1';
            msg.style.display = 'none';
         }, 5000);
      }

      document.addEventListener('DOMContentLoaded', () => {
         const ei = document.getElementById('emailInput');
         if (ei) ei.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubscribe(); });
      });

      document.querySelectorAll('.menu__flt').forEach(btn => {
         btn.addEventListener('click', () => {
            document.querySelectorAll('.menu__flt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.f;
            document.querySelectorAll('.menu__card').forEach(card => {
               card.style.display = (f === 'all' || card.dataset.cat === f) ? 'block' : 'none';
            });
         });
      });

      const obs = new IntersectionObserver(entries => {
         entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));