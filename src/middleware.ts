import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './lib/supabase';

//TODO: ちょっと loading ちゅうに遷移がされないからそれ対策しよう
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  await supabase.auth.getSession();
  return res;
}
