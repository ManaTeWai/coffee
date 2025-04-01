"use client";

import { Button, Htag, P } from "@/components";
import styles from "./not-found.module.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.cont}>
      <div>
        <Htag tag="h1">500 - Ошибка сервера</Htag>
        <P>Что-то пошло не так. Пожалуйста, попробуйте позже.</P>
        <Button appearance="primary" onClick={() => reset()}>
          Попробовать снова
        </Button>
      </div>
    </div>
  );
}
