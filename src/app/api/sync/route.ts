import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    revalidatePath('/', 'layout');
    return NextResponse.json({
      success: true,
      message: 'Data dasawisma berhasil disinkronkan dari Google Sheets',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal melakukan revalidasi cache' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
