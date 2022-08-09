export default function (time: number): Promise<void> {
    return new Promise<void>((res) => setTimeout(res, time));
}
