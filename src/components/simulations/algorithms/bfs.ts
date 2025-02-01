interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  source: number;
  target: number;
}

interface BFSStep {
  nodes: Node[];
  edges: Edge[];
  visited: Set<number>;
  queue: number[];
  current: number | null;
}

export function bfsVisualization(): BFSStep[] {
  // Create a sample graph
  const nodes: Node[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.cos(2 * Math.PI * i / 8) * 150 + 200,
    y: Math.sin(2 * Math.PI * i / 8) * 150 + 200
  }));

  const edges: Edge[] = [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 1, target: 3},
    {source: 1, target: 4},
    {source: 2, target: 5},
    {source: 2, target: 6},
    {source: 3, target: 7}
  ];

  const steps: BFSStep[] = [];
  const visited = new Set<number>();
  const queue: number[] = [0];
  
  steps.push({
    nodes,
    edges,
    visited: new Set(visited),
    queue: [...queue],
    current: null
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.add(current);

    steps.push({
      nodes,
      edges,
      visited: new Set(visited),
      queue: [...queue],
      current
    });

    // Find neighbors
    const neighbors = edges
      .filter(edge => edge.source === current && !visited.has(edge.target))
      .map(edge => edge.target);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }

    steps.push({
      nodes,
      edges,
      visited: new Set(visited),
      queue: [...queue],
      current
    });
  }

  return steps;
}

export function initializeBFSVisualization(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, step: BFSStep) {
  // Add edges
  svg.selectAll('line')
    .data(step.edges)
    .enter()
    .append('line')
    .attr('x1', d => step.nodes[d.source].x)
    .attr('y1', d => step.nodes[d.source].y)
    .attr('x2', d => step.nodes[d.target].x)
    .attr('y2', d => step.nodes[d.target].y)
    .attr('stroke', '#9CA3AF')
    .attr('stroke-width', 2);

  // Add nodes
  const nodes = svg.selectAll('circle')
    .data(step.nodes)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 20)
    .attr('fill', '#4ADE80')
    .attr('stroke', '#059669')
    .attr('stroke-width', 2);

  // Add node labels
  svg.selectAll('text')
    .data(step.nodes)
    .enter()
    .append('text')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.id)
    .attr('fill', 'white')
    .attr('font-weight', 'bold');
}

export function updateBFSVisualization(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, step: BFSStep) {
  // Update nodes
  svg.selectAll('circle')
    .transition()
    .duration(500)
    .attr('fill', (d: Node) => {
      if (d.id === step.current) return '#F472B6';
      if (step.visited.has(d.id)) return '#4ADE80';
      if (step.queue.includes(d.id)) return '#60A5FA';
      return '#9CA3AF';
    });

  // Update edges
  svg.selectAll('line')
    .transition()
    .duration(500)
    .attr('stroke', (d: Edge) => {
      if (step.visited.has(d.source) && step.visited.has(d.target)) return '#4ADE80';
      return '#9CA3AF';
    });
} 