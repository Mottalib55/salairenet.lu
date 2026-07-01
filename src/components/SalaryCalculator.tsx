import { useState, useMemo } from 'react';
import { calculerSalaire, type SalaryInput, type SalaryResult } from '../lib/engine';
import type { ClasseImpot } from '../lib/baremes-2026';

function fmt(n: number): string {
  return n.toLocaleString('fr-LU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + ' %';
}

export default function SalaryCalculator() {
  const [brutMensuel, setBrutMensuel] = useState(5_000);
  const [classe, setClasse] = useState<ClasseImpot>('1');
  const [enfants, setEnfants] = useState(0);
  const [frontalier, setFrontalier] = useState(false);
  const [moisParAn, setMoisParAn] = useState(12);

  const result: SalaryResult = useMemo(() => {
    return calculerSalaire({ brutMensuel, classe, enfants, frontalier, moisParAn });
  }, [brutMensuel, classe, enfants, frontalier, moisParAn]);

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vos paramètres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salaire brut mensuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={brutMensuel}
                onChange={e => setBrutMensuel(Number(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 pr-8 focus:ring-2 focus:ring-primary focus:border-primary"
                min={0}
                step={100}
              />
              <span className="absolute right-3 top-2.5 text-gray-500 text-sm">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classe d'impôt
            </label>
            <select
              value={classe}
              onChange={e => setClasse(e.target.value as ClasseImpot)}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="1">Classe 1 — Célibataire</option>
              <option value="1a">Classe 1a — Monoparental / veuf</option>
              <option value="2">Classe 2 — Marié / pacsé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enfants à charge
            </label>
            <input
              type="number"
              value={enfants}
              onChange={e => setEnfants(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
              min={0}
              max={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mois de salaire / an
            </label>
            <select
              value={moisParAn}
              onChange={e => setMoisParAn(Number(e.target.value))}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value={12}>12 mois</option>
              <option value={13}>13 mois (gratification)</option>
              <option value={14}>14 mois</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={frontalier}
                onChange={e => setFrontalier(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">Frontalier</span>
            </label>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre salaire net</h2>

        {/* Synthèse visuelle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Brut mensuel</p>
            <p className="text-2xl font-bold text-primary">{fmt(result.brutMensuel)} €</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Net mensuel</p>
            <p className="text-2xl font-bold text-green-600">{fmt(result.netMensuel)} €</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Taux de charges total</p>
            <p className="text-2xl font-bold text-gray-700">{pct(result.tauxChargesTotal)}</p>
          </div>
        </div>

        {/* Barre visuelle */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden flex">
            <div
              className="bg-green-500 h-5 transition-all duration-500"
              style={{ width: `${(result.netMensuel / result.brutMensuel) * 100}%` }}
              title={`Net : ${pct(result.netMensuel / result.brutMensuel)}`}
            />
            <div
              className="bg-orange-400 h-5 transition-all duration-500"
              style={{ width: `${(result.totalCotisationsMensuelles / result.brutMensuel) * 100}%` }}
              title={`Cotisations : ${pct(result.tauxCotisations)}`}
            />
            <div
              className="bg-red-400 h-5 transition-all duration-500"
              style={{ width: `${(result.impotMensuel / result.brutMensuel) * 100}%` }}
              title={`Impôt : ${pct(result.tauxImposition)}`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> Net</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-full inline-block" /> Cotisations</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full inline-block" /> Impôt</span>
          </div>
        </div>

        {/* Détail cotisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cotisations sociales (mensuel)</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Assurance maladie (CNS)</td>
                  <td className="py-1.5 text-right font-medium">{fmt(result.cotisationCNS)} €</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Assurance pension</td>
                  <td className="py-1.5 text-right font-medium">{fmt(result.cotisationPension)} €</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Assurance dépendance</td>
                  <td className="py-1.5 text-right font-medium">{fmt(result.cotisationDependance)} €</td>
                </tr>
                <tr className="border-t-2 border-gray-300">
                  <td className="py-2 font-semibold">Total cotisations</td>
                  <td className="py-2 text-right font-bold text-orange-600">{fmt(result.totalCotisationsMensuelles)} €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Impôt sur le revenu (annuel)</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Revenu imposable</td>
                  <td className="py-1.5 text-right font-medium">{fmt(result.revenuImposable)} €</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Impôt barème</td>
                  <td className="py-1.5 text-right font-medium">{fmt(result.impotBrutAnnuel)} €</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Surtaxe de solidarité</td>
                  <td className="py-1.5 text-right font-medium">+ {fmt(result.surtaxeSolidarite)} €</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Crédit d'impôt salarié (CIS)</td>
                  <td className="py-1.5 text-right font-medium text-green-600">− {fmt(result.creditImpotSalarie)} €</td>
                </tr>
                {result.moderationEnfants > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 text-gray-600">Modération enfants</td>
                    <td className="py-1.5 text-right font-medium text-green-600">− {fmt(result.moderationEnfants)} €</td>
                  </tr>
                )}
                <tr className="border-t-2 border-gray-300">
                  <td className="py-2 font-semibold">Impôt net annuel</td>
                  <td className="py-2 text-right font-bold text-red-600">{fmt(result.impotNetAnnuel)} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Récap annuel */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Récapitulatif annuel</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
            <div>
              <p className="text-gray-500">Brut annuel</p>
              <p className="font-bold">{fmt(result.brutAnnuel)} €</p>
            </div>
            <div>
              <p className="text-gray-500">Net annuel</p>
              <p className="font-bold text-green-600">{fmt(result.netAnnuel)} €</p>
            </div>
            <div>
              <p className="text-gray-500">Coût employeur/mois</p>
              <p className="font-bold text-gray-600">{fmt(result.coutEmployeurMensuel)} €</p>
            </div>
            <div>
              <p className="text-gray-500">Coût employeur/an</p>
              <p className="font-bold text-gray-600">{fmt(result.coutEmployeurAnnuel)} €</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Estimation indicative basée sur les barèmes fiscaux et sociaux luxembourgeois en vigueur au 1<sup>er</sup> janvier 2026.
          Les montants réels peuvent varier selon les déductions spécifiques, les revenus du conjoint (classe 2) et les
          dispositions individuelles. Consultez l'Administration des Contributions Directes (ACD) pour une situation personnalisée.
        </p>
      </div>
    </div>
  );
}
