export async function pressKey(key: string) {
	try {
		const res = await fetch('/api/key-press', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key })
		});

		if (!res.ok) {
			console.error(`Error pressing key: ${key}`);
			return;
		}

		const data = await res.json();
		console.log(`Key "${data.key}" pressed successfully.`);
	} catch (error) {
		console.error('Network error pressing key:', error);
	}
}
