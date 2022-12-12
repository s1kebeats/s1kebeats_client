import Tag from "./Tag";

export default interface Beat {
    image: string;
    id: number;
    name: string;
    bpm: number | null;
    tags: Tag[];
    user: {
        username: string;
        displayedName: string | null;
        id: number;
    };
    mp3: string;
    wavePrice: number;
}