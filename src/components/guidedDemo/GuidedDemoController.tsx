import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  UserCheck, 
  Layers 
} from 'lucide-react';
import { useApp, DEMO_STEPS } from '../../context/AppContext';

export const GuidedDemoController: React.FC = () => {
  const { 
    isGuidedDemoActive, 
    demoStep, 
    stopGuidedDemo, 
    nextDemoStep, 
    prevDemoStep, 
    language,
    isAudioMuted,
    toggleAudioMute
  } = useApp();

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (!isGuidedDemoActive || !isAutoPlaying) return;

    const timer = setTimeout(() => {
      if (demoStep < DEMO_STEPS.length) {
        nextDemoStep();
      } else {
        setIsAutoPlaying(false);
      }
    }, 7500);

    return () => clearTimeout(timer);
  }, [isGuidedDemoActive, isAutoPlaying, demoStep, nextDemoStep]);

  if (!isGuidedDemoActive) return null;

  const currentStep = DEMO_STEPS.find(s => s.step === demoStep) || DEMO_STEPS[0];
  const progressPercent = ((demoStep) / DEMO_STEPS.length) * 100;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom-6 duration-200">
      <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/40 p-4 ring-1 ring-black/50">
        
        {/* Top Progress bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
          <div 
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono">
                  Step {demoStep} of {DEMO_STEPS.length}
                </span>
                {currentStep.targetRole && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    {currentStep.targetRole}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-100 mt-1">
                {language === 'hi' ? currentStep.titleHi : currentStep.titleEn}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed line-clamp-2">
                {language === 'hi' ? currentStep.descriptionHi : currentStep.descriptionEn}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudioMute}
              className={`p-2 rounded-lg border transition-colors ${
                !isAudioMuted 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={isAudioMuted ? 'Unmute voice narration' : 'Mute voice narration'}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Auto Play/Pause */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-lg border transition-colors ${
                isAutoPlaying 
                  ? 'bg-amber-950 text-amber-300 border-amber-700' 
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title={isAutoPlaying ? 'Pause Auto-Advance' : 'Play Auto-Advance'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Prev Step */}
            <button
              onClick={prevDemoStep}
              disabled={demoStep === 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Step */}
            <button
              onClick={nextDemoStep}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-900/40 transition-colors"
              title="Next Step"
            >
              <span>{demoStep === DEMO_STEPS.length ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Close */}
            <button
              onClick={stopGuidedDemo}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Exit Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
