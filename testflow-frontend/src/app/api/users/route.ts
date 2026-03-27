import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      status: 'success',
      data: users
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}
