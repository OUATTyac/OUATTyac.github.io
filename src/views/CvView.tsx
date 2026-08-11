import React from 'react';
import { FileText, Download, Printer, GraduationCap, BookOpen, MessageSquare, Award, Brain, Mail, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profileData';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

export const CvView: React.FC = () => {
  const { t } = useLanguage();
  const { publications = [], communications = [], courses = [] } = useContent();

  const handlePrintCv = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Top Action Bar for CV */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Curriculum Vitae Académique & Scientifique</h1>
          <p className="text-xs text-slate-300 mt-1">Yacouba OUATTARA • Candidate Doctorat Neurosciences Cognitives & IA</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintCv}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{t("Imprimer / Exporter PDF", "Print / Export PDF")}</span>
          </button>
        </div>
      </div>

      {/* Printable CV Container Paper Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-lg space-y-8 text-slate-900 dark:text-slate-100 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* CV Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Yacouba OUATTARA
            </h1>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {t(profileData.title.fr, profileData.title.en)}
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {profileData.institution}
            </p>
          </div>

          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>{profileData.emailPrimary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>{profileData.phonePrimary}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>UFR Biosciences, Univ. Houphouët-Boigny, Abidjan</span>
            </div>
            <div className="flex items-center gap-2 pt-1 font-bold text-emerald-600 dark:text-emerald-400">
              <span>ORCID: {profileData.orcid}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("1. Résumé Exécutif & Profil de Recherche", "1. Executive Summary & Research Profile")}
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {t(profileData.bio.fr, profileData.bio.en)}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("2. Formation Académique & Diplômes", "2. Academic Education & Degrees")}
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between font-bold">
              <span>Doctorat en Neurosciences Cognitives</span>
              <span>2023 - Présent</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB) • Côte d'Ivoire</p>
            <p className="text-slate-500 dark:text-slate-400 italic mt-0.5">Sujet de thèse : Examen neuroscientifique des facteurs intervenants dans l'efficacité des écrans comme outil pour l'apprentissage.</p>

            <div className="flex justify-between font-bold pt-2">
              <span>Master en Neurosciences & Électrophysiologie (Mention Bien)</span>
              <span>2020 - 2021</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB) • UFR Biosciences</p>

            <div className="flex justify-between font-bold pt-2">
              <span>Licence en Physiologie Animale & Pharmacology</span>
              <span>2017 - 2018</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB)</p>
          </div>
        </div>

        {/* Publications Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("3. Articles & Publications Revues (Sélection)", "3. Selected Peer-Reviewed Publications")}
          </h2>

          <div className="space-y-3 text-xs">
            {publications.slice(0, 4).map((pub, i) => (
              <div key={pub.id} className="space-y-0.5">
                <div className="font-bold">{i + 1}. {pub.title} ({pub.year})</div>
                <div className="text-slate-600 dark:text-slate-400 italic">{pub.journal} {pub.volume ? `vol. ${pub.volume}` : ''}</div>
                <div className="text-slate-500 font-mono text-[10px]">Authors: {(pub.authors || []).join(', ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Communications & Posters */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("4. Communications & Poster FENS 2026", "4. Conference Talks & FENS 2026 Poster")}
          </h2>

          <div className="space-y-3 text-xs">
            {communications.slice(0, 4).map((comm, i) => (
              <div key={comm.id} className="space-y-0.5">
                <div className="font-bold">{comm.title}</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium">{comm.conference} • {comm.location} ({comm.year})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Technical Competencies */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("5. Compétences Techniques & Matérielles", "5. Technical & Laboratory Skills")}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="font-bold mb-1">Électrophysiologie & EEG</div>
              <div className="text-slate-600 dark:text-slate-400">MNE-Python, EEGLAB, Signal FFT/Welch, Filtering, ERD/ERS Alpha Oscillations.</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="font-bold mb-1">IA & Data Science</div>
              <div className="text-slate-600 dark:text-slate-400">Python, PyTorch, Scikit-learn, Biostatistics R, Computer Vision.</div>
            </div>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("6. Expérience Professionnelle & Recherche", "6. Professional & Research Experience")}
          </h2>

          <div className="space-y-5 text-xs text-slate-700 dark:text-slate-300">
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Moniteur de Laboratoire Biologie & Santé – UFR Biosciences, UFHB</span>
                <span className="shrink-0 text-indigo-600 dark:text-indigo-400">2024 - Présent</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 ml-1 mt-1 text-slate-600 dark:text-slate-400">
                <li>Encadrement technique et pédagogique d’étudiants en travaux pratiques et à la recherche.</li>
                <li>Assistance à la recherche scientifique et au développement de projets innovants.</li>
                <li>Contribution à la gestion et à l’organisation d’activités scientifiques au sein du laboratoire Biologie et Santé et de l’UFR Biosciences.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Chercheur en Neurosciences & IA</span>
                <span className="shrink-0 text-indigo-600 dark:text-indigo-400">2020 - Présent</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 ml-1 mt-1 text-slate-600 dark:text-slate-400">
                <li>Expertise en collecte, traitement, analyse et visualisation de données quantitatives et qualitatives.</li>
                <li>Expérience dans l’enregistrement, l’analyse et l’interprétation des signaux cérébraux avec l’électroencéphalographie (EEG).</li>
                <li>Expertise en recherche santé humaine, Éducative et Apprentissage (NeuroEducation).</li>
                <li>Recherche cognition et intelligence artificielle.</li>
                <li>Connaissance des techniques d'analyse statistique et des outils de visualisation de données (R, Python, Power Bi, Excel).</li>
                <li>Expertise dans la rédaction de rapports et d'articles scientifiques.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span className="pr-4">Technicien audio-visuel et informaticien CAMES – Membre de l’équipe technique UFHB</span>
                <span className="shrink-0 text-indigo-600 dark:text-indigo-400">2022 - Présent</span>
              </div>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Concours d’agrégation CAMES des sciences de la santé (MPOMV) et juridiques, économiques et politiques (SJPEG).<br/>
                Chargé de la transmission en ligne du concours d’agrégation MPOMV 2022 (phase pilote), 2024 et SJPEG 2023 CAMES UFHB avec le logiciel Vmix Pro. J’ai eu la charge de gérer la régie vidéo, assurer la captation audio et vidéo des épreuves, superviser l’installation et l’utilisation des équipements numériques, résoudre les incidents techniques, etc.<br/>
                Ces missions ont été menées avec une rigueur exemplaire et un souci constant d’optimiser la qualité et la fluidité des diffusions, garantissant ainsi le bon déroulement des travaux du jury et une expérience sans faille pour les candidats.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Formateur – Informaticien | Centre de Formation+Certifications Microsoft</span>
                <span className="shrink-0 text-indigo-600 dark:text-indigo-400">2019 - Présent</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 ml-1 mt-1 text-slate-600 dark:text-slate-400">
                <li>Conception de programmes de formation intégrant outils numériques, pédagogies actives et approches communautaires.</li>
                <li>Animation de plus de 50 ateliers de formation pour étudiants, professionnels et personnels administratifs.</li>
                <li>Création de vidéos de formations et tutoriels aux apprenants.</li>
                <li>Maintenance informatique : installation de système, réparation d’ordinateur etc.</li>
                <li>Avec l’entreprise SynapseU, j’ai participé en tant que formateur en Bureautique et Intelligence Artificielle Générative (IAG) au programme de formation Tech@Work en Congo RDC, visant à doter les jeunes de compétences numériques et entrepreneuriales. Initiative financée par Microsoft et coordonnée par l’OIE.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Affiliations & Interests */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("7. Engagements, Affiliations & Centres d'intérêt", "7. Engagements, Affiliations & Interests")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100">Affiliations & Engagements</div>
              <ul className="list-disc list-outside space-y-1.5 ml-4 text-slate-600 dark:text-slate-400">
                <li>Sollicité pour être Informaticien et chargé de communication du PTR Changement Climatique du CAMES pour l’organisation du Forum Africain sur le Climat (FAC 2025), tenu à l’Université Félix Houphouët-Boigny du 28 juillet au 02 août 2025.</li>
                <li>Membre fondateur (Vice-président) du Club Informatique et Multimédia UFHB : formation de plus de 1000 étudiants (Licence, Master, Doctorat) en partenariat avec l’UFHB et l’AUF Côte d’Ivoire en analyse de données, bureautique et marketing digital.</li>
                <li>Membre de l'Association pour la Recherche en Neuroéducation (ARN).</li>
                <li>Membre de la Fédération Européenne des Sociétés de Neurosciences (FENS).</li>
                <li>Membre de la Société des Neurosciences (SfN).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100">Centres d'intérêt</div>
              <ul className="list-disc list-outside space-y-1.5 ml-4 text-slate-600 dark:text-slate-400">
                <li>Santé publique en Afrique</li>
                <li>Éducation et technologies numériques</li>
                <li>Intelligence artificielle appliquée à la santé et l’éducation</li>
                <li>Analyse de données et visualisation</li>
                <li>Développement durable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
