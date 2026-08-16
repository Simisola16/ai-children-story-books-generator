import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AvatarBuilder, AvatarPreview } from '../components/avatar/AvatarBuilder';
import { Sparkles, PlusCircle, Edit3, Trash2, X, Check, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

const DEFAULT_AVATAR = {
  skinTone: '#F5D0A9',
  hairStyle: 'curly',
  hairColor: '#3D2314',
  eyeColor: '#2E1F3D',
  outfitColor: '#F2A93B',
  accessory: 'none',
};

export const ChildProfilesPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [ageBand, setAgeBand] = useState('3-5');
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const res = await api.getChildren();
      if (res.success) {
        setChildren(res.children || []);
      }
    } catch (err) {
      console.error('[Children Fetch Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const openCreateModal = () => {
    setEditingChild(null);
    setName('');
    setAgeBand('3-5');
    setAvatar(DEFAULT_AVATAR);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (child) => {
    setEditingChild(child);
    setName(child.name);
    setAgeBand(child.ageBand);
    setAvatar(child.avatar || DEFAULT_AVATAR);
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingChild(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide the child's name");
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (editingChild) {
        await api.updateChild(editingChild._id, {
          name: name.trim(),
          ageBand,
          avatar,
        });
      } else {
        await api.createChild({
          name: name.trim(),
          ageBand,
          avatar,
        });
      }

      await fetchChildren();
      closeModal();
    } catch (err) {
      setError(err.message || 'Failed to save child profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (childId) => {
    if (!confirm('Are you sure you want to remove this child profile?')) return;
    try {
      await api.deleteChild(childId);
      setChildren((prev) => prev.filter((c) => c._id !== childId));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-pattern py-8 sm:py-12">
      <SEO
        title="Child Profiles & Avatar Studio"
        description="Customize avatar looks, hair styles, outfits, and manage child character profiles for personalized picture books."
        noIndex={true}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border-4 border-ink shadow-parchment-card">
          <div>
            <div className="inline-flex items-center gap-2 text-berry font-black text-xs uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-meadow" />
              <span>Characters Cast</span>
            </div>
            <h1 className="font-display font-black text-3xl text-ink">
              Child Profiles
            </h1>
            <p className="font-reading text-sm text-charcoal/80">
              Customize illustrated avatars with cute hairstyles, skin tones, and outfits.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-6 py-3 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Child Profile</span>
          </button>
        </div>

        {/* Profiles Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin mb-3" />
            <p className="font-bold text-sm text-ink/70">Loading profiles...</p>
          </div>
        ) : children.length === 0 ? (
          <div className="bg-[#FFFDF7] rounded-3xl p-12 border-3 border-ink text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto bg-parchment-dark rounded-2xl flex items-center justify-center border-2 border-ink">
              <Sparkles className="w-8 h-8 text-berry" />
            </div>
            <h3 className="font-display font-bold text-2xl text-ink">
              No Children Created Yet
            </h3>
            <p className="text-sm text-charcoal/80">
              Create your child's illustrated character to star in stories!
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-6 py-3 bg-berry hover:bg-berry-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow transition-all"
            >
              Build Illustrated Avatar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <div
                key={child._id}
                className="bg-[#FFFDF7] rounded-3xl p-6 border-4 border-ink shadow-parchment-card flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 mb-5">
                  <AvatarPreview avatar={child.avatar} size={110} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-black text-2xl text-ink truncate">
                      {child.name}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-parchment-dark text-ink text-xs font-black rounded-lg border border-ink/20 mt-1 mb-2">
                      Age Band: {child.ageBand}
                    </div>
                    <div className="text-[11px] font-bold text-charcoal/70 space-y-0.5">
                      <div>Style: {child.avatar?.hairStyle} hair</div>
                      {child.avatar?.accessory && child.avatar?.accessory !== 'none' && (
                        <div className="text-berry">Accessory: {child.avatar?.accessory}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink/15 flex items-center justify-between gap-2">
                  <Link
                    to={`/create?childId=${child._id}`}
                    className="flex-1 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-xs rounded-xl border-2 border-ink text-center shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Story</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => openEditModal(child)}
                    className="p-2.5 bg-parchment hover:bg-parchment-dark text-ink rounded-xl border-2 border-ink transition-colors"
                    title="Edit Child Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(child._id)}
                    className="p-2.5 bg-rose-50 hover:bg-rose-100 text-berry rounded-xl border-2 border-berry/40 transition-colors"
                    title="Delete Child Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Avatar Builder & Profile Details */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <div className="bg-[#FFFDF7] rounded-3xl border-4 border-ink shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 text-ink/60 hover:text-ink hover:bg-parchment rounded-xl border border-ink/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
                  {editingChild ? `Edit ${editingChild.name}'s Profile` : 'Create Child Character'}
                </h2>
                <p className="font-reading text-sm text-charcoal/80">
                  Build their illustrated look with swatches. No photos needed!
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border-2 border-berry/40 rounded-2xl text-berry text-sm font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                      Child's Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya, Ethan, Noah"
                      className="w-full px-4 py-3 bg-parchment/30 rounded-xl border-2 border-ink/30 focus:border-berry focus:bg-white focus:outline-none font-bold text-sm text-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                      Age Band
                    </label>
                    <select
                      value={ageBand}
                      onChange={(e) => setAgeBand(e.target.value)}
                      className="w-full px-4 py-3 bg-parchment/30 rounded-xl border-2 border-ink/30 focus:border-berry focus:bg-white focus:outline-none font-bold text-sm text-ink cursor-pointer"
                    >
                      <option value="3-5">Ages 3-5 (Short sentences, gentle repetition)</option>
                      <option value="6-8">Ages 6-8 (Playful vocabulary, mild adventure)</option>
                      <option value="9-11">Ages 9-11 (Richer plot, expressive figurative language)</option>
                    </select>
                  </div>
                </div>

                {/* Illustrated Avatar Builder */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2">
                    Illustrated Avatar Look
                  </label>
                  <AvatarBuilder avatar={avatar} onChange={setAvatar} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink/15">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 bg-parchment hover:bg-parchment-dark text-ink font-bold text-sm rounded-xl border-2 border-ink transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-berry hover:bg-berry-dark text-white font-black text-sm rounded-xl border-2 border-ink shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving...' : editingChild ? 'Save Changes' : 'Create Profile'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
