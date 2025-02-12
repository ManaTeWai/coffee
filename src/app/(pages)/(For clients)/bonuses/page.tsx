import { Metadata } from 'next';
import Bonuses from './bonuses'; // 

export const metadata: Metadata = {
    title: "Кофе Тайм || Бонусы",
    description: "Бонусы CoffeeTime",
};

export default function BonusesPage() {
    return <Bonuses />;
}