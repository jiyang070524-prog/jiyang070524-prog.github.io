(() => {
  const controls = [...document.querySelectorAll('.topic-filter')];
  const cards = [...document.querySelectorAll('.paper-card')];
  const reset = document.querySelector('.clear-filter');
  const status = document.querySelector('#filter-status');
  const graph = document.querySelector('#knowledge-graph');
  if (!controls.length || !cards.length || !reset || !status || !graph) return;

  const topicPositions = {
    memory: [170, 125], compute: [590, 125], branch: [1030, 125],
    verification: [285, 405], backend: [785, 405],
    compiler: [165, 685], rl: [585, 685], dl: [1030, 685]
  };
  const paperPositions = {
    1: [120, 270], 2: [380, 245], 3: [720, 245], 4: [1045, 275],
    5: [85, 510], 6: [540, 370], 7: [85, 790], 8: [370, 540],
    9: [755, 785], 10: [575, 540], 11: [1050, 790],
    12: [1030, 520], 13: [855, 535]
  };
  const ns = 'http://www.w3.org/2000/svg';
  const make = (name, attrs = {}, label = '') => {
    const element = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    if (label) element.textContent = label;
    return element;
  };
  const topics = controls.map((button, index) => ({
    id: button.dataset.topic, name: button.textContent.trim(), number: String(index + 1).padStart(2, '0'),
    position: topicPositions[button.dataset.topic]
  }));
  const papers = cards.map((card, index) => {
    const link = card.querySelector('h3 a');
    const order = Number(card.dataset.order);
    return {
      id: String(order), title: link.textContent.trim(), short: card.dataset.short,
      href: link.href, topics: card.dataset.topics.split(' '),
      position: paperPositions[order] || [120 + (index % 6) * 190, 870 + Math.floor((index - 13) / 6) * 170]
    };
  });
  const height = Math.max(840, ...papers.map(paper => paper.position[1] + 70));
  graph.setAttribute('viewBox', `0 0 1200 ${height}`);

  const background = make('g', {class: 'graph-background', 'aria-hidden': 'true'});
  [['硬件结构', 42], ['实现方法', 332], ['软件与学习', 617]].forEach(([label, y]) => {
    background.append(make('text', {x: 28, y, class: 'graph-level-label'}, label));
  });
  [295, 575].forEach(y => background.append(make('line', {x1: 28, y1: y, x2: 1172, y2: y, class: 'graph-guide'})));
  graph.append(background);

  const edges = make('g', {class: 'graph-edges', 'aria-hidden': 'true'});
  papers.forEach(paper => paper.topics.forEach(topicId => {
    const topic = topics.find(item => item.id === topicId);
    if (!topic || !topic.position) return;
    const [x1, y1] = topic.position;
    const [x2, y2] = paper.position;
    edges.append(make('line', {x1, y1, x2, y2, class: 'graph-edge', 'data-topic': topicId, 'data-paper': paper.id}));
  }));
  graph.append(edges);

  const topicLayer = make('g', {class: 'graph-topics'});
  topics.forEach(topic => {
    const [x, y] = topic.position;
    const link = make('a', {href: `?topic=${topic.id}#papers`, class: 'graph-topic', 'data-topic': topic.id, 'aria-label': `${topic.name}：筛选相关论文`});
    link.append(make('rect', {x: x - 74, y: y - 30, width: 148, height: 60, rx: 30}));
    link.append(make('text', {x, y: y - 4, class: 'graph-topic-name', 'text-anchor': 'middle'}, topic.name));
    link.append(make('text', {x, y: y + 17, class: 'graph-topic-count', 'text-anchor': 'middle'}, `${papers.filter(paper => paper.topics.includes(topic.id)).length} 篇论文`));
    link.addEventListener('click', event => { event.preventDefault(); selectTopic(topic.id); });
    link.addEventListener('mouseenter', () => highlight('topic', topic.id));
    link.addEventListener('mouseleave', () => highlight(active ? 'topic' : '', active));
    link.addEventListener('focus', () => highlight('topic', topic.id));
    link.addEventListener('blur', () => highlight(active ? 'topic' : '', active));
    topicLayer.append(link);
  });
  graph.append(topicLayer);

  const paperLayer = make('g', {class: 'graph-papers'});
  papers.forEach(paper => {
    const [x, y] = paper.position;
    const link = make('a', {href: paper.href, class: 'graph-paper', 'data-paper': paper.id, 'aria-label': `${paper.title}：打开论文便签`});
    link.append(make('circle', {cx: x, cy: y, r: 11}));
    link.append(make('text', {x, y: y + 30, class: 'graph-paper-name', 'text-anchor': 'middle'}, paper.short));
    link.append(make('title', {}, paper.title));
    link.addEventListener('mouseenter', () => highlight('paper', paper.id));
    link.addEventListener('mouseleave', () => highlight(active ? 'topic' : '', active));
    link.addEventListener('focus', () => highlight('paper', paper.id));
    link.addEventListener('blur', () => highlight(active ? 'topic' : '', active));
    paperLayer.append(link);
  });
  graph.append(paperLayer);

  const params = new URLSearchParams(location.search);
  let active = topics.some(topic => topic.id === params.get('topic')) ? params.get('topic') : '';
  function highlight(kind, id) {
    graph.classList.toggle('has-focus', Boolean(kind && id));
    graph.querySelectorAll('.graph-edge').forEach(edge => edge.classList.toggle('is-related', kind === 'topic' ? edge.dataset.topic === id : kind === 'paper' && edge.dataset.paper === id));
    graph.querySelectorAll('.graph-topic').forEach(node => node.classList.toggle('is-related', kind === 'topic' ? node.dataset.topic === id : kind === 'paper' && papers.find(paper => paper.id === id)?.topics.includes(node.dataset.topic)));
    graph.querySelectorAll('.graph-paper').forEach(node => node.classList.toggle('is-related', kind === 'paper' ? node.dataset.paper === id : kind === 'topic' && papers.find(paper => paper.id === node.dataset.paper)?.topics.includes(id)));
  }
  function render() {
    const selected = topics.find(topic => topic.id === active);
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === active)));
    let shown = 0;
    cards.forEach(card => {
      const match = !active || card.dataset.topics.split(' ').includes(active);
      card.hidden = !match;
      if (match) shown++;
    });
    reset.hidden = !active;
    status.textContent = selected ? `${selected.name} · ${shown} 篇论文。点击图中的论文可打开便签。` : '点击图中的方向，筛选下方论文；点击论文节点，打开它的便签。';
    highlight(active ? 'topic' : '', active);
  }
  function selectTopic(id) {
    active = active === id ? '' : id;
    render();
    document.querySelector('#papers').scrollIntoView({behavior: 'smooth'});
  }
  controls.forEach(button => button.addEventListener('click', () => selectTopic(button.dataset.topic)));
  reset.addEventListener('click', () => { active = ''; render(); });
  render();
})();
