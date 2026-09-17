import { fetchDasawismaData } from '@/lib/sheets';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Eksekutif Dasawisma TP-PKK Kelurahan Bubulak',
  description:
    'Sistem Informasi & Dashboard Eksekutif Pemantauan Dasawisma TP-PKK Kelurahan Bubulak, Kecamatan Bogor Barat, Kota Bogor.',
};

// Revalidate data setiap 60 detik (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Tarik data awal secara aman di Server Component
  const data = await fetchDasawismaData();

  return <DashboardView initialData={data} />;
}
