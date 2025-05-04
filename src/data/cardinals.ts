export interface Cardinal {
    name: string;
    odds: number[];
    bets: number[];
}

export const cardinals: Cardinal[] = [
    {
        name: "Pietro Parolin",
        odds: [3.85, 3.9, 4, 4.1, 4.2, 5.1],
        bets: [22, 11, 31, 20, 28, 45]
    },
    {
        name: "Luis Antonio Tagle",
        odds: [4.8, 5.2, 5.3, 5.8, 6, 6.8],
        bets: [86, 251, 30, 119, 15, 19]
    },
    {
        name: "Peter Turkson",
        odds: [8.6, 10, 10.5, 12.5, 13, 20],
        bets: [29, 11, 15, 10, 15, 10]
    },
    {
        name: "Matteo Zuppi",
        odds: [9.2, 10, 10.5, 15.5, 16, 770],
        bets: [16, 30, 17, 10, 10, 11]
    },
    {
        name: "Pierbattista Pizzaballa",
        odds: [8.8, 9.2, 9.4, 10.5, 11.5, 12],
        bets: [23, 24, 17, 11, 13, 19]
    },
    {
        name: "Peter Erdo",
        odds: [12, 12.5, 15, 17, 17.5, 48],
        bets: [11, 21, 13, 25, 31, 10]
    },
    {
        name: "Robert Sarah",
        odds: [19, 22, 25, 50, 180],
        bets: [11, 11, 10, 11, 10]
    },
    {
        name: "Wilton Daniel Gregory",
        odds: [15, 29, 40, 1000],
        bets: [149, 15, 14, 9]
    },
    {
        name: "Mario Grech",
        odds: [14.5, 26, 28, 90, 1000],
        bets: [12, 29, 22, 16, 3]
    },
    {
        name: "Jean-Marc Aveline",
        odds: [15, 25, 44, 90, 1000],
        bets: [150, 10, 12, 19, 9]
    },
    {
        name: "Fridolin Ambongo Besungu",
        odds: [15, 18, 25, 1000],
        bets: [143, 10, 17, 11]
    },
    {
        name: "Fernando Filoni",
        odds: [15, 44, 140, 1000],
        bets: [143, 11, 12, 3]
    }
]; 