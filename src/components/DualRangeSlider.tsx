import React, { useState, useCallback } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  step = 1000,
  value,
  onChange,
  formatValue = (val) => val >= 1000000 ? '$1M+' : `$${(val / 1000)}K`
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const getPercentage = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValue = useCallback((percentage: number) => {
    const val = (percentage / 100) * (max - min) + min;
    return Math.round(val / step) * step;
  }, [min, max, step]);

  const [trackElement, setTrackElement] = useState<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackElement) return;

    const rect = trackElement.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = getValue(percentage);

    if (isDragging === 'min') {
      onChange([Math.min(newValue, value[1] - step), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue, value[0] + step)]);
    }
  }, [isDragging, trackElement, getValue, onChange, value, step]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full space-y-4">
      <div className="relative h-8 flex items-center">
        {/* Track */}
        <div 
          ref={setTrackElement}
          className="w-full h-2 bg-muted rounded-full relative"
        >
          {/* Active range */}
          <div
            className="absolute h-2 bg-gradient-primary rounded-full"
            style={{
              left: `${getPercentage(value[0])}%`,
              width: `${getPercentage(value[1]) - getPercentage(value[0])}%`
            }}
          />
          
          {/* Min handle */}
          <button
            className="absolute w-6 h-6 bg-primary border-2 border-primary-foreground rounded-full shadow-elegant hover:scale-110 transition-transform cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ left: `calc(${getPercentage(value[0])}% - 12px)`, top: '-8px' }}
            onMouseDown={() => setIsDragging('min')}
            aria-label="Minimum budget"
          />
          
          {/* Max handle */}
          <button
            className="absolute w-6 h-6 bg-primary border-2 border-primary-foreground rounded-full shadow-elegant hover:scale-110 transition-transform cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ left: `calc(${getPercentage(value[1])}% - 12px)`, top: '-8px' }}
            onMouseDown={() => setIsDragging('max')}
            aria-label="Maximum budget"
          />
        </div>
      </div>
      
      {/* Value display */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="font-medium text-primary">{formatValue(value[0])}</span>
        <span className="font-medium text-primary">{formatValue(value[1])}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;