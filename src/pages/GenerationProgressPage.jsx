import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { api } from '../services/api';
import { Sparkles, BookOpen, Wand2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const GenerationProgressPage = () => {
  const { id: storyId } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const [story, setStory] = useState(null);
  const [status, setStatus] = useState('queued'); // 'queued' | 'writing' | 'illustrating' | 'complete' | 'failed'
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(4);
  const [statusMessage, setStatusMessage] = useState('Your storybook is queued in the studio...');
  const [pagesData, setPagesData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch initial story data
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.getStory(storyId);
        if (res.success && res.story) {
          const s = res.story;
          setStory(s);
          setStatus(s.status);
          setTotalPages(s.pageCount || 4);
          if (s.pages && s.pages.length > 0) {
            setPagesData(s.pages);
            const completedCount = s.pages.filter((p) => p.imageUrl).length;
            setCurrentPage(completedCount);
          }

          if (s.status === 'complete') {
            navigate(`/stories/${s._id}`);
          } else if (s.status === 'failed') {
            setError(s.errorReason || 'Generation encountered an issue.');
          }
        }
      } catch (err) {
        console.error('[Progress Fetch Error]', err);
        setError('Could not retrieve story status.');
      }
    };

    fetchStory();
  }, [storyId, navigate]);

  // Socket.io Real-Time Updates
  useEffect(() => {
    if (!socket || !storyId) return;

    // Join story room
    socket.emit('story:join', storyId);

    const handleStatus = (data) => {
      if (data.storyId === storyId) {
        setStatus(data.status);
        if (data.message) setStatusMessage(data.message);
        if (data.pageNumber !== null && data.pageNumber !== undefined) {
          setCurrentPage(data.pageNumber);
        }
        if (data.totalPages) {
          setTotalPages(data.totalPages);
        }
        if (data.pageData) {
          setPagesData((prev) => {
            const next = [...prev];
            const existingIdx = next.findIndex((p) => p.pageNumber === data.pageData.pageNumber);
            if (existingIdx >= 0) {
              next[existingIdx] = data.pageData;
            } else {
              next.push(data.pageData);
            }
            return next;
          });
        }
      }
    };

    const handleComplete = (data) => {
      if (data.storyId === storyId) {
        setStatus('complete');
        setStatusMessage('Your storybook is complete! Opening reader...');
        setTimeout(() => {
          navigate(`/stories/${storyId}`);
        }, 1500);
      }
    };

    const handleError = (data) => {
      if (data.storyId === storyId) {
        setStatus('failed');
        setError(data.message || 'Something went wrong during generation.');
      }
    };

    socket.on('story:status', handleStatus);
    socket.on('story:complete', handleComplete);
    socket.on('story:error', handleError);

    return () => {
      socket.emit('story:leave', storyId);
      socket.off('story:status', handleStatus);
      socket.off('story:complete', handleComplete);
      socket.off('story:error', handleError);
    };
  }, [socket, storyId, navigate]);

  // Calculate percentage:
  // Writing = 20%
  // Illustrating = 20% + (currentPage / totalPages) * 75%
  // Complete = 100%
  let progressPercent = 10;
  if (status === 'writing') progressPercent = 25;
  if (status === 'illustrating') {
    progressPercent = 25 + Math.round((currentPage / (totalPages || 4)) * 70);
  }
  if (status === 'complete') progressPercent = 100;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-parchment-pattern py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#FFFDF7] rounded-3xl p-8 sm:p-12 border-4 border-ink shadow-parchment-card text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-full h-full rounded-3xl bg-marigold border-3 border-ink flex items-center justify-center shadow-lg">
            {status === 'complete' ? (
              <CheckCircle2 className="w-12 h-12 text-meadow" />
            ) : status === 'failed' ? (
              <AlertCircle className="w-12 h-12 text-berry" />
            ) : (
              <Sparkles className="w-12 h-12 text-ink animate-spin" style={{ animationDuration: '4s' }} />
            )}
          </div>
          {status !== 'failed' && status !== 'complete' && (
            <span className="absolute -bottom-2 -right-2 p-2 bg-berry text-white rounded-full border-2 border-ink shadow animate-pulse">
              <Wand2 className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Title & Status Message */}
        <div className="space-y-2">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            {story?.title || 'Weaving Your Storybook...'}
          </h2>
          <p className="font-reading text-base sm:text-lg text-charcoal/90 leading-relaxed font-medium">
            {statusMessage}
          </p>
        </div>

        {/* Real-time Progress Bar */}
        {status !== 'failed' && (
          <div className="space-y-2">
            <div className="w-full h-5 bg-parchment-dark rounded-full border-2 border-ink overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-marigold via-berry to-meadow rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-wider text-ink/70">
              <span>{status === 'writing' ? 'Writing Story' : status === 'illustrating' ? 'Illustrating Artwork' : 'Status'}</span>
              <span>{progressPercent}% Complete</span>
            </div>
          </div>
        )}

        {/* Per-Page Tile Progress Checklist */}
        {status !== 'failed' && (
          <div className="pt-4 border-t border-ink/15">
            <h4 className="text-xs font-black uppercase tracking-wider text-ink/70 mb-4">
              Page-by-Page Progress ({currentPage}/{totalPages} illustrated)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                const isFinished = pageNum <= currentPage;
                const isCurrent = pageNum === currentPage + 1 && status === 'illustrating';
                const pageInfo = pagesData.find((p) => p.pageNumber === pageNum);

                return (
                  <div
                    key={pageNum}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      isFinished
                        ? 'bg-emerald-50 border-meadow shadow-sm'
                        : isCurrent
                        ? 'bg-amber-50 border-marigold ring-2 ring-marigold/50 animate-pulse'
                        : 'bg-parchment/30 border-ink/20 opacity-60'
                    }`}
                  >
                    {isFinished && pageInfo?.imageUrl ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-ink/40 shadow-inner">
                        <img src={pageInfo.imageUrl} alt={`Page ${pageNum}`} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-parchment-dark flex items-center justify-center border border-ink/20 font-display font-bold text-xs text-ink/70">
                        {isFinished ? '✓' : `P${pageNum}`}
                      </div>
                    )}
                    <span className="text-[11px] font-extrabold text-ink">
                      Page {pageNum}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Failed State Handling */}
        {status === 'failed' && (
          <div className="p-6 bg-rose-50 border-3 border-berry/40 rounded-2xl space-y-4">
            <p className="text-sm font-bold text-berry">
              {error || "We couldn't finish generating your storybook. Please try again!"}
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/create"
                className="px-6 py-2.5 bg-berry text-white font-bold text-sm rounded-xl border-2 border-ink shadow"
              >
                Try Another Story
              </Link>
            </div>
          </div>
        )}

        {/* Action button if complete */}
        {status === 'complete' && (
          <div className="pt-4">
            <button
              onClick={() => navigate(`/stories/${storyId}`)}
              className="px-8 py-3.5 bg-berry hover:bg-berry-dark text-white font-black text-base rounded-2xl border-3 border-ink shadow-lg transition-transform active:scale-95"
            >
              Open Storybook Reader ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
