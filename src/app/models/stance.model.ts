export const Stance = {
    Offensive: 'Offensive',
    Defensive: 'Deffensive'
} as const;
export type Stance = typeof Stance[keyof typeof Stance];