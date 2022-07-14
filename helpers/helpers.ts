import { VariantType, Rewards } from "./types";



export const getBestInitialVariant = (variants: VariantType[], rewards: Rewards): VariantType | undefined => {

    const [highestRewardId] = Object.entries(rewards).sort((a: any[], b: any[]) => b[1] - a[1])[0];

    return variants.find(({ id }) => +id === +highestRewardId);
}


export const getCurrentReward = (rewards: Rewards, id: number | undefined): number | null => {

    const currentReward = Object.entries(rewards).find(reward => +reward[0] === id);

    if (!currentReward) {
        return null
    } return currentReward[1]
}


export const findAppropriateVariant = (variants: VariantType[], options: string[]): VariantType | object  => {

    const [option1, option2] = options;

    return variants.find(el => el.option1 === option1 && el.option2 === option2) || {};
}