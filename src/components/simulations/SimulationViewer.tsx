import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight, Info } from 'lucide-react';
import * as d3 from 'd3';
import { mergeSortVisualization } from './algorithms/mergeSort';
import { bfsVisualization } from './algorithms/bfs';

interface SimulationViewerProps {
  topic: {
    id: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

interface AlgorithmStep {
  array?: number[];
  nodes?: any[];
  edges?: any[];
  currentIndex?: number;
  visited?: Set<number>;
  queue?: number[];
  mergeIndices?: {
    left: number[];
    right: number[];
    merged: number[];
  };
}

export default function SimulationViewer({ topic, onClose }: SimulationViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [speed, setSpeed] = useState(1000); // milliseconds between steps

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous simulation
    d3.select(svgRef.current).selectAll("*").remove();

    // Initialize visualization based on topic.id
    switch (topic.id) {
      case 'merge-sort':
        const initialArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
        const mergeSortSteps = mergeSortVisualization(initialArray);
        setSteps(mergeSortSteps);
        initializeMergeSortVisualization(mergeSortSteps[0]);
        break;
      case 'bfs':
        const bfsSteps = bfsVisualization();
        setSteps(bfsSteps);
        initializeBFSVisualization(bfsSteps[0]);
        break;
    }
  }, [topic.id]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  useEffect(() => {
    if (steps[currentStep]) {
      switch (topic.id) {
        case 'merge-sort':
          updateMergeSortVisualization(steps[currentStep]);
          break;
        case 'bfs':
          updateBFSVisualization(steps[currentStep]);
          break;
      }
    }
  }, [currentStep, topic.id]);

  const initializeMergeSortVisualization = (step: AlgorithmStep) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    
    const width = svgRef.current.getBoundingClientRect().width;
    const height = svgRef.current.getBoundingClientRect().height;
    const padding = 40;

    const xScale = d3.scaleLinear()
      .domain([0, step.array!.length - 1])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...step.array!)])
      .range([height - padding, padding]);

    // Create bars
    svg.selectAll('rect')
      .data(step.array!)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', (width - 2 * padding) / step.array!.length - 2)
      .attr('height', d => height - padding - yScale(d))
      .attr('fill', '#4ADE80')
      .attr('rx', 4);

    // Add values on top of bars
    svg.selectAll('text')
      .data(step.array!)
      .enter()
      .append('text')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d) - 5)
      .text(d => d)
      .attr('text-anchor', 'middle')
      .attr('fill', '#374151')
      .attr('font-size', '12px');
  };

  const initializeBFSVisualization = (step: AlgorithmStep) => {
    if (!svgRef.current || !step.nodes) return;
    const svg = d3.select(svgRef.current);
    
    // Add edges
    svg.selectAll('line')
      .data(step.edges!)
      .enter()
      .append('line')
      .attr('x1', d => step.nodes![d.source].x)
      .attr('y1', d => step.nodes![d.source].y)
      .attr('x2', d => step.nodes![d.target].x)
      .attr('y2', d => step.nodes![d.target].y)
      .attr('stroke', '#9CA3AF')
      .attr('stroke-width', 2);

    // Add nodes
    svg.selectAll('circle')
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
  };

  const updateMergeSortVisualization = (step: AlgorithmStep) => {
    if (!svgRef.current || !step.array) return;
    const svg = d3.select(svgRef.current);
    
    const width = svgRef.current.getBoundingClientRect().width;
    const height = svgRef.current.getBoundingClientRect().height;
    const padding = 40;

    const xScale = d3.scaleLinear()
      .domain([0, step.array.length - 1])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...step.array)])
      .range([height - padding, padding]);

    // Update bars
    svg.selectAll('rect')
      .data(step.array)
      .transition()
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
    svg.selectAll('text')
      .data(step.array)
      .transition()
      .duration(500)
      .attr('y', d => yScale(d) - 5)
      .text(d => d);
  };

  const updateBFSVisualization = (step: AlgorithmStep) => {
    if (!svgRef.current || !step.nodes) return;
    const svg = d3.select(svgRef.current);

    // Update nodes
    svg.selectAll('circle')
      .data(step.nodes)
      .transition()
      .duration(500)
      .attr('fill', (d: any) => {
        if (d.id === step.current) return '#F472B6';
        if (step.visited?.has(d.id)) return '#4ADE80';
        if (step.queue?.includes(d.id)) return '#60A5FA';
        return '#9CA3AF';
      });

    // Update edges
    svg.selectAll('line')
      .data(step.edges!)
      .transition()
      .duration(500)
      .attr('stroke', (d: any) => {
        if (step.visited?.has(d.source) && step.visited?.has(d.target)) 
          return '#4ADE80';
        return '#9CA3AF';
      });
  };

  // Add a resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!svgRef.current || !steps[currentStep]) return;
      
      // Clear and reinitialize visualization
      d3.select(svgRef.current).selectAll("*").remove();
      if (topic.id === 'merge-sort') {
        initializeMergeSortVisualization(steps[currentStep]);
      } else if (topic.id === 'bfs') {
        initializeBFSVisualization(steps[currentStep]);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [steps, currentStep, topic.id]);

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Topics
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <Info className="w-5 h-5 mr-2" />
            {showInfo ? 'Hide' : 'Show'} Info
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <svg
                ref={svgRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMid meet"
              />
            </div>
            {/* Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsPlaying(false);
                  }}
                  className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full max-w-md mx-4">
                <input
                  type="range"
                  min="0"
                  max={steps.length - 1}
                  value={currentStep}
                  onChange={(e) => setCurrentStep(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1}/{steps.length}
              </span>
            </div>
          </div>

          {/* Information Panel */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {topic.title}
              </h2>
              <div className="prose prose-green">
                {/* Add detailed explanation based on topic.id */}
                <p>{topic.description}</p>
                {/* Add more content... */}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 