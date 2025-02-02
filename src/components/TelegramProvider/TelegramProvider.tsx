'use client';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    WebApp.ready();
  }, []);

  return <>{children}</>;
}