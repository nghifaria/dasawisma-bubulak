import { Metadata } from 'next';
import { HeaderExecutive } from '@/components/dashboard/HeaderExecutive';
import { PengurusDirectoryView } from '@/components/pengurus/PengurusDirectoryView';

export const metadata: Metadata = {
  title: 'Direktori Kepengurusan Dasawisma SK Lurah | Kelurahan Bubulak',
  description:
    'Direktori resmi susunan pengurus dan kader kelompok dasawisma se-Kelurahan Bubulak berdasarkan SK Lurah Bubulak Nomor 147/BBLK/Juni 2026.',
};

export default function PengurusPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <HeaderExecutive />
      <main className="flex-1">
        <PengurusDirectoryView />
      </main>
    </div>
  );
}
