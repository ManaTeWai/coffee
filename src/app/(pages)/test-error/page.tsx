export default function TestErrorPage() {
  throw Error("Тестовая ошибка 500");
  return <div>Этот контент никогда не отобразится</div>;
}
