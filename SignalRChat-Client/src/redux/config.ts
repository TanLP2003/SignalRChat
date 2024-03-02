export const SERVER_URL = 'http://localhost:8001';

export function encodeFileInChunks(fileBytes: Uint8Array, chunkSize: number) {
    const encodedChunks: string[] = [];
    for (let i = 0; i < fileBytes.length; i += chunkSize) {
        const chunk = fileBytes.slice(i, i + chunkSize);
        // console.log(chunk.length);
        const encodedChunk = btoa(String.fromCharCode(...chunk));
        encodedChunks.push(encodedChunk);
        // console.log(encodedChunk);
        // Optional: Update progress indicator here (e.g., using a progress bar)
    }
    return encodedChunks.join('');
}