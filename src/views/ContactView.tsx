import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, ExternalLink, Clock, Building2 } from 'lucide-react';
import { profileData } from '../data/profileData';
import { useLanguage } from '../context/LanguageContext';

export const ContactView: React.FC = () => {
  const { t } = useLanguage();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Collaboration Recherche / EEG',
    message: ''
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', subject: 'Collaboration Recherche / EEG', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Contact Direct Chercheur & Laboratoire", "Direct Researcher & Lab Contact")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Contact & Collaborations Scientifiques", "Contact & Scientific Collaboration")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Vous souhaitez échanger sur nos projets de recherche en neurosciences cognitives, proposer une collaboration internationale ou solliciter une expertise en analyse EEG ?",
              "Interested in cognitive neuroscience research collaborations, EEG signal analysis, or EdTech consultation? Get in touch."
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              {t("Coordonnées Directes", "Direct Contact Details")}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t("Laboratoire & Institution", "Laboratory & Department")}</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    UFR Biosciences, Université Félix Houphouët-Boigny (UFHB), Abidjan, Côte d'Ivoire.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t("Adresse Email Académique", "Academic Email")}</div>
                  <a href={`mailto:${profileData.emailPrimary}`} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mt-0.5 block">
                    {profileData.emailPrimary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t("Téléphones Portable & WhatsApp", "Phone & WhatsApp")}</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5 font-mono">
                    {profileData.phonePrimary} / {profileData.phoneSecondary}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t("Permanence & Horaires Labo", "Office & Lab Hours")}</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Lundi - Vendredi: 08:30 - 17:00 (GMT)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400">Profiles Académiques Officiels</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href={profileData.orcidUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <span>ORCID</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href={profileData.halUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">
                  <span>HAL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href={profileData.researchGateUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1">
                  <span>ResearchGate</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Message Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            {t("Envoyer un Message au Chercheur", "Send a Message to the Researcher")}
          </h3>

          {sent ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 rounded-3xl border border-emerald-200/80 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                {t("Message envoyé avec succès !", "Message sent successfully!")}
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                {t(
                  "Merci pour votre message. Yacouba OUATTARA vous répondra dans les plus brefs délais.",
                  "Thank you for reaching out. Yacouba OUATTARA will respond shortly."
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">{t("Nom & Prénom", "Full Name")} *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Dr. Marie Curie"
                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">{t("Adresse Email", "Email Address")} *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    placeholder="marie.curie@lab.org"
                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">{t("Sujet de la demande", "Subject")}</label>
                <select
                  value={formState.subject}
                  onChange={e => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 font-medium"
                >
                  <option value="Collaboration Recherche / EEG">Collaboration Recherche / EEG</option>
                  <option value="Invitation Conférence / Talk">Invitation Conférence / Talk</option>
                  <option value="Enseignement & Master">Enseignement & Master</option>
                  <option value="Demande d'information Projet IA">Demande d'information Projet IA</option>
                  <option value="Autre Demande">Autre Demande</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">{t("Votre Message", "Your Message")} *</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t("Rédigez votre message ici...", "Write your message here...")}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{t("Envoyer le Message Direct", "Send Direct Message")}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
