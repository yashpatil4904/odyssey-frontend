interface MergeSortStep {
  array: number[];
  mergeIndices?: {
    left: number[];
    right: number[];
    merged: number[];
  };
}

export function mergeSortVisualization(array: number[]): MergeSortStep[] {
  const steps: MergeSortStep[] = [];
  
  function mergeSort(arr: number[], start: number, end: number) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }

  function merge(arr: number[], start: number, mid: number, end: number) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    
    steps.push({
      array: [...arr],
      mergeIndices: {
        left: Array.from({ length: left.length }, (_, idx) => start + idx),
        right: Array.from({ length: right.length }, (_, idx) => mid + 1 + idx),
        merged: []
      }
    });

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      steps.push({
        array: [...arr],
        mergeIndices: {
          left: Array.from({ length: left.length - i }, (_, idx) => start + i + idx),
          right: Array.from({ length: right.length - j }, (_, idx) => mid + 1 + j + idx),
          merged: Array.from({ length: k - start + 1 }, (_, idx) => start + idx)
        }
      });
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        mergeIndices: {
          left: Array.from({ length: left.length - i }, (_, idx) => start + i + idx),
          right: [],
          merged: Array.from({ length: k - start + 1 }, (_, idx) => start + idx)
        }
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        mergeIndices: {
          left: [],
          right: Array.from({ length: right.length - j }, (_, idx) => mid + 1 + j + idx),
          merged: Array.from({ length: k - start + 1 }, (_, idx) => start + idx)
        }
      });
      j++;
      k++;
    }
  }

  mergeSort(array, 0, array.length - 1);
  return steps;
}

export function initializeMergeSortVisualization(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, step: MergeSortStep) {
  const width = svg.node()?.getBoundingClientRect().width || 800;
  const height = svg.node()?.getBoundingClientRect().height || 400;
  const padding = 40;

  const xScale = d3.scaleLinear()
    .domain([0, step.array.length - 1])
    .range([padding, width - padding]);

  const yScale = d3.scaleLinear()
    .domain([0, Math.max(...step.array)])
    .range([height - padding, padding]);

  // Create bars
  svg.selectAll('rect')
    .data(step.array)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d))
    .attr('width', (width - 2 * padding) / step.array.length - 2)
    .attr('height', d => height - padding - yScale(d))
    .attr('fill', '#4ADE80')
    .attr('rx', 4);

  // Add values on top of bars
  svg.selectAll('text')
    .data(step.array)
    .enter()
    .append('text')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d) - 5)
    .text(d => d)
    .attr('text-anchor', 'middle')
    .attr('fill', '#374151')
    .attr('font-size', '12px');
}

export function updateMergeSortVisualization(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, step: MergeSortStep) {
  const width = svg.node()?.getBoundingClientRect().width || 800;
  const height = svg.node()?.getBoundingClientRect().height || 400;
  const padding = 40;

  const xScale = d3.scaleLinear()
    .domain([0, step.array.length - 1])
    .range([padding, width - padding]);

  const yScale = d3.scaleLinear()
    .domain([0, Math.max(...step.array)])
    .range([height - padding, padding]);

  // Update bars
  const bars = svg.selectAll('rect')
    .data(step.array);

  bars.transition()
    .duration(500)
    .attr('y', d => yScale(d))
    .attr('height', d => height - padding - yScale(d))
    .attr('fill', (d, i) => {
      if (step.mergeIndices?.merged.includes(i)) return '#4ADE80';
      if (step.mergeIndices?.left.includes(i)) return '#60A5FA';
      if (step.mergeIndices?.right.includes(i)) return '#F472B6';
      return '#9CA3AF';
    });

  // Update values
  const texts = svg.selectAll('text')
    .data(step.array);

  texts.transition()
    .duration(500)
    .attr('y', d => yScale(d) - 5)
    .text(d => d);
} 