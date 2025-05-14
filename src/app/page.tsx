'use client';

import React from 'react';
import { Suspense } from 'react';
import Home from './Home';

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
