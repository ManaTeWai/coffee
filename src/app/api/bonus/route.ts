import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        balance: 150, // Текущий баланс бонусов
        history: [
            { date: '2023-10-01', amount: 50, source: 'Покупка кофе' },
            { date: '2023-10-05', amount: 30, source: 'Акция "День рождения"' },
            { date: '2023-10-10', amount: 70, source: 'Реферальная программа' },
        ],
    };

    return NextResponse.json(data);
}