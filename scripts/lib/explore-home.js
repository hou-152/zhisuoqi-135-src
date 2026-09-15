/**
 * 探索首页轻量组件（v9）。
 * 只负责探索层视觉与交互，不持有内参/知识体系/实践空间数据。
 * 宿主通过 onOpenModule(module), onQuestion(text), onStart() 接入真实视图。
 */
export const EXPLORE_MODULES = [
  { id: 'neican', index: '01', title: '内参', desc: '每天读几篇，留下自己的判断。' },
  { id: 'knowledge', index: '02', title: '知识体系', desc: '把概念连起来，找到下一步。' },
  { id: 'practice', index: '03', title: '实践空间', desc: '沿着六章和七站路线，把理解用起来。' }
];

export function renderExploreHome(container, { onStart = () => {}, onOpenModule = () => {}, onQuestion = () => {} } = {}) {
  if (!container) throw new Error('renderExploreHome requires a container');
  container.innerHTML = `
    <section class="exp-home" aria-label="探索">
      <div class="exp-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="exp-copy">
        <p class="exp-kicker">知所栖 135 · 从一个问题开始</p>
        <h1>把好奇心，走成一条路</h1>
        <p class="exp-lede">先提出一个问题，再决定去读、去连接，还是去实践。</p>
        <form class="exp-question" data-exp-question>
          <label for="exp-question-input">你现在想弄懂什么？</label>
          <div class="exp-question-row"><input id="exp-question-input" name="question" autocomplete="off" placeholder="例如：AI 怎样持续行动？" /><button type="submit">开始探索</button></div>
        </form>
        <button class="exp-start" type="button" data-exp-start>先看看三块空间 <span>→</span></button>
      </div>
      <div class="exp-modules" data-exp-modules>
        ${EXPLORE_MODULES.map(m => `<button class="exp-module" type="button" data-exp-module="${m.id}"><span class="exp-index">${m.index}</span><span><strong>${m.title}</strong><small>${m.desc}</small></span><b>→</b></button>`).join('')}
      </div>
      <p class="exp-hint">可以随时回到这里，换一个入口继续。</p>
    </section>`;
  container.querySelector('[data-exp-start]').addEventListener('click', () => {
    container.querySelector('[data-exp-modules]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onStart();
  });
  container.querySelector('[data-exp-question]').addEventListener('submit', e => {
    e.preventDefault();
    const text = new FormData(e.currentTarget).get('question')?.toString().trim();
    if (text) onQuestion(text);
  });
  container.querySelectorAll('[data-exp-module]').forEach(btn => btn.addEventListener('click', () => onOpenModule(btn.dataset.expModule)));
  return container;
}

/** Pause visual motion when the exploration tab is hidden. */
export function bindExploreVisibility(container) {
  if (!container || typeof IntersectionObserver === 'undefined') return () => {};
  const observer = new IntersectionObserver(([entry]) => container.classList.toggle('is-offscreen', !entry.isIntersecting), { threshold: 0.01 });
  observer.observe(container);
  return () => observer.disconnect();
}
