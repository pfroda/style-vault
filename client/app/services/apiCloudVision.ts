const url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchInfoFromImage = async (imageUrl: string) => {
    try {
        const response = await fetch(`${url}/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({imageUrl: imageUrl})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error fetching logo:", error);
    }
}