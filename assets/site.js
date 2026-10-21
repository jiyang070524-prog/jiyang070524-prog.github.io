(() => {
  const buttons = [...document.querySelectorAll('.topic-node')];
  const cards = [...document.querySelectorAll('.paper-card')];
  const reset = document.querySelector('.clear-filter');
  const status = document.querySelector('#filter-status');
  if (!buttons.length || !cards.length || !reset || !status) return;
  const params = new URLSearchParams(location.search);
  let active = buttons.some(button => button.dataset.topic === params.get('topic')) ? params.get('topic') : '';
  function render() {
    const selected = buttons.find(button => button.dataset.topic === active);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === active)));
    let shown = 0;
    cards.forEach(card => {
      const match = !active || card.dataset.topics.split(' ').includes(active);
      card.hidden = !match;
      if (match) shown++;
    });
    reset.hidden = !active;
    status.textContent = selected ? `${selected.querySelector('strong').textContent} · ${shown} 篇论文。再次点击方向或点“显示全部”可清除筛选。` : '选定一个方向后，这里会留下相关论文。方向之间的交叉由论文上的标签串起来。';
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    active = active === button.dataset.topic ? '' : button.dataset.topic;
    render();
    document.querySelector('#papers').scrollIntoView({behavior: 'smooth'});
  }));
  reset.addEventListener('click', () => { active = ''; render(); });
  render();
})();
